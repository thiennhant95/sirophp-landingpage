import type { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'SiroPHP vs Laravel: A Practical Comparison for Modern API Development',
  description: 'Compare SiroPHP and Laravel for API development. Performance benchmarks, dependency analysis, debugging workflow, and when to choose each framework.',
  keywords: [
    'sirophp vs laravel',
    'laravel alternative php',
    'lightweight php framework vs laravel',
    'php framework comparison',
    'api framework php',
    'laravel vs sirophp',
  ],
  alternates: {
    canonical: 'https://sirophp.com/blog/sirophp-vs-laravel-comparison',
  },
  openGraph: {
    title: 'SiroPHP vs Laravel: A Practical Comparison for Modern API Development | SiroPHP',
    description: 'Compare SiroPHP and Laravel for API development. Performance benchmarks, dependency analysis, debugging workflow, and when to choose each framework.',
    type: 'article',
    publishedTime: '2026-05-07',
    url: 'https://sirophp.com/blog/sirophp-vs-laravel-comparison',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SiroPHP vs Laravel: A Practical Comparison for Modern API Development | SiroPHP',
    description: 'Compare SiroPHP and Laravel for API development — performance, dependencies, debugging, and use cases.',
    images: ['/opengraph-image.png'],
  },
};

const comparisonData = [
  { feature: 'Dependencies', siro: '0', laravel: '~200 packages', winner: 'siro' },
  { feature: 'Cold Boot Time', siro: '~0.5ms (Linux)', laravel: '~60-101ms', winner: 'siro' },
  { feature: 'Memory per Request', siro: '~4MB+', laravel: '~84MB', winner: 'siro' },
  { feature: 'API Debugging', siro: 'Built-in trace + replay', laravel: 'Requires Telescope or 3rd party', winner: 'siro' },
  { feature: 'CRUD Scaffolding', siro: 'One command: make:crud', laravel: 'make:model -mcr', winner: 'siro' },
  { feature: 'Auth Boilerplate', siro: 'make:auth (10s)', laravel: 'Laravel Breeze/Jetstream + Sanctum', winner: 'siro' },
  { feature: 'CLI Testing', siro: 'Built-in api:test', laravel: 'Requires Pest/PHPUnit + Postman', winner: 'siro' },
  { feature: 'OpenAPI Docs', siro: 'Auto-generated from validation', laravel: 'Requires Spatie package', winner: 'siro' },
  { feature: 'Database Support', siro: 'MySQL, PostgreSQL, SQLite', laravel: 'MySQL, PostgreSQL, SQLite, SQL Server', winner: 'laravel' },
  { feature: 'ORM', siro: 'Lightweight Model layer', laravel: 'Eloquent (full-featured)', winner: 'laravel' },
  { feature: 'Queues', siro: 'Basic DB-based', laravel: 'Redis, SQS, Beanstalkd, Database', winner: 'laravel' },
  { feature: 'Ecosystem', siro: '0 packages', laravel: '10,000+ packages', winner: 'laravel' },
  { feature: 'Community', siro: 'Growing', laravel: '75k+ stars, millions of devs', winner: 'laravel' },
  { feature: 'Learning Curve', siro: 'Read core in 1 afternoon', laravel: 'Weeks to master', winner: 'siro' },
  { feature: 'View Layer', siro: 'Not included (API-only)', laravel: 'Blade, Livewire, Inertia', winner: 'laravel' },
];

