import type { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'Privacy Policy | SiroPHP',
  description: 'SiroPHP privacy policy. Learn how we handle your data when using our open-source PHP framework and website.',
  robots: 'noindex, follow',
  alternates: { canonical: 'https://sirophp.com/privacy' },
  openGraph: {
    title: 'Privacy Policy | SiroPHP',
    description: 'SiroPHP privacy policy — how we handle your data.',
    type: 'website',
    url: 'https://sirophp.com/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 text-sm mb-8 inline-block">&larr; Back to Home</Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-gray-500 text-sm mb-8">Last updated: May 7, 2026</p>

          <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
            <h2 className="text-2xl font-bold text-white mt-10">Information We Collect</h2>
            <p>SiroPHP is an open-source framework. We do not collect data from your applications. This privacy policy applies only to the sirophp.com website.</p>
            <p>We may collect basic analytics data (page views, browser type) to improve the website experience. No personal information is collected unless you voluntarily provide it (e.g., via GitHub issues or email).</p>

            <h2 className="text-2xl font-bold text-white mt-10">Open Source Code</h2>
            <p>SiroPHP source code is publicly available on GitHub. We do not track, log, or monitor how you use the framework in your own projects.</p>

            <h2 className="text-2xl font-bold text-white mt-10">Cookies</h2>
            <p>This website does not use cookies for tracking. Any cookies used are strictly functional and do not collect personal data.</p>

            <h2 className="text-2xl font-bold text-white mt-10">Third-Party Services</h2>
            <p>This website may use third-party services (e.g., GitHub Pages, Vercel, or Packagist) for hosting and package distribution. These services have their own privacy policies.</p>

            <h2 className="text-2xl font-bold text-white mt-10">Contact</h2>
            <p>If you have questions about this privacy policy, please open an issue on our <a href="https://github.com/SiroSoft/SiroPHP" className="text-cyan-400 hover:text-cyan-300">GitHub repository</a>.</p>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
