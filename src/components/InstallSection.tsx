import FadeIn from './FadeIn';
import InstallCommands from './InstallCommands';
import DownloadButton from './DownloadButton';
import Link from 'next/link';

export default function InstallSection() {
  return (
    <section id="install" className="py-24 px-6 relative overflow-hidden" aria-label="Installation">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent opacity-40" />

      <div className="relative max-w-5xl mx-auto text-center">
        <FadeIn>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Get Started in Seconds
          </h2>
          <p className="text-gray-400 text-lg mb-4 max-w-2xl mx-auto">
            One command. Zero dependencies. Choose your platform.
          </p>
        </FadeIn>

        <div className="mb-10">
          <InstallCommands />
        </div>

        <FadeIn>
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-gray-500">
              Prefer downloading the PHAR directly?
            </p>
            <DownloadButton />
          </div>
        </FadeIn>

        <FadeIn>
          <div className="mt-12 flex items-center justify-center gap-2 text-sm text-gray-500">
            <span>System requirements: PHP 8.2+</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>ext-pdo, ext-json, ext-mbstring</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <Link href="/install" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
              Full install guide →
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
