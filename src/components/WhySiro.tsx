'use client';

import FadeIn from './FadeIn';

const reasons = [
  { icon: '🪶', text: 'Minimal dependencies — no supply chain risk, no composer audit' },
  { icon: '⚡', text: '<1ms cold boot, ~2MB RAM — runs on $2/month hosting' },
  { icon: '📖', text: 'Readable core architecture — understand the entire framework in one afternoon' },
  { icon: '🚀', text: 'Ship production APIs in under one hour with make:crud' },
  { icon: '🔄', text: 'Replay any production bug — stop guessing what went wrong' },
  { icon: '🔓', text: 'No lock-in — migrate to Laravel anytime, patterns are compatible' },
];

const codeExample = `# 🚀 Build — full CRUD in 2 seconds
php siro make:crud products
  ├── app/Models/Product.php
  ├── app/Controllers/ProductController.php
  ├── app/Resources/ProductResource.php
  ├── database/migrations/create_products_table.php
  ├── routes/api.php
  └── tests/Feature/ProductTest.php

php siro migrate
php siro serve  # → localhost:8080

# 🐞 Debug — replay production request
php siro replay a1b2c3d4
  └── Full context: headers, body, SQL, timing`;

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
