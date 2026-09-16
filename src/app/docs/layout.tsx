import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Docs — SiroPHP API Framework',
  description: 'Build an API with auth in minutes using a focused command flow, traceable requests, and repeatable debugging.',
  keywords: [
    'sirophp docs',
    'php api documentation',
    'php crud scaffolding guide',
  ],
  alternates: { canonical: 'https://sirophp.com/docs' },
  openGraph: {
    title: 'Docs — SiroPHP API Framework',
    description: 'Build an API with auth in 5 minutes. Interactive documentation with command palette and copy-paste snippets.',
    url: 'https://sirophp.com/docs',
    siteName: 'SiroPHP',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Docs — SiroPHP API Framework',
    description: 'Build an API with auth in minutes using a focused command flow and traceable requests.',
  },
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
