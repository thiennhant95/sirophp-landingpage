'use client';

import { useState } from 'react';
import FadeIn from './FadeIn';

const API_HOST = 'https://showcase.sirophp.com';
// Public client identifier (same value shipped in the showcase frontend
// bundle — it attests the caller is a Siro demo page, not a secret).
const FE_TOKEN = '5e5aa7b5f39637c85275a66fa9be5c67671c00ab86053594';

interface BreakResult {
  status: number;
  traceId: string | null;
  elapsedMs: number;
  body: string;
}

interface ShipResult {
  ok: boolean;
  version: string | null;
  ms: number;
}

export function LiveReplayDemo() {
  const [ship, setShip] = useState<ShipResult | null>(null);
  const [shipping, setShipping] = useState(false);
  const [breaking, setBreaking] = useState(false);
  const [result, setResult] = useState<BreakResult | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const checkShip = async () => {
    setShipping(true);
    const started = performance.now();
    try {
      const res = await fetch(`${API_HOST}/health/ready`);
      const ms = Math.round(performance.now() - started);
      const data = await res.json().catch(() => ({}));
      setShip({ ok: res.ok, version: data?.data?.version ?? null, ms });
    } catch {
      setShip({ ok: false, version: null, ms: Math.round(performance.now() - started) });
    } finally {
      setShipping(false);
    }
  };

  const breakIt = async () => {
    setBreaking(true);
    setResult(null);
    const started = performance.now();
    try {
      const res = await fetch(`${API_HOST}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Siro-FE': FE_TOKEN },
        body: JSON.stringify({ email: 'bot@evil.example', password: 'wrongpassword1' }),
      });
      const elapsed = Math.round(performance.now() - started);
      const data = await res.json().catch(() => ({}));
      setResult({
        status: res.status,
        traceId: res.headers.get('x-siro-trace-id'),
        elapsedMs: elapsed,
        body: JSON.stringify(data, null, 2),
      });
    } catch (e) {
      setResult({
        status: 0,
        traceId: null,
        elapsedMs: Math.round(performance.now() - started),
        body: JSON.stringify({ error: e instanceof Error ? e.message : 'network failed' }, null, 2),
      });
    } finally {
      setBreaking(false);
    }
  };

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // clipboard unavailable
    }
  };

  const traceId = result?.traceId ?? 'siro_<trace-id>';
  const why: string[] = [];
  if (result) {
    if (result.status === 422) {
      why.push('The Turnstile guard rejected this request BEFORE the database was touched — no password was ever checked.');
      why.push('Bots burn themselves on the cheapest layer; real users pass through untouched.');
    } else if (result.status === 401) {
      why.push('Wrong credentials, verified in constant time — the server reveals nothing about which field failed.');
      why.push('The attempt was recorded: 5 failures lock the account for 15 minutes.');
    } else if (result.status === 429) {
      why.push('Edge rate-limit hit (nginx, 10 req/min on auth) before the app woke up. Wait a minute and break again.');
    } else if (result.status === 0) {
      why.push('The request never reached the server — check your connection and try again.');
    } else {
      why.push(`Unexpected status ${result.status} — the trace still pins exactly what the server saw.`);
    }
    if (result.traceId) {
      why.push(`Trace ${result.traceId} identifies this exact request: method, path, headers, body, SQL, timing — replayable byte-for-byte.`);
    }
  }

  const replayCmds = [
    {
      label: 'Inspect the trace',
      cmd: `php siro log:trace ${traceId} --full`,
      does: 'Prints the stored request: headers, body, SQL with timing, middleware timeline, exception.',
    },
    {
      label: 'Replay it safely',
      cmd: `php siro replay ${traceId} --dry-run`,
      does: 'Re-executes the exact request with zero side effects — proves the failure reproduces.',
    },
    {
      label: 'Generate the regression test',
      cmd: `php siro replay ${traceId} --test`,
      does: 'Turns this trace into a permanent PHPUnit test so the bug can never silently return.',
    },
  ];

  return (
    <section className="mb-20" aria-label="Live replay demo">
      <FadeIn delay={150}>
        <h2 className="text-3xl font-bold mb-4">
          Try it live<span className="text-cyan-400">.</span>
        </h2>
        <p className="text-gray-400 mb-8 max-w-3xl">
          This page talks to the live demo API at showcase.sirophp.com. Break it below,
          then follow your own trace through the full loop: Build → Ship → Why → Replay → Fix → Test → Regression.
        </p>
      </FadeIn>

      {/* Steps 1: Build & Ship (live) */}
      <div className="border border-white/10 rounded-lg mb-6 overflow-hidden">
        <div className="px-4 py-3 bg-white/5 border-b border-white/10">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Steps 1 — Build &amp; Ship (live)</p>
        </div>
        <div className="p-4 space-y-3">
          <p className="text-sm text-gray-400">Is the shipped API alive right now? Ask it:</p>
          <button
            onClick={checkShip}
            disabled={shipping}
            className="bg-cyan-500 text-black px-4 py-2 rounded text-sm font-semibold hover:bg-cyan-400 disabled:opacity-50 min-h-[44px]"
          >
            {shipping ? 'Pinging…' : 'GET /health/ready'}
          </button>
          {ship && (
            <div aria-live="polite" className="grid gap-2 sm:grid-cols-3 text-center">
              <div className="rounded-lg border border-white/10 p-3">
                <p className="text-xs text-gray-500">Status</p>
                <p className="text-xl font-bold font-mono">{ship.ok ? '200 OK' : 'DOWN'}</p>
              </div>
              <div className="rounded-lg border border-white/10 p-3">
                <p className="text-xs text-gray-500">Version</p>
                <p className="text-xl font-bold font-mono">{ship.version ?? '—'}</p>
              </div>
              <div className="rounded-lg border border-white/10 p-3">
                <p className="text-xs text-gray-500">Round trip</p>
                <p className="text-xl font-bold font-mono">{ship.ms}ms</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Steps 2-3: Why + Replay */}
      <div className="border border-white/10 rounded-lg mb-6 overflow-hidden">
        <div className="px-4 py-3 bg-white/5 border-b border-white/10">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Steps 2–3 — Break it, then Why + Replay (same trace)</p>
        </div>
        <div className="p-4 space-y-3">
          <button
            onClick={breakIt}
            disabled={breaking}
            className="bg-red-500 text-white px-6 py-3 rounded-lg text-base font-semibold hover:bg-red-400 disabled:opacity-50 min-h-[48px] w-full sm:w-auto"
          >
            {breaking ? 'Breaking…' : '💥 Break the API live'}
          </button>
          {result && (
            <div aria-live="polite" className="grid gap-2 sm:grid-cols-3 text-center">
              <div className="rounded-lg border border-white/10 p-3">
                <p className="text-xs text-gray-500">Status</p>
                <p className="text-xl font-bold font-mono">{result.status}</p>
              </div>
              <div className="rounded-lg border border-white/10 p-3">
                <p className="text-xs text-gray-500">Elapsed</p>
                <p className="text-xl font-bold font-mono">{result.elapsedMs}ms</p>
              </div>
              <div className="rounded-lg border border-cyan-500/40 p-3">
                <p className="text-xs text-gray-500">Trace ID</p>
                <p className="text-sm font-bold font-mono break-all">{result.traceId ?? '—'}</p>
                {result.traceId && (
                  <button
                    onClick={() => void copy(result.traceId as string, 'trace')}
                    className="text-xs border border-white/10 rounded px-2 py-1.5 mt-1 hover:bg-white/5 min-h-[36px]"
                    aria-label="Copy trace ID"
                  >
                    {copied === 'trace' ? 'Copied!' : 'Copy'}
                  </button>
                )}
              </div>
            </div>
          )}
          {result && (
            <ul className="text-sm text-gray-400 space-y-1 list-disc pl-5">
              {why.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          )}
          {replayCmds.map(({ label, cmd, does }) => (
            <div key={label} className="rounded-lg border border-white/10 p-3">
              <p className="text-sm font-medium text-white">{label}</p>
              <p className="text-xs text-gray-500 mt-0.5 mb-2">{does}</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-xs font-mono bg-black/40 rounded px-3 py-2 overflow-x-auto whitespace-nowrap text-cyan-300">{cmd}</code>
                <button
                  onClick={() => void copy(cmd, label)}
                  className="text-xs border border-white/10 rounded px-2 py-2 hover:bg-white/5 min-h-[44px]"
                >
                  {copied === label ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Steps 4-7: Fix → Test → Regression */}
      <div className="border border-white/10 rounded-lg overflow-hidden">
        <div className="px-4 py-3 bg-white/5 border-b border-white/10">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Steps 4–7 — Fix → Test → Regression</p>
        </div>
        <div className="p-4 space-y-3 text-sm">
          <div>
            <p className="font-medium text-white mb-1">Fix — the trace tells you exactly what to validate</p>
            <pre className="text-xs font-mono bg-black/40 rounded p-3 overflow-x-auto text-gray-300">{`// 422 cf-turnstile-response → bots never reach password_verify()
// 401 invalid credentials → constant-time check, attempt recorded`}</pre>
          </div>
          <div>
            <p className="font-medium text-white mb-1">Test — replay with --diff before and after the fix</p>
            <pre className="text-xs font-mono bg-black/40 rounded p-3 overflow-x-auto text-gray-300">{`php siro replay ${traceId} --diff   # green diff = fixed, nothing else moved`}</pre>
          </div>
          <div>
            <p className="font-medium text-white mb-1">Regression — the trace becomes a permanent test</p>
            <pre className="text-xs font-mono bg-black/40 rounded p-3 overflow-x-auto text-gray-300">{`php vendor/bin/phpunit          # 665 tests, mapping gate, UAT
php scripts/check-mapping.php  # 49 routes covered by openapi.json`}</pre>
          </div>
          <p className="text-sm text-gray-400">
            Want the full interactive loop with server facts and timing?{' '}
            <a href="https://showcase.sirophp.com/killer" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
              Open the Killer Loop →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
