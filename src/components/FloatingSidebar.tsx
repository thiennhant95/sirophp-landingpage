'use client'

import { useEffect, useState } from 'react'

const sidebarSections = [
  { num: '01', id: 'quick-start', title: 'Quick Start' },
  { num: '02', id: 'first-crud', title: 'CRUD API' },
  { num: '03', id: 'testing', title: 'Testing' },
  { num: '04', id: 'debugging', title: 'Debug Workflow' },
  { num: '05', id: 'production-safety', title: 'Production' },
  { num: '06', id: 'openapi', title: 'OpenAPI' },
  { num: '07', id: 'deploy', title: 'Deploy' },
  { num: '08', id: 'real-examples', title: 'Examples' },
]

export default function FloatingSidebar() {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('quick-start')

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { threshold: 0.2, rootMargin: '-80px 0px -55% 0px' }
    )

    for (const s of sidebarSections) {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-24 sm:top-28 left-3 sm:left-4 z-40 w-11 h-11 flex items-center justify-center rounded-lg bg-black/80 border border-white/10 text-white hover:border-cyan-500/50 transition-all backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        aria-label="Open sidebar"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="4" x2="15" y2="4" />
          <line x1="3" y1="9" x2="15" y2="9" />
          <line x1="3" y1="14" x2="15" y2="14" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
      )}

      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-black/95 border-r border-white/10 backdrop-blur-xl transform transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Sections</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-palette'))}
              className="text-xs text-gray-500 hover:text-cyan-400 transition-colors px-2 py-1 rounded hover:bg-white/5"
              aria-label="Search docs"
            >
              <span className="hidden sm:inline">⌘K</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="sm:hidden">
                <circle cx="7" cy="7" r="5.5" />
                <line x1="11" y1="11" x2="14" y2="14" />
              </svg>
            </button>
            <button
              onClick={() => setOpen(false)}
              className="w-11 h-11 flex items-center justify-center rounded hover:bg-white/10 text-gray-400 hover:text-white transition"
              aria-label="Close sidebar"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="3" x2="13" y2="13" />
                <line x1="13" y1="3" x2="3" y2="13" />
              </svg>
            </button>
          </div>
        </div>
        <nav className="p-3 space-y-1 overflow-y-auto overscroll-contain" style={{ height: 'calc(100% - 61px)' }}>
          {sidebarSections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`w-full text-left px-3 py-3.5 rounded-lg text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                activeId === s.id
                  ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-xs opacity-50 mr-2">{s.num}</span>
              {s.title}
            </button>
          ))}
        </nav>
      </div>
    </>
  )
}
