'use client'

import Link from 'next/link'
import DocSidebar from '@/components/DocSidebar'
import FadeIn from '@/components/FadeIn'
import { allApiRefs } from '@/docs-content/api'

export default function ApiIndex() {
  return (
    <main className="min-h-screen bg-black">
      <DocSidebar />
      <div className="lg:pl-72">
        <div className="pt-24 px-6 pb-4 border-b border-white/5">
          <div className="max-w-3xl mx-auto">
            <Link href="/documentation" className="text-cyan-400 hover:text-cyan-300 text-sm inline-flex items-center gap-1">← Documentation</Link>
          </div>
        </div>
        <section className="px-6 pb-32">
          <div className="max-w-3xl mx-auto">
            <header className="py-12">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4"><span className="mr-3">⚙️</span>API Reference</h1>
              <p className="text-xl text-gray-400">Complete API reference for all SiroPHP components.</p>
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
