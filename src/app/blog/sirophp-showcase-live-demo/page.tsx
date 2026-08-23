import type { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'SiroPHP Showcase: A Live Full-Stack Demo You Can Click Right Now',
  description:
    'Stop reading feature lists. Click through the SiroPHP Showcase — a live full-stack demo with dashboard CRUD, API explorer, OpenAPI docs, a 14-topic Learn course and production-grade security. Demo login included.',
  keywords: [
    'sirophp showcase',
    'php framework live demo',
    'php api framework demo online',
    'try php framework without installing',
    'full stack php demo app',
    'laravel alternative demo',
    'php admin dashboard template live',
    'openapi explorer php',
  ],
  alternates: {
    canonical: 'https://sirophp.com/blog/sirophp-showcase-live-demo',
  },
  openGraph: {
    title: 'SiroPHP Showcase: A Live Full-Stack Demo You Can Click Right Now | SiroPHP',
    description:
      'A live full-stack SiroPHP demo: dashboard CRUD, API explorer, OpenAPI docs, 14-topic Learn course. Login with the demo account and click everything.',
    type: 'article',
    publishedTime: '2026-08-23',
    url: 'https://sirophp.com/blog/sirophp-showcase-live-demo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SiroPHP Showcase: A Live Full-Stack Demo You Can Click Right Now',
    description:
      'Dashboard CRUD, API explorer, OpenAPI docs, Learn course — all live. Demo login included.',
  },
};

const statsData = [
  { label: 'Backend tests', value: '651' },
  { label: 'Frontend tests', value: '472' },
  { label: 'E2E tests', value: '21' },
  { label: 'Learn topics', value: '14' },
];

