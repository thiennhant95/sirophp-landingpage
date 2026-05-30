'use client'

import { useState, useRef, useEffect } from 'react'
import type { ContentBlock } from '@/docs-content/types'

interface DocContentProps {
  blocks: ContentBlock[]
  onHeadings?: (headings: { id: string; text: string; level: number }[]) => void
}

function renderInline(text: string): React.ReactNode {
  const regex = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(\[([^\]]+)\]\(([^)]+)\))/g
  const parts: React.ReactNode[] = []
  let last = 0, match, key = 0
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(<span key={key++}>{text.slice(last, match.index)}</span>)
    }
    if (match[1]) {
      parts.push(<code key={key++} className="text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded text-sm font-mono border border-amber-500/20">{match[1].slice(1, -1)}</code>)
    } else if (match[2]) {
      parts.push(<strong key={key++} className="text-white font-semibold">{match[2].slice(2, -2)}</strong>)
    } else if (match[3]) {
      parts.push(<em key={key++} className="text-gray-300 italic">{match[3].slice(1, -1)}</em>)
    } else if (match[4]) {
      parts.push(<a key={key++} href={match[6]} className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors" target={match[6].startsWith('http') ? '_blank' : undefined} rel="noreferrer">{match[5]}</a>)
    }
    last = match.index + match[0].length
  }
  if (last < text.length) {
    parts.push(<span key={key++}>{text.slice(last)}</span>)
  }
  return parts.length ? parts : text
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)
  useEffect(() => () => clearTimeout(timer.current), [])
  const copy = async () => {
    try { await navigator.clipboard.writeText(text) } catch {
      const ta = document.createElement('textarea')
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0'
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta)
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button onClick={copy} className={`absolute top-3 right-3 z-10 px-2.5 py-1.5 text-xs font-mono rounded-lg border transition-all duration-200 ${
      copied
        ? 'opacity-100 bg-green-500/20 text-green-400 border-green-500/30'
        : 'opacity-0 group-hover:opacity-100 bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
    }`}>
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-8 rounded-xl border border-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.04]">
            {headers.map((h, i) => (
              <th key={i} className="text-left px-5 py-3.5 font-semibold text-cyan-400 whitespace-nowrap text-xs uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}>
              {row.map((cell, j) => (
                <td key={j} className="px-5 py-3.5 text-gray-300 leading-relaxed">{renderInline(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  return (
    <div className="group my-8 rounded-xl overflow-hidden border border-white/10 bg-black/60 relative">
      {lang && (
        <div className="px-5 py-2 bg-white/[0.03] border-b border-white/10 text-xs text-gray-500 font-mono flex items-center justify-between">
          <span>{lang}</span>
        </div>
      )}
      <div className="relative">
        <CopyButton text={code} />
        <pre className="p-5 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-200 font-mono">{code}</code>
        </pre>
      </div>
    </div>
  )
}

function Note({ variant, title, text }: { variant: string; title?: string; text: string }) {
  const styles = {
    info: { border: 'border-blue-500/25', bg: 'bg-blue-500/[0.04]', text: 'text-blue-300', icon: '💡', accent: 'from-blue-500/20' },
    warn: { border: 'border-amber-500/25', bg: 'bg-amber-500/[0.04]', text: 'text-amber-300', icon: '⚠️', accent: 'from-amber-500/20' },
    tip: { border: 'border-emerald-500/25', bg: 'bg-emerald-500/[0.04]', text: 'text-emerald-300', icon: '✅', accent: 'from-emerald-500/20' },
    danger: { border: 'border-red-500/25', bg: 'bg-red-500/[0.04]', text: 'text-red-300', icon: '🚫', accent: 'from-red-500/20' },
  }
  const s = styles[variant as keyof typeof styles] || styles.info
  const paragraphs = text.split('\n\n').filter(Boolean)
  return (
    <div className={`my-8 p-5 rounded-xl border ${s.border} ${s.bg} bg-gradient-to-r ${s.accent} to-transparent`}>
      <div className="flex items-start gap-3.5">
        <span className="text-xl shrink-0 mt-0.5 leading-none">{s.icon}</span>
        <div className="space-y-2 min-w-0">
          {title && <strong className={`block text-sm ${s.text}`}>{title}</strong>}
          {paragraphs.map((p, i) => (
            <p key={i} className="text-sm text-gray-300 leading-relaxed">{renderInline(p)}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

function Heading({ level, id, text }: { level: 2 | 3; id: string; text: string }) {
  const Tag = level === 2 ? 'h2' : 'h3'
  const base = level === 2
    ? 'text-2xl font-bold text-white mt-14 mb-5 scroll-mt-24'
    : 'text-xl font-semibold text-white mt-10 mb-3 scroll-mt-24'
  return (
    <Tag id={id} className={`group flex items-center gap-2 ${base}`}>
      <span>{text}</span>
      <a href={`#${id}`} className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-cyan-400 transition-all text-lg -ml-1">
        #
      </a>
    </Tag>
  )
}

export default function DocContent({ blocks, onHeadings }: DocContentProps) {
  const headingRef = useRef<{ id: string; text: string; level: number }[]>([])

  if (onHeadings && headingRef.current.length === 0) {
    headingRef.current = blocks
      .filter((b): b is ContentBlock & { type: 'h2' | 'h3' } => b.type === 'h2' || b.type === 'h3')
      .map((b) => ({ id: b.id, text: (b as any).text, level: b.type === 'h2' ? 2 : 3 }))
    setTimeout(() => onHeadings(headingRef.current), 0)
  }

  return (
    <div className="space-y-1">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return <Heading key={i} level={2} id={block.id} text={block.text} />
          case 'h3':
            return <Heading key={i} level={3} id={block.id} text={block.text} />
          case 'p':
            return <p key={i} className="text-gray-300 leading-relaxed my-4 text-[15px]">{renderInline(block.text)}</p>
          case 'code':
            return <CodeBlock key={i} code={block.code} lang={block.lang} />
          case 'ul':
            return (
              <ul key={i} className="space-y-2 my-4">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-gray-300">
                    <span className="text-cyan-400 mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                    {Array.isArray(item) ? (
                      <div className="space-y-0.5">
                        <span>{renderInline(item[0])}</span>
                        <span className="block text-sm text-gray-500">{item[1]}</span>
                      </div>
                    ) : (
                      <span>{renderInline(item)}</span>
                    )}
                  </li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={i} className="space-y-1.5 my-4 ml-5 text-gray-300">
                {block.items.map((item, j) => (
                  <li key={j} className="list-decimal pl-1 marker:text-cyan-400">{renderInline(item)}</li>
                ))}
              </ol>
            )
          case 'note':
            return <Note key={i} variant={block.variant} title={block.title} text={block.text} />
          case 'table':
            return <Table key={i} headers={block.headers} rows={block.rows} />
          case 'hr':
            return <hr key={i} className="my-10 border-white/5" />
          default:
            return null
        }
      })}
    </div>
  )
}
