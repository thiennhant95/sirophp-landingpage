import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found - 404 | SiroPHP',
  description: 'The page you are looking for does not exist. Return to SiroPHP homepage to debug APIs instantly.',
  robots: 'noindex, follow',
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Number */}
        <div className="text-8xl sm:text-9xl font-bold gradient-text mb-6">
          404
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved. 
          But don&apos;t worry, you can still debug APIs instantly with SiroPHP.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Go to Homepage
          </Link>
          <Link
            href="/blog"
            className="px-8 py-3 border border-white/20 text-gray-300 hover:text-white font-semibold rounded-lg hover:border-white/40 transition-all"
          >
            Read Blog
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-gray-500 text-sm mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link href="/#features" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Features
            </Link>
            <Link href="/#get-started" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Get Started
            </Link>
            <Link href="/tutorials" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Tutorials
            </Link>
            <Link href="https://github.com/SiroSoft/SiroPHP" className="text-cyan-400 hover:text-cyan-300 transition-colors" target="_blank" rel="noopener noreferrer">
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
