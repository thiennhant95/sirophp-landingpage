import { NextResponse } from 'next/server';
import { INSTALLER } from '@/lib/installer';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

const GITHUB_API = 'https://api.github.com/repos/SiroSoft/siro-installer/releases/latest';

interface GitHubRelease {
  tag_name: string;
  published_at: string;
  assets: Array<{ name: string; browser_download_url: string }>;
}

async function fetchFromGitHub(): Promise<{ version: string; published_at: string } | null> {
  try {
    const res = await fetch(GITHUB_API, {
      next: { revalidate: 3600 },
      headers: { Accept: 'application/vnd.github.v3+json', 'User-Agent': 'sirophp-landing' },
    });
    if (!res.ok) return null;
    const data: GitHubRelease = await res.json();
    return {
      version: data.tag_name.startsWith('v') ? data.tag_name.slice(1) : data.tag_name,
      published_at: data.published_at,
    };
  } catch {
    return null;
  }
}

export async function GET() {
  const github = await fetchFromGitHub();

  return NextResponse.json({
    version: github?.version ?? INSTALLER.version,
    published_at: github?.published_at ?? INSTALLER.publishedAt,
    phar_url: INSTALLER.paths.phar,
    phar_download_url: INSTALLER.paths.phar,
    install_ps1: INSTALLER.paths.installPs1,
    install_sh: INSTALLER.paths.installSh,
    source: github ? 'github' : 'default',
  });
}
