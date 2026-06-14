import { NextResponse } from 'next/server';

/**
 * @fileOverview Robots.txt configuration for EasyFiles.
 */

export async function GET() {
  const robots = `User-agent: *
Allow: /
Sitemap: https://easyfiles.online/sitemap.xml`;

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
