import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sirophp.com"),
  title: {
    default: "SiroPHP — Build APIs Fast. Debug Faster.",
    template: "%s | SiroPHP",
  },
  description:
    "Build APIs in seconds with CRUD scaffolding. Debug production bugs instantly with request replay. Minimal dependencies. <1ms cold boot.",
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
    title: "SiroPHP — Build APIs Fast. Debug Faster.",
    description:
      "Build APIs in seconds with CRUD scaffolding. Debug production bugs instantly with request replay. Minimal dependencies. <1ms cold boot.",
    url: "https://sirophp.com",
    siteName: "SiroPHP",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SiroPHP — Build APIs Fast. Debug Faster.",
    description:
      "Build APIs in seconds. Debug production bugs instantly. A lightweight PHP API framework built for rapid development.",
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
      <body className="min-h-full flex flex-col bg-black text-white [overscroll-behavior:contain]">
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5WC4X849"
height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
        <Script id="gtm" strategy="beforeInteractive" dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5WC4X849');`,
        }} />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
