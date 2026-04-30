'use client';

import FadeIn from './FadeIn';

const reasons = [
  { icon: '📖', text: 'Read the entire framework in one afternoon' },
  { icon: '🎯', text: 'No learning curve - familiar PHP patterns' },
  { icon: '🚀', text: 'Ship production APIs in under one hour' },
  { icon: '🐛', text: 'Stop guessing API bugs' },
  { icon: '👥', text: 'Perfect for startups and teams' },
  { icon: '❤️', text: 'Built for developers, by developers' },
];

const codeExample = `// Define API endpoints
Route::post('/webhooks', function() {
    $payload = request()->json();
    
    // That's it! Zero setup, validation, auth
});`;

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
