'use client'

import { useEffect, useRef, useState } from 'react'

interface SearchItem {
  id: string
  title: string
  desc: string
  commands: string[]
}

const searchableSections: SearchItem[] = [
  { id: 'quick-start', title: 'Quick Start', desc: 'From zero to running in 2 commands.', commands: ['composer create-project sirosoft/api my-app', 'cd my-app && php siro key:generate', 'php siro serve'] },
  { id: 'first-crud', title: 'First CRUD API', desc: 'Scaffold a complete CRUD in 2 seconds.', commands: ['php siro make:crud products', 'php siro migrate'] },
  { id: 'testing', title: 'Testing APIs', desc: 'Test endpoints right from your terminal.', commands: ['php siro t GET /api/products', 'php siro t POST /api/products name=Laptop price=999', 'php siro t POST /api/auth/login email=admin@test.com password=secret --as=admin', 'php siro t GET /api/products --as=admin --loop=50'] },
  { id: 'debugging', title: 'Debugging Workflow', desc: 'Find and fix bugs in seconds.', commands: ['php siro why', 'php siro replay a1b2c3d4', 'php siro fix', 'php siro log:trace a1b2c3d4', 'php siro log:slow --limit=10'] },
  { id: 'production-safety', title: 'Production Safety', desc: 'Safe debugging in production.', commands: ['php siro replay a1b2c3d4 --dry-run', 'php siro replay a1b2c3d4 --diff', 'php siro log:export --status=500 --format=json --output=errors.json', 'php siro doctor --prod'] },
  { id: 'openapi', title: 'OpenAPI + Postman', desc: 'API docs from your validation rules.', commands: ['php siro make:openapi --with-swagger', 'php siro make:postman'] },
  { id: 'deploy', title: 'Deploy', desc: 'Ship to production in one command.', commands: ['php siro deploy --init', 'php siro optimize', 'docker compose up -d'] },
  { id: 'real-examples', title: 'Real Examples', desc: 'Copy-paste working code.', commands: ['php siro make:auth', 'php siro make:crud orders', 'php siro make:service Payment', 'php siro make:job SendWelcomeEmail', 'php siro make:test ProductApi'] },
]

function fuzzyMatch(query: string, target: string): boolean {
  const q = query.toLowerCase().replace(/\s+/g, '')
  if (!q) return true
  const t = target.toLowerCase()
  let qi = 0
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (q[qi] === t[ti]) qi++
  }
  return qi === q.length
}

function getMatchingCommand(query: string, commands: string[]): string | null {
  if (!query) return null
  const q = query.toLowerCase()
  for (const cmd of commands) {
    if (cmd.toLowerCase().includes(q)) return cmd
  }
  return null
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
        setQuery('')
        setSelectedIndex(0)
      }
    }
    const handleCustom = () => {
      setOpen(true)
      setQuery('')
      setSelectedIndex(0)
    }
    window.addEventListener('keydown', handleKey)
    window.addEventListener('open-palette', handleCustom)
    return () => {
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('open-palette', handleCustom)
    }
  }, [])

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(id)
    }
  }, [open])

  const filtered = query
    ? searchableSections.filter((s) => {
        const searchText = `${s.title} ${s.desc} ${s.commands.join(' ')}`
        return fuzzyMatch(query, searchText)
      })
    : searchableSections

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (filtered.length > 0) {
        setSelectedIndex((i) => (i + 1) % filtered.length)
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      jumpTo(filtered[selectedIndex].id)
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] sm:pt-[12vh]" onClick={() => setOpen(false)}>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg mx-3 sm:mx-4 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 border-b border-white/10">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500 shrink-0">
            <circle cx="7" cy="7" r="5.5" />
            <line x1="11" y1="11" x2="14" y2="14" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search commands, topics..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0) }}
            onKeyDown={handleKey}
            className="flex-1 bg-transparent py-3.5 text-white placeholder-gray-500 outline-none text-sm"
          />
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-gray-400 hover:text-white transition shrink-0"
            aria-label="Close search"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="3" x2="13" y2="13" />
              <line x1="13" y1="3" x2="3" y2="13" />
            </svg>
          </button>
        </div>
        <div className="max-h-[50vh] sm:max-h-72 overflow-y-auto overscroll-contain p-2 space-y-0.5">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-8 text-sm">No results found</p>
          ) : (
            filtered.map((s, i) => {
              const matchedCmd = query ? getMatchingCommand(query, s.commands) : null
              return (
                <button
                  key={s.id}
                  onClick={() => jumpTo(s.id)}
                  className={`w-full text-left px-3 py-3.5 rounded-lg text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    i === selectedIndex
                      ? 'bg-cyan-500/10 text-cyan-400'
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <span className="font-medium">{s.title}</span>
                  {matchedCmd ? (
                    <span className="block text-cyan-500/70 text-xs mt-0.5 font-mono truncate">{matchedCmd}</span>
                  ) : (
                    <span className="text-gray-500 ml-2">{s.desc}</span>
                  )}
                </button>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
