import { NextResponse } from 'next/server';

export async function GET() {
  const robots = `User-agent: *
Allow: /
Sitemap: https://zintl.ai/sitemap.xml`;

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}