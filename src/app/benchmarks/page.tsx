import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BenchmarksContent } from './BenchmarksContent';

export const metadata: Metadata = {
  title: 'Benchmarks - SiroPHP | Performance Comparison',
  description: 'Blazing fast performance: ~3ms cold boot (Win) / ~0.5ms (Linux), ~4MB+ baseline RAM (~30MB peak), ~360K routes/sec. Compare with Laravel and Symfony.',
  openGraph: {
    title: 'SiroPHP Benchmarks - Fastest PHP Framework',
    description: '~3ms cold boot (Win) / ~0.5ms (Linux), minimal memory usage. See how SiroPHP compares with Laravel and Symfony.',
    url: 'https://sirophp.com/benchmarks',
    siteName: 'SiroPHP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SiroPHP Benchmarks - Fastest PHP Framework',
    description: '~3ms cold boot (Win) / ~0.5ms (Linux), ~4MB+ baseline RAM (~30MB peak). PHP framework performance benchmarks.',
  },
};

export default function BenchmarksPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Navbar />
      <BenchmarksContent />
      <Footer />
    </div>
  );
}
