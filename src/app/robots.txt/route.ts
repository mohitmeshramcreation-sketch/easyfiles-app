import { NextResponse } from 'next/server';

/**
 * @fileOverview Robots.txt configuration for DocuMind.
 */

export async function GET() {
  const robots = `User-agent: *
Allow: /
Sitemap: https://documind.online/sitemap.xml`;

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
