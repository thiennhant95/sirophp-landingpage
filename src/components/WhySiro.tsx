'use client';

import FadeIn from './FadeIn';

const reasons = [
  { icon: '🪶', text: 'Minimal runtime dependencies — a smaller supply-chain surface to review' },
  { icon: '⚡', text: '2.4ms cold boot (measured) / ~0.35ms prod Linux (measured), ~4MB+ baseline RAM — budget-friendly hosting' },
  { icon: '📖', text: 'Readable core architecture — understand the entire framework in one afternoon' },
  { icon: '🚀', text: 'Ship production APIs in under one hour with make:crud' },
  { icon: '🔄', text: 'Replay any production bug with full execution context — SQL, HTTP, queued jobs' },
  { icon: '🔓', text: 'Readable PHP and standard API patterns — no proprietary runtime lock-in' },
];

const codeExample = `# 🚀 Build — a production-ready API module
php siro make:crud products
  ├── app/Models/Product.php
  ├── app/Repositories/ProductRepository.php
  ├── app/Services/ProductService.php
  ├── app/Controllers/ProductController.php
  ├── app/Resources/ProductResource.php
  ├── database/migrations/create_products_table.php
  ├── routes/api.php
  └── tests/Feature/ProductTest.php

php siro migrate
php siro serve  # → localhost:8080

# 🐞 Debug — replay with risk awareness
php siro replay a1b2c3d4
  └── Context: SQL, outbound HTTP, queued jobs
  └── Risky replays require --force`;

export default function WhySiro() {
  return (
    <section id="why-siro" className="py-24 px-6" aria-label="Why SiroPHP">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Reasons */}
          <FadeIn>
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-8">
                Why SiroPHP?
              </h2>
              <ul className="space-y-4">
                {reasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-xl mt-0.5">{reason.icon}</span>
                    <span className="text-gray-300">{reason.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Right: Code example */}
          <FadeIn delay={200}>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <pre className="font-mono text-sm text-gray-300 whitespace-pre overflow-x-auto">
                {codeExample}
              </pre>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
