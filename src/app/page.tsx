import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import WhySiro from '@/components/WhySiro';
import Ecosystem from '@/components/Ecosystem';
import InstallSection from '@/components/InstallSection';
import CTA from '@/components/CTA';

export const metadata: Metadata = {
  title: 'SiroPHP — The Fastest Feedback Loop for API Developers',
    description: 'Build production-ready APIs in minutes. Understand production failures with full execution context — SQL, outbound HTTP, queued jobs. Fix bugs from your terminal.',
  keywords: [
    'sirophp',
    'php api framework',
    'fastest php framework',
    'build rest api php fast',
    'php crud generator',
    'request replay debugging php',
    'zero dependency php framework',
    'laravel alternative lightweight',
    'php framework with cli testing',
    'production debugging php api',
  ],
    alternates: { canonical: 'https://sirophp.com' },
  openGraph: {
    title: 'SiroPHP — The Fastest Feedback Loop for API Developers',
    description: 'Build production-ready APIs in minutes. Understand production failures with full execution context and fix bugs from your terminal.',
    type: 'website',
    url: 'https://sirophp.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SiroPHP — The Fastest Feedback Loop for API Developers',
    description: 'Build APIs in minutes, not hours. Debug production bugs instantly with request replay.',
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
           text: 'SiroPHP is a deterministic PHP API workflow built for rapid development and production debugging. It features minimal runtime dependencies, CRUD scaffolding, full request tracing, and one-command production bug replay.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is SiroPHP different from Laravel?',
        acceptedAnswer: {
          '@type': 'Answer',
           text: 'SiroPHP focuses on API development with a smaller runtime surface and an integrated debugging workflow. It provides conventions for routing, validation, resources, tracing, replay, and testing without requiring a large application stack.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I install SiroPHP?',
        acceptedAnswer: {
          '@type': 'Answer',
           text: 'Use the standalone installer on Windows, macOS, or Linux, or create a project with "composer create-project sirosoft/api my-app" when PHP and Composer are already installed.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I build APIs fast with SiroPHP?',
        acceptedAnswer: {
          '@type': 'Answer',
           text: 'Use "php siro make:crud products" to generate a module with model, migration, repository, service, resource, controller, routes, and feature tests. Then run "php siro migrate" and "php siro serve".',
        },
      },
      {
        '@type': 'Question',
        name: 'How does production debugging work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Every response includes an X-Siro-Trace-Id header. Traces capture request context including SQL queries, outbound HTTP calls, and queued jobs. Replay analyzes the trace for side-effect risks before execution — risky replays require explicit confirmation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is SiroPHP production ready?',
        acceptedAnswer: {
          '@type': 'Answer',
           text: 'SiroPHP is actively tested and ships with JWT auth, rate limiting, CSRF protection, brute-force protection, environment validation, log sanitization, and production health checks. Review the current release checks and security documentation before deploying.',
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
      <Ecosystem />
      <InstallSection />
      <CTA />
    </main>
  );
}
