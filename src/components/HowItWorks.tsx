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
    icon: '🐞',
    title: 'Production Bug',
    description: 'API returns 500 error',
  },
  {
    number: 2,
    icon: '🔍',
    title: 'Get Trace ID',
    description: 'Extract from headers',
  },
  {
    number: 3,
    icon: '🔄',
    title: 'Replay Request',
    description: 'Exact reproduction',
  },
  {
    number: 4,
    icon: '🔧',
    title: 'Fix Issue',
    description: 'Apply solution',
  },
  {
    number: 5,
    icon: '✅',
    title: 'Test & Verify',
    description: 'Validate fix',
  },
];

const cliExample = `# Production error
500 Internal Server Error

# Find trace
php siro log:trace siro_abc123

# Replay request
php siro log:replay siro_abc123

# Fix and test
php siro api:test POST /auth/login

✔ Status: 200 OK`;

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            How to Debug APIs in Production
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From bug to fix in minutes, not hours
          </p>
        </div>
        
        {/* Steps */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
          {steps.map((step, index) => (
            <FadeIn key={step.number} delay={index * 80}>
              <div
                className="relative p-6 rounded-xl border border-white/10 bg-white/5 text-center hover:border-cyan-400/30 transition-all duration-300"
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
              CLI Debugging for PHP APIs
            </h3>
            <p className="text-gray-400 text-lg">
              From production bug to fix in seconds:
            </p>
          </div>
        </FadeIn>
        
        {/* CLI Example */}
        <div className="max-w-3xl mx-auto">
          <div className="rounded-xl border border-white/10 bg-black/50 p-6 overflow-x-auto">
            <pre className="font-mono text-sm text-cyan-400 whitespace-pre">
              {cliExample}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
