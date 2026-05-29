import type { Metadata } from 'next';
import InstallCommands from '@/components/InstallCommands';
import DownloadButton from '@/components/DownloadButton';
import { INSTALLER } from '@/lib/installer';

export const metadata: Metadata = {
  title: 'Install SiroPHP — One Command Setup',
  description: 'Install SiroPHP in seconds. Zero-dependency installer for Windows, macOS, and Linux. Download PHAR or use Composer.',
  alternates: { canonical: 'https://sirophp.com/install' },
  openGraph: {
    title: 'Install SiroPHP — One Command Setup',
    description: 'Install SiroPHP in seconds. Zero-dependency installer for Windows, macOS, and Linux.',
    url: 'https://sirophp.com/install',
  },
};

export default function InstallPage() {
  return (
    <main className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-center">
          Install SiroPHP
        </h1>
        <p className="text-gray-400 text-lg text-center mb-12 max-w-2xl mx-auto">
          Get a production-ready PHP API framework running in under a minute.
        </p>

        {/* One-liner install */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Quick Install (One Command)</h2>
          <InstallCommands />
        </section>

        {/* Download PHAR */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Download PHAR</h2>
          <p className="text-gray-400 mb-6">
            The standalone PHAR binary includes the runtime manager and project scaffolding.
          </p>
          <DownloadButton />
          <div className="mt-6 text-sm text-gray-500 space-y-1">
            <p><strong className="text-gray-300">Checksums:</strong></p>
            <p>
              SHA256:{' '}
              <code className="text-gray-400 break-all">
                (available on GitHub release page)
              </code>
            </p>
            <p>
              MD5:{' '}
              <code className="text-gray-400">
                (available on GitHub release page)
              </code>
            </p>
          </div>
        </section>

        {/* System Requirements */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">System Requirements</h2>
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h3 className="font-medium mb-3">Required</h3>
            <ul className="space-y-2 text-sm text-gray-400 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">✓</span>
                <span>PHP 8.2 or higher</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">✓</span>
                <span>ext-pdo (any driver: MySQL, PostgreSQL, SQLite)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">✓</span>
                <span>ext-json</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">✓</span>
                <span>ext-mbstring</span>
              </li>
            </ul>
            <h3 className="font-medium mb-3">Optional but Recommended</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">◇</span>
                <span>ext-openssl (JWT auth, encryption)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">◇</span>
                <span>ext-curl (HTTP client)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">◇</span>
                <span>ext-redis (Redis cache driver)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">◇</span>
                <span>ext-fileinfo (file upload validation)</span>
              </li>
            </ul>
          </div>
        </section>

        {/* What's Next */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">What&apos;s Next?</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { step: '1', title: 'Create a Project', desc: `Run "siro new my-api" or "composer create-project sirosoft/api my-app" to scaffold a new API skeleton.` },
              { step: '2', title: 'Build Your First CRUD', desc: 'Run "php siro make:crud products" to generate model, migration, controller, and routes in 2 seconds.' },
              { step: '3', title: 'Start the Dev Server', desc: 'Run "php siro serve" and open http://localhost:8080. Your API is live.' },
            ].map((item) => (
              <div key={item.step} className="bg-white/5 border border-white/10 rounded-lg p-6">
                <div className="text-2xl font-bold text-cyan-400 mb-2">{item.step}</div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Troubleshooting */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>
          <div className="space-y-4 text-sm text-gray-400">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="font-medium text-gray-200 mb-1">PowerShell execution policy</h3>
              <p>If you see a security error, run: <code className="text-cyan-300">Set-ExecutionPolicy -Scope CurrentUser RemoteSigned</code></p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="font-medium text-gray-200 mb-1">&quot;composer&quot; not found</h3>
              <p>Install Composer from <a href="https://getcomposer.org" className="text-cyan-400 hover:underline">getcomposer.org</a>, or use the one-liner installer above which bundles a PHP runtime.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="font-medium text-gray-200 mb-1">Port 8080 already in use</h3>
              <p>Use a different port: <code className="text-cyan-300">php siro serve --port=8081</code></p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
