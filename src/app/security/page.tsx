import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SecurityContent } from './SecurityContent';

export const metadata: Metadata = {
  title: 'Security - SiroPHP | Enterprise-Grade PHP Framework',
  description: 'Enterprise-grade security with 42 attack vectors tested, zero vulnerabilities. JWT auth, rate limiting, CSRF protection built-in.',
  openGraph: {
    title: 'SiroPHP Security - Zero Vulnerabilities Framework',
    description: '42 attack vectors verified. SQL injection, XSS, CSRF all blocked by default. Production-ready security.',
    url: 'https://sirophp.com/security',
    siteName: 'SiroPHP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SiroPHP Security - Zero Vulnerabilities Framework',
    description: '42 attack vectors verified. Zero vulnerabilities found. Enterprise-grade security for PHP.',
  },
};

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Navbar />
      <SecurityContent />
      <Footer />
    </div>
  );
}
