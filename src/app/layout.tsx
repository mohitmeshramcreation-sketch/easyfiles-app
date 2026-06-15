
/**
 * @fileOverview Root Layout for EasyFiles - Smart AI Document Tools.
 * Purpose: Manages global SEO metadata, high-performance font loading, and core UI providers.
 * Optimization: Configured for maximum visibility in the document utility search category.
 */

import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const ogImage = PlaceHolderImages.find(img => img.id === 'og-image')?.imageUrl;
const twitterImage = PlaceHolderImages.find(img => img.id === 'twitter-image')?.imageUrl;

export const metadata: Metadata = {
  title: 'EasyFiles - Smart AI Document Tools | #1 Online PDF Suite',
  description: 'The world\'s fastest AI-powered document utility. Convert images to PDF, summarize long documents with AI, compress, merge, and split PDFs instantly. 100% private, secure, and professional.',
  keywords: [
    'EasyFiles', 'PDF converter', 'images to pdf', 'AI scanner', 'PDF summary', 
    'AI document tools', 'private file processing', 'online document suite', 
    'merge pdf', 'split pdf', 'rotate pdf', 'protect pdf', 'ai document translator', 
    'free pdf tools', 'convert jpg to pdf', 'extract text from image', 
    'document summarizer', 'fast pdf tools', 'best pdf editor online', 
    'secure pdf merger', 'ocr scanner online free', 'gemini ai document tools',
    'best pdf tools 2026', 'AI powered document management', 'secure online PDF editor',
    'high speed PDF converter', 'private OCR scanner', 'bulk image to pdf',
    'pdf to word ai', 'smart pdf summarizer', 'pdf chat bot', 'easy files online'
  ],
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
    description: 'Convert, compress, and enhance documents with EasyFiles AI. 100% Private.',
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
