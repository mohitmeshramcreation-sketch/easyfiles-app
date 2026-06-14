import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Zintl - Next-Gen AI Document Tools',
  description: 'Your Files. Smarter. Faster. Better. AI-powered PDF and image tools for the modern era.',
  metadataBase: new URL('https://zintl.ai'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zintl.ai',
    siteName: 'Zintl',
    images: [
      {
        url: 'https://picsum.photos/seed/zintl-og/1200/630',
        width: 1200,
        height: 630,
        alt: 'Zintl AI Document Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zintl - Next-Gen AI Document Tools',
    description: 'Convert, compress, and enhance documents with Zintl AI.',
    images: ['https://picsum.photos/seed/zintl-twitter/1200/630'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Source+Code+Pro&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col bg-background selection:bg-primary selection:text-primary-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}