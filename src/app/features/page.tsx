import type { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Features — SiroPHP | Build Fast. Debug Faster.',
  description: 'Explore all SiroPHP features: CRUD scaffolding, CLI API testing, request replay, trace logging, OpenAPI docs, and more.',
  alternates: { canonical: 'https://sirophp.com/features' },
  openGraph: {
    title: 'Features — SiroPHP | Build Fast. Debug Faster.',
    description: 'Full-featured PHP API framework with CLI debugging, request replay, CRUD scaffolding, and production-safe tooling.',
    type: 'website',
    url: 'https://sirophp.com/features',
    siteName: 'SiroPHP',
  },
};

const featureGroups = [
  {
    icon: '⚡',
    title: 'Build',
    color: 'emerald',
    items: [
      'CRUD scaffolding — php siro make:crud generates model, migration, controller, routes, tests in 2 seconds',
      'CLI API testing — test endpoints from terminal with auto-auth, no Postman or cURL needed',
      'Auto OpenAPI/Swagger docs — generated from validation rules, always in sync',
      'Bash/Zsh tab completion for all CLI commands',
      'PHPStorm IDE helper with autocomplete and inline documentation',
    ],
  },
  {
    icon: '🔍',
    title: 'Why & Diagnose',
    color: 'blue',
    items: [
      'api:why <METHOD> <path> — debug specific request by method and path',
      'db:why <hash> [--slow] — EXPLAIN query analysis with index suggestions',
      'Full request tracing — X-Siro-Trace-Id on every response',
      'Log slow queries and endpoints — php siro log:slow --limit=10',
    ],
  },
  {
    icon: '🔄',
    title: 'Replay & Debug',
    color: 'purple',
    items: [
      'Production request replay — restore full context with php siro replay <trace_id>',
      'Diff comparison — --diff compares before/after performance metrics',
      'Edit workflow — --edit opens code in default editor for quick fixes',
      'Env override — --set key=val tests different configurations',
      'Dry-run mode — --dry-run previews without executing (safe in production)',
      'Test generation — --test creates a PHPUnit regression test from trace',
    ],
  },
  {
    icon: '🛡️',
    title: 'Production Safety',
    color: 'orange',
    items: [
      'Sensitive data auto-sanitized in logs',
      'Replay lock prevents accidental writes in production',
      'Penetration tested — 42 attack vectors, 0 vulnerabilities',
      'Brute force protection — auto lockout after 5 failed attempts',
      'JWT auth, rate limiting, CSRF protection built in',
    ],
  },
  {
    icon: '📊',
    title: 'Logging & Monitoring',
    color: 'cyan',
    items: [
      'Realtime log tailing — php siro log:tail -f',
      'Top slow requests — php siro log:top --limit=N',
      'Request statistics — php siro log:stats --days=N',
      'Log cleanup — php siro log:cleanup --days=N [--dry-run]',
      'Export to JSON or Postman format (--format=postman)',
      'Health check — php siro debug:health',
    ],
  },
  {
    icon: '📦',
    title: 'Infrastructure',
    color: 'green',
    items: [
      'Queue system — queue:work, queue:retry, queue:flush, queue:status',
      'Environment management — env:check, env:switch, 5-tier priority chain',
      'Route management — route:list, route:search, route:rules',
      'Migration tools — migrate:reset, migrate:refresh --seed',
      'Maintenance mode — php siro down / up',
      'Production readiness check — php siro doctor --prod',
    ],
  },
  {
    icon: '🪶',
    title: 'Performance',
    color: 'teal',
    items: [
      '~0.5ms cold boot (Linux+OPcache) / ~3ms (Windows)',
      '~4MB+ RAM per request — framework ~30MB peak, PHP baseline ~2MB',
      '~360K routes/sec — O(1) cached route matching',
      'Minimal dependencies — no supply chain risk',
      'FrankenPHP support — production Docker images included',
    ],
  },
  {
    icon: '🧪',
    title: 'Testing & Regression',
    color: 'pink',
    items: [
      'make:test --from-trace=<id> — auto-generate PHPUnit test from real trace',
      'test:regression [--limit=N] [--fail] — replay traces, detect regressions',
      'Run tests — php siro test [--filter] [--coverage]',
      '19,496 tests, 100% pass rate',
      'PHPStan Level Max with baseline',
    ],
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string }> = {
  emerald: { border: 'border-emerald-500/30', bg: 'bg-emerald-500/5', text: 'text-emerald-400' },
  blue: { border: 'border-blue-500/30', bg: 'bg-blue-500/5', text: 'text-blue-400' },
  purple: { border: 'border-purple-500/30', bg: 'bg-purple-500/5', text: 'text-purple-400' },
  orange: { border: 'border-orange-500/30', bg: 'bg-orange-500/5', text: 'text-orange-400' },
  cyan: { border: 'border-cyan-500/30', bg: 'bg-cyan-500/5', text: 'text-cyan-400' },
  green: { border: 'border-green-500/30', bg: 'bg-green-500/5', text: 'text-green-400' },
  teal: { border: 'border-teal-500/30', bg: 'bg-teal-500/5', text: 'text-teal-400' },
  pink: { border: 'border-pink-500/30', bg: 'bg-pink-500/5', text: 'text-pink-400' },
};

export default function FeaturesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Features — SiroPHP | Build Fast. Debug Faster.',
    description: 'Explore all SiroPHP features: CRUD scaffolding, CLI API testing, request replay, trace logging, OpenAPI docs, and more.',
    url: 'https://sirophp.com/features',
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <FadeIn>
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 text-sm mb-8 inline-block">&larr; Back to Home</Link>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            All Features<span className="text-cyan-400">.</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl">
            Not just a debug tool. Not just a micro-framework. The fastest feedback loop for API developers.
          </p>
        </FadeIn>

        <div className="space-y-12">
          {featureGroups.map((group, gi) => {
            const colors = colorMap[group.color];
            return (
              <FadeIn key={gi} delay={gi * 100}>
                <section>
                  <div className={`flex items-center gap-3 mb-6 pb-3 border-b ${colors.border}`}>
                    <span className="text-2xl">{group.icon}</span>
                    <h2 className={`text-2xl font-bold ${colors.text}`}>{group.title}</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {group.items.map((item, ii) => (
                      <div key={ii} className={`p-4 rounded-lg border ${colors.border} ${colors.bg} hover:bg-opacity-20 transition-colors`}>
                        <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </FadeIn>
            );
          })}
        </div>

        <section className="text-center mt-20">
          <FadeIn delay={800}>
            <h2 className="text-3xl font-bold mb-4">Ready to Build?</h2>
            <p className="text-gray-400 mb-8">Switch from guessing to knowing.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://github.com/SiroSoft/SiroPHP"
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Get Started on GitHub →
              </Link>
              <Link
                href="/docs"
                className="px-8 py-3 border border-white/20 text-gray-300 hover:text-white font-semibold rounded-lg hover:border-white/40 transition-all"
              >
                Read the Docs
              </Link>
            </div>
          </FadeIn>
        </section>
      </main>
      <Footer />
    </div>
  );
}
