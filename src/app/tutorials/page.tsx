import type { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'Tutorials — PHP API Development',
  description: 'Step-by-step tutorials for building APIs with SiroPHP. Learn CRUD scaffolding, authentication, debugging, and deployment.',
  keywords: [
    'sirophp tutorial',
    'php api tutorial for beginners',
    'php crud api tutorial step by step',
    'learn php rest api development',
    'php jwt authentication tutorial',
    'php framework deployment guide',
  ],
  alternates: { canonical: 'https://sirophp.com/tutorials' },
  openGraph: {
    title: 'Tutorials — PHP API Development',
    description: 'Step-by-step tutorials for building APIs with SiroPHP. Learn CRUD scaffolding, authentication, debugging, and deployment.',
    url: 'https://sirophp.com/tutorials',
    siteName: 'SiroPHP',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tutorials — PHP API Development',
    description: 'Step-by-step tutorials for building APIs with SiroPHP. Learn CRUD scaffolding, authentication, debugging, and deployment.',
  },
};

const tutorials = [
  {
    slug: 'build-api-under-1-hour',
    title: 'Build Your First API in Under 1 Hour',
    desc: 'From zero to production-ready CRUD API using SiroPHP scaffolding.',
    level: 'Beginner',
  },
  {
    slug: 'debug-production-bugs-minutes',
    title: 'Debug Production API Bugs in Minutes',
    desc: 'Master request replay and trace ID debugging workflow.',
    level: 'Intermediate',
  },
  {
    slug: 'master-cli-api-testing',
    title: 'Master CLI API Testing',
    desc: 'Test APIs from your terminal with auto-authentication and automation.',
    level: 'Intermediate',
  },
  {
    slug: 'how-to-debug-apis-in-php',
    title: 'How to Debug APIs in PHP',
    desc: 'Complete guide to request tracing, replay, and CLI testing.',
    level: 'Beginner',
  },
  {
    slug: 'php-api-testing-from-terminal',
    title: 'PHP API Testing from Terminal',
    desc: 'CLI-based testing workflow for PHP APIs.',
    level: 'Beginner',
  },
  {
    slug: 'request-replay-debug-production-bugs',
    title: 'Request Replay: Debug Production Bugs',
    desc: 'Eliminate guesswork with one-command production bug reproduction.',
    level: 'Advanced',
  },
];

export default function TutorialsPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 text-sm mb-8 inline-block">&larr; Back to Home</Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Tutorials</h1>
          <p className="text-gray-400 text-lg mb-12">Step-by-step guides for building and debugging APIs with SiroPHP.</p>
        </FadeIn>
        <div className="space-y-4">
          {tutorials.map((t, i) => (
            <FadeIn key={t.slug} delay={i * 50}>
              <Link href={`/blog/${t.slug}`} className="block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-400/30 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">{t.title}</h2>
                    <p className="text-gray-400 text-sm">{t.desc}</p>
                  </div>
                  <span className="shrink-0 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold">{t.level}</span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </main>
  );
}
