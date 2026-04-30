import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sirophp.dev"),
  title: {
    default: "SiroPHP — Debug Instantly. Built for Speed",
    template: "%s | SiroPHP",
  },
  description:
    "SiroPHP is an API-first PHP framework focused on raw speed and instant debugging: Trace ID, replay, CLI API testing, and production-ready scaffolding.",
  keywords: [
    "SiroPHP",
    "PHP framework",
    "API framework",
    "fast php",
    "trace id",
    "request replay",
    "cli api testing",
    "micro framework",
    "developer experience",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SiroPHP — Debug Instantly. Built for Speed",
    description:
      "Build fast APIs with SiroPHP: blazing performance, trace-based debugging, request replay, and CLI-first workflows.",
    url: "https://sirophp.dev",
    siteName: "SiroPHP",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SiroPHP — Debug Instantly. Built for Speed",
    description:
      "Fast API development for PHP devs with replay, trace and CLI testing built in.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-black`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">{children}</body>
    </html>
  );
}
