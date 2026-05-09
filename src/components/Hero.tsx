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
          <span className="text-emerald-400 text-sm font-semibold">1277 Tests</span>
        </div>
              
        {/* Main heading - H1 for SEO - CRITICAL: Must render immediately */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
          Build APIs Fast.{' '}
          <span className="gradient-text">Debug Faster.</span>
        </h1>
              
        <p className="text-lg sm:text-xl text-gray-400 mb-4 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
          Generate full CRUD APIs in seconds. Replay real production requests. Fix bugs directly from your terminal.
        </p>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in" style={{ animationDelay: '350ms' }}>
          A lightweight PHP framework built for rapid API development and instant production debugging.
          Minimal dependencies. Full request tracing. php siro replay &lt;trace_id&gt;.
        </p>
        
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
