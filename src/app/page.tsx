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
    images: [{ url: 'https://sirophp.com/opengraph-image.png', width: 1200, height: 630, alt: 'SiroPHP — Build APIs in Minutes. Debug Instantly.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SiroPHP — The Fastest Feedback Loop for API Developers',
    description: 'Build APIs in minutes, not hours. Debug production bugs instantly with request replay.',
    images: ['https://sirophp.com/opengraph-image.png'],
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
      <section aria-label="Request lifecycle diagram" className="pb-8 px-6">
        <div className="max-w-5xl mx-auto">
          <img
            src="/sirophp-flow.svg"
            alt="SiroPHP request lifecycle: CLI request, full trace capture, and side-effect-aware replay"
            width={1200}
            height={420}
            loading="lazy"
            className="w-full rounded-2xl border border-white/10 bg-white/5"
          />
          <p className="mt-4 text-center text-sm text-gray-500">
            One trace captures routing, SQL, outbound HTTP and queued jobs — replay checks side effects before rerunning.
          </p>
        </div>
      </section>
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
          <div className="space-y-8">
            {homeFaqs.map((faq) => (
              <div key={faq.q} className="p-6 rounded-xl border border-white/10 bg-white/5">
                <h3 className="text-xl font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-sm text-gray-500 leading-relaxed">
            References: the HTTP semantics behind the API layer follow the{' '}
            <a href="https://en.wikipedia.org/wiki/Representational_state_transfer" className="text-cyan-400 hover:underline" rel="noopener">REST architectural style</a>{' '}
            and Google&apos;s{' '}
            <a href="https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" className="text-cyan-400 hover:underline" rel="noopener">structured data guidelines</a>.
          </p>
        </div>
      </section>
      <CTA />
    </main>
  );
}
