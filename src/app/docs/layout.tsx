import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Docs — Quick Start & CLI Reference',
  description:
    'SiroPHP documentation hub: quick start, install, CLI reference (99 commands), and production debugging workflow. Build APIs fast, debug faster.',
  keywords: ['sirophp docs', 'siro cli commands', 'php api framework docs', 'sirophp quick start', 'php framework documentation'],
  alternates: { canonical: 'https://sirophp.com/docs' },
  openGraph: {
    title: 'SiroPHP Docs — Quick Start & CLI Reference',
    description:
      'SiroPHP documentation hub: quick start, install, CLI reference (99 commands), and production debugging workflow.',
    url: 'https://sirophp.com/docs',
    type: 'website',
  },
}

export default function MetaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
