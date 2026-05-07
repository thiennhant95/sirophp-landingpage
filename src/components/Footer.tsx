import Link from 'next/link';

const footerLinks = {
  Product: ['Documentation', 'Features', 'Changelog', 'Roadmap'],
  Resources: ['Docs', 'Blog', 'Tutorials', 'Examples', 'FAQ'],
  Community: ['GitHub', 'Discord', 'Twitter'],
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
                    : link === 'Privacy' ? '/privacy'
                    : link === 'Terms' ? '/terms'
                    : link === 'GitHub' ? 'https://github.com/SiroSoft/SiroPHP'
                    : link === 'Documentation' ? '/docs'
                    : link === 'Features' ? '/#features'
                    : link === 'Changelog' ? 'https://github.com/SiroSoft/SiroPHP/releases'
                    : link === 'Roadmap' ? 'https://github.com/SiroSoft/SiroPHP/issues'
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
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500 text-sm mb-2">
            Built for developers who debug real APIs.
          </p>
          <p className="text-gray-600 text-xs">
            © 2026 SiroPHP. The fastest feedback loop for API developers.
          </p>
        </div>
      </div>
    </footer>
  );
}
