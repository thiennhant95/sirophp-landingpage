import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Comprehensive documentation for SiroPHP — guides, API reference, architecture, security, and examples.',
  alternates: { canonical: 'https://sirophp.com/documentation' },
  openGraph: {
    title: 'Documentation — SiroPHP',
    description: 'Comprehensive documentation for SiroPHP — guides, API reference, architecture, security, and examples.',
    url: 'https://sirophp.com/documentation',
    siteName: 'SiroPHP',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Documentation — SiroPHP',
    description: 'Comprehensive documentation for SiroPHP — guides, API reference, architecture, security, and examples.',
  },
}

export default function DocumentationLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'SiroPHP Documentation',
    description: 'Comprehensive documentation for SiroPHP — guides, API reference, architecture, security, and examples.',
    url: 'https://sirophp.com/documentation',
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
