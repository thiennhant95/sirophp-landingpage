'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarItem {
  slug: string
  title: string
  icon?: string
}

interface SidebarCategory {
  label: string
  icon: string
  items: SidebarItem[]
}

const categories: SidebarCategory[] = [
  {
    label: 'Getting Started',
    icon: '🚀',
    items: [
      { slug: '/documentation/guides/quickstart', title: 'Quick Start' },
      { slug: '/documentation/workflow', title: 'Dev Workflow' },
      { slug: '/documentation/guides/deployment', title: 'Deployment' },
    ],
  },
  {
    label: 'Guides',
    icon: '📚',
    items: [
      { slug: '/documentation/guides/authentication', title: 'Authentication' },
      { slug: '/documentation/guides/database', title: 'Database' },
      { slug: '/documentation/guides/caching', title: 'Caching' },
      { slug: '/documentation/guides/events', title: 'Events' },
      { slug: '/documentation/guides/file-upload', title: 'File Upload' },
      { slug: '/documentation/guides/i18n', title: 'I18n' },
      { slug: '/documentation/guides/migration', title: 'Migration' },
      { slug: '/documentation/guides/queue-mail', title: 'Queue & Mail' },
      { slug: '/documentation/guides/testing', title: 'Testing' },
      { slug: '/documentation/guides/validation', title: 'Validation' },
      { slug: '/documentation/guides/api-versioning', title: 'API Versioning' },
    ],
  },
  {
    label: 'API Reference',
    icon: '⚙️',
    items: [
      { slug: '/documentation/api/request', title: 'Request' },
      { slug: '/documentation/api/response', title: 'Response' },
      { slug: '/documentation/api/router', title: 'Router' },
      { slug: '/documentation/api/model', title: 'Model' },
      { slug: '/documentation/api/middleware', title: 'Middleware' },
      { slug: '/documentation/api/validation', title: 'Validation' },
      { slug: '/documentation/api/container', title: 'Container' },
      { slug: '/documentation/api/config', title: 'Config' },
      { slug: '/documentation/api/collection', title: 'Collection' },
      { slug: '/documentation/api/helpers', title: 'Helpers' },
      { slug: '/documentation/api/str', title: 'Str' },
      { slug: '/documentation/api/url', title: 'Url' },
      { slug: '/documentation/api/encryption', title: 'Encryption' },
      { slug: '/documentation/api/hash', title: 'Hash' },
      { slug: '/documentation/api/http', title: 'Http Client' },
      { slug: '/documentation/api/logger', title: 'Logger' },
      { slug: '/documentation/api/session', title: 'Session' },
      { slug: '/documentation/api/storage', title: 'Storage' },
      { slug: '/documentation/api/uploaded-file', title: 'UploadedFile' },
      { slug: '/documentation/api/mail', title: 'Mail' },
      { slug: '/documentation/api/queue', title: 'Queue' },
      { slug: '/documentation/api/schedule', title: 'Schedule' },
      { slug: '/documentation/api/observers', title: 'Observers' },
      { slug: '/documentation/api/resource', title: 'Resource' },
      { slug: '/documentation/api/pagination', title: 'Pagination' },
      { slug: '/documentation/api/soft-deletes', title: 'SoftDeletes' },
      { slug: '/documentation/api/form-request', title: 'FormRequest' },
      { slug: '/documentation/api/cli', title: 'CLI' },
      { slug: '/documentation/api/console', title: 'Console' },
      { slug: '/documentation/api/debug', title: 'Debug' },
      { slug: '/documentation/api/metrics', title: 'Metrics' },
      { slug: '/documentation/api/lang', title: 'Lang' },
      { slug: '/documentation/api/testing', title: 'Testing' },
      { slug: '/documentation/api/events', title: 'Events' },
    ],
  },
  {
    label: 'Architecture',
    icon: '📐',
    items: [
      { slug: '/documentation/architecture', title: 'ADR' },
    ],
  },
  {
    label: 'Security',
    icon: '🔒',
    items: [
      { slug: '/documentation/security', title: 'Security Guide' },
    ],
  },
  {
    label: 'Performance',
    icon: '⚡',
    items: [
      { slug: '/documentation/performance', title: 'Performance Guide' },
    ],
  },
  {
    label: 'Conventions',
    icon: '📝',
    items: [
      { slug: '/documentation/conventions/responses', title: 'Response Contract' },
    ],
  },
  {
    label: 'Examples',
    icon: '💡',
    items: [
      { slug: '/documentation/examples/blog', title: 'Blog API' },
      { slug: '/documentation/examples/ecommerce', title: 'E-Commerce' },
    ],
  },
  {
    label: 'Contributing',
    icon: '🤝',
    items: [
      { slug: '/documentation/contributing', title: 'Contributing Guide' },
    ],
  },
  {
    label: 'Release Notes',
    icon: '📋',
    items: [
      { slug: '/documentation/release-notes', title: 'Release Notes' },
    ],
  },
  {
    label: 'Known Issues',
    icon: '⚠️',
    items: [
      { slug: '/documentation/known-issues', title: 'Known Issues' },
    ],
  },
]

export default function DocSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const toggle = () => setOpen((v) => !v)

  const sidebar = (
    <div
      className={`fixed top-0 left-0 z-50 h-full w-72 bg-black/95 border-r border-white/10 backdrop-blur-xl transform transition-transform duration-300 overflow-y-auto ${
        open ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)]`}
    >
      <div className="p-4 border-b border-white/10 flex items-center justify-between lg:justify-start">
        <Link href="/documentation" className="text-sm font-semibold text-gray-400 uppercase tracking-wider hover:text-cyan-400 transition-colors">
          Documentation
        </Link>
        <button
          onClick={() => setOpen(false)}
          className="lg:hidden w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-gray-400 hover:text-white"
          aria-label="Close sidebar"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="2" y1="2" x2="12" y2="12" /><line x1="12" y1="2" x2="2" y2="12" />
          </svg>
        </button>
      </div>

      <div className="p-3">
        <input
          type="text"
          placeholder="Search docs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-gray-300 placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.08] transition-all"
        />
      </div>

      <nav className="p-3 space-y-4">
        {categories.map((cat) => {
          const filtered = cat.items.filter((i) =>
            i.title.toLowerCase().includes(search.toLowerCase()) ||
            cat.label.toLowerCase().includes(search.toLowerCase())
          )
          if (filtered.length === 0 && search) return null
          return (
            <div key={cat.label}>
              <div className="flex items-center gap-1.5 px-3 py-1.5">
                <span className="text-xs">{cat.icon}</span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{cat.label}</span>
              </div>
              <div className="space-y-0.5">
                {filtered.map((item) => {
                  const active = pathname === item.slug
                  return (
                    <Link
                      key={item.slug}
                      href={item.slug}
                      onClick={() => setOpen(false)}
                      className={`block px-3 py-2 rounded-lg text-sm transition-all ${
                        active
                          ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.title}
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}
      </nav>
    </div>
  )

  return (
    <>
      <button
        onClick={toggle}
        className="fixed top-24 left-3 z-40 w-11 h-11 flex items-center justify-center rounded-lg bg-black/80 border border-white/10 text-white hover:border-cyan-500/50 transition-all backdrop-blur-sm lg:hidden"
        aria-label="Open documentation sidebar"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="4" x2="15" y2="4" /><line x1="3" y1="9" x2="15" y2="9" /><line x1="3" y1="14" x2="15" y2="14" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)} />
      )}

      {sidebar}
    </>
  )
}
