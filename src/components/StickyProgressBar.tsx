'use client'

import { useEffect, useState } from 'react'

const sections = [
  { id: 'quick-start', label: 'Quick Start' },
  { id: 'first-crud', label: 'CRUD' },
  { id: 'testing', label: 'Test' },
  { id: 'debugging', label: 'Debug' },
  { id: 'production-safety', label: 'Production' },
  { id: 'openapi', label: 'OpenAPI' },
  { id: 'deploy', label: 'Deploy' },
  { id: 'real-examples', label: 'Examples' },
]

export default function StickyProgressBar() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('docs-hero')
    const heroObserver = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    if (hero) heroObserver.observe(hero)

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        let latest = -1
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sections.findIndex((s) => s.id === entry.target.id)
            if (idx !== -1 && idx > latest) latest = idx
          }
        }
        if (latest !== -1) setActiveIndex(latest)
      },
      { threshold: 0.2, rootMargin: '-60px 0px -55% 0px' }
    )

    for (const s of sections) {
      const el = document.getElementById(s.id)
      if (el) sectionObserver.observe(el)
    }

    return () => {
      heroObserver.disconnect()
      sectionObserver.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!visible) return null

  return (
    <div className="fixed top-16 lg:top-20 left-0 right-0 z-30 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-4xl mx-auto px-6 py-2 flex items-center gap-1 overflow-x-auto">
        {sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
            className={`text-xs whitespace-nowrap min-h-[44px] min-w-[44px] flex items-center justify-center px-3 py-1 rounded transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
              i === activeIndex
                ? 'text-cyan-400 bg-cyan-500/10'
                : i < activeIndex
                ? 'text-gray-500'
                : 'text-gray-600'
            }`}
          >
            {s.label}
          </button>
        ))}
        <div className="flex-1 h-1 bg-white/5 ml-2 relative min-w-[40px] rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300 rounded-full"
            style={{ width: `${((activeIndex + 1) / sections.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
