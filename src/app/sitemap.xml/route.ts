import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://zintl.ai';
  const tools = [
    'compress-pdf',
    'merge-pdf',
    'split-pdf',
    'jpg-to-pdf',
    'pdf-to-word',
    'ai-pdf-summary',
    'ai-scanner',
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>1.0</priority>
      </url>
      ${tools.map(tool => `
        <url>
          <loc>${baseUrl}/tools/${tool}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <priority>0.8</priority>
        </url>
      `).join('')}
    </urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}