
import { NextResponse } from 'next/server';

/**
 * @fileOverview Robots.txt configuration for EasyFiles.
 * Optimized for broad crawling and AdSense verification.
 */

export async function GET() {
  const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: https://easyfiles.online/sitemap.xml`;

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
