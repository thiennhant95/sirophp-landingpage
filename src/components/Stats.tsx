'use client';

import FadeIn from './FadeIn';

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: 'Minimal', label: 'Dependencies' },
  { value: '<1ms', label: 'Cold Boot' },
  { value: '1294', label: 'Tests Passing' },
  { value: '~2MB', label: 'RAM per Request' },
  { value: 'Max', label: 'PHPStan Level' },
];

export default function Stats() {
  return (
    <section className="py-16 px-6 border-y border-white/10" aria-label="Key statistics">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
          {stats.map((stat, index) => (
            <FadeIn key={index} delay={index * 100}>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">
                  {stat.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
