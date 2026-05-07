'use client'

interface NextSectionFooterProps {
  nextId?: string
  nextTitle?: string
}

export default function NextSectionFooter({ nextId, nextTitle }: NextSectionFooterProps) {
  if (!nextId || !nextTitle) return null

  const scrollTo = () => {
    document.getElementById(nextId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="mt-8 ml-0 sm:ml-16">
      <button
        onClick={scrollTo}
        className="group w-full flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/30 transition-all text-left"
      >
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Try this next</p>
          <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
            {nextTitle}
          </p>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-gray-500 group-hover:text-cyan-400 transition-colors shrink-0"
        >
          <line x1="4" y1="10" x2="16" y2="10" />
          <polyline points="11,6 16,10 11,14" />
        </svg>
      </button>
    </div>
  )
}
