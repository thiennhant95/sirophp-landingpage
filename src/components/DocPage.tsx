'use client'

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
  return (
    <main className="min-h-screen bg-black">
      <DocSidebar />

      <div className="lg:pl-72 min-h-screen">
        {/* Header + Breadcrumb */}
        <article className="px-6 pt-20 pb-32">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/documentation"
              className="text-cyan-400 hover:text-cyan-300 text-sm inline-flex items-center gap-1 mb-6 block"
            >
              ← Documentation
            </Link>

            <header className="mb-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {doc.meta.category === 'guide' ? 'Guide' :
                   doc.meta.category === 'api' ? 'API Reference' :
                   doc.meta.category === 'convention' ? 'Convention' :
                   doc.meta.category === 'example' ? 'Example' : 'Documentation'}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                {doc.meta.icon && <span className="mr-3">{doc.meta.icon}</span>}
                {doc.meta.title}
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl">{doc.meta.description}</p>
            </header>

            <DocContent blocks={doc.content} />

            {/* Prev / Next Navigation */}
            <nav className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
              <div>
                {prev && (
                  <Link
                    href={prev.slug}
                    className="group flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    <div>
                      <div className="text-xs text-gray-600">Previous</div>
                      <div className="text-sm font-medium">{prev.title}</div>
                    </div>
                  </Link>
                )}
              </div>
              <div>
                {next && (
                  <Link
                    href={next.slug}
                    className="group flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors text-right"
                  >
                    <div>
                      <div className="text-xs text-gray-600">Next</div>
                      <div className="text-sm font-medium">{next.title}</div>
                    </div>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </article>
      </div>
    </main>
  )
}
