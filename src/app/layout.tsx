import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { PlaceHolderImages } from '@/lib/placeholder-images';

/**
 * @fileOverview The root layout component of the EasyFiles application.
 *
 * - RootLayout - The main layout wrapper providing global fonts, styles, and navigation.
 */

const ogImage = PlaceHolderImages.find(img => img.id === 'og-image')?.imageUrl;
const twitterImage = PlaceHolderImages.find(img => img.id === 'twitter-image')?.imageUrl;

export const metadata: Metadata = {
  title: 'EasyFiles - Smart AI Document Tools',
  description: 'Your Files. Smarter. Faster. Better. AI-powered PDF and image tools for the modern era.',
  keywords: ['PDF converter', 'images to pdf', 'AI scanner', 'PDF summary', 'AI document tools', 'private file processing', 'online document suite', 'EasyFiles'],
  metadataBase: new URL('https://easyfiles.online'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://easyfiles.online',
    siteName: 'EasyFiles',
    images: [
      {
        url: ogImage || '',
        width: 1200,
        height: 630,
        alt: 'EasyFiles AI Document Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EasyFiles - Smart AI Document Tools',
    description: 'Convert, compress, and enhance documents with EasyFiles AI.',
    images: [twitterImage || ''],
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
