import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = (req: any, res: any) => {
  const host = req.headers.get("host") || "localhost:3000";
  const protocol = req.headers.get("x-forwarded-proto") || "http";
  process.env.NEXTAUTH_URL = `${protocol}://${host}`;
  return NextAuth(authOptions)(req, res);
};

export { handler as GET, handler as POST };
