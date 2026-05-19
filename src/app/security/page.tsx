'use client';

import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'Security - SiroPHP | Enterprise-Grade PHP Framework',
  description: 'Enterprise-grade security with 42 attack vectors tested, zero vulnerabilities. JWT auth, rate limiting, CSRF protection built-in.',
  openGraph: {
    title: 'SiroPHP Security - Zero Vulnerabilities Framework',
    description: '42 attack vectors verified. SQL injection, XSS, CSRF all blocked by default. Production-ready security.',
    url: 'https://sirophp.com/security',
    siteName: 'SiroPHP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SiroPHP Security - Zero Vulnerabilities Framework',
    description: '42 attack vectors verified. Zero vulnerabilities found. Enterprise-grade security for PHP.',
  },
};

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <FadeIn delay={100}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Security First<span className="text-cyan-400">.</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl">
            Enterprise-grade security built into every layer of SiroPHP. Zero vulnerabilities, zero compromises.
          </p>
        </FadeIn>

        {/* Penetration Testing Results */}
        <section className="mb-20">
          <FadeIn delay={200}>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="text-4xl">🛡️</span>
              Penetration Testing Results
            </h2>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 gap-6">
            <FadeIn delay={300}>
              <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-500/30 rounded-lg p-6">
                <div className="text-5xl font-bold text-green-400 mb-2">42</div>
                <div className="text-sm text-gray-400 mb-4">Attack Vectors Tested</div>
                <div className="flex items-center gap-2 text-green-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">0 Vulnerabilities Found</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-500/30 rounded-lg p-6">
                <div className="text-5xl font-bold text-blue-400 mb-2">100%</div>
                <div className="text-sm text-gray-400 mb-4">OWASP Coverage</div>
                <div className="text-sm text-gray-300">All critical OWASP Top 10 categories covered</div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Attack Vectors Blocked */}
        <section className="mb-20">
          <FadeIn delay={500}>
            <h2 className="text-3xl font-bold mb-8">Attack Vectors Blocked</h2>
          </FadeIn>
          
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: 'SQL Injection', status: 'blocked', icon: '🔒' },
              { name: 'Cross-Site Scripting (XSS)', status: 'blocked', icon: '🔒' },
              { name: 'Cross-Site Request Forgery (CSRF)', status: 'blocked', icon: '🔒' },
              { name: 'Path Traversal', status: 'blocked', icon: '🔒' },
              { name: 'Brute Force Attacks', status: 'blocked', icon: '🔒' },
              { name: 'Rate Limiting Bypass', status: 'blocked', icon: '🔒' },
              { name: 'Header Injection', status: 'blocked', icon: '🔒' },
              { name: 'Session Hijacking', status: 'blocked', icon: '🔒' },
              { name: 'File Upload Exploits', status: 'blocked', icon: '🔒' },
              { name: 'XML External Entities (XXE)', status: 'blocked', icon: '🔒' },
              { name: 'Server-Side Request Forgery (SSRF)', status: 'blocked', icon: '🔒' },
              { name: 'Insecure Deserialization', status: 'blocked', icon: '🔒' },
            ].map((vector, index) => (
              <FadeIn key={index} delay={600 + index * 50}>
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:border-red-500/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{vector.icon}</span>
                      <span className="font-medium">{vector.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-1 rounded">
                      BLOCKED
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Security Features */}
        <section className="mb-20">
          <FadeIn delay={700}>
            <h2 className="text-3xl font-bold mb-8">Built-in Security Features</h2>
          </FadeIn>
          
          <div className="space-y-4">
            {[
              {
                title: 'JWT Authentication',
                description: 'Stateless authentication with automatic token refresh and secure storage.',
                tag: 'auth',
              },
              {
                title: 'Rate Limiting',
                description: 'Configurable rate limits per endpoint to prevent abuse and DDoS attacks.',
                tag: 'protection',
              },
              {
                title: 'CSRF Protection',
                description: 'Automatic CSRF token generation and validation for all state-changing requests.',
                tag: 'security',
              },
              {
                title: 'Input Validation',
                description: 'Strict input validation with sanitization to prevent injection attacks.',
                tag: 'validation',
              },
              {
                title: 'Secure Headers',
                description: 'Automatic security headers including CSP, HSTS, X-Frame-Options, and more.',
                tag: 'headers',
              },
              {
                title: 'Log Sanitization',
                description: 'Automatic removal of sensitive data from logs to prevent information leakage.',
                tag: 'logging',
              },
            ].map((feature, index) => (
              <FadeIn key={index} delay={800 + index * 100}>
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-cyan-500/50 transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                    <span className="text-xs font-semibold text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full">
                      {feature.tag}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Supply Chain Security */}
        <section className="mb-20">
          <FadeIn delay={900}>
            <h2 className="text-3xl font-bold mb-8">Supply Chain Security</h2>
          </FadeIn>
          
          <div className="bg-gradient-to-r from-purple-900/20 to-purple-800/10 border border-purple-500/30 rounded-lg p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-purple-400 mb-2">Minimal</div>
                <div className="text-sm text-gray-400">Dependencies</div>
                <div className="text-xs text-gray-500 mt-2">Reduced attack surface</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-400 mb-2">Audited</div>
                <div className="text-sm text-gray-400">Core Packages</div>
                <div className="text-xs text-gray-500 mt-2">Security reviewed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-400 mb-2">Pinned</div>
                <div className="text-sm text-gray-400">Versions</div>
                <div className="text-xs text-gray-500 mt-2">Deterministic builds</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <FadeIn delay={1000}>
            <h2 className="text-3xl font-bold mb-4">Ready to Ship Securely?</h2>
            <p className="text-gray-400 mb-8">Start building with enterprise-grade security from day one.</p>
            <a
              href="/docs"
              className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/25"
            >
              Get Started →
            </a>
          </FadeIn>
        </section>
      </main>

      <Footer />
    </div>
  );
}
