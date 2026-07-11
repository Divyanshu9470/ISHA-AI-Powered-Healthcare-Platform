import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// In-memory rate limiting bucket structure
interface RateLimitBucket {
  count: number;
  resetTime: number;
}

const rateLimitCache = new Map<string, RateLimitBucket>();

function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();

  // Periodic cleanup to avoid memory leaks
  if (rateLimitCache.size > 10000) {
    for (const [k, v] of rateLimitCache.entries()) {
      if (now > v.resetTime) {
        rateLimitCache.delete(k);
      }
    }
  }

  const bucket = rateLimitCache.get(key);
  if (!bucket || now > bucket.resetTime) {
    const newBucket = {
      count: 1,
      resetTime: now + windowMs,
    };
    rateLimitCache.set(key, newBucket);
    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: Math.ceil(newBucket.resetTime / 1000),
    };
  }

  if (bucket.count >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      reset: Math.ceil(bucket.resetTime / 1000),
    };
  }

  bucket.count += 1;
  return {
    success: true,
    limit,
    remaining: limit - bucket.count,
    reset: Math.ceil(bucket.resetTime / 1000),
  };
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || (request as any).ip || "127.0.0.1";

  // --- SECTION 5: CSRF PROTECTION FOR MUTATING NON-AUTH API ROUTES ---
  if (
    ["POST", "PUT", "DELETE", "PATCH"].includes(request.method) &&
    pathname.startsWith("/api/") &&
    !pathname.startsWith("/api/auth/") &&
    pathname !== "/api/register" &&
    pathname !== "/api/auth/register"
  ) {
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");
    const xForwardedHost = request.headers.get("x-forwarded-host");
    const expectedHost = xForwardedHost || host;

    if (origin) {
      try {
        const originUrl = new URL(origin);
        if (originUrl.host !== expectedHost) {
          console.error(
            JSON.stringify({
              event: "CSRF_BLOCKED",
              route: pathname,
              ip,
              timestamp: new Date().toISOString(),
              reason: `Origin mismatch: ${originUrl.host} vs ${expectedHost}`,
            })
          );
          return new NextResponse(
            JSON.stringify({ error: "CSRF protection: Origin mismatch" }),
            { status: 403, headers: { "Content-Type": "application/json" } }
          );
        }
      } catch (e) {
        return new NextResponse(
          JSON.stringify({ error: "CSRF protection: Invalid Origin header" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }
  }

  // --- SECTION 2: RATE LIMITING ON ALL API ROUTES ---
  if (pathname.startsWith("/api/")) {
    let rateLimitResult = { success: true, limit: 0, remaining: 0, reset: 0 };
    let rateLimitType = "";

    // 1. Auth routes (/api/auth/*, /api/register, /api/auth/register)
    if (
      pathname.startsWith("/api/auth/") ||
      pathname === "/api/register" ||
      pathname === "/api/auth/register"
    ) {
      rateLimitType = "AUTH";
      const isLoginOrRegister = request.method === "POST" && (
        pathname.includes("/callback/") || 
        pathname.includes("/signin/") || 
        pathname === "/api/register" || 
        pathname === "/api/auth/register"
      );
      const limit = isLoginOrRegister ? 15 : 100;
      rateLimitResult = checkRateLimit(`auth:${ip}:${isLoginOrRegister ? "login" : "session"}`, limit, 15 * 60 * 1000);
    } 
    // 2. AI routes (/api/copilot, /api/simulator)
    else if (pathname === "/api/copilot" || pathname.startsWith("/api/simulator")) {
      rateLimitType = "AI";
      const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET || "supersecretkey123" });
      const userId = token?.id || token?.sub || token?.email || ip;
      // 10 requests per minute per user ID
      rateLimitResult = checkRateLimit(`ai:${userId}`, 10, 60 * 1000);
    } 
    // 3. Game score submission (/api/game/score)
    else if (pathname === "/api/game/score") {
      rateLimitType = "GAME";
      const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET || "supersecretkey123" });
      const userId = token?.id || token?.sub || token?.email || ip;
      // 20 requests per minute per user ID
      rateLimitResult = checkRateLimit(`game:${userId}`, 20, 60 * 1000);
    } 
    // 4. Past papers download tracking (starting with /api/past-papers)
    else if (pathname.startsWith("/api/past-papers")) {
      rateLimitType = "PAPERS";
      // 30 requests per minute per IP
      rateLimitResult = checkRateLimit(`papers:${ip}`, 30, 60 * 1000);
    } 
    // 5. General API routes
    else {
      rateLimitType = "GENERAL";
      // 60 requests per minute per IP
      rateLimitResult = checkRateLimit(`gen:${ip}`, 60, 60 * 1000);
    }

    if (!rateLimitResult.success) {
      const secondsLeft = Math.max(1, rateLimitResult.reset - Math.ceil(Date.now() / 1000));
      // Section 9: Log rate limit exceeded
      console.error(
        JSON.stringify({
          event: "RATE_LIMIT",
          route: pathname,
          ip,
          type: rateLimitType,
          timestamp: new Date().toISOString(),
        })
      );

      return new NextResponse(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(secondsLeft),
          },
        }
      );
    }
  }

  // --- SECTION 1: HTTP SECURITY HEADERS & DYNAMIC CSP NONCE ---
  // Generate request nonce
  const nonce = crypto.randomUUID().toString();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  // Set Content-Security-Policy dynamically with the nonce
  const cspHeader = `default-src 'self'; script-src 'self' 'nonce-${nonce}'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.anthropic.com https://generativelanguage.googleapis.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self';`;

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Apply all Section 1 security headers to every response
  response.headers.set("Content-Security-Policy", cspHeader);
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  response.headers.set("X-XSS-Protection", "0");

  return response;
}

// Run middleware on all requests except static files and assets
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to exclude external file downloads/assets if they have extensions.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|mp4|mp3|pdf|woff|woff2)$).*)",
  ],
};
