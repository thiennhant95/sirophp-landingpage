'use client';

import Link from 'next/link';
import FadeIn from './FadeIn';
import { useState, useEffect } from 'react';

const demoSteps = [
    { cmd: '> php siro why', output: '🤖 AI analyzing your codebase...', delay: 800 },
    { cmd: '', output: '✓ Detected performance bottlenecks in 3 endpoints', delay: 600 },
    { cmd: '', output: '✓ Found N+1 query pattern in /api/users', delay: 600 },
    { cmd: '> php siro replay abc123 --diff', output: '▶ Comparing with baseline...', delay: 800 },
    { cmd: '', output: '✓ Response time: 245ms → 89ms (-64%)', delay: 400 },
    { cmd: '', output: '✓ Memory usage: 12MB → 4MB (-67%)', delay: 400 },
    { cmd: '> php siro replay abc123 --edit', output: '✏️ Opening in default editor...', delay: 600 },
  ];

export default function Hero() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < demoSteps.length - 1 ? prev + 1 : 0));
    }, 2000);
    
    return () => clearInterval(timer);
  }, []);

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
          <span className="text-emerald-400 text-sm font-semibold">19496 Tests</span>
        </div>
              
        {/* Main heading - H1 for SEO - CRITICAL: Must render immediately */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
          Build APIs in Minutes.{' '}
          <span className="gradient-text">Debug Instantly.</span>
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
          <a 
            href="https://github.com/SiroSoft/SiroPHP/blob/main/PERFORMANCE.md" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400/30 text-xs text-gray-300 transition-colors cursor-pointer"
          >
             🚀 ~360K Routes/sec
          </a>
          <a 
            href="https://github.com/SiroSoft/SiroPHP/blob/main/PERFORMANCE.md" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400/30 text-xs text-gray-300 transition-colors cursor-pointer"
          >
            ⚡ O(1) Cached Route Matching
          </a>
          <a 
            href="https://github.com/SiroSoft/SiroPHP/blob/main/PERFORMANCE.md" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400/30 text-xs text-gray-300 transition-colors cursor-pointer"
          >
            🔹 Negligible Middleware Overhead
          </a>
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
            View on GitHub →
          </Link>
        </div>

        {/* Live Demo Animation */}
        <FadeIn delay={500}>
          <div className="max-w-3xl mx-auto rounded-xl border border-white/10 bg-black/50 p-6 text-left mb-16">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs text-gray-500 ml-2">SiroPHP Terminal Demo</span>
            </div>
            <div className="font-mono text-sm space-y-2">
              {demoSteps.slice(0, currentStep + 1).map((step, idx) => (
                <div key={idx} className="animate-fade-in">
                  {step.cmd && (
                    <div className="text-cyan-400">
                      $ {step.cmd}
                    </div>
                  )}
                  {step.output && (
                    <div className="text-gray-300 pl-4">
                      {step.output}
                    </div>
                  )}
                </div>
              ))}
              <div className="animate-pulse text-cyan-400">$ <span className="inline-block w-2 h-4 bg-cyan-400 ml-1" /></div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
