'use client';

import Link from 'next/link';
import FadeIn from './FadeIn';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden" aria-label="Hero section">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent opacity-50" />
      
      <div className="relative max-w-5xl mx-auto text-center pt-20">
        {/* Badge */}
        <FadeIn delay={100}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
            <span className="text-cyan-400">⚡</span>
            <span className="text-gray-300 text-sm">API-First PHP Framework</span>
          </div>
        </FadeIn>
              
        {/* Main heading - H1 for SEO */}
        <FadeIn delay={200}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Debug Instantly.{' '}
            <span className="gradient-text">Built for Speed.</span>
          </h1>
        </FadeIn>
              
        <FadeIn delay={300}>
          <p className="text-lg sm:text-xl text-gray-400 mb-4 max-w-2xl mx-auto leading-relaxed">
            Trace every request. Replay real bugs. Test instantly from your terminal.
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Debug APIs in PHP with built-in request tracing, replay, and CLI testing. 
            Siro is a fast PHP framework designed for developers who need to debug production APIs quickly.
          </p>
        </FadeIn>
        
        {/* CTA Buttons */}
        <FadeIn delay={400}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <Link
              href="#get-started"
              className="px-6 py-3 bg-white text-black hover:bg-gray-100 font-semibold rounded-lg transition-all duration-200 text-sm w-full sm:w-auto"
            >
              Get Started
            </Link>
            <Link
              href="/docs"
              className="px-6 py-3 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold rounded-lg transition-all duration-200 text-sm w-full sm:w-auto"
            >
              View Docs
            </Link>
          </div>
        </FadeIn>

        {/* Command snippet */}
        <FadeIn delay={500}>
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
            <code className="text-gray-400 text-sm font-mono">
              <span className="text-cyan-400">composer</span> require sirosoft/core
            </code>
            <button className="text-gray-500 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
