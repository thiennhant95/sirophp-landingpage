import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Docs',
  description: 'Build an API with auth in 5 minutes. 6 commands, zero bloat, instant debugging.',
  alternates: { canonical: 'https://sirophp.com/docs' },
  openGraph: {
    title: 'Docs — SiroPHP',
    description: 'Build an API with auth in 5 minutes. 6 commands, zero bloat, instant debugging.',
    url: 'https://sirophp.com/docs',
    siteName: 'SiroPHP',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Docs — SiroPHP',
    description: 'Build an API with auth in 5 minutes. 6 commands, zero bloat, instant debugging.',
  },
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'SiroPHP Documentation',
    description: 'Build an API with auth in 5 minutes. 6 commands, zero bloat, instant debugging.',
    url: 'https://sirophp.com/docs',
    about: {
      '@type': 'SoftwareApplication',
      name: 'SiroPHP',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Linux, macOS, Windows',
      description: 'Lightweight PHP API framework with CRUD scaffolding, CLI testing, and request replay debugging.',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
