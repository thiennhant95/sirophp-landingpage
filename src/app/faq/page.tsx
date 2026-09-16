import type { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'FAQ — Frequently Asked Questions | SiroPHP',
  description: 'Common questions about SiroPHP: installation, features, comparison with Laravel, production readiness, debugging workflow, and more.',
  keywords: [
    'sirophp faq',
    'is sirophp free',
    'sirophp vs laravel which better',
    'php framework production ready',
    'sirophp requirements php version',
    'how does request replay work',
  ],
  alternates: { canonical: 'https://sirophp.com/faq' },
  openGraph: {
    title: 'FAQ — Frequently Asked Questions | SiroPHP',
    description: 'Common questions about SiroPHP: installation, features, comparison with Laravel, production readiness, and debugging workflow.',
    type: 'website',
    url: 'https://sirophp.com/faq',
  },
};

const faqs = [
  {
    q: 'What is SiroPHP?',
     a: 'SiroPHP is a deterministic PHP API workflow built for rapid development and production debugging. It features minimal runtime dependencies, CRUD scaffolding, full request tracing, and one-command production bug replay.',
  },
  {
    q: 'How is SiroPHP different from Laravel?',
     a: 'SiroPHP focuses on API development with a smaller runtime surface and an integrated debugging workflow. It provides conventions for routing, validation, resources, tracing, replay, and testing without requiring a large application stack.',
  },
  {
    q: 'How do I install SiroPHP?',
    a: 'Run "composer create-project sirosoft/api my-app" for a full project skeleton, or "composer require sirosoft/core" to add the framework engine to an existing project.',
  },
  {
    q: 'How do I build APIs fast with SiroPHP?',
     a: 'Use "php siro make:crud products" to generate a module with model, migration, repository, service, resource, controller, routes, and feature tests. Then run "php siro migrate" and "php siro serve".',
  },
  {
    q: 'How does production debugging work?',
    a: 'Every response includes an X-Siro-Trace-Id header. Use "php siro replay <trace_id>" to reproduce the exact request, complete with headers, body, SQL queries, and timing.',
  },
  {
    q: 'Is SiroPHP production ready?',
     a: 'SiroPHP is actively tested and ships with JWT auth, rate limiting, CSRF protection, brute-force protection, environment validation, log sanitization, and production health checks. Review the current release checks and security documentation before deploying.',
  },
  {
    q: 'What databases does SiroPHP support?',
    a: 'MySQL, PostgreSQL, and SQLite. The Schema Builder generates driver-agnostic migrations — write once, run on any database.',
  },
  {
    q: 'Do I need to install PHP extensions?',
    a: 'SiroPHP requires PHP 8.2+ with PDO, JSON, Mbstring, OpenSSL, and cURL extensions. These are common and usually pre-installed.',
  },
  {
    q: 'Can I migrate from SiroPHP to Laravel later?',
     a: 'SiroPHP uses readable PHP and familiar API patterns. Moving to another framework still requires project-specific work, but generated code avoids a proprietary runtime lock-in.',
  },
  {
    q: 'Does SiroPHP have authentication built in?',
    a: 'Yes. "php siro make:auth" generates a complete JWT authentication system with register, login, logout, refresh tokens, email verification, and forgot/reset password.',
  },
  {
    q: 'Can I generate API documentation automatically?',
     a: 'Yes. "php siro make:openapi" generates an OpenAPI 3.0.3 document and optional Swagger UI. "php siro make:postman" generates a Postman collection.',
  },
  {
    q: 'Is SiroPHP suitable for serverless deployment?',
     a: 'SiroPHP has a small runtime footprint and can suit lightweight container or serverless-style deployments. Validate the platform runtime, database connection model, and queue requirements for your workload.',
  },
  {
    q: 'What is .env.local and how does env priority work?',
    a: 'SiroPHP uses a 5-tier environment priority chain: .env.local (highest) → .env.siro → .env.{environment} → .env → defaults. This allows safe local overrides without affecting team configs or production.',
  },
  {
    q: 'Does SiroPHP support FrankenPHP?',
    a: 'Yes. SiroPHP includes official Docker images with FrankenPHP for production deployment. FrankenPHP provides better performance than traditional PHP-FPM with automatic HTTPS, early hints, and real-time capabilities.',
  },
  {
    q: 'How does regression testing work with SiroPHP?',
    a: 'Run "php siro test:regression --limit=50" to replay all recorded traces and automatically detect changes in status codes, response structure, or success rates. Use --fail to exit non-zero on any regression (CI-friendly). This ensures your fix doesn&#39;t break existing behavior.',
  },
  {
    q: 'Can I create tests from real production bugs?',
    a: 'Yes. After replaying a bug with "php siro replay <trace_id> --test", SiroPHP auto-generates a PHPUnit test file from the actual production trace. This creates a permanent regression test for that bug — so it never comes back. Run "php siro make:test --from-trace=<id>" to do this from any trace.',
  },
];

export default function FAQPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <main className="min-h-screen bg-black">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <Link href="/" className="text-cyan-400 hover:text-cyan-300 text-sm mb-8 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-400 text-lg mb-12">Everything you need to know about SiroPHP.</p>
          </FadeIn>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FadeIn key={index} delay={index * 50}>
                <details className="group p-6 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-400/30 transition-all duration-300">
                  <summary className="flex items-center justify-between cursor-pointer text-white font-semibold">
                    <span>{faq.q}</span>
                    <span className="text-cyan-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-400 leading-relaxed">{faq.a}</p>
                </details>
              </FadeIn>
            ))}
          </div>

          <div className="mt-16 text-center p-8 rounded-xl border border-white/10 bg-white/5">
            <h2 className="text-2xl font-bold text-white mb-4">Still have questions?</h2>
            <p className="text-gray-400 mb-6">Open an issue on GitHub and we&apos;ll help you out.</p>
            <Link
              href="https://github.com/SiroSoft/SiroPHP/issues"
              className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Ask on GitHub →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
