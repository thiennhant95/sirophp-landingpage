'use client';

import FadeIn from './FadeIn';

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
  tag: string;
}

const features: FeatureCard[] = [
  {
    icon: '⚡',
    title: 'Fast CRUD Scaffolding',
    description: 'Generate full API endpoints with model, migration, controller, routes, and tests in 2 seconds.',
    tag: 'build',
  },
  {
    icon: '🔥',
    title: 'CLI API Testing',
    description: 'Test endpoints directly from terminal with auto-auth. No Postman. No cURL. Just instant feedback.',
    tag: 'build',
  },
  {
    icon: '🔄',
    title: 'Replay Production Requests',
    description: 'Replay real production requests from your terminal. php siro replay &lt;trace_id&gt; restores full context.',
    tag: 'debug',
  },
  {
    icon: '🧠',
    title: 'Trace Every Request',
    description: 'Every response includes X-Siro-Trace-Id. View full context: headers, body, SQL queries, timing.',
    tag: 'debug',
  },
  {
    icon: '🔒',
    title: 'Production-Safe Debugging',
    description: 'Sensitive data auto-sanitized in logs. Replay locked with --dry-run in production. Full audit trail for every replay.',
    tag: 'debug',
  },
  {
    icon: '📄',
    title: 'Auto OpenAPI Docs',
    description: 'Generate Swagger UI and Postman collection automatically from your validation rules. Docs that never go stale.',
    tag: 'ship',
  },
  {
    icon: '🪶',
    title: 'Lightweight Core',
    description: 'Minimal dependencies. Runs on $2/month hosting. Readable architecture you can understand in one afternoon.',
    tag: 'ship',
  },
  {
    icon: '📊',
    title: 'Built-in Benchmarking',
    description: 'Run php siro benchmark to measure performance metrics. Compare endpoints, track regressions, optimize with data.',
    tag: 'debug',
  },
  {
    icon: '🛡️',
    title: 'Type-Safe',
    description: 'PHPStan Level max with baseline. Every mixed type tracked. Catch bugs before runtime with strict static analysis.',
    tag: 'ship',
  },
  {
    icon: '🔒',
    title: 'Brute Force Protection',
    description: 'Auto account lockout after 5 failed attempts. 15-minute cooldown prevents credential stuffing attacks.',
    tag: 'debug',
  },
  {
    icon: '🛡️',
    title: 'Penetration Tested',
    description: '42 attack vectors verified. SQL injection, XSS, CSRF, path traversal — all blocked by default.',
    tag: 'ship',
  },
  {
    icon: '📊',
    title: 'Built-in Metrics',
    description: 'Prometheus format metrics with batch persist. Monitor performance, track bottlenecks, optimize with data.',
    tag: 'debug',
  },
];

const tagLabels: Record<string, string> = {
  build: 'Build',
  debug: 'Debug',
  ship: 'Ship',
};

const tagColors: Record<string, string> = {
  build: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  debug: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10',
  ship: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
};

export default function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Build Fast. Deploy Light. Debug Instantly.
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Not just a debug tool. Not just a micro-framework. The fastest feedback loop for API developers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={index * 50}>
              <div
                className="group relative p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-400/30 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{feature.icon}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${tagColors[feature.tag]}`}>
                    {tagLabels[feature.tag]}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
