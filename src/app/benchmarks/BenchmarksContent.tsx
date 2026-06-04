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
          <h2 className="text-3xl font-bold mb-8">Framework Comparison</h2>
        </FadeIn>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Metric</th>
                <th className="text-center py-4 px-6 text-cyan-400 font-bold">SiroPHP v0.34</th>
                <th className="text-center py-4 px-6 text-gray-400">Laravel 11</th>
                <th className="text-center py-4 px-6 text-gray-400">Symfony 7</th>
                <th className="text-center py-4 px-6 text-gray-400">Slim 4</th>
              </tr>
            </thead>
            <tbody>
              {[
                { metric: 'Boot Time', siro: '2.4ms cold / 0.5ms OPcache', laravel: '30-60ms', symfony: '50-100ms', slim: '5-10ms' },
                { metric: 'Memory/Request', siro: '~0.5 MB base / ~1.2 MB middleware', laravel: '~84MB', symfony: '~55MB', slim: '~7MB' },
                { metric: 'Route Dispatch (static)', siro: '239,234 ops/sec', laravel: '~500 ops/sec', symfony: '~1,200 ops/sec', slim: '~3,000 ops/sec' },
                { metric: 'External Dependencies', siro: '0', laravel: '~60', symfony: '~100+', slim: '~20' },
                { metric: 'PHPStan Level Max', siro: '✅ 0 errors', laravel: '❌ Not possible', symfony: '❌ Not possible', slim: '❌ Not possible' },
                { metric: 'Tests Passing', siro: '19,190', laravel: 'Flaky', symfony: 'Partial', slim: 'Minimal' },
              ].map((row, index) => (
                <tr key={index} className="border-b border-gray-800/50 hover:bg-gray-900/30 transition-colors">
                  <td className="py-4 px-6 font-medium">{row.metric}</td>
                  <td className="py-4 px-6 text-center text-cyan-400 font-semibold">{row.siro}</td>
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

      {/* Comparison Table */}
      <section className="mb-20">
        <FadeIn delay={800}>
          <h2 className="text-3xl font-bold mb-8">SiroPHP vs The Competition</h2>
        </FadeIn>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Metric</th>
                <th className="text-center py-4 px-6 text-cyan-400 font-bold">SiroPHP v0.34</th>
                <th className="text-center py-4 px-6 text-gray-400">Laravel 11</th>
                <th className="text-center py-4 px-6 text-gray-400">Symfony 7</th>
                <th className="text-center py-4 px-6 text-gray-400">Slim 4</th>
              </tr>
            </thead>
            <tbody>
              {[
                { metric: 'Route dispatch (static)', siro: '239,234 ops/sec', laravel: '~500 ops/sec', symfony: '~1,200 ops/sec', slim: '~3,000 ops/sec' },
                { metric: 'Boot time (cold)', siro: '2.4ms', laravel: '30-60ms', symfony: '50-100ms', slim: '5-10ms' },
                { metric: 'External dependencies', siro: '0', laravel: '~60', symfony: '~100+', slim: '~20' },
                { metric: 'PHPStan level max', siro: '✅ 0 errors', laravel: '❌ Not possible', symfony: '❌ Not possible', slim: '❌ Not possible' },
                { metric: 'Tests passing', siro: '19,190', laravel: 'Flaky', symfony: 'Partial', slim: 'Minimal' },
              ].map((row, index) => (
                <tr key={index} className="border-b border-gray-800/50 hover:bg-gray-900/30 transition-colors">
                  <td className="py-4 px-6 font-medium">{row.metric}</td>
                  <td className="py-4 px-6 text-center text-cyan-400 font-semibold">{row.siro}</td>
                  <td className="py-4 px-6 text-center text-gray-400">{row.laravel}</td>
                  <td className="py-4 px-6 text-center text-gray-400">{row.symfony}</td>
                  <td className="py-4 px-6 text-center text-gray-400">{row.slim}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <FadeIn delay={1100}>
          <h2 className="text-3xl font-bold mb-4">See the Full Report</h2>
          <p className="text-gray-400 mb-8">Detailed benchmarks and methodology in PERFORMANCE.md</p>
          <a
            href="/docs"
            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/25"
          >
            View Documentation →
          </a>
        </FadeIn>
      </section>
    </main>
  );
}
