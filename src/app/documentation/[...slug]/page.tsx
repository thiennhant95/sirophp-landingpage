import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import DocPage from '@/components/DocPage'
import { standaloneDocs, standaloneSlugs, standaloneNav } from '@/docs-content/standalone'

interface Props {
  params: Promise<{ slug: string[] }>
}

export function generateStaticParams() {
  return standaloneSlugs.map((slug) => ({ slug: slug.split('/') }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const slugStr = slug.join('/')
  const doc = standaloneDocs[slugStr]
  if (!doc) return {}
  const cat = doc.meta.category === 'root' ? 'Guide' :
             doc.meta.category === 'convention' ? 'Convention' : 'Example'
  return {
    title: `${doc.meta.title} — ${cat}`,
    description: doc.meta.description,
    alternates: { canonical: `https://sirophp.com/documentation/${slugStr}` },
  }
}

export default async function StandalonePage({ params }: Props) {
  const { slug } = await params
  const slugStr = slug.join('/')
  const doc = standaloneDocs[slugStr]
  if (!doc) notFound()

  const nav = standaloneNav[slugStr] || {}
  const prev = nav.prev ? { slug: `/documentation/${nav.prev}`, title: standaloneDocs[nav.prev]?.meta?.title || '' } : undefined
  const next = nav.next ? { slug: `/documentation/${nav.next}`, title: standaloneDocs[nav.next]?.meta?.title || '' } : undefined

  return <DocPage doc={doc} prev={prev} next={next} />
}
