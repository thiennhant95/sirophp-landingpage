'use client'

import Link from 'next/link'
import DocSidebar from '@/components/DocSidebar'
import FadeIn from '@/components/FadeIn'
import { allGuides } from '@/docs-content/guides'

export default function GuidesIndex() {
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
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4"><span className="mr-3">📚</span>Guides</h1>
              <p className="text-xl text-gray-400">Step-by-step guides for building APIs with SiroPHP.</p>
            </header>
            <div className="space-y-4">
              {Object.entries(allGuides).map(([slug, doc], i) => (
                <FadeIn key={slug} delay={i * 50}>
                  <Link
                    href={`/documentation/guides/${slug}`}
                    className="block p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-cyan-500/30 transition-all group"
                  >
                    <h2 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors mb-1">
                      {doc.meta.title} →
                    </h2>
                    <p className="text-sm text-gray-500">{doc.meta.description}</p>
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
