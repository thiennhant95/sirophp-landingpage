import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import WhySiro from '@/components/WhySiro';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Debug APIs Instantly. Built for Speed | Siro PHP Framework',
  description: 'Debug APIs in PHP instantly with full request trace, replay, and CLI testing. A fast, lightweight PHP API framework built for developers.',
  keywords: [
    'php api framework',
    'debug api php',
    'fast php framework',
    'cli api testing',
    'trace api request php',
    'replay api request php',
    'php debugging tools',
    'api testing php',
  ],
  openGraph: {
    title: 'Debug APIs Instantly. Built for Speed | Siro PHP Framework',
    description: 'Debug APIs in PHP instantly with full request trace, replay, and CLI testing. A fast, lightweight PHP API framework built for developers.',
    type: 'website',
    url: 'https://sirophp.com',
    siteName: 'Siro PHP Framework',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Siro PHP Framework - Debug APIs Instantly',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debug APIs Instantly. Built for Speed | Siro PHP Framework',
    description: 'Debug APIs in PHP instantly with full request trace, replay, and CLI testing. A fast, lightweight PHP API framework built for developers.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://sirophp.com',
  },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Siro PHP Framework',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    description: 'Debug APIs in PHP instantly with full request trace, replay, and CLI testing. A fast, lightweight PHP API framework built for developers.',
    url: 'https://sirophp.com',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
    },
  };

  // FAQ Structured Data
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is SiroPHP?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SiroPHP is a debug-first PHP micro-framework designed for instant API debugging with built-in request tracing, replay functionality, and CLI testing tools.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I debug APIs in PHP with Siro?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use the siro replay command with a trace ID to reproduce production bugs instantly. The framework automatically logs all requests with full traces for easy debugging.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is SiroPHP suitable for production?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, SiroPHP is optimized for production use with minimal overhead, security features like CSRF protection and input validation, and efficient request handling.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I test APIs from the terminal?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! SiroPHP includes native CLI testing tools that let you test endpoints directly from your terminal without Postman or other external tools.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does request replay work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SiroPHP captures complete request/response data including headers, body, and context. You can replay any request using its trace ID to debug issues exactly as they occurred.',
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <WhySiro />
      <CTA />
      <Footer />
    </main>
  );
}
