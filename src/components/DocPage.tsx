'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import DocSidebar from '@/components/DocSidebar'
import DocContent from '@/components/DocContent'
import type { Doc } from '@/docs-content/types'

interface DocPageProps {
  doc: Doc
  prev?: { slug: string; title: string }
  next?: { slug: string; title: string }
}

export default function DocPage({ doc, prev, next }: DocPageProps) {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([])

  const onHeadings = useCallback((h: { id: string; text: string; level: number }[]) => {
    setHeadings(h)
  }, [])

  return (
    <main className="min-h-screen bg-black lg:flex">
      <DocSidebar />

      <div className="flex-1 min-w-0">
        <article className="px-4 sm:px-6 pt-16 lg:pt-20 pb-32">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/documentation"
              className="text-cyan-400/70 hover:text-cyan-400 text-sm inline-flex items-center gap-1.5 mb-8 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Documentation
            </Link>

            <header className="mb-12">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="text-xs font-semibold text-cyan-400/80 bg-cyan-500/[0.08] px-3 py-1 rounded-full border border-cyan-500/20 uppercase tracking-wider">
                  {doc.meta.category === 'guide' ? 'Guide' :
                   doc.meta.category === 'api' ? 'API Reference' :
                   doc.meta.category === 'convention' ? 'Convention' :
                   doc.meta.category === 'example' ? 'Example' : 'Documentation'}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
                {doc.meta.icon && <span className="mr-3">{doc.meta.icon}</span>}
                {doc.meta.title}
              </h1>
              <p className="text-[15px] text-gray-400 max-w-2xl leading-relaxed">{doc.meta.description}</p>
            </header>

            <DocContent blocks={doc.content} onHeadings={onHeadings} />

            {/* Prev / Next Navigation */}
            <nav className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 gap-4 sm:gap-8">
              <div>
                {prev && (
                  <Link
                    href={prev.slug}
                    className="group flex flex-col p-4 rounded-xl border border-white/[0.06] hover:border-cyan-500/25 hover:bg-cyan-500/[0.03] transition-all"
                  >
                    <span className="text-xs text-gray-600 mb-1 group-hover:text-cyan-400/60 transition-colors">
                      ← Previous
                    </span>
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                      {prev.title}
                    </span>
                  </Link>
                )}
              </div>
              <div className="text-right">
                {next && (
                  <Link
                    href={next.slug}
                    className="group flex flex-col p-4 rounded-xl border border-white/[0.06] hover:border-cyan-500/25 hover:bg-cyan-500/[0.03] transition-all"
                  >
                    <span className="text-xs text-gray-600 mb-1 group-hover:text-cyan-400/60 transition-colors">
                      Next →
                    </span>
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                      {next.title}
                    </span>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </article>

        {/* On This Page - TOC */}
        {headings.length > 0 && (
          <aside className="fixed top-20 right-8 w-56 hidden xl:block max-h-[calc(100vh-6rem)] overflow-y-auto pointer-events-none">
            <div className="border-l border-white/10 pl-4 pointer-events-auto">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">On this page</h4>
              <nav className="space-y-1.5">
                {headings.map((h) => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    className={`block transition-colors hover:text-cyan-400 ${
                      h.level === 2 ? 'text-gray-400 pl-0 text-sm' : 'text-gray-500 pl-4 text-xs'
                    }`}
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}
      </div>
    </main>
  )
}
