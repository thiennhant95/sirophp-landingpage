import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import DocPage from '@/components/DocPage'
import { allApiRefs, apiSlugs, apiOrder } from '@/docs-content/api'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return apiSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = allApiRefs[slug]
  if (!doc) return {}
  return {
    title: `${doc.meta.title} — API Reference`,
    description: doc.meta.description,
    alternates: { canonical: `https://sirophp.com/documentation/api/${slug}` },
  }
}

export default async function ApiPage({ params }: Props) {
  const { slug } = await params
  const doc = allApiRefs[slug]
  if (!doc) notFound()

  const idx = apiOrder.indexOf(slug)
  const prevSlug = idx > 0 ? apiOrder[idx - 1] : null
  const nextSlug = idx < apiOrder.length - 1 ? apiOrder[idx + 1] : null

  return <DocPage
    doc={doc}
    prev={prevSlug ? { slug: `/documentation/api/${prevSlug}`, title: allApiRefs[prevSlug].meta.title } : undefined}
    next={nextSlug ? { slug: `/documentation/api/${nextSlug}`, title: allApiRefs[nextSlug].meta.title } : undefined}
  />
}