export default function ShowcaseArticle() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'SiroPHP Showcase: A Live Full-Stack Demo You Can Click Right Now',
    description:
      'A live full-stack SiroPHP demo: dashboard CRUD, API explorer, OpenAPI docs, and a 14-topic Learn course. Login with the demo account and click everything.',
    author: {
      '@type': 'Organization',
      name: 'SiroPHP',
      url: 'https://sirophp.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SiroPHP',
      logo: {
        '@type': 'ImageObject',
        url: 'https://sirophp.com/opengraph-image.png',
      },
    },
    datePublished: '2026-08-23',
    dateModified: '2026-08-23',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://sirophp.com/blog/sirophp-showcase-live-demo',
    },
    keywords:
      'sirophp showcase, php framework live demo, php api framework demo online, try php framework without installing, full stack php demo app',
    articleSection: 'Product',
  };

  return (
    <main className="min-h-screen bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <nav className="mb-8 text-sm">
              <Link href="/blog" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Blog
              </Link>
              <span className="mx-2 text-gray-600">/</span>
              <span className="text-gray-500">Product</span>
            </nav>

            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              SiroPHP Showcase: A Live Full-Stack Demo You Can Click Right Now
            </h1>

            <div className="flex items-center gap-4 text-gray-400 text-sm mb-12">
              <span>August 23, 2026</span>
              <span>•</span>
              <span>6 min read</span>
              <span>•</span>
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400">
                Product
              </span>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Reading feature lists is boring. Installing a framework just to evaluate it is
                worse. So we built something better:{' '}
                <a
                  href="https://showcase.sirophp.com"
                  className="text-cyan-400 hover:underline font-semibold"
                  rel="noopener noreferrer"
                >
                  the SiroPHP Showcase
                </a>{' '}
                — a complete, <strong className="text-white">live full-stack application</strong>{' '}
                running on real infrastructure that you can log into and click through in the next
                60 seconds.
              </p>

              {/* CTA box */}
              <div className="not-prose my-8 rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-transparent p-6">
                <h2 className="text-xl font-bold text-white mb-3">
                  🚀 Try it now — no signup required
                </h2>
                <p className="text-gray-300 text-sm mb-4">
                  Open the demo, use the one-click demo credentials on the login page, and explore
                  every screen.
                </p>
                <a
                  href="https://showcase.sirophp.com"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition-colors"
                  rel="noopener noreferrer"
                >
                  Open showcase.sirophp.com →
                </a>
                <p className="text-gray-500 text-xs mt-3">
                  Demo login: <code className="text-cyan-300">admin@showcase.sirophp.com</code> /{' '}
                  <code className="text-cyan-300">Showcase2026!</code> (or click auto-fill on the
                  login page)
                </p>
              </div>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                What is inside the Showcase?
              </h2>

              <p className="text-gray-400 leading-relaxed mb-6">
                The <a href="https://showcase.sirophp.com" className="text-cyan-400 hover:underline">showcase application</a> is
                not a landing page with screenshots. It is a real product: a Next.js 16 frontend
                talking to a SiroPHP backend over JWT-authenticated APIs, deployed on Docker behind
                HTTPS.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">1. Business dashboard</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Full CRUD for Users, Products, Categories, Orders, Tags and Posts — with data
                tables, server-side pagination, search, empty/error states, toasts on every
                mutation, and an internationalized UI in five languages (English, Vietnamese,
                German, Chinese, Japanese).
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                2. Developer tools you normally never get
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-400 mb-6">
                <li>
                  <strong className="text-white">API Explorer</strong> — fire real authenticated
                  requests against the live backend from the browser
                </li>
                <li>
                  <strong className="text-white">OpenAPI viewer</strong> — the same spec that powers
                  generated TypeScript types
                </li>
                <li>
                  <strong className="text-white">Observability page</strong> — traces, slow queries
                  and health probes of the running system
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                3. A 14-topic interactive Learn course
              </h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Architecture, Routing, Validation, Auth, ORM,{' '}
                <strong className="text-white">Debugging &amp; Replay</strong>, Middleware,
                Security, Queue &amp; Mail, Caching, Events, i18n, Testing and Deployment — each
                topic pairs explanation with copy-pasteable code from the actual running app.
                Start with{' '}
                <a
                  href="https://showcase.sirophp.com/learn/debugging"
                  className="text-cyan-400 hover:underline"
                  rel="noopener noreferrer"
                >
                  Debugging &amp; Replay
                </a>{' '}
                — it is the workflow no other PHP framework ships.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                Production-grade, not demo-grade
              </h2>

              <p className="text-gray-400 leading-relaxed mb-6">
                The Showcase runs the same quality gates we hold the framework itself to. These
                numbers are measured, not marketing:
              </p>

              <div className="not-prose grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
                {statsData.map((s) => (
                  <div key={s.label} className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                    <div className="text-2xl font-bold text-cyan-400">{s.value}</div>
                    <div className="text-xs text-gray-400 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              <ul className="list-disc pl-5 space-y-2 text-gray-400 mb-6">
                <li>Zero known CVEs across backend and frontend dependencies</li>
                <li>CAPTCHA-protected login with one-time server-side tokens</li>
                <li>JWT rotation with token-theft detection on the API layer</li>
                <li>Isolated Docker deployment — MySQL, FrankenPHP, Next.js on a private network</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                From the Showcase to your project in 10 minutes
              </h2>

              <p className="text-gray-400 leading-relaxed mb-6">
                Everything you click in the{' '}
                <a href="https://showcase.sirophp.com" className="text-cyan-400 hover:underline">
                  live demo
                </a>{' '}
                maps 1:1 to what you generate locally. The fastest path:
              </p>

              <pre className="text-xs overflow-x-auto bg-[#0d1117] text-[#c9d1d9] p-4 rounded-lg mb-6">
                <code>{`# 1. Install SiroPHP
curl -sS https://sirophp.com/downloads/install.sh | bash

# 2. Scaffold auth + CRUD in seconds
php siro key:generate && php siro make:auth && php siro make:crud Product

# 3. Run
php siro migrate && php siro serve`}</code>
              </pre>

              <p className="text-gray-400 leading-relaxed mb-6">
                Then keep the{' '}
                <a href="/documentation" className="text-cyan-400 hover:underline">
                  documentation
                </a>{' '}
                open — its examples mirror the Showcase endpoints exactly.
              </p>

              <h2 className="text-2xl font-bold text-white mt-12 mb-4">FAQ</h2>

              <h3 className="font-semibold text-white mt-6 mb-2">Is the demo data safe to play with?</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Yes — it resets on redeploys, and destructive actions are expected. That is the
                point of a sandbox.
              </p>

              <h3 className="font-semibold text-white mt-6 mb-2">
                Can I see the source code of the Showcase?
              </h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Yes — the app lives in the{' '}
                <a
                  href="https://github.com/SiroSoft/Siro-Showcase"
                  className="text-cyan-400 hover:underline"
                  rel="noopener noreferrer"
                >
                  SiroSoft/Siro-Showcase repository
                </a>{' '}
                alongside the{' '}
                <a
                  href="https://github.com/SiroSoft/siro-core"
                  className="text-cyan-400 hover:underline"
                  rel="noopener noreferrer"
                >
                  core framework
                </a>
                .
              </p>

              <h3 className="font-semibold text-white mt-6 mb-2">
                Does this replace reading the docs?
              </h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                No — it replaces <em>guessing</em>. Use the Showcase to feel the workflow, then use
                the{' '}
                <Link href="/documentation" className="text-cyan-400 hover:underline">
                  guides and API reference
                </Link>{' '}
                when you build.
              </p>

              <div className="not-prose mt-10 p-6 rounded-xl border border-white/10 bg-white/5 text-center">
                <p className="text-white font-semibold mb-4">
                  60 seconds from now you could be clicking your next favorite framework.
                </p>
                <a
                  href="https://showcase.sirophp.com"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors"
                  rel="noopener noreferrer"
                >
                  Launch the SiroPHP Showcase →
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-4 justify-between items-center">
              <Link href="/blog" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                ← Back to all posts
              </Link>
              <Link
                href="/docs"
                className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
              >
                Read the Docs →
              </Link>
            </div>
          </FadeIn>
        </div>
      </article>
    </main>
  );
}
