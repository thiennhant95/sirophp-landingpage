'use client'

import { useState } from 'react'

export default function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div
      className={`relative rounded-lg bg-black/60 border transition-all duration-200 cursor-pointer ${
        copied
          ? 'border-cyan-500/50 shadow-[0_0_12px_rgba(0,212,255,0.2)]'
          : 'border-white/10 hover:border-cyan-500/30'
      }`}
      onClick={handleCopy}
    >
      <pre className="font-mono text-sm text-cyan-300 px-4 py-3 overflow-x-auto pr-24 cursor-pointer select-text">
        <span className="text-gray-500 select-none">$ </span>{command}
      </pre>
      <div
        className={`absolute top-1/2 right-3 -translate-y-1/2 px-2.5 py-1 text-xs rounded border transition-all duration-200 ${
          copied
            ? 'opacity-100 scale-100 bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
            : 'opacity-0 scale-90 text-transparent border-transparent'
        }`}
      >
        {copied ? 'Copied!' : 'Copy'}
      </div>
    </div>
  )
}
