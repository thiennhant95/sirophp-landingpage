'use client';

import FadeIn from './FadeIn';

interface Step {
  number: number;
  icon: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    icon: '⚡',
    title: 'Scaffold CRUD',
    description: 'php siro make:crud products',
  },
  {
    number: 2,
    icon: '🔥',
    title: 'Test & Ship',
    description: 'php siro api:test GET /products',
  },
  {
    number: 3,
    icon: '🐞',
    title: 'Bug Reported',
    description: 'Client sends trace ID from header',
  },
  {
    number: 4,
    icon: '🔄',
    title: 'Replay & Fix',
    description: 'php siro replay <id> && php siro fix',
  },
  {
    number: 5,
    icon: '✅',
    title: 'Verify',
    description: 'php siro replay --diff',
  },
];

const cliExample = `# Build — full CRUD in 2 seconds
php siro make:crud products

# Debug — replay any production request
php siro replay a1b2c3d4

# Fix with watch mode — auto re-test on save
php siro fix

# Verify — diff before/after fix
php siro replay --diff

✔ Status: 200 OK — 2 SQL queries — 45ms`;

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Build → Debug → Fix → Verify
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            One CLI workflow from scaffolding to production debugging
          </p>
        </div>
        
        {/* Steps */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
          {steps.map((step, index) => (
            <FadeIn key={step.number} delay={index * 80}>
              <div
                className="relative p-6 rounded-xl border border-white/10 bg-white/5 text-center hover:border-cyan-400/30 step-glow transition-all duration-300"
              >
                <div className="text-2xl mb-2">{step.icon}</div>
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-3">
                  {step.number}
                </div>
                <h3 className="text-sm font-semibold mb-2 text-white">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-400">
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
        
        {/* Value statement */}
        <FadeIn>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-2 text-white">
              The Fastest Feedback Loop for API Developers
            </h3>
            <p className="text-gray-400 text-lg">
              Build fast. Debug faster. All from your terminal.
            </p>
          </div>
        </FadeIn>
        
        {/* CLI Example */}
        <div className="max-w-3xl mx-auto">
          <div className="rounded-xl border border-white/10 bg-black/50 p-6 overflow-x-auto">
            <pre className="font-mono text-sm text-cyan-400 whitespace-pre">
              {cliExample}
            </pre>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-gray-500 text-xs">$</span>
              <span className="text-cyan-400 text-xs font-mono cursor-blink" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
