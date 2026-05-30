'use client'

import { useState } from 'react'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import CopyCommand from '@/components/CopyCommand'
import FloatingSidebar from '@/components/FloatingSidebar'
import CommandPalette from '@/components/CommandPalette'
import StickyProgressBar from '@/components/StickyProgressBar'
import NextSectionFooter from '@/components/NextSectionFooter'
import { sections } from './sections'

export default function DocsPage() {
  const [commandsOnly, setCommandsOnly] = useState(false)

  return (
    <main className="min-h-screen bg-black">
      <FloatingSidebar />
      <CommandPalette />
      <StickyProgressBar />

      {/* Hero */}
      <section id="docs-hero" className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <Link href="/" className="text-cyan-400 hover:text-cyan-300 text-sm mb-8 inline-block">&larr; Back to Home</Link>
            <h1 className="text-5xl sm:text-6xl font-bold mb-4">
              SiroPHP <span className="gradient-text">Docs</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mb-6">
              Build an API with auth in 5 minutes. 6 commands, zero bloat, instant debugging.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <kbd
                onClick={() => window.dispatchEvent(new CustomEvent('open-palette'))}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-500 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:border-cyan-500/30 hover:text-cyan-400 transition-colors"
              >
                <span className="text-sm">⌘</span><span className="text-sm">K</span>
                <span className="mx-0.5 text-gray-600">→</span>
                <span>Search commands, topics</span>
              </kbd>
              <button
                onClick={() => setCommandsOnly((v) => !v)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                  commandsOnly
                    ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                    : 'text-gray-500 bg-white/5 border-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                {commandsOnly ? 'Show full docs' : 'Commands only'}
              </button>
            </div>
          </FadeIn>

          {!commandsOnly && (
            <FadeIn delay={100}>
              <div className="flex flex-wrap items-center gap-2 text-sm p-4 rounded-xl border border-white/10 bg-white/5 mb-16">
                <span className="text-cyan-400 font-semibold">Flow:</span>
                {['Start', 'Create API', 'Test', 'Why', 'Replay', 'Fix & Test', 'Regression', 'Deploy'].map((step, i) => (
                  <span key={step} className="flex items-center gap-2">
                    <span className="text-white">{step}</span>
                    {i < 7 && <span className="text-gray-600">→</span>}
                  </span>
                ))}
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Full Docs Link */}
      {!commandsOnly && (
        <section className="pb-8 px-6">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/documentation"
              className="group flex items-center justify-between p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/[0.03] hover:bg-cyan-500/[0.06] hover:border-cyan-500/40 transition-all"
            >
              <div>
                <span className="text-sm font-medium text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  Browse Full Documentation →
                </span>
                <p className="text-xs text-gray-500 mt-0.5">
                  Guides, API reference, architecture, security, and examples
                </p>
              </div>
              <svg className="w-5 h-5 text-cyan-400/50 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      )}

      {/* Docs Sections */}
      <section className="pb-32 px-6">
        <div className="max-w-4xl mx-auto space-y-16 sm:space-y-20">
          {sections.map((section, index) => (
            <FadeIn key={section.id} delay={index * 80}>
              <div id={section.id} className="scroll-mt-28">
                <div className={`flex items-start gap-4 ${commandsOnly ? 'mb-4' : 'mb-6'}`}>
                  <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-white/5 leading-none select-none shrink-0">
                    {section.num}
                  </span>
                  {!commandsOnly && (
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">{section.title}</h2>
                      <p className="text-gray-400">{section.desc}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-2 ml-0 sm:ml-16">
                  {section.commands.map((cmd) => (
                    <CopyCommand key={cmd} command={cmd} />
                  ))}
                </div>

                {!commandsOnly && section.note && (
                  <div className="mt-4 ml-0 sm:ml-16 p-4 rounded-lg border border-cyan-500/10 bg-cyan-500/5">
                    <p className="text-gray-400 text-sm leading-relaxed">{section.note}</p>
                  </div>
                )}

                {!commandsOnly && (
                  <NextSectionFooter nextId={section.nextId} nextTitle={section.nextTitle} />
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      {!commandsOnly && (
        <section className="pb-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="p-8 sm:p-12 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/5 to-purple-500/5">
              <h2 className="text-3xl font-bold text-white mb-4">Ship your API now</h2>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                6 commands from zero to API with auth. No Laravel bloat. No config hell.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="https://github.com/SiroSoft/SiroPHP"
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Get Started on GitHub →
                </Link>
                <Link
                  href="/"
                  className="px-8 py-3 border border-white/20 text-gray-300 hover:text-white font-semibold rounded-lg hover:border-white/40 transition-all"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