export default function ComparisonArticle() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'SiroPHP vs Laravel: A Practical Comparison for Modern API Development',
    description: 'Compare SiroPHP and Laravel for API development. Performance benchmarks, dependency analysis, debugging workflow, and when to choose each framework.',
    image: 'https://sirophp.com/opengraph-image.png',
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
        url: 'https://sirophp.com/logo',
      },
    },
    datePublished: '2026-05-07',
    dateModified: '2026-05-07',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://sirophp.com/blog/sirophp-vs-laravel-comparison',
    },
    keywords: 'sirophp vs laravel, laravel alternative, lightweight php framework, php framework comparison',
    articleSection: 'Comparison',
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
              <Link href="/blog" className="text-gray-400 hover:text-cyan-400 transition-colors">Blog</Link>
              <span className="mx-2 text-gray-600">/</span>
              <span className="text-gray-500">Comparison</span>
            </nav>

            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              SiroPHP vs Laravel: A Practical Comparison for Modern API Development
            </h1>

            <div className="flex items-center gap-4 text-gray-400 text-sm mb-12">
              <span>May 7, 2026</span>
              <span>•</span>
              <span>10 min read</span>
              <span>•</span>
              <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400">Comparison</span>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                If you&apos;re building a PHP API today, you&apos;re likely considering Laravel. 
                It&apos;s the most popular PHP framework with a massive ecosystem. But is it always 
                the right choice?
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                <strong className="text-white">SiroPHP</strong> takes a different approach. It&apos;s a 
                lightweight PHP API framework with zero dependencies, built-in debugging, and 
                CLI-first workflow. It doesn&apos;t try to replace Laravel for every use case — it 
                excels where Laravel is overkill.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                This is an honest, practical comparison. No fanboyism. You&apos;ll see where each 
                framework shines and where it doesn&apos;t.
              </p>

              <div className="p-6 rounded-xl border border-white/10 bg-white/5 mb-12">
                <h2 className="text-xl font-bold text-white mb-4">Table of Contents</h2>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#head-to-head" className="hover:text-cyan-400 transition-colors">1. Head-to-Head Comparison</a></li>
                  <li><a href="#performance" className="hover:text-cyan-400 transition-colors">2. Performance & Resources</a></li>
                  <li><a href="#api-development" className="hover:text-cyan-400 transition-colors">3. API Development Speed</a></li>
                  <li><a href="#debugging" className="hover:text-cyan-400 transition-colors">4. Production Debugging</a></li>
                  <li><a href="#when-siro" className="hover:text-cyan-400 transition-colors">5. When to Choose SiroPHP</a></li>
                  <li><a href="#when-laravel" className="hover:text-cyan-400 transition-colors">6. When to Choose Laravel</a></li>
                  <li><a href="#migration" className="hover:text-cyan-400 transition-colors">7. Migrating from SiroPHP to Laravel</a></li>
                  <li><a href="#conclusion" className="hover:text-cyan-400 transition-colors">8. Conclusion</a></li>
                </ul>
              </div>

              <h2 id="head-to-head" className="text-3xl font-bold text-white mb-6">
                1. Head-to-Head Comparison
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Here&apos;s a data-driven comparison across 15 dimensions:
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-gray-400 font-medium py-3 pr-4">Feature</th>
                      <th className="text-left text-cyan-400 font-medium py-3 px-4">SiroPHP</th>
                      <th className="text-left text-orange-400 font-medium py-3 px-4">Laravel</th>
                      <th className="text-left text-gray-400 font-medium py-3 pl-4">Winner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 pr-4 text-white">{row.feature}</td>
                        <td className="py-3 px-4 text-gray-300">{row.siro}</td>
                        <td className="py-3 px-4 text-gray-300">{row.laravel}</td>
                        <td className="py-3 pl-4">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                            row.winner === 'siro' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-orange-500/10 text-orange-400'
                          }`}>
                            {row.winner === 'siro' ? 'SiroPHP' : 'Laravel'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-gray-400 leading-relaxed mb-8">
                <strong className="text-white">Score:</strong> SiroPHP wins 9/15 categories. 
                Laravel wins 6/15. But raw count doesn&apos;t tell the full story — the right 
                choice depends on your project.
              </p>

              <h2 id="performance" className="text-3xl font-bold text-white mb-4">
                2. Performance & Resources
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Performance differences are stark because of fundamentally different architectures:
              </p>

              <h3 className="text-2xl font-semibold text-white mb-3">Cold Boot Time</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                SiroPHP boots in <strong className="text-white">~0.5ms (Linux+OPcache)</strong> because it has zero 
                dependencies and no service container to warm up. Laravel takes 
                <strong className="text-white"> 60-101ms</strong> due to its ~200 packages, facades, 
                service providers, and configuration loading.
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                For serverless environments (Vercel, Laravel Vapor, AWS Lambda), this difference 
                matters. A 60-101ms cold start vs ~0.5ms can significantly impact your API response times 
                under variable load.
              </p>

              <h3 className="text-2xl font-semibold text-white mb-3">Memory Usage</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                SiroPHP uses <strong className="text-white">~4MB+ RAM per request</strong> (PHP baseline ~2MB, framework ~30MB peak). Laravel 
                uses <strong className="text-white">~84MB</strong>. On a $6/month VPS, SiroPHP can 
                handle hundreds of concurrent requests. Laravel struggles with even moderate traffic 
                on the same hardware.
              </p>

              <h3 className="text-2xl font-semibold text-white mb-3">Hosting Cost Impact</h3>
              <div className="p-6 rounded-xl border border-white/10 bg-white/5 mb-8">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-gray-400 font-medium py-2 pr-4">Metric</th>
                      <th className="text-left text-cyan-400 font-medium py-2 px-4">SiroPHP</th>
                      <th className="text-left text-orange-400 font-medium py-2 pl-4">Laravel</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 text-white">Min RAM</td>
                      <td className="py-2 px-4 text-gray-300">32MB</td>
                      <td className="py-2 pl-4 text-gray-300">~84MB</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 text-white">Monthly VPS</td>
                      <td className="py-2 px-4 text-gray-300">$6/month</td>
                      <td className="py-2 pl-4 text-gray-300">$60/month</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-white">Yearly Savings</td>
                      <td className="py-2 px-4 text-cyan-400 font-semibold">—</td>
                      <td className="py-2 pl-4 text-gray-300">$648/year</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 id="api-development" className="text-3xl font-bold text-white mb-4">
                3. API Development Speed
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Both frameworks can build APIs quickly, but the workflow differs:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5">
                  <h4 className="text-lg font-semibold text-cyan-400 mb-3">SiroPHP Workflow</h4>
                  <div className="text-gray-400 text-sm space-y-2">
                    <p><span className="text-white">1.</span> composer create-project sirosoft/api my-app</p>
                    <p><span className="text-white">2.</span> php siro make:auth (10s)</p>
                    <p><span className="text-white">3.</span> php siro make:crud products (2s)</p>
                    <p><span className="text-white">4.</span> php siro migrate</p>
                    <p><span className="text-white">5.</span> php siro serve</p>
                    <p className="text-cyan-400 mt-3">Total: ~5 minutes</p>
                  </div>
                </div>
                <div className="p-6 rounded-xl border border-orange-500/20 bg-orange-500/5">
                  <h4 className="text-lg font-semibold text-orange-400 mb-3">Laravel Workflow</h4>
                  <div className="text-gray-400 text-sm space-y-2">
                    <p><span className="text-white">1.</span> composer create-project laravel/laravel api</p>
                    <p><span className="text-white">2.</span> Install Sanctum, Breeze/Jetstream</p>
                    <p><span className="text-white">3.</span> Configure auth, generate scaffolding</p>
                    <p><span className="text-white">4.</span> php artisan make:model -mcr Product</p>
                    <p><span className="text-white">5.</span> Write routes, tests, Postman collection</p>
                    <p className="text-orange-400 mt-3">Total: ~1-2 hours</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed mb-8">
                The difference isn&apos;t that Laravel is slow — it&apos;s that SiroPHP is designed 
                for <strong className="text-white">API-only</strong> workflows. No Blade, no asset 
                compilation, no service providers. Just routes, controllers, and responses.
              </p>

              <h2 id="debugging" className="text-3xl font-bold text-white mb-4">
                4. Production Debugging
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                This is where SiroPHP differentiates itself most clearly:
              </p>

              <div className="p-6 rounded-xl border border-white/10 bg-black/50 mb-6">
                <pre className="font-mono text-sm text-cyan-400 whitespace-pre overflow-x-auto">
{`# SiroPHP: Debug a production bug in 30 seconds

