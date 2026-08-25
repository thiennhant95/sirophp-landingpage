import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BenchmarksContent } from './BenchmarksContent';

export const metadata: Metadata = {
  title: 'Benchmarks - SiroPHP | Performance Comparison',
  description: 'Blazing fast performance: 2.4ms cold boot (measured) / ~0.5ms OPcache (estimated), ~4MB+ baseline RAM (~30MB peak), ~360K routes/sec. Compare with Laravel and Symfony.',
  alternates: { canonical: '/benchmarks' },
  openGraph: {
    title: 'SiroPHP Benchmarks - Fastest PHP Framework',
    description: '2.4ms cold boot (measured) / ~0.5ms OPcache (estimated), minimal memory usage. See how SiroPHP compares with Laravel and Symfony.',
    url: 'https://sirophp.com/benchmarks',
    siteName: 'SiroPHP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SiroPHP Benchmarks - Fastest PHP Framework',
    description: '2.4ms cold boot (measured) / ~0.5ms OPcache (estimated), ~4MB+ baseline RAM (~30MB peak). PHP framework performance benchmarks.',
  },
};

export default function BenchmarksPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Benchmarks - SiroPHP | Performance Comparison',
  description: 'Blazing fast performance: 2.4ms cold boot (measured) / ~0.5ms OPcache (estimated), ~4MB+ baseline RAM (~30MB peak), ~360K routes/sec. Compare with Laravel and Symfony.',
  keywords: [
    'fastest php framework benchmark',
    'php framework performance comparison',
    'php framework cold boot time',
    'sirophp vs laravel performance',
    'php framework memory usage',
    'php micro framework speed',
    'laravel vs symfony vs sirophp',
    'route dispatch benchmark php',
  ],
    url: 'https://sirophp.com/benchmarks',
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <BenchmarksContent />
      <Footer />
    </div>
  );
}
