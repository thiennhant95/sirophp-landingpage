'use client';

import Link from 'next/link';
import FadeIn from './FadeIn';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden" aria-label="Hero section">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent opacity-50" />
      
      <div className="relative max-w-5xl mx-auto text-center pt-20">
        {/* Badge - Render immediately, animate with CSS */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <span className="text-cyan-400">⚡</span>
          <span className="text-gray-300 text-sm">Lightweight API Framework</span>
          <span className="text-gray-600">|</span>
          <span className="text-emerald-400 text-sm font-semibold">19034 Tests</span>
        </div>
              
        {/* Main heading - H1 for SEO - CRITICAL: Must render immediately */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
          Build APIs Fast.{' '}
          <span className="gradient-text">Debug Faster.</span>
        </h1>
              
        <p className="text-lg sm:text-xl text-gray-400 mb-4 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
          Generate full CRUD APIs in minutes. Replay real production requests. Fix bugs directly from your terminal.
        </p>
        
        {/* Quick Install Command */}
        <div className="max-w-2xl mx-auto mb-6 p-4 rounded-lg border border-white/10 bg-black/30 opacity-0 animate-fade-in relative group" style={{ animationDelay: '350ms' }}>
          <code className="text-sm text-gray-300 pr-12">
            <span className="text-cyan-400">composer create-project</span> sirosoft/api my-app
          </code>
          <button
            onClick={() => navigator.clipboard.writeText('composer create-project sirosoft/api my-app')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/30 transition-all opacity-0 group-hover:opacity-100"
            title="Copy to clipboard"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 hover:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
        
        <p className="text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in" style={{ animationDelay: '400ms' }}>
          A lightweight PHP framework built for rapid API development and instant production debugging.
          Minimal dependencies. Full request tracing. php siro replay &lt;trace_id&gt;.
        </p>
        
        {/* Performance Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '450ms' }}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
            🚀 500K Routes/sec
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
            ⚡ O(1) Cached Route Matching
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
            🔹 Negligible Middleware Overhead
          </span>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 opacity-0 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <Link
            href="https://github.com/SiroSoft/SiroPHP"
            className="px-6 py-3 bg-white text-black hover:bg-gray-100 font-semibold rounded-lg transition-all duration-200 text-sm w-full sm:w-auto"
          >
            Get Started
          </Link>
          <Link
            href="https://github.com/SiroSoft/SiroPHP"
            className="px-6 py-3 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold rounded-lg transition-all duration-200 text-sm w-full sm:w-auto"
          >
            View on GitHub
          </Link>
        </div>

        {/* CLI example - Lazy load with Intersection Observer */}
        <FadeIn delay={500}>
          <div className="max-w-2xl mx-auto rounded-xl border border-white/10 bg-black/50 p-5">
            <pre className="font-mono text-sm text-left text-gray-400 whitespace-pre">
              <span className="text-gray-500"># Zero to API in 5 minutes</span>{'\n'}
              <span className="text-cyan-400">composer</span> create-project sirosoft/api my-app{'\n'}
              <span className="text-gray-500">cd</span> my-app{'\n'}
              <span className="text-cyan-400">php siro</span> make:crud products{'\n'}
              <span className="text-cyan-400">php siro</span> migrate{'\n'}
              <span className="text-cyan-400">php siro</span> serve{'  '}
              <span className="text-gray-500"># → localhost:8080</span>{'\n'}
            </pre>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
