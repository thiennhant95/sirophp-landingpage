'use client';

import { useEffect, useState } from 'react';
import { INSTALLER } from '@/lib/installer';

interface LiveVersion {
  version: string;
  phar_download_url: string;
  source: string;
}

export default function DownloadButton() {
  const [live, setLive] = useState<LiveVersion | null>(null);
  const [showMeta, setShowMeta] = useState(false);

  useEffect(() => {
    fetch('/api/latest-version')
      .then((r) => r.json())
      .then((data: LiveVersion) => setLive(data))
      .catch(() => {});
  }, []);

  const version = live?.version ?? INSTALLER.version;
  const downloadUrl = live?.phar_download_url ?? INSTALLER.paths.phar;
  const hasGitHubRelease = live?.source === 'github';

  return (
    <div className="inline-flex flex-col items-center gap-2">
      <a
        href={downloadUrl}
        download
        onMouseEnter={() => setShowMeta(true)}
        onMouseLeave={() => setShowMeta(false)}
        className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-300 font-medium hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Download siro.phar v{version}
      </a>

      <div
        className={`text-xs text-gray-500 transition-opacity duration-200 flex items-center gap-2 ${
          showMeta ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span>~2.5 MB</span>
        {hasGitHubRelease && (
          <>
            <span>•</span>
            <a
              href={`https://github.com/SiroSoft/siro-installer/releases/tag/v${version}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline"
            >
              verify checksum on GitHub
            </a>
          </>
        )}
        {!hasGitHubRelease && (
          <span className="text-gray-600">SHA256 available on GitHub release page</span>
        )}
      </div>
    </div>
  );
}
