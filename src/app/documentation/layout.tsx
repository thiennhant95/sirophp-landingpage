import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documentation — Guides, API Reference & Examples',
  description:
    'Complete SiroPHP documentation: framework guides, full API reference, conventions, and real-world examples for building production PHP APIs.',
  keywords: ['sirophp documentation', 'php framework guides', 'sirophp api reference', 'php api conventions', 'learn sirophp'],
  alternates: { canonical: 'https://sirophp.com/documentation' },
  openGraph: {
    title: 'SiroPHP Documentation — Guides, API Reference & Examples',
    description:
      'Complete SiroPHP documentation: framework guides, full API reference, conventions, and real-world examples.',
    url: 'https://sirophp.com/documentation',
    type: 'website',
  },
}

export default function MetaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
