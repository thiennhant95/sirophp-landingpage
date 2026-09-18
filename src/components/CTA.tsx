'use client';

import Link from 'next/link';
import FadeIn from './FadeIn';

export default function CTA() {
  return (
    <section id="get-started" className="py-24 px-6 relative overflow-hidden" aria-label="Call to action">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent opacity-50" />
      
      <div className="relative max-w-4xl mx-auto text-center">
        <FadeIn>
          <div className="text-5xl mb-6">⚡</div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Build Fast. Debug Faster.
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
             Generate production-ready APIs, then understand and replay production failures with full execution context.
          </p>
        </FadeIn>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="https://github.com/SiroSoft/SiroPHP"
            className="px-8 py-4 bg-white text-black hover:bg-gray-100 font-semibold rounded-lg transition-all duration-200"
          >
             Create your first API →
          </Link>
          <Link
            href="https://packagist.org/packages/sirosoft/core"
            className="px-8 py-4 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold rounded-lg transition-all duration-200"
          >
            Just the engine? sirosoft/core
          </Link>
        </div>
        <div className="mt-8 flex items-center justify-center gap-4 text-gray-500 text-xs">
          <span>Open-source on GitHub</span>
          <span className="w-1 h-1 rounded-full bg-gray-600" />
          <span>MIT Licensed</span>
          <span className="w-1 h-1 rounded-full bg-gray-600" />
           <span>Open source · MIT licensed · Core v1.0.14</span>
        </div>
      </div>
    </section>
  );
}
