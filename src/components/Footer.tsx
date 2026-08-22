import Link from 'next/link';

const footerLinks = {
  Product: ['Documentation', 'Features', 'Changelog', 'Roadmap'],
  Resources: ['Docs', 'Blog', 'Tutorials', 'Examples', 'FAQ', 'Security', 'Benchmarks', 'Replay'],
  Community: ['GitHub', 'Discord'],
  Legal: ['Privacy', 'Terms'],
};

export default function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-white/10" aria-label="Footer">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-white font-semibold text-lg">SiroPHP</span>
            </div>
            <p className="text-gray-400 text-sm">
              Build fast. Debug faster.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4 text-sm">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => {
                  const href = link === 'Docs' ? '/docs'
                    : link === 'Blog' ? '/blog'
                    : link === 'Tutorials' ? '/tutorials'
                    : link === 'Examples' ? '/examples'
                    : link === 'FAQ' ? '/faq'
                    : link === 'Security' ? '/security'
                    : link === 'Benchmarks' ? '/benchmarks'
                    : link === 'Replay' ? '/replay'
                    : link === 'Privacy' ? '/privacy'
                    : link === 'Terms' ? '/terms'
                    : link === 'GitHub' ? 'https://github.com/SiroSoft/SiroPHP'
                    : link === 'Discord' ? 'https://discord.gg/sirophp'
                    : link === 'Documentation' ? '/documentation'
                    : link === 'Features' ? '/#features'
                    : link === 'Changelog' ? 'https://github.com/SiroSoft/SiroPHP/releases'
                    : link === 'Roadmap' ? 'https://github.com/SiroSoft/SiroPHP/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement'
                    : '#';
                  return (
                    <li key={link}>
                      <Link
                        href={href}
                        className="text-gray-400 hover:text-white text-sm transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10">
          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <a 
              href="https://packagist.org/packages/sirosoft/core"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-colors"
            >
              <span className="text-xs text-gray-400">Packagist</span>
              <span className="text-xs font-semibold text-cyan-400">v0.40.0</span>
            </a>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10">
              <span className="text-xs text-gray-400">PHPStan</span>
              <span className="text-xs font-semibold text-emerald-400">Level Max (baseline)</span>
            </div>
          </div>
          
          <p className="text-gray-500 text-sm mb-2 text-center">
            Built for developers who debug real APIs.
          </p>
          <p className="text-gray-600 text-xs text-center">
            © 2026 SiroPHP. The fastest feedback loop for API developers.
          </p>
        </div>
      </div>
    </footer>
  );
}
