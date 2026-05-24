'use client';

import React from 'react';
import FadeIn from '@/components/FadeIn';

export function ReplayContent() {
  return (
    <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <FadeIn delay={100}>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Request Replay<span className="text-cyan-400">.</span>
        </h1>
        <p className="text-xl text-gray-400 mb-12 max-w-3xl">
          Debug production bugs with confidence. Capture, replay, and fix issues without affecting live traffic.
        </p>
      </FadeIn>

      {/* How It Works */}
      <section className="mb-20">
        <FadeIn delay={200}>
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        </FadeIn>
        
        <div className="grid md:grid-cols-3 gap-6">
          <FadeIn delay={300}>
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-500/30 rounded-lg p-6">
              <div className="text-4xl mb-4">📹</div>
              <h3 className="text-xl font-semibold mb-3">1. Capture</h3>
              <p className="text-gray-400 text-sm">
                Automatically capture failed requests with full context: headers, body, environment, and stack trace.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={400}>
            <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-500/30 rounded-lg p-6">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold mb-3">2. Replay</h3>
              <p className="text-gray-400 text-sm">
                Replay the exact request in your local environment with the same data and conditions.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={500}>
            <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-500/30 rounded-lg p-6">
              <div className="text-4xl mb-4">✏️</div>
              <h3 className="text-xl font-semibold mb-3">3. Fix & Verify</h3>
              <p className="text-gray-400 text-sm">
                Edit code, compare performance, and verify the fix before deploying to production.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CLI Commands */}
      <section className="mb-20">
        <FadeIn delay={600}>
          <h2 className="text-3xl font-bold mb-8">CLI Commands</h2>
        </FadeIn>
        
        <div className="space-y-4">
          <FadeIn delay={700}>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <code className="text-cyan-400 font-mono text-lg">php siro replay [trace_id]</code>
                <span className="text-xs font-semibold text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">basic</span>
              </div>
              <p className="text-gray-400 text-sm">Replay a captured request by its trace ID. Alias — replays the latest trace if no ID given</p>
            </div>
          </FadeIn>

          <FadeIn delay={800}>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <code className="text-cyan-400 font-mono text-lg">php siro replay &lt;trace_id&gt; --diff</code>
                <span className="text-xs font-semibold text-purple-400 bg-purple-400/10 px-3 py-1 rounded-full">compare</span>
              </div>
              <p className="text-gray-400 text-sm">So sánh before/after response — response time, memory, status code</p>
              <div className="mt-3 bg-black/50 rounded p-3 font-mono text-xs text-gray-300">
                <div>✓ Response time: 245ms → 89ms (-64%)</div>
                <div>✓ Memory usage: 12MB → 4MB (-67%)</div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={900}>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <code className="text-cyan-400 font-mono text-lg">php siro replay &lt;trace_id&gt; --edit</code>
                <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-3 py-1 rounded-full">workflow</span>
              </div>
              <p className="text-gray-400 text-sm">Open related code in your default editor for quick fixes</p>
            </div>
          </FadeIn>

          <FadeIn delay={1000}>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <code className="text-cyan-400 font-mono text-lg">php siro replay &lt;trace_id&gt; --set env=production</code>
                <span className="text-xs font-semibold text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full">override</span>
              </div>
              <p className="text-gray-400 text-sm">Override environment variables for testing different configurations</p>
            </div>
          </FadeIn>

          <FadeIn delay={1100}>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <code className="text-cyan-400 font-mono text-lg">php siro replay &lt;trace_id&gt; --dry-run</code>
                <span className="text-xs font-semibold text-orange-400 bg-orange-400/10 px-3 py-1 rounded-full">safe</span>
              </div>
              <p className="text-gray-400 text-sm">Preview changes without executing (safe mode)</p>
            </div>
          </FadeIn>

          <FadeIn delay={1200}>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <code className="text-cyan-400 font-mono text-lg">php siro replay &lt;trace_id&gt; --test</code>
                <span className="text-xs font-semibold text-pink-400 bg-pink-400/10 px-3 py-1 rounded-full">generate</span>
              </div>
              <p className="text-gray-400 text-sm">Auto-generate a PHPUnit regression test from the trace for CI pipelines</p>
            </div>
          </FadeIn>

          <FadeIn delay={1300}>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <code className="text-cyan-400 font-mono text-lg">php siro log:replay &lt;trace_id&gt; --force</code>
                <span className="text-xs font-semibold text-red-400 bg-red-400/10 px-3 py-1 rounded-full">execute</span>
              </div>
              <p className="text-gray-400 text-sm">Execute thật request — cho phép POST/PUT/DELETE trong production</p>
            </div>
          </FadeIn>

          <FadeIn delay={1400}>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <code className="text-cyan-400 font-mono text-lg">php siro log:replay &lt;trace_id&gt; --safe</code>
                <span className="text-xs font-semibold text-teal-400 bg-teal-400/10 px-3 py-1 rounded-full">safe</span>
              </div>
              <p className="text-gray-400 text-sm">Safe mode (mặc định) — chỉ GET request, không thay đổi dữ liệu</p>
            </div>
          </FadeIn>

          <FadeIn delay={1500}>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <code className="text-cyan-400 font-mono text-lg">php siro log:replay &lt;trace_id&gt; --format=curl</code>
                <span className="text-xs font-semibold text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full">export</span>
              </div>
              <p className="text-gray-400 text-sm">Output dạng curl command — copy-paste để chạy ngoài terminal</p>
            </div>
          </FadeIn>

          <FadeIn delay={1600}>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <code className="text-cyan-400 font-mono text-lg">php siro log:replay &lt;trace_id&gt; --format=httpie</code>
                <span className="text-xs font-semibold text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full">export</span>
              </div>
              <p className="text-gray-400 text-sm">Output dạng httpie command — tương thích với HTTPie CLI</p>
            </div>
          </FadeIn>

          <FadeIn delay={1700}>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <code className="text-cyan-400 font-mono text-lg">php siro log:replay &lt;trace_id&gt; --seed</code>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">seed</span>
              </div>
              <p className="text-gray-400 text-sm">Seed database từ request data — tái tạo state cần thiết trước khi replay</p>
            </div>
          </FadeIn>

          <FadeIn delay={1800}>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <code className="text-cyan-400 font-mono text-lg">php siro fix [trace_id]</code>
                <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-3 py-1 rounded-full">workflow</span>
              </div>
              <p className="text-gray-400 text-sm">Watch mode — auto re-test khi save file. Truyền trace_id để fix + replay cùng lúc</p>
            </div>
          </FadeIn>
        </div>
      </section>
      
      {/* Use Cases */}
      <section className="mb-20">
        <FadeIn delay={1200}>
          <h2 className="text-3xl font-bold mb-8">Use Cases</h2>
        </FadeIn>
        
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: 'Production Bug Investigation',
              description: 'Capture errors in production and replay them locally with exact same conditions.',
              icon: '🐛',
            },
            {
              title: 'Performance Regression Testing',
              description: 'Compare response times and memory usage between versions using --diff flag.',
              icon: '📊',
            },
            {
              title: 'API Contract Testing',
              description: 'Verify API behavior hasn\'t changed after refactoring or updates.',
              icon: '🔗',
            },
            {
              title: 'Security Incident Analysis',
              description: 'Replay suspicious requests to understand attack patterns without risk.',
              icon: '🛡️',
            },
          ].map((useCase, index) => (
            <FadeIn key={index} delay={1300 + index * 100}>
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-cyan-500/50 transition-all">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{useCase.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                    <p className="text-gray-400 text-sm">{useCase.description}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <FadeIn delay={1400}>
          <h2 className="text-3xl font-bold mb-4">Start Debugging Smarter</h2>
          <p className="text-gray-400 mb-8">Never guess about production bugs again.</p>
          <a
            href="/docs"
            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/25"
          >
            Read Documentation →
          </a>
        </FadeIn>
      </section>
    </main>
  );
}
