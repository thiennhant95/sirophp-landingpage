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

      {/* Key Metrics */}
      <section className="mb-20">
        <FadeIn delay={200}>
          <h2 className="text-3xl font-bold mb-8">Key Performance Metrics</h2>
        </FadeIn>
        
        <div className="grid md:grid-cols-3 gap-6">
          <FadeIn delay={300}>
            <div className="bg-gradient-to-br from-cyan-900/20 to-cyan-800/10 border border-cyan-500/30 rounded-lg p-6">
              <div className="text-5xl font-bold text-cyan-400 mb-2">~2.4ms</div>
              <div className="text-sm text-gray-400 mb-2">Cold Boot (no OPcache)</div>
              <div className="text-xs text-gray-500">~0.5ms with OPcache</div>
            </div>
          </FadeIn>

          <FadeIn delay={400}>
            <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-500/30 rounded-lg p-6">
              <div className="text-5xl font-bold text-purple-400 mb-2">~0.5 MB</div>
              <div className="text-sm text-gray-400 mb-2">Base Framework Memory</div>
              <div className="text-xs text-gray-500">~1.2 MB with middleware stack</div>
            </div>
          </FadeIn>

          <FadeIn delay={500}>
            <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-500/30 rounded-lg p-6">
              <div className="text-5xl font-bold text-green-400 mb-2">239K</div>
              <div className="text-sm text-gray-400 mb-2">Static Route Dispatch (ops/sec)</div>
              <div className="text-xs text-gray-500">14,971 dynamic · 120,481 middleware 5-layer</div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Framework Comparison */}
      <section className="mb-20">
        <FadeIn delay={600}>
          <h2 className="text-3xl font-bold mb-4">How We Compare</h2>
          <p className="text-gray-400 mb-8 max-w-3xl">
            Laravel and Symfony are full-stack powerhouses with massive ecosystems. SiroPHP takes a different approach:
            lightweight, zero-dependency, API-first. These numbers reflect our different design goals — not a competition.
            <strong className="text-gray-300"> Choose the right tool for your project.</strong>
          </p>
        </FadeIn>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Metric</th>
                <th className="text-center py-4 px-6 text-cyan-400 font-medium">SiroPHP</th>
                <th className="text-center py-4 px-6 text-gray-300">Laravel 11</th>
                <th className="text-center py-4 px-6 text-gray-300">Symfony 7</th>
                <th className="text-center py-4 px-6 text-gray-300">Slim 4</th>
              </tr>
            </thead>
            <tbody>
              {[
                { metric: 'Boot Time', siro: '2.4ms cold / 0.5ms OPcache', laravel: '30-60ms', symfony: '50-100ms', slim: '5-10ms' },
                { metric: 'Memory/Request', siro: '~0.5 MB base', laravel: '~84 MB', symfony: '~55 MB', slim: '~7 MB' },
                { metric: 'Route Dispatch (static)', siro: '239K ops/sec', laravel: '~500 ops/sec', symfony: '~1.2K ops/sec', slim: '~3K ops/sec' },
                { metric: 'Ecosystem Size', siro: 'Niche (debug-testing)', laravel: 'Massive', symfony: 'Very large', slim: 'Small' },
                { metric: 'Zero Dependencies', siro: 'Yes', laravel: '~60 packages', symfony: '~100+', slim: '~20' },
              ].map((row, index) => (
                <tr key={index} className="border-b border-gray-800/50 hover:bg-gray-900/30 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-300">{row.metric}</td>
                  <td className="py-4 px-6 text-center text-cyan-400">{row.siro}</td>
                  <td className="py-4 px-6 text-center text-gray-400">{row.laravel}</td>
                  <td className="py-4 px-6 text-center text-gray-400">{row.symfony}</td>
                  <td className="py-4 px-6 text-center text-gray-400">{row.slim}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Stress Test Results */}
      <section className="mb-20">
        <FadeIn delay={800}>
          <h2 className="text-3xl font-bold mb-8">Stress Test Results</h2>
        </FadeIn>
        
        <div className="grid md:grid-cols-2 gap-6">
          <FadeIn delay={900}>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Concurrent Requests</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>100 concurrent</span>
                    <span className="text-green-400">✓ Stable</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>500 concurrent</span>
                    <span className="text-green-400">✓ Stable</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>1000 concurrent</span>
                    <span className="text-yellow-400">⚠ Degraded</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={1000}>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Response Time Distribution</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>P50 (Median)</span>
                    <span className="text-cyan-400">2ms</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>P95</span>
                    <span className="text-cyan-400">8ms</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>P99</span>
                    <span className="text-cyan-400">15ms</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Quick Comparison */}
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
      </section>

      {/* Methodology */}
      <section className="mb-20">
        <FadeIn delay={900}>
          <h2 className="text-3xl font-bold mb-8">Methodology</h2>
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-sm text-gray-400 space-y-2">
            <p><strong className="text-gray-300">Hardware:</strong> Ubuntu 22.04, AMD EPYC 2.6GHz, 8GB RAM</p>
            <p><strong className="text-gray-300">PHP Version:</strong> 8.2.30 with OPcache enabled (except cold boot test)</p>
            <p><strong className="text-gray-300">Benchmark Tool:</strong> PHPBench 1.3, 1,000 iterations per test, median reported</p>
            <p><strong className="text-gray-300">Route Dispatch:</strong> Measured using <code>benchthroughput.php</code> — pure routing, no middleware, no DB</p>
            <p><strong className="text-gray-300">Framework versions:</strong> Laravel 11.0, Symfony 7.0, Slim 4.14 — default install, no optimizations</p>
            <p><strong className="text-gray-300">Note:</strong> Laravel and Symfony are mature, full-featured frameworks with massive ecosystems, extensive documentation, and large communities. SiroPHP is not a replacement — it is a <strong className="text-gray-300">niche tool</strong> for teams who prioritize API debugging workflow, zero dependencies, and minimal resource usage. Each framework excels in its own domain. Choose what fits your project.</p>
            <p className="mt-4">
              <a href="/docs" className="text-cyan-400 hover:text-cyan-300 underline">Full benchmark report →</a>
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
