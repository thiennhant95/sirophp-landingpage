import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Framework Guides — Auth, Database, Queue & More',
  description:
    'SiroPHP guides: JWT authentication, database & migrations, caching, events, file uploads, i18n, queue & mail, testing, validation, deployment.',
  keywords: ['sirophp guides', 'php jwt auth guide', 'sirophp database migration', 'php queue mail guide', 'sirophp deployment'],
  alternates: { canonical: 'https://sirophp.com/documentation/guides' },
  openGraph: {
    title: 'SiroPHP Framework Guides',
    description:
      'Guides for SiroPHP: JWT authentication, database, caching, events, uploads, i18n, queues, testing, validation, deployment.',
    url: 'https://sirophp.com/documentation/guides',
    type: 'website',
  },
}

export default function MetaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
