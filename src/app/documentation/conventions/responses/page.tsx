import type { Metadata } from 'next'
import DocPage from '@/components/DocPage'
import { allConventions } from '@/docs-content/conventions'

export const metadata: Metadata = {
  title: 'API Response Contract — Convention',
  description: 'Standardized API response envelope format for SiroPHP.',
  alternates: { canonical: 'https://sirophp.com/documentation/conventions/responses' },
}

export default function ResponsesPage() {
  const doc = allConventions['responses']
  return <DocPage doc={doc} prev={{ slug: '/documentation/performance', title: 'Performance' }} next={{ slug: '/documentation/examples/blog', title: 'Blog API Example' }} />
}
