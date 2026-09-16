import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SecurityContent } from './SecurityContent';

export const metadata: Metadata = {
  title: 'Security - SiroPHP | Security-Focused PHP API Workflow',
  description: 'Security-focused defaults with 42 security regression tests and no exploitable vulnerabilities identified in the tested scope.',
  alternates: { canonical: '/security' },
  openGraph: {
    title: 'SiroPHP Security - Tested API Security Controls',
    description: '42 security regression tests and defense-in-depth controls for SQL injection, XSS, CSRF, authentication, and more.',
    url: 'https://sirophp.com/security',
    siteName: 'SiroPHP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SiroPHP Security - Tested API Security Controls',
    description: 'Security regression tests and security-focused defaults for PHP APIs.',
  },
};

export default function SecurityPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Security - SiroPHP | Security-Hardened PHP Framework',
  description: 'Security-focused defaults with 42 security regression tests and no exploitable vulnerabilities identified in the tested scope.',
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
