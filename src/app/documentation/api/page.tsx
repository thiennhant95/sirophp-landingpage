'use client'

import Link from 'next/link'
import DocSidebar from '@/components/DocSidebar'
import FadeIn from '@/components/FadeIn'
import { allApiRefs } from '@/docs-content/api'

export default function ApiIndex() {
  return (
    <main className="min-h-screen bg-black lg:flex">
      <DocSidebar />
      <div className="flex-1 min-w-0">
        <section className="px-6 pt-20 pb-32">
          <div className="max-w-3xl mx-auto">
            <Link href="/documentation" className="text-cyan-400/70 hover:text-cyan-400 text-sm inline-flex items-center gap-1.5 mb-8 transition-colors">← Back to Documentation</Link>
            <header className="mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3"><span className="mr-3">⚙️</span>API Reference</h1>
              <p className="text-lg text-gray-400">Complete API reference for all SiroPHP components.</p>
            </header>
            <div className="grid sm:grid-cols-2 gap-4">
              {Object.entries(allApiRefs).map(([slug, doc], i) => (
                <FadeIn key={slug} delay={i * 30}>
                  <Link
                    href={`/documentation/api/${slug}`}
                    className="block p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-cyan-500/30 transition-all group"
                  >
                    <h2 className="font-semibold text-white group-hover:text-cyan-400 transition-colors mb-1">
                      {doc.meta.title} →
                    </h2>
                    <p className="text-xs text-gray-500">{doc.meta.description}</p>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
