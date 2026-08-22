import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SecurityContent } from './SecurityContent';

export const metadata: Metadata = {
  title: 'Security - SiroPHP | Security-Hardened PHP Framework',
  description: 'Security-hardened by default with 42 attack vectors tested, zero vulnerabilities. JWT auth, rate limiting, CSRF protection built-in.',
  alternates: { canonical: '/security' },
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
    description: '42 attack vectors verified. Zero vulnerabilities found. Security-hardened by default for PHP.',
  },
};

export default function SecurityPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Security - SiroPHP | Security-Hardened PHP Framework',
  description: 'Security-hardened by default with 42 attack vectors tested, zero vulnerabilities. JWT auth, rate limiting, CSRF protection built-in.',
  keywords: [
    'secure php api framework',
    'php security headers csp',
    'jwt rs256 php framework',
    'csrf protection php built-in',
    'php rate limiting security',
    'dast tested php framework',
    'bcrypt password hashing php',
  ],
    url: 'https://sirophp.com/security',
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <SecurityContent />
      <Footer />
    </div>
  );
}
