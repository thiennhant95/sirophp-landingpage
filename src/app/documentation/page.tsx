'use client'

import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import DocSidebar from '@/components/DocSidebar'

const categories = [
  {
    title: 'Getting Started',
    icon: '🚀',
    color: 'from-cyan-500 to-blue-500',
    items: [
      { href: '/documentation/guides/quickstart', label: 'Quick Start', desc: 'Build an API in 5 minutes' },
      { href: '/documentation/workflow', label: 'Developer Workflow', desc: 'Zero to production workflow' },
      { href: '/documentation/guides/deployment', label: 'Deployment', desc: 'Ship to production' },
    ],
  },
  {
    title: 'Guides',
    icon: '📚',
    color: 'from-purple-500 to-pink-500',
    items: [
      { href: '/documentation/guides/authentication', label: 'Authentication', desc: 'JWT auth, RBAC, security' },
      { href: '/documentation/guides/database', label: 'Database', desc: 'Migrations, query builder, ORM' },
      { href: '/documentation/guides/caching', label: 'Caching', desc: 'File & Redis caching' },
      { href: '/documentation/guides/testing', label: 'Testing', desc: 'PHPUnit, HTTP tests, factories' },
      { href: '/documentation/guides/validation', label: 'Validation', desc: 'Input validation & rules' },
    ],
  },
  {
    title: 'API Reference',
    icon: '⚙️',
    color: 'from-green-500 to-teal-500',
    items: [
      { href: '/documentation/api/request', label: 'Request', desc: 'HTTP request handling' },
      { href: '/documentation/api/response', label: 'Response', desc: 'Response factories' },
      { href: '/documentation/api/router', label: 'Router', desc: 'Route definitions & middleware' },
      { href: '/documentation/api/model', label: 'Model', desc: 'ORM & relationships' },
      { href: '/documentation/api/middleware', label: 'Middleware', desc: 'Built-in & custom middleware' },
    ],
  },
  {
    title: 'Core Topics',
    icon: '📐',
    color: 'from-orange-500 to-red-500',
    items: [
      { href: '/documentation/architecture', label: 'Architecture', desc: 'ADR & design decisions' },
      { href: '/documentation/security', label: 'Security', desc: 'Security guide & best practices' },
      { href: '/documentation/performance', label: 'Performance', desc: 'Optimization & benchmarks' },
      { href: '/documentation/contributing', label: 'Contributing', desc: 'How to add a new module' },
    ],
  },
]

