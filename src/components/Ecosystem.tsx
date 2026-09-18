import FadeIn from './FadeIn';

const products = [
  {
    name: 'SiroPHP Showcase',
    label: 'Live demo',
    description: 'Click through a live full-stack app with CRUD, API explorer, OpenAPI docs, and guided lessons.',
    href: 'https://showcase.sirophp.com',
    accent: 'border-fuchsia-400/30 hover:border-fuchsia-400/60',
  },
  {
    name: 'SiroPHP Skeleton',
    label: 'Start here',
    description: 'The official backend starter for building a secure, production-ready API.',
    href: 'https://skeleton.sirophp.com',
    accent: 'border-cyan-400/30 hover:border-cyan-400/60',
  },
  {
    name: 'Admin for Nuxt',
    label: 'Frontend',
    description: 'A Nuxt admin interface built around the same API, auth, and permission contract.',
    href: 'https://admin-nuxt.sirophp.com',
    accent: 'border-emerald-400/30 hover:border-emerald-400/60',
  },
  {
    name: 'Admin for Next.js',
    label: 'Frontend',
    description: 'A Next.js admin path for teams that want the same backend workflow with React.',
    href: 'https://admin-next.sirophp.com',
    accent: 'border-purple-400/30 hover:border-purple-400/60',
  },
  {
    name: 'ERP Lite',
    label: 'Reference product',
    description: 'A real business workflow for products, orders, inventory, users, and reporting.',
    href: 'https://erp-lite.sirophp.com',
    accent: 'border-amber-400/30 hover:border-amber-400/60',
  },
];

export default function Ecosystem() {
  return (
    <section id="ecosystem" className="py-24 px-6 bg-white/[0.03]" aria-label="Siro ecosystem">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="max-w-2xl mb-12">
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              One API contract
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Build the backend. Bring your admin with it.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Siro is more than a framework. Start with the backend skeleton,
              connect a Nuxt or Next.js admin, and use ERP Lite as a reference
              for real business workflows.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product, index) => (
            <FadeIn key={product.name} delay={index * 70}>
              <a
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`block h-full rounded-xl border bg-black/30 p-6 transition-all duration-300 hover:bg-white/[0.06] ${product.accent}`}
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                  <span className="text-xs text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    {product.label}
                  </span>
                </div>
                <p className="text-gray-400 leading-relaxed">{product.description}</p>
                <span className="inline-block mt-5 text-sm text-cyan-400">Open project →</span>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
