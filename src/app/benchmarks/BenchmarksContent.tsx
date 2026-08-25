'use client';

import React from 'react';
import FadeIn from '@/components/FadeIn';

export function BenchmarksContent() {
  return (
    <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <FadeIn delay={100}>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Performance<span className="text-cyan-400">.</span>
        </h1>
        <p className="text-xl text-gray-400 mb-12 max-w-3xl">
          Blazing fast performance with minimal resource usage. Built for production at scale.
        </p>
      </FadeIn>

      {/* Key Metrics — Measured numbers only */}
      <section className="mb-20">
        <FadeIn delay={200}>
          <h2 className="text-3xl font-bold mb-8">Key Performance Metrics</h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          <FadeIn delay={300}>
            <div className="bg-gradient-to-br from-cyan-900/20 to-cyan-800/10 border border-cyan-500/30 rounded-lg p-6">
              <div className="text-5xl font-bold text-cyan-400 mb-2">361K</div>
              <div className="text-sm text-gray-400 mb-2">Static Route Dispatch (ops/sec)</div>
              <div className="text-xs text-gray-500">O(1) hash lookup. Measured with benchmark.php, 1000 iterations.</div>
            </div>
          </FadeIn>

          <FadeIn delay={400}>
            <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-500/30 rounded-lg p-6">
              <div className="text-5xl font-bold text-purple-400 mb-2">2.4ms</div>
              <div className="text-sm text-gray-400 mb-2">Measured Cold Boot</div>
              <div className="text-xs text-gray-500">Windows 11, PHP 8.2.30, OPcache off. Boot happens once per worker.</div>
            </div>
          </FadeIn>

          <FadeIn delay={500}>
            <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-500/30 rounded-lg p-6">
              <div className="text-5xl font-bold text-green-400 mb-2">~4 MB</div>
              <div className="text-sm text-gray-400 mb-2">Framework Memory Baseline</div>
              <div className="text-xs text-gray-500">Zero Composer dependencies loaded.</div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={600}>
          <p className="text-xs text-gray-600 mt-4 text-center">
            All metrics measured on AMD Ryzen 7 5800X, 32GB DDR4, Windows 11, PHP 8.2.30. See methodology below.
          </p>
        </FadeIn>
      </section>

      {/* Component Benchmarks — Measured microbenchmarks */}
      <section className="mb-20">
        <FadeIn delay={700}>
          <h2 className="text-3xl font-bold mb-4">Component Microbenchmarks</h2>
          <p className="text-gray-400 mb-8 max-w-3xl">
            Framework overhead only — no middleware, no database, no network I/O. These measure how fast each component runs in isolation.
          </p>
        </FadeIn>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Component</th>
                <th className="text-right py-4 px-6 text-cyan-400 font-medium">Ops/sec</th>
                <th className="text-right py-4 px-6 text-gray-400 font-medium">Avg Time</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">What it measures</th>
              </tr>
            </thead>
            <tbody>
              {[
                { component: 'Route dispatch (static)', ops: '369,855', time: '0.0027ms', desc: 'Hash lookup + handler call' },
                { component: 'Route dispatch (dynamic)', ops: '297,173', time: '0.0034ms', desc: 'Regex + param extraction' },
                { component: 'Middleware (5 layers)', ops: '164,447', time: '0.0061ms', desc: '5 closures chained' },
                { component: 'Full-stack (warm)', ops: '403,608', time: '0.0025ms', desc: 'Route + middleware + response' },
                { component: 'Container resolution', ops: '1,861,074', time: '0.0005ms', desc: 'DI container make()' },
                { component: 'JSON response', ops: '3,787,523', time: '0.0003ms', desc: 'JSON encode + headers' },
              ].map((row, index) => (
                <tr key={index} className="border-b border-gray-800/50 hover:bg-gray-900/30 transition-colors">
                  <td className="py-3 px-6 text-gray-300">{row.component}</td>
                  <td className="py-3 px-6 text-right text-cyan-400 font-mono">{row.ops}</td>
                  <td className="py-3 px-6 text-right text-gray-400 font-mono">{row.time}</td>
                  <td className="py-3 px-6 text-gray-500 text-sm">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-600 mt-3">
          ⚠ These are in-process microbenchmarks, not HTTP throughput through Nginx/PHP-FPM/network.
          Real-world requests/sec depends on your infrastructure.
        </p>
      </section>

      {/* Cold Boot */}
      <section className="mb-20">
        <FadeIn delay={800}>
          <h2 className="text-3xl font-bold mb-4">Cold Boot</h2>
          <p className="text-gray-400 mb-8 max-w-3xl">
            Time to first request after process start. Boot happens once per PHP-FPM worker or FrankenPHP process.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          <FadeIn delay={900}>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-500/20 text-green-400 border border-green-500/30">Measured</span>
              </div>
              <div className="text-4xl font-bold text-cyan-400 mb-2">2.4 ms</div>
              <div className="text-sm text-gray-400">Windows 11, OPcache off</div>
              <div className="text-xs text-gray-500 mt-2">AMD Ryzen 7 5800X, PHP 8.2.30, min 1.83ms / max 4.12ms</div>
            </div>
          </FadeIn>

          <FadeIn delay={1000}>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">Estimated</span>
              </div>
              <div className="text-4xl font-bold text-purple-400 mb-2">~0.5 ms</div>
              <div className="text-sm text-gray-400">Linux + OPcache (production)</div>
              <div className="text-xs text-gray-500 mt-2">Estimated from framework load profile. Not directly measured.</div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Design Philosophy — Qualitative, no misleading numbers */}
      <section className="mb-20">
        <FadeIn delay={800}>
          <h2 className="text-3xl font-bold mb-4">Design Philosophy</h2>
          <p className="text-gray-400 mb-8 max-w-3xl">
            Every framework makes trade-offs. Here&apos;s where SiroPHP deliberately differs.
          </p>
        </FadeIn>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Aspect</th>
                <th className="text-center py-4 px-6 text-cyan-400 font-medium">SiroPHP</th>
                <th className="text-center py-4 px-6 text-gray-300">Laravel 11</th>
                <th className="text-center py-4 px-6 text-gray-300">Symfony 7</th>
              </tr>
            </thead>
            <tbody>
              {[
                { metric: 'Focus', siro: 'API + Debug workflow', laravel: 'Full-stack web', symfony: 'Enterprise web' },
                { metric: 'Template Engine', siro: 'None (API-first)', laravel: 'Blade', symfony: 'Twig' },
                { metric: 'ORM', siro: 'Minimal, no deps', laravel: 'Eloquent', symfony: 'Doctrine' },
                { metric: 'Dependencies', siro: 'Zero', laravel: '~60 packages', symfony: '~100+' },
                { metric: 'Learning Curve', siro: 'Low', laravel: 'Medium', symfony: 'Steep' },
                { metric: 'Ecosystem', siro: 'Niche', laravel: 'Massive', symfony: 'Very large' },
              ].map((row, index) => (
                <tr key={index} className="border-b border-gray-800/50 hover:bg-gray-900/30 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-300">{row.metric}</td>
                  <td className="py-4 px-6 text-center text-cyan-400">{row.siro}</td>
                  <td className="py-4 px-6 text-center text-gray-400">{row.laravel}</td>
                  <td className="py-4 px-6 text-center text-gray-400">{row.symfony}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-600 mt-3">
          Qualitative comparison only — not benchmarked on the same environment.
          Laravel and Symfony are mature, full-featured frameworks with massive ecosystems. SiroPHP is not a replacement.
        </p>
      </section>

      {/* Methodology */}
      <section className="mb-20">
        <FadeIn delay={900}>
          <h2 className="text-3xl font-bold mb-8">Methodology</h2>
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-sm text-gray-400 space-y-2">
            <p><strong className="text-gray-300">Hardware:</strong> AMD Ryzen 7 5800X (8C/16T @ 3.8GHz), 32GB DDR4, NVMe SSD</p>
            <p><strong className="text-gray-300">OS:</strong> Windows 11 (WSL2 / bare metal)</p>
            <p><strong className="text-gray-300">PHP Version:</strong> 8.2.30, OPcache disabled (cold boot measurement), JIT disabled</p>
            <p><strong className="text-gray-300">Benchmark Tool:</strong> Custom <code>benchmark.php</code> — hrtime() high-resolution timing, 10 warmup iterations, median of 1000+ runs</p>
            <p><strong className="text-gray-300">Route Dispatch:</strong> Pure routing — no middleware, no DB, no business logic</p>
            <p><strong className="text-gray-300">Framework versions:</strong> Laravel 11.0, Slim 4.14 — default install, no optimizations</p>
            <div className="mt-4 pt-4 border-t border-gray-800">
              <p className="text-xs text-gray-500">
                <strong className="text-gray-400">Evidence classification:</strong> All Key Metrics are <strong className="text-green-400">Measured</strong> values from benchmark.php.
                Where a value is <strong className="text-yellow-400">Estimated</strong> (e.g., Linux+OPcache cold boot), it is clearly labeled.
                No <strong className="text-gray-500">Unverified</strong> claims appear on this page.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                <strong className="text-gray-400">Note:</strong> Microbenchmarks measure framework overhead only. Real-world throughput depends on PHP runtime (FPM/FrankenPHP/Swoole), hardware, OPcache, and business logic.
              </p>
            </div>
            <p className="mt-4">
              <a href="https://github.com/SiroSoft/siro-core/blob/main/BENCHMARK.md" className="text-cyan-400 hover:text-cyan-300 underline" target="_blank" rel="noopener noreferrer">Full benchmark source & methodology →</a>
            </p>
          </div>
        </FadeIn>
      </section>

      {/* CTA */}
      <section className="text-center">
        <FadeIn delay={1100}>
          <h2 className="text-3xl font-bold mb-4">Try It Yourself</h2>
          <p className="text-gray-400 mb-8">
            <code className="text-cyan-400">composer create-project sirosoft/api my-api</code>
          </p>
        </FadeIn>
      </section>
    </main>
  );
}
