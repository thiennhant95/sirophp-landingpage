import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BenchmarksContent } from './BenchmarksContent';

export const metadata: Metadata = {
  title: 'Benchmarks - SiroPHP | Performance Comparison',
  description: 'Blazing fast performance: <1ms cold boot, ~2MB RAM per request, 500K+ routes/sec. Compare with Laravel and Symfony.',
  openGraph: {
    title: 'SiroPHP Benchmarks - Fastest PHP Framework',
    description: '<1ms boot time, minimal memory usage. See how SiroPHP outperforms Laravel and Symfony in performance tests.',
    url: 'https://sirophp.com/benchmarks',
    siteName: 'SiroPHP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SiroPHP Benchmarks - Fastest PHP Framework',
    description: '<1ms cold boot, ~2MB RAM. The fastest PHP framework for production.',
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
