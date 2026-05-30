import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import DocPage from '@/components/DocPage'
import { allGuides, guideSlugs, guideOrder } from '@/docs-content/guides'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return guideSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = allGuides[slug]
  if (!doc) return {}
  return {
    title: `${doc.meta.title} — Guide`,
    description: doc.meta.description,
    alternates: { canonical: `https://sirophp.com/documentation/guides/${slug}` },
  }
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params
  const doc = allGuides[slug]
  if (!doc) notFound()

  const idx = guideOrder.indexOf(slug)
  const prevSlug = idx > 0 ? guideOrder[idx - 1] : null
  const nextSlug = idx < guideOrder.length - 1 ? guideOrder[idx + 1] : null

  return <DocPage
    doc={doc}
    prev={prevSlug ? { slug: `/documentation/guides/${prevSlug}`, title: allGuides[prevSlug].meta.title } : undefined}
    next={nextSlug ? { slug: `/documentation/guides/${nextSlug}`, title: allGuides[nextSlug].meta.title } : undefined}
  />
}
