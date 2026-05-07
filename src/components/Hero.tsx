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
            <span className="text-gray-300 text-sm">Lightweight API Framework</span>
          </div>
        </FadeIn>
              
        {/* Main heading - H1 for SEO */}
        <FadeIn delay={200}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Build APIs Fast.{' '}
            <span className="gradient-text">Debug Faster.</span>
          </h1>
        </FadeIn>
              
        <FadeIn delay={300}>
          <p className="text-lg sm:text-xl text-gray-400 mb-4 max-w-2xl mx-auto leading-relaxed">
            Generate full CRUD APIs in seconds. Replay real production requests. Fix bugs directly from your terminal.
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
            A lightweight PHP framework built for rapid API development and instant production debugging.
            Minimal dependencies. Full request tracing. php siro replay &lt;trace_id&gt;.
          </p>
        </FadeIn>
        
        {/* CTA Buttons */}
        <FadeIn delay={400}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
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
        </FadeIn>

        {/* CLI example - zero to API flow */}
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
