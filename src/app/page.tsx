import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import WhySiro from '@/components/WhySiro';
import CTA from '@/components/CTA';

export const metadata: Metadata = {
  title: 'SiroPHP — The Fastest Feedback Loop for API Developers',
    description: 'Build APIs in minutes, not hours. Debug production bugs instantly with request replay. Zero dependencies, ~0.5ms cold boot (Linux+OPcache) / ~3ms (Windows), ~4MB+ RAM per request.',
  alternates: { canonical: 'https://sirophp.com' },
  openGraph: {
    title: 'SiroPHP — The Fastest Feedback Loop for API Developers',
  description: 'Build APIs in minutes, not hours. Debug production bugs instantly with request replay. Zero dependencies, ~0.5ms cold boot (Linux+OPcache) / ~3ms (Windows), ~4MB+ RAM per request.',
    type: 'website',
    url: 'https://sirophp.com',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SiroPHP - Build fast. Debug faster.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SiroPHP — The Fastest Feedback Loop for API Developers',
    description: 'Build APIs in minutes, not hours. Debug production bugs instantly with request replay.',
    images: ['/og-image.png'],
  },
};

export default function Home() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is SiroPHP?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SiroPHP is a lightweight PHP API framework built for rapid development and instant debugging. It features minimal dependencies, CRUD scaffolding, full request tracing, and one-command production bug replay.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is SiroPHP different from Laravel?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SiroPHP has minimal dependencies vs Laravel\'s ~200 packages, ~0.5ms cold boot (Linux) vs 60-101ms, and ~4MB+ RAM vs ~84MB. It focuses on pure API development with built-in debugging workflow — no Blade, no asset compiling, no service providers.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I install SiroPHP?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Run "composer create-project sirosoft/api my-app" for a full project skeleton, or "composer require sirosoft/core" to add the framework engine to an existing project.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I build APIs fast with SiroPHP?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use "php siro make:crud products" to generate full CRUD endpoints with model, migration, controller, routes, and tests in 2 seconds. Then run "php siro serve" to start the dev server.',
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
          text: 'Yes. 19,496 tests with 100% pass rate, security audited (42 attack vectors, 0 vulnerabilities), and features like JWT auth, rate limiting, CSRF protection, brute force protection, env 5-tier chain, FrankenPHP support, and log sanitization.',
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-black">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <WhySiro />
      <CTA />
    </main>
  );
}
