import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import DocPage from '@/components/DocPage'
import { standaloneDocs, standaloneSlugs, standaloneNav } from '@/docs-content/standalone'

interface Props {
  params: Promise<{ slug: string }>
}

const reservedSlugs = ['guides', 'api', 'conventions', 'examples']

export function generateStaticParams() {
  return standaloneSlugs
    .filter((s) => !reservedSlugs.includes(s))
    .map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = standaloneDocs[slug]
  if (!doc) return {}
  const cat = doc.meta.category === 'root' ? 'Guide' :
             doc.meta.category === 'convention' ? 'Convention' : 'Example'
  return {
    title: `${doc.meta.title} — ${cat}`,
    description: doc.meta.description,
    alternates: { canonical: `https://sirophp.com/documentation/${slug}` },
  }
}

export default async function StandalonePage({ params }: Props) {
  const { slug } = await params
  const doc = standaloneDocs[slug]
  if (!doc || reservedSlugs.includes(slug)) notFound()

  const nav = standaloneNav[slug] || {}
  const prev = nav.prev ? { slug: `/documentation/${nav.prev}`, title: standaloneDocs[nav.prev]?.meta?.title || '' } : undefined
  const next = nav.next ? { slug: `/documentation/${nav.next}`, title: standaloneDocs[nav.next]?.meta?.title || '' } : undefined

  return <DocPage doc={doc} prev={prev} next={next} />
}