# User reports 500 error → Extract trace ID from response
curl -v https://api.example.com/users
# X-Siro-Trace-Id: siro_a1b2c3d4

# View full trace with SQL queries
php siro log:trace siro_a1b2c3d4

# Replay the exact request locally
php siro replay a1b2c3d4

# Fix and verify
php siro fix
php siro replay --diff`}
                </pre>
              </div>

              <p className="text-gray-400 leading-relaxed mb-4">
                Laravel has <strong className="text-white">Laravel Telescope</strong> for local 
                debugging and paid services for production monitoring. But neither gives you 
                one-command request replay. You&apos;d need to manually reproduce the bug, add 
                logging, redeploy, and hope it happens again.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Every SiroPHP response includes <code className="text-cyan-400">X-Siro-Trace-Id</code> 
                automatically. This alone can turn a 2-hour debugging session into 5 minutes.
              </p>

              <h2 id="when-siro" className="text-3xl font-bold text-white mb-4">
                5. When to Choose SiroPHP
              </h2>
              <div className="space-y-4 mb-8">
                <div className="p-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5">
                  <h4 className="text-cyan-400 font-semibold mb-1">You&apos;re building a pure REST API</h4>
                  <p className="text-gray-400 text-sm">No views, no Blade, no Livewire. Just JSON in and JSON out.</p>
                </div>
                <div className="p-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5">
                  <h4 className="text-cyan-400 font-semibold mb-1">You&apos;re a solo dev or small team</h4>
                  <p className="text-gray-400 text-sm">Ship faster with less boilerplate. Read the entire framework in an afternoon.</p>
                </div>
                <div className="p-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5">
                  <h4 className="text-cyan-400 font-semibold mb-1">You need production debugging tools</h4>
                  <p className="text-gray-400 text-sm">Built-in trace ID, request replay, and CLI debugging without extra packages.</p>
                </div>
                <div className="p-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5">
                  <h4 className="text-cyan-400 font-semibold mb-1">Budget-constrained hosting</h4>
                  <p className="text-gray-400 text-sm">32MB RAM, $6/month VPS, zero dependencies — runs anywhere.</p>
                </div>
              </div>

              <h2 id="when-laravel" className="text-3xl font-bold text-white mb-4">
                6. When to Choose Laravel
              </h2>
              <div className="space-y-4 mb-8">
                <div className="p-4 rounded-lg border border-orange-500/20 bg-orange-500/5">
                  <h4 className="text-orange-400 font-semibold mb-1">You need a full-stack web application</h4>
                  <p className="text-gray-400 text-sm">Blade templates, Livewire, Inertia, or any view layer required.</p>
                </div>
                <div className="p-4 rounded-lg border border-orange-500/20 bg-orange-500/5">
                  <h4 className="text-orange-400 font-semibold mb-1">You need the ecosystem</h4>
                  <p className="text-gray-400 text-sm">Nova admin panel, Forge deployment, Vapor serverless, Spark billing.</p>
                </div>
                <div className="p-4 rounded-lg border border-orange-500/20 bg-orange-500/5">
                  <h4 className="text-orange-400 font-semibold mb-1">Enterprise multi-tenant</h4>
                  <p className="text-gray-400 text-sm">Laravel has battle-tested multi-tenancy packages and enterprise patterns.</p>
                </div>
                <div className="p-4 rounded-lg border border-orange-500/20 bg-orange-500/5">
                  <h4 className="text-orange-400 font-semibold mb-1">Your team already knows Laravel</h4>
                  <p className="text-gray-400 text-sm">If your team is productive in Laravel, don&apos;t switch for the sake of switching.</p>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-cyan-400/30 bg-cyan-500/5 mb-8">
                <p className="text-cyan-300 text-sm">
                  💡 <strong>Key Insight:</strong> These are not competitors. They serve different 
                  needs. Laravel is a full-stack framework with web tooling. SiroPHP is an API 
                  framework with debugging superpowers. Smart teams use both for different projects.
                </p>
              </div>

              <h2 id="migration" className="text-3xl font-bold text-white mb-4">
                7. Migrating from SiroPHP to Laravel
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                One concern developers have is lock-in. If you start with SiroPHP and your project 
                outgrows it, how hard is it to migrate?
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                <strong className="text-white">Surprisingly easy.</strong> SiroPHP&apos;s API patterns 
                were designed to be Laravel-compatible:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 mb-8 ml-4">
                <li>Models extend <code className="text-cyan-400">Model</code> with similar API (find, where, create, paginate)</li>
                <li>QueryBuilder methods are nearly identical</li>
                <li>Validation syntax is the same (<code className="text-cyan-400">required|email|unique:users</code>)</li>
                <li>Route definitions follow the same patterns</li>
                <li>Middleware uses the same <code className="text-cyan-400">handle($request, $next)</code> pattern</li>
              </ul>
              <p className="text-gray-400 leading-relaxed mb-8">
                If you ever need Laravel&apos;s ecosystem, your SiroPHP code translates naturally. 
                No rewrite from scratch.
              </p>

              <h2 id="conclusion" className="text-3xl font-bold text-white mb-4">
                8. Conclusion
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Laravel is an excellent framework. It&apos;s the right choice for full-stack web 
                applications, enterprise projects, and teams that need its ecosystem.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                SiroPHP is the right choice when you&apos;re building a pure API, need production 
                debugging tools out of the box, or want maximum performance on minimal hardware.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                The best part? You don&apos;t have to choose permanently. Start with SiroPHP for 
                rapid development. If your project grows beyond its scope, migrate to Laravel 
                without pain. You get speed now with an upgrade path later.
              </p>

              <div className="p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Try SiroPHP for Your Next API
                </h3>
                <p className="text-gray-400 mb-6">
                  Zero dependencies. Built-in debugging. Ships in minutes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="https://github.com/SiroSoft/SiroPHP"
                    className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Get Started on GitHub →
                  </Link>
                  <Link
                    href="https://packagist.org/packages/sirosoft/core"
                    className="px-8 py-3 border border-white/20 text-gray-300 hover:text-white font-semibold rounded-lg hover:border-white/40 transition-all"
                  >
                    View on Packagist
                  </Link>
                </div>
              </div>

              {/* Related: live demo */}
              <div className="my-10 p-5 rounded-lg border border-cyan-500/30 bg-cyan-500/5">
                <p className="text-sm text-gray-300">
                  🆕 Prefer clicking over reading? Explore the{' '}
                  <Link href="/blog/sirophp-showcase-live-demo" className="text-cyan-400 hover:underline font-semibold">
                    SiroPHP Showcase — a live full-stack demo
                  </Link>{' '}
                  you can log into right now, no install needed.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </article>
    </main>
  );
}
