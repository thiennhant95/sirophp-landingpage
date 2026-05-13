import type { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'FAQ — Frequently Asked Questions | SiroPHP',
  description: 'Common questions about SiroPHP: installation, features, comparison with Laravel, production readiness, debugging workflow, and more.',
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
    a: 'SiroPHP is a lightweight PHP API framework built for rapid development and instant debugging. It features minimal dependencies, CRUD scaffolding, full request tracing, and one-command production bug replay.',
  },
  {
    q: 'How is SiroPHP different from Laravel?',
    a: 'SiroPHP has minimal dependencies vs Laravel\'s ~200 packages, <1ms cold boot vs 50-100ms, and ~2MB RAM vs 256MB. It focuses on pure API development with built-in debugging workflow — no Blade, no asset compiling, no service providers.',
  },
  {
    q: 'How do I install SiroPHP?',
    a: 'Run "composer create-project sirosoft/api my-app" for a full project skeleton, or "composer require sirosoft/core" to add the framework engine to an existing project.',
  },
  {
    q: 'How do I build APIs fast with SiroPHP?',
    a: 'Use "php siro make:crud products" to generate full CRUD endpoints with model, migration, controller, routes, and tests in 2 seconds. Then run "php siro serve" to start the dev server.',
  },
  {
    q: 'How does production debugging work?',
    a: 'Every response includes an X-Siro-Trace-Id header. Use "php siro replay <trace_id>" to reproduce the exact request, complete with headers, body, SQL queries, and timing.',
  },
  {
    q: 'Is SiroPHP production ready?',
    a: 'Yes. 1,436 tests with 100% pass rate (1005 core + 431 app), security audited (35+ attack vectors, 0 vulnerabilities), and features like JWT auth, rate limiting, CSRF protection, brute force protection, and log sanitization.',
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
    a: 'Yes. SiroPHP\'s patterns are Laravel-compatible: Models, QueryBuilder, Validation, Routes, and Middleware all follow similar conventions. Migration is straightforward without a full rewrite.',
  },
  {
    q: 'Does SiroPHP have authentication built in?',
    a: 'Yes. "php siro make:auth" generates a complete JWT authentication system with register, login, logout, refresh tokens, email verification, and forgot/reset password.',
  },
  {
    q: 'Can I generate API documentation automatically?',
    a: 'Yes. "php siro make:openapi" generates OpenAPI/Swagger documentation from your validation rules. "php siro make:postman" generates a Postman collection.',
  },
  {
    q: 'Is SiroPHP suitable for serverless deployment?',
    a: 'Yes. With <1ms cold boot and ~2MB memory usage, SiroPHP is ideal for serverless platforms like AWS Lambda, Vercel, and Laravel Vapor.',
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
