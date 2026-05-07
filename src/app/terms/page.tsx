import type { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'Terms of Service | SiroPHP',
  description: 'SiroPHP terms of service. Learn about the MIT license, usage guidelines, and disclaimers for our open-source PHP framework.',
  alternates: { canonical: 'https://sirophp.com/terms' },
  openGraph: {
    title: 'Terms of Service | SiroPHP',
    description: 'SiroPHP terms of service — MIT licensed open-source framework.',
    type: 'website',
    url: 'https://sirophp.com/terms',
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 text-sm mb-8 inline-block">&larr; Back to Home</Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-8">Terms of Service</h1>
          <p className="text-gray-500 text-sm mb-8">Last updated: May 7, 2026</p>

          <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
            <h2 className="text-2xl font-bold text-white mt-10">MIT License</h2>
            <p>SiroPHP is released under the <strong className="text-white">MIT License</strong>. You are free to use, modify, distribute, and sell software built with SiroPHP.</p>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10 font-mono text-sm text-gray-300">
              <p>MIT License</p>
              <p className="mt-2">Copyright (c) 2026 SiroSoft</p>
              <p className="mt-2">Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files...</p>
            </div>

            <h2 className="text-2xl font-bold text-white mt-10">No Warranty</h2>
            <p>The framework is provided &quot;as is&quot;, without warranty of any kind. The authors are not liable for any damages arising from the use of this software.</p>

            <h2 className="text-2xl font-bold text-white mt-10">Usage Guidelines</h2>
            <p>There are no restrictions on how you use SiroPHP in your projects. Commercial use, modification, and redistribution are all permitted under the MIT license.</p>

            <h2 className="text-2xl font-bold text-white mt-10">Trademarks</h2>
            <p>&quot;SiroPHP&quot; and the SiroPHP logo are trademarks. You may use them to refer to the framework but not in a way that implies endorsement.</p>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
