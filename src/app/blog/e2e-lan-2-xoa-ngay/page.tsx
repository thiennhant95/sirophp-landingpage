import type { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: "E2E lan 2 xoa ngay",
  description: "E2E lan 2 (xoa ngay) Bai kiem thu thu hai de xac nhan lenh xoa bai commit that su. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu…",
  keywords: ["E2E lan 2 xoa ngay"],
  alternates: {
    canonical: "https://sirophp.com/blog/e2e-lan-2-xoa-ngay",
  },
  openGraph: {
    title: "E2E lan 2 xoa ngay | SiroPHP",
    description: "E2E lan 2 (xoa ngay) Bai kiem thu thu hai de xac nhan lenh xoa bai commit that su. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu…",
    type: 'article',
    publishedTime: "2026-11-03",
    url: "https://sirophp.com/blog/e2e-lan-2-xoa-ngay",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "E2E lan 2 xoa ngay | SiroPHP",
    description: "E2E lan 2 (xoa ngay) Bai kiem thu thu hai de xac nhan lenh xoa bai commit that su. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu…",
    images: ["/opengraph-image.png"],
  },
};

export default function Post() {
  const articleJsonLd = {"@context": "https://schema.org", "@type": "Article", "headline": "E2E lan 2 xoa ngay", "description": "E2E lan 2 (xoa ngay) Bai kiem thu thu hai de xac nhan lenh xoa bai commit that su. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu…", "image": "https://sirophp.com/opengraph-image.png", "author": {"@type": "Organization", "name": "SiroPHP", "url": "https://sirophp.com"}, "publisher": {"@type": "Organization", "name": "SiroPHP", "logo": {"@type": "ImageObject", "url": "https://sirophp.com/logo"}}, "datePublished": "2026-11-03", "dateModified": "2026-11-03", "mainEntityOfPage": {"@type": "WebPage", "@id": "https://sirophp.com/blog/e2e-lan-2-xoa-ngay"}, "wordCount": 180, "articleSection": "Tutorial"};

  return (
    <main className="min-h-screen bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <nav className="mb-8 text-sm">
              <Link href="/blog" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Blog
              </Link>
              <span className="text-gray-600 mx-2">/</span>
              <span className="text-gray-500">{"E2E lan 2 xoa ngay"}</span>
            </nav>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
              {"E2E lan 2 xoa ngay"}
            </h1>
            <p className="text-gray-400 text-sm mb-10">
              {"2026-11-03"} · 1 phút đọc
            </p>
            <style>{`
.sr-post{color:#cbd5e1;font-size:16.5px;line-height:1.75}
.sr-post h2{color:#fff;font-size:26px;font-weight:700;margin:36px 0 12px}
.sr-post h3{color:#fff;font-size:20px;font-weight:600;margin:26px 0 10px}
.sr-post p{margin:0 0 16px}
.sr-post a{color:#22d3ee;text-decoration:underline}
.sr-post ul,.sr-post ol{padding-left:22px;margin:0 0 18px;display:flex;flex-direction:column;gap:8px}
.sr-post li{padding-left:2px}
.sr-post code{font-family:ui-monospace,Consolas,monospace;font-size:13.5px;color:#a5f3fc;background:#0f172a;padding:2px 7px;border-radius:7px}
.sr-post pre{background:#0f172a;border:1px solid #1e293b;border-radius:14px;padding:18px;overflow-x:auto;margin:0 0 18px}
.sr-post pre code{background:none;padding:0}
.sr-post blockquote{border-left:4px solid #22d3ee;margin:20px 0;padding:4px 0 4px 18px;color:#e2e8f0}
.sr-post img{max-width:100%;border-radius:14px;margin:12px 0}
.sr-post table{border-collapse:collapse;width:100%;margin:0 0 18px}
.sr-post td,.sr-post th{border:1px solid #1e293b;padding:8px 10px;font-size:14.5px;text-align:left}
            `}</style>
            <div className="sr-post" dangerouslySetInnerHTML={{ __html: "<h1>E2E lan 2 (xoa ngay)<\/h1>\n<p>Bai kiem thu thu hai de xac nhan lenh xoa bai commit that su.<\/p>\n<p>Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu. Noi dung kiem thu.<\/p>" }} />
            <div className="mt-12 pt-8 border-t border-gray-800">
              <Link href="/blog" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                ← Xem tất cả bài viết
              </Link>
            </div>
          </FadeIn>
        </div>
      </article>
    </main>
  );
}
