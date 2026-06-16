
/**
 * @fileOverview Sitemap generator for EasyFiles.
 * Includes all new informational and legal pages for better indexing.
 */

import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://easyfiles.online';
  const tools = [
    'images-to-pdf',
    'compress-pdf',
    'merge-pdf',
    'split-pdf',
    'rotate-pdf',
    'protect-pdf',
    'ai-pdf-summary',
    'pdf-chat',
    'ai-scanner',
    'ai-translator',
  ];

  const infoPages = [
    'about',
    'contact',
    'pricing',
    'faq',
    'blog',
    'privacy',
    'terms',
    'disclaimer',
    'cookie-policy',
    'copyright'
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
          <priority>0.9</priority>
        </url>
      `).join('')}
      ${infoPages.map(page => `
        <url>
          <loc>${baseUrl}/${page}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <priority>0.7</priority>
        </url>
      `).join('')}
    </urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
