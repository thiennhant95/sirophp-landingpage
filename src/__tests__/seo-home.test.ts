import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { homeFaqs } from '@/lib/faq-home';

const root = join(__dirname, '..', 'app');

describe('Homepage SEO: visible Q&A matches schema', () => {
  it('has 6+ questions with direct answers', () => {
    expect(homeFaqs.length).toBeGreaterThanOrEqual(6);
    for (const f of homeFaqs) {
      expect(f.q.trim().endsWith('?')).toBe(true);
      expect(f.a.trim().length).toBeGreaterThanOrEqual(40);
    }
  });

  it('renders the Q&A visibly (not schema-only)', () => {
    const src = readFileSync(join(root, 'page.tsx'), 'utf-8');
    expect(src).toContain('home-faq-heading');
    expect(src).toContain('{homeFaqs.map(');
    expect(src).toContain('<h2');
  });
});

describe('Homepage SEO: metadata completeness', () => {
  it('layout declares author + content date', () => {
    const layout = readFileSync(join(root, 'layout.tsx'), 'utf-8');
    expect(layout).toContain('authors');
    expect(layout).toContain('SiroSoft');
    expect(layout).toContain('dateModified');
  });

  it('homepage description fits search snippets', () => {
    const src = readFileSync(join(root, 'page.tsx'), 'utf-8');
    const m = src.match(/description:\s*'([^']+)'/);
    expect(m).not.toBeNull();
    expect(m![1].length).toBeLessThanOrEqual(160);
  });
});
