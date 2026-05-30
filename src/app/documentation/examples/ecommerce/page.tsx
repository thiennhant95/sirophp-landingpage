import type { Metadata } from 'next'
import DocPage from '@/components/DocPage'
import { allExamples } from '@/docs-content/examples'

export const metadata: Metadata = {
  title: 'E-Commerce API Example',
  description: 'Complete e-commerce API example built with SiroPHP.',
  alternates: { canonical: 'https://sirophp.com/documentation/examples/ecommerce' },
}

export default function EcommerceExamplePage() {
  const doc = allExamples['ecommerce']
  return <DocPage doc={doc} prev={{ slug: '/documentation/examples/blog', title: 'Blog API Example' }} />
}
