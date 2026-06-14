/**
 * @fileOverview The main landing page for Zintl.
 *
 * - Home - Displays the hero section, main tool focus, and the complete document tool suite.
 */

import { Zap, FileText, ImageIcon, Sparkles, Shield, Cpu, Clock, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const tools = [
    { title: 'Images to PDF', desc: 'Convert photos to professional PDF documents with advanced reordering and layout controls.', icon: ImageIcon, href: '/tools/images-to-pdf', category: 'Main Tool' },
    { title: 'AI PDF Summary', desc: 'Get instant insights from any document with Gemini AI.', icon: Sparkles, href: '/tools/ai-pdf-summary', category: 'AI' },
    { title: 'Compress PDF', desc: 'Reduce file size intelligently without losing visual quality.', icon: Clock, href: '/tools/compress-pdf', category: 'Optimization' },
    { title: 'Merge PDF', desc: 'Combine multiple files into one professional document.', icon: FileText, href: '/tools/merge-pdf', category: 'PDF' },
    { title: 'AI Scanner', desc: 'OCR and enhance your document photos into searchable PDFs.', icon: Cpu, href: '/tools/ai-scanner', category: 'AI' },
    { title: 'Secure Split', desc: 'Extract specific pages safely with precision controls.', icon: Shield, href: '/tools/split-pdf', category: 'PDF' },
  ];

  const trustBadges = [
    { icon: Zap, text: 'Instant Processing' },
    { icon: Shield, text: 'Privacy Guaranteed' },
    { icon: Sparkles, text: 'AI-Enhanced Output' },
    { icon: Trash2, text: 'No Database Storage' },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-40 -right-40 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 md:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 text-primary font-bold text-sm border-primary/20 animate-pulse">
          <Sparkles className="h-4 w-4" />
          Most Advanced Images to PDF Converter ✨
        </div>
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-[1.1]">
          Your Files. <span className="text-gradient">Smarter.</span> Faster. Better.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          Convert, compress, and enhance documents instantly with Zintl. Professional tools, zero learning curve, 100% private.
        </p>

        {/* Primary Action - Main Tool Focus */}
        <div className="max-w-3xl mx-auto mb-20">
          <Link href="/tools/images-to-pdf">
            <div className="glass border-2 border-dashed border-primary/40 rounded-[2.5rem] p-12 group hover:border-primary hover:bg-primary/5 transition-all cursor-pointer shadow-2xl shadow-primary/10">
              <div className="bg-primary/10 p-5 rounded-3xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform">
                <ImageIcon className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-headline font-bold mb-3">Drop images here to convert to PDF</h3>
              <p className="text-muted-foreground text-lg">Fast, high-quality conversion with reordering and layout control.</p>
              <div className="mt-8 flex justify-center">
                <Button className="rounded-full px-10 py-6 text-lg font-bold shadow-xl shadow-primary/20">
                  Launch Images to PDF Tool
                </Button>
              </div>
            </div>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {trustBadges.map((badge) => (
            <div key={badge.text} className="flex items-center gap-2 text-muted-foreground">
              <badge.icon className="h-5 w-5 text-secondary" />
              <span className="text-xs font-bold tracking-widest uppercase">{badge.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tools Grid */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto pb-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4 border-b border-white/5 pb-8">
          <div className="text-left">
            <h2 className="font-headline text-4xl font-bold mb-4">Professional Document Suite</h2>
            <p className="text-muted-foreground">Every tool is optimized for speed and accuracy.</p>
          </div>
          <Link href="/pdf-tools">
            <Button variant="outline" className="rounded-full group hover:bg-white/5">
              View All Tools <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link key={tool.title} href={tool.href}>
              <Card className="glass tool-card p-8 border-none flex flex-col h-full group hover:border-primary/20">
                <div className="bg-secondary/10 p-4 rounded-2xl w-fit mb-6 group-hover:bg-secondary/20 transition-colors">
                  <tool.icon className="h-6 w-6 text-secondary" />
                </div>
                <Badge variant="outline" className="w-fit mb-4 text-[10px] uppercase tracking-tighter bg-white/5 border-white/10">
                  {tool.category}
                </Badge>
                <h3 className="text-xl font-headline font-bold mb-2 group-hover:text-primary transition-colors">
                  {tool.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                  {tool.desc}
                </p>
                <div className="flex items-center text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Try Tool <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}