'use client';

import FadeIn from './FadeIn';

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

const features: FeatureCard[] = [
  {
    icon: '🔍',
    title: 'Advanced Debugging',
    description: 'Trace IDs, request replay, log exporting, and CLI testing for instant issue resolution.',
  },
  {
    icon: '🔄',
    title: 'Trace & Replay',
    description: 'Full request/response capture with one-command replay. Debug like it never happened.',
  },
  {
    icon: '⚡',
    title: 'CLI API Testing',
    description: 'Test endpoints directly from terminal. No Postman needed. Auto-auth, instant feedback.',
  },
  {
    icon: '🚀',
    title: 'Lightning Fast',
    description: 'Micro-framework architecture with zero dependencies. Optimized for speed at every layer.',
  },
  {
    icon: '🔒',
    title: 'Secure by Default',
    description: 'Built-in JWT auth, rate limiting, CSRF protection, and automatic input sanitization.',
  },
  {
    icon: '💡',
    title: 'Developer Friendly',
    description: 'Intuitive API, comprehensive docs, and CLI tools to scaffold your project in seconds.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Debug APIs in PHP with Trace and Replay
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to debug APIs in production
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={index * 50}>
              <div
                className="group relative p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-400/30 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-2xl mb-4">{feature.icon}</div>
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