export default function DocumentationIndex() {
  return (
    <main className="min-h-screen bg-black lg:flex">
      <DocSidebar />

      <div className="flex-1 min-w-0">
        {/* Hero */}
        <section className="pt-24 lg:pt-28 pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <Link href="/" className="text-cyan-400 hover:text-cyan-300 text-sm mb-8 inline-block">← Back to Home</Link>
              <h1 className="text-5xl sm:text-6xl font-bold mb-4">
                SiroPHP <span className="gradient-text">Documentation</span>
              </h1>
              <p className="text-gray-400 text-xl max-w-2xl mb-8">
                Everything you need to build, test, and deploy APIs with SiroPHP.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Category Grid */}
        <section className="pb-32 px-6">
          <div className="max-w-4xl mx-auto space-y-16">
            {categories.map((cat, idx) => (
              <FadeIn key={cat.title} delay={idx * 100}>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span>{cat.icon}</span>
                    {cat.title}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {cat.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-cyan-500/30 transition-all"
                      >
                        <h3 className="text-white font-semibold group-hover:text-cyan-400 transition-colors mb-1">
                          {item.label} →
                        </h3>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Full Index */}
        <section className="pb-32 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto pt-16">
            <FadeIn>
              <h2 className="text-2xl font-bold text-white mb-8">Full Documentation Index</h2>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { href: '/documentation/guides/quickstart', label: 'Quick Start' },
                { href: '/documentation/workflow', label: 'Developer Workflow' },
                { href: '/documentation/guides/deployment', label: 'Deployment Guide' },
                { href: '/documentation/guides/authentication', label: 'Authentication' },
                { href: '/documentation/guides/database', label: 'Database Guide' },
                { href: '/documentation/guides/caching', label: 'Caching Guide' },
                { href: '/documentation/guides/events', label: 'Events Guide' },
                { href: '/documentation/guides/file-upload', label: 'File Upload Guide' },
                { href: '/documentation/guides/i18n', label: 'Internationalization' },
                { href: '/documentation/guides/migration', label: 'Migration Guide' },
                { href: '/documentation/guides/queue-mail', label: 'Queue & Mail' },
                { href: '/documentation/guides/testing', label: 'Testing Guide' },
                { href: '/documentation/guides/validation', label: 'Validation Guide' },
                { href: '/documentation/guides/api-versioning', label: 'API Versioning' },
                { href: '/documentation/api/request', label: 'Request API' },
                { href: '/documentation/api/response', label: 'Response API' },
                { href: '/documentation/api/router', label: 'Router API' },
                { href: '/documentation/api/model', label: 'Model API' },
                { href: '/documentation/api/middleware', label: 'Middleware API' },
                { href: '/documentation/api/validation', label: 'Validation API' },
                { href: '/documentation/api/container', label: 'Container API' },
                { href: '/documentation/api/config', label: 'Config API' },
                { href: '/documentation/api/collection', label: 'Collection API' },
                { href: '/documentation/api/helpers', label: 'Helpers' },
                { href: '/documentation/api/str', label: 'Str API' },
                { href: '/documentation/api/url', label: 'Url API' },
                { href: '/documentation/api/encryption', label: 'Encryption API' },
                { href: '/documentation/api/hash', label: 'Hash API' },
                { href: '/documentation/api/http', label: 'Http Client' },
                { href: '/documentation/api/logger', label: 'Logger API' },
                { href: '/documentation/api/session', label: 'Session API' },
                { href: '/documentation/api/storage', label: 'Storage API' },
                { href: '/documentation/api/uploaded-file', label: 'UploadedFile API' },
                { href: '/documentation/api/mail', label: 'Mail API' },
                { href: '/documentation/api/queue', label: 'Queue API' },
                { href: '/documentation/api/schedule', label: 'Schedule API' },
                { href: '/documentation/api/observers', label: 'Observers API' },
                { href: '/documentation/api/resource', label: 'Resource API' },
                { href: '/documentation/api/pagination', label: 'Pagination API' },
                { href: '/documentation/api/soft-deletes', label: 'SoftDeletes API' },
                { href: '/documentation/api/form-request', label: 'FormRequest API' },
                { href: '/documentation/api/cli', label: 'CLI Reference' },
                { href: '/documentation/api/console', label: 'Console API' },
                { href: '/documentation/api/debug', label: 'Debug API' },
                { href: '/documentation/api/metrics', label: 'Metrics API' },
                { href: '/documentation/api/lang', label: 'Lang API' },
                { href: '/documentation/api/testing', label: 'Testing API' },
                { href: '/documentation/architecture', label: 'Architecture ADR' },
                { href: '/documentation/security', label: 'Security Guide' },
                { href: '/documentation/performance', label: 'Performance' },
                { href: '/documentation/conventions/responses', label: 'Response Contract' },
                { href: '/documentation/examples/blog', label: 'Blog API Example' },
                { href: '/documentation/examples/ecommerce', label: 'E-Commerce Example' },
                { href: '/documentation/contributing', label: 'Contributing' },
                { href: '/documentation/release-notes', label: 'Release Notes' },
                { href: '/documentation/known-issues', label: 'Known Issues' },
              ].map((item) => (
                <FadeIn key={item.href}>
                  <Link
                    href={item.href}
                    className="block px-4 py-3 rounded-lg border border-white/5 hover:border-cyan-500/20 hover:bg-white/[0.03] text-gray-400 hover:text-cyan-400 text-sm transition-all"
                  >
                    {item.label}
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="p-8 sm:p-12 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/5 to-purple-500/5">
              <h2 className="text-3xl font-bold text-white mb-4">Ship your API now</h2>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                6 commands from zero to API with auth. No Laravel bloat. No config hell.
              </p>
              <Link
                href="https://github.com/SiroSoft/SiroPHP"
                className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Get Started on GitHub →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
