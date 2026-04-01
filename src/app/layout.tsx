import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ainomiq — Always Ahead",
    template: "%s — Ainomiq",
  },
  description:
    "AI automation platform voor e-commerce en enterprise. Wij bouwen AI die werkt, vanaf dag 1.",
  openGraph: {
    title: "Ainomiq — Always Ahead",
    description:
      "AI automation platform voor e-commerce en enterprise. Wij bouwen AI die werkt, vanaf dag 1.",
    siteName: "Ainomiq",
    locale: "nl_NL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-ainomiq-navy text-ainomiq-text`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
