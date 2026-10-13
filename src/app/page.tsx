import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import WhySiro from '@/components/WhySiro';
import Ecosystem from '@/components/Ecosystem';
import InstallSection from '@/components/InstallSection';
import CTA from '@/components/CTA';
import { homeFaqs } from '@/lib/faq-home';

export const metadata: Metadata = {
  title: 'SiroPHP — The Fastest Feedback Loop for API Developers',
    description: 'Build production-ready APIs in minutes. See full failure context — SQL, HTTP, jobs — and fix bugs from your terminal.',
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
    mainEntity: homeFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
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
      <section aria-labelledby="home-faq-heading" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 id="home-faq-heading" className="text-3xl sm:text-4xl font-bold mb-4 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Quick answers — <Link href="/faq" className="text-cyan-400 hover:text-cyan-300">see all questions →</Link>
          </p>
          <div className="space-y-4">
            {homeFaqs.map((faq) => (
              <details
                key={faq.q}
                className="group p-6 rounded-xl border border-white/10 bg-white/5"
              >
                <summary className="cursor-pointer text-white font-semibold">
                  {faq.q}
                </summary>
                <p className="mt-4 text-gray-400 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </main>
  );
}
