import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const pastPaperSchema = z.object({
  examName: z.string().max(100),
  year: z.number().int().min(1990).max(2030),
  title: z.string().max(500),
  fileUrl: z.string().url(),
  source: z.string().max(500).optional(),
});

// Section 6: Allowlist of trusted domains that PDFs may come from
const TRUSTED_DOMAINS = [
  "drive.google.com",
  "docs.google.com",
  "storage.googleapis.com",
];

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Section 4: Ensure role is ADMIN
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = pastPaperSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 422 }
      );
    }

    const { examName, year, title, fileUrl, source } = parsed.data;

    // Section 6: Validate that URL starts with https://
    if (!fileUrl.startsWith("https://")) {
      return NextResponse.json(
        { error: "Only secure https:// URLs are allowed" },
        { status: 400 }
      );
    }

    // Section 6: Reject URLs from domains not on the trusted list
    try {
      const url = new URL(fileUrl);
      if (!TRUSTED_DOMAINS.includes(url.hostname)) {
        return NextResponse.json(
          { error: `File hosting domain '${url.hostname}' is not in the allowlist.` },
          { status: 400 }
        );
      }
    } catch (e) {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }

    // Note: We do NOT fetch or proxy the external URL server-side (prevents SSRF attacks).

    // Section 6 & 9: Log past-paper submission uploader's userId, submitted URL and admin action
    console.log(
      JSON.stringify({
        event: "ADMIN_ACTION",
        action: "past_paper_submission",
        actorId: session.user.id,
        fileUrl,
        timestamp: new Date().toISOString(),
      })
    );

    return NextResponse.json({
      message: "Past paper submitted successfully!",
      paper: {
        id: `paper_${Math.random().toString(36).substring(7)}`,
        examName,
        year,
        title,
        fileUrl,
        source: source || null,
        uploadedBy: session.user.id,
      },
    }, { status: 201 });
  } catch (error) {
    console.error("Past paper POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// TODO: If direct file upload is added later:
// - Implement server-side MIME type validation (e.g. check magic bytes, not just extension)
// - Reject any files over 20 MB.
