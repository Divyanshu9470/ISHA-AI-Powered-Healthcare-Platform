import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const fontSerif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IshaMed — Premium Medical Education Platform",
  description: "Master Medicine with IshaMed. Premium video lectures, expert mentorship, and comprehensive resources for USMLE, PLAB, and global medical board success.",
};

import { AuthProvider } from "@/components/providers/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${fontSerif.variable} ${fontSans.variable} font-sans antialiased bg-background text-foreground min-h-screen cursor-default`}>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

