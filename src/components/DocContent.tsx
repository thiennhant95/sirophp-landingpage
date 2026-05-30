'use client'

import type { ContentBlock } from '@/docs-content/types'

interface DocContentProps {
  blocks: ContentBlock[]
}

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = []
  const regex = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)/g
  let last = 0
  let match
  let key = 0
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(<span key={key++}>{text.slice(last, match.index)}</span>)
    }
    if (match[1]) {
      parts.push(<code key={key++} className="text-cyan-300 bg-white/5 px-1.5 py-0.5 rounded text-sm font-mono">{match[1].slice(1, -1)}</code>)
    } else if (match[2]) {
      parts.push(<strong key={key++} className="text-white font-semibold">{match[2].slice(2, -2)}</strong>)
    } else if (match[3]) {
      parts.push(<em key={key++} className="text-gray-300 italic">{match[3].slice(1, -1)}</em>)
    }
    last = match.index + match[0].length
  }
  if (last < text.length) {
    parts.push(<span key={key++}>{text.slice(last)}</span>)
  }
  return parts.length ? parts : text
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-6 rounded-xl border border-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.04]">
            {headers.map((h, i) => (
              <th key={i} className="text-left px-4 py-3 font-semibold text-cyan-400 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`border-b border-white/5 last:border-0 hover:bg-white/[0.03] ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-gray-300">{renderInline(cell)}</td>
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
    <div className="my-6 rounded-xl overflow-hidden border border-white/10">
      {lang && (
        <div className="px-4 py-1.5 bg-white/5 border-b border-white/10 text-xs text-gray-500 font-mono">
          {lang}
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed text-gray-300 bg-black/40">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function Note({ variant, title, text }: { variant: string; title?: string; text: string }) {
  const colors = {
    info: { border: 'border-blue-500/30', bg: 'bg-blue-500/5', text: 'text-blue-300', icon: '💡' },
    warn: { border: 'border-yellow-500/30', bg: 'bg-yellow-500/5', text: 'text-yellow-300', icon: '⚠️' },
    tip: { border: 'border-green-500/30', bg: 'bg-green-500/5', text: 'text-green-300', icon: '✅' },
    danger: { border: 'border-red-500/30', bg: 'bg-red-500/5', text: 'text-red-300', icon: '🚫' },
  }
  const c = colors[variant as keyof typeof colors] || colors.info
  return (
    <div className={`my-6 p-4 rounded-xl border ${c.border} ${c.bg}`}>
      <div className="flex items-start gap-3">
        <span className="text-lg shrink-0">{c.icon}</span>
        <div>
          {title && <strong className={`block mb-1 text-sm ${c.text}`}>{title}</strong>}
          <p className="text-sm text-gray-400 leading-relaxed">{renderInline(text)}</p>
        </div>
      </div>
    </div>
  )
}

export default function DocContent({ blocks }: DocContentProps) {
  return (
    <div className="space-y-2">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return <h2 key={i} id={block.id} className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24">{block.text}</h2>
          case 'h3':
            return <h3 key={i} id={block.id} className="text-xl font-semibold text-white mt-8 mb-3 scroll-mt-24">{block.text}</h3>
          case 'p':
            return <p key={i} className="text-gray-400 leading-relaxed my-3">{renderInline(block.text)}</p>
          case 'code':
            return <CodeBlock key={i} code={block.code} lang={block.lang} />
          case 'ul':
            return (
              <ul key={i} className="space-y-1.5 my-3">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-gray-400">
                    <span className="text-cyan-400 mt-1.5 shrink-0">•</span>
                    {Array.isArray(item) ? (
                      <div className="space-y-1">
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
              <ol key={i} className="space-y-1.5 my-3 list-decimal list-inside text-gray-400">
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ol>
            )
          case 'note':
            return <Note key={i} variant={block.variant} title={block.title} text={block.text} />
          case 'table':
            return <Table key={i} headers={block.headers} rows={block.rows} />
          case 'hr':
            return <hr key={i} className="my-8 border-white/10" />
          default:
            return null
        }
      })}
    </div>
  )
}
