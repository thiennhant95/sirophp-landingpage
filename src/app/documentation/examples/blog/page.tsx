import type { Metadata } from 'next'
import DocPage from '@/components/DocPage'
import { allExamples } from '@/docs-content/examples'

export const metadata: Metadata = {
  title: 'Blog API Example',
  description: 'Complete blog API example built with SiroPHP.',
  alternates: { canonical: 'https://sirophp.com/documentation/examples/blog' },
}

export default function BlogExamplePage() {
  const doc = allExamples['blog']
  return <DocPage doc={doc} prev={{ slug: '/documentation/conventions/responses', title: 'Response Contract' }} next={{ slug: '/documentation/examples/ecommerce', title: 'E-Commerce API Example' }} />
}
