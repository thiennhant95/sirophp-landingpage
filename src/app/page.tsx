import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import WhySiro from '@/components/WhySiro';
import CTA from '@/components/CTA';

export const metadata: Metadata = {
  title: 'Build APIs Fast. Debug Faster | SiroPHP — Lightweight PHP API Framework',
  description: 'Build APIs in seconds with CRUD scaffolding. Debug production bugs instantly with request replay and CLI testing. Minimal dependencies. <1ms cold boot.',
  keywords: [
    'php api framework',
    'lightweight php framework',
    'debug api php',
    'fast php framework',
    'cli api testing',
    'trace api request php',
    'replay api request php',
    'php debugging tools',
    'api testing php',
    'crud scaffolding php',
  ],
  openGraph: {
    title: 'Build APIs Fast. Debug Faster | SiroPHP — Lightweight PHP API Framework',
    description: 'Build APIs in seconds with CRUD scaffolding. Debug production bugs instantly with request replay and CLI testing. Minimal dependencies. <1ms cold boot.',
    type: 'website',
    url: 'https://sirophp.com',
    siteName: 'SiroPHP',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'SiroPHP — Build APIs Fast. Debug Faster.',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Build APIs Fast. Debug Faster | SiroPHP — Lightweight PHP API Framework',
    description: 'Build APIs in seconds with CRUD scaffolding. Debug production bugs instantly with request replay and CLI testing. Minimal dependencies. <1ms cold boot.',
    images: ['/opengraph-image.png'],
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
    description: 'Build APIs fast with CRUD scaffolding. Debug production bugs instantly with request replay. Zero dependencies. <1ms cold boot.',
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
          text: 'SiroPHP is a lightweight PHP API framework built for rapid development and instant debugging. It features zero dependencies, CRUD scaffolding, full request tracing, and one-command production bug replay.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is SiroPHP different from Laravel?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SiroPHP has zero dependencies vs Laravel\'s ~200 packages, <1ms cold boot vs 50-100ms, and ~2MB RAM vs 256MB. It focuses on pure API development with built-in debugging workflow.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I build APIs fast with SiroPHP?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use php siro make:crud to generate full CRUD endpoints with model, migration, controller, routes, and tests in 2 seconds. Then php siro serve to start the dev server.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does production debugging work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Every response includes an X-Siro-Trace-Id header. Use php siro replay <trace_id> to reproduce the exact request, complete with headers, body, SQL queries, and timing.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is SiroPHP production ready?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. 1,294 tests with 100% pass rate (868 core + 426 app), security audited (37 attack vectors, 0 vulnerabilities), and features like JWT auth, rate limiting, CSRF protection, and log sanitization.',
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
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <WhySiro />
      <CTA />
    </main>
  );
}
