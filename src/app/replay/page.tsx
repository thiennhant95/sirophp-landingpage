import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ReplayContent } from './ReplayContent';

export const metadata: Metadata = {
  title: 'Request Replay - SiroPHP | Debug Production Bugs',
  description: 'Capture, replay, and fix production bugs with confidence. CLI commands: --diff, --edit, --set, --dry-run for safe debugging.',
  openGraph: {
    title: 'SiroPHP Request Replay - Debug Production Bugs',
    description: 'Debug production issues without affecting live traffic. Replay requests with --diff comparison and --edit workflow.',
    url: 'https://sirophp.com/replay',
    siteName: 'SiroPHP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SiroPHP Request Replay - Debug Production Bugs',
    description: 'Capture failed requests, replay locally, compare performance. The smart way to debug PHP applications.',
  },
};

export default function ReplayPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Navbar />
      <ReplayContent />
      <Footer />
    </div>
  );
}
