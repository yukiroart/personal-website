import type { RequestHandler } from './$types';
import { SITE_URL } from '#lib/constants/seo';

export const prerender = true;

const routes = [
  { path: '', changefreq: 'weekly', priority: '1.0' },
  { path: '/portfolio', changefreq: 'weekly', priority: '0.9' },
  { path: '/commissions', changefreq: 'monthly', priority: '0.8' },
  { path: '/queue', changefreq: 'daily', priority: '0.8' },
  { path: '/about', changefreq: 'monthly', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.7' },
];

export const GET: RequestHandler = async () => {
  const lastmod = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
      .map(
        (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
      )
      .join('\n')}
</urlset>`;

  return new Response(xml.trim(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
