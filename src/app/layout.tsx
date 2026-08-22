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
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: false, // Non-critical font, load later
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sirophp.com"),
  title: {
    default: "SiroPHP — Build APIs Fast. Debug Faster.",
    template: "%s | SiroPHP",
  },
  description:
      "Build APIs in seconds with CRUD scaffolding. Debug production bugs instantly with request replay. Minimal dependencies. ~0.5ms cold boot (Linux) / ~3ms (Windows).",
  keywords: [
    "SiroPHP",
    "PHP framework",
    "API framework",
    "fast php",
    "php 8.2 framework",
    "zero dependency php framework",
    "laravel alternative",
    "trace id",
    "request replay",
    "cli api testing",
    "jwt rs256 php",
    "mutation testing php",
    "micro framework",
    "developer experience",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SiroPHP — Build APIs Fast. Debug Faster.",
    description:
    "Build APIs in seconds with CRUD scaffolding. Debug production bugs instantly with request replay. Minimal dependencies. ~0.5ms cold boot (Linux) / ~3ms (Windows).",
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

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SiroPHP',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'PHP 8.2+, Linux, macOS, Windows',
  description:
    'Production-first PHP API framework with built-in debugging, request replay, and testing workflows. Zero dependencies.',
  softwareVersion: '0.40.0',
  url: 'https://sirophp.com',
  downloadUrl: 'https://sirophp.com/downloads/install.ps1',
  author: { '@type': 'Organization', name: 'SiroSoft', url: 'https://github.com/SiroSoft' },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  license: 'https://opensource.org/licenses/MIT',
  sameAs: [
    'https://github.com/SiroSoft/siro-core',
    'https://github.com/SiroSoft/SiroPHP',
    'https://packagist.org/packages/sirosoft/api',
    'https://packagist.org/packages/sirosoft/core',
  ],
}

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
      <head>
        {/* Resource hints for faster loading */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white [overscroll-behavior:contain]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
        {/* GTM noscript fallback */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-5WC4X849"
            height="0" 
            width="0" 
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        
        {/* GTM - Changed to afterInteractive to avoid render-blocking */}
        <Script 
          id="gtm" 
          strategy="afterInteractive" 
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5WC4X849');`,
          }} 
        />
        
        {/* Google Analytics - Lazy load */}
        <Script 
          async 
          src="https://www.googletagmanager.com/gtag/js?id=G-S34G5E8PMK" 
          strategy="lazyOnload" 
        />
        <Script 
          id="gtag-config" 
          strategy="lazyOnload" 
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-S34G5E8PMK');`,
          }} 
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
