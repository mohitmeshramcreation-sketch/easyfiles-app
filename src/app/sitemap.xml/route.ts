import { NextResponse } from 'next/server';

/**
 * @fileOverview Generates a sitemap for DocuMind.
 */

export async function GET() {
  const baseUrl = 'https://documind.online';
  const tools = [
    'images-to-pdf',
    'compress-pdf',
    'merge-pdf',
    'split-pdf',
    'jpg-to-pdf',
    'pdf-to-word',
    'ai-pdf-summary',
    'pdf-chat',
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
      <url>
        <loc>${baseUrl}/about</loc>
        <priority>0.5</priority>
      </url>
      <url>
        <loc>${baseUrl}/pricing</loc>
        <priority>0.5</priority>
      </url>
      <url>
        <loc>${baseUrl}/contact</loc>
        <priority>0.5</priority>
      </url>
    </urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
