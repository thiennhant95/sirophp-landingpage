'use client';

import { useEffect, useRef, useState } from 'react';
import { INSTALLER } from '@/lib/installer';

type Platform = keyof typeof INSTALLER.commands;

const PLATFORM_ORDER: Platform[] = ['powershell', 'bash', 'composer'];

const PLATFORM_ICONS: Record<Platform, string> = {
  powershell: '⊞',
  bash: '🐧',
  composer: '🎵',
};

function detectOS(): Platform {
  if (typeof navigator === 'undefined') return 'composer';
  const p = navigator.platform.toLowerCase();
  if (p.includes('win')) return 'powershell';
  if (p.includes('mac') || p.includes('linux')) return 'bash';
  return 'composer';
}

export default function InstallCommands() {
  const [active, setActive] = useState<Platform>(detectOS);
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  const entry = INSTALLER.commands[active];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(entry.cmd);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = entry.cmd;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Platform Tabs */}
      <div className="flex gap-1 mb-3 bg-white/5 rounded-lg p-1 border border-white/10">
        {PLATFORM_ORDER.map((p) => (
          <button
            key={p}
            onClick={() => { setActive(p); setCopied(false); }}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all ${
              active === p
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
            }`}
          >
            <span>{PLATFORM_ICONS[p]}</span>
            <span className="hidden sm:inline">{INSTALLER.commands[p].label}</span>
          </button>
        ))}
      </div>

      {/* Command Block */}
      <div
        onClick={handleCopy}
        className={`relative rounded-lg bg-black/60 border transition-all duration-200 cursor-pointer ${
          copied
            ? 'border-cyan-500/50 shadow-[0_0_12px_rgba(0,212,255,0.2)]'
            : 'border-white/10 hover:border-cyan-500/30'
        }`}
      >
        <pre className="font-mono text-sm text-cyan-300 px-4 py-3 overflow-x-auto pr-28 cursor-pointer select-text">
          {entry.cmd}
        </pre>
        <div
          className={`absolute top-1/2 right-3 -translate-y-1/2 px-2.5 py-1 text-xs rounded border transition-all duration-200 ${
            copied
              ? 'opacity-100 scale-100 bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
              : 'opacity-0 scale-90 text-transparent border-transparent'
          }`}
        >
          {copied ? 'Copied!' : 'Copy'}
        </div>
      </div>

      {/* Hint */}
      <p className="text-xs text-gray-500 mt-2">{entry.hint}</p>
    </div>
  );
}
