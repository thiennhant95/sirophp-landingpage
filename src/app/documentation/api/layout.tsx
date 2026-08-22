import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Reference — Every Class & Method',
  description:
    'SiroPHP API reference: Request, Response, Router, Model, Middleware, Validator, Queue, Mail, Cache, Storage and more — with code examples for every method.',
  alternates: { canonical: 'https://sirophp.com/documentation/api' },
  openGraph: {
    title: 'SiroPHP API Reference',
    description:
      'Full SiroPHP API reference with code examples: Request, Response, Router, Model, Middleware, Queue and more.',
    url: 'https://sirophp.com/documentation/api',
    type: 'website',
  },
}

export default function MetaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
