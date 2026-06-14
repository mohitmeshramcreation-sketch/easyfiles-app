import { Zap, FileText, ImageIcon, Sparkles, Shield, Cpu, Clock, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const tools = [
    { title: 'Images to PDF', desc: 'Convert photos to professional PDF documents with reordering.', icon: ImageIcon, href: '/tools/images-to-pdf', category: 'Most Popular' },
    { title: 'AI PDF Summary', desc: 'Get instant insights from any document with Gemini.', icon: Sparkles, href: '/tools/ai-pdf-summary', category: 'AI' },
    { title: 'Compress PDF', desc: 'Reduce file size without losing quality.', icon: Clock, href: '/tools/compress-pdf', category: 'PDF' },
    { title: 'Merge PDF', desc: 'Combine multiple files into one.', icon: FileText, href: '/tools/merge-pdf', category: 'PDF' },
    { title: 'AI Scanner', desc: 'OCR and enhance your document photos.', icon: Cpu, href: '/tools/ai-scanner', category: 'AI' },
    { title: 'Secure Split', desc: 'Extract specific pages safely.', icon: Shield, href: '/tools/split-pdf', category: 'PDF' },
  ];

  const trustBadges = [
    { icon: Zap, text: 'Instant Processing' },
    { icon: Shield, text: 'Secure Encryption' },
    { icon: Sparkles, text: 'AI-Enhanced Output' },
    { icon: Trash2, text: 'Auto-Delete (24h)' },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-40 -right-40 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 md:px-8 max-w-7xl mx-auto text-center">
        <Badge variant="secondary" className="mb-6 rounded-full px-4 py-1.5 animate-bounce">
          New: Advanced Images to PDF Tool ✨
        </Badge>
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-[1.1]">
          Your Files. <span className="text-gradient">Smarter.</span> Faster. Better.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          Convert, compress, enhance, and manage your documents instantly with our next-gen AI-powered workflow.
        </p>

        {/* Primary Action */}
        <div className="max-w-3xl mx-auto mb-20">
          <Link href="/tools/images-to-pdf">
            <div className="glass border-2 border-dashed border-primary/30 rounded-[2.5rem] p-12 group hover:border-primary transition-all cursor-pointer">
              <div className="bg-primary/10 p-4 rounded-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform">
                <ImageIcon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-headline font-bold mb-2">Drop images here or click to convert</h3>
              <p className="text-muted-foreground">Fast, high-quality Images to PDF conversion.</p>
            </div>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {trustBadges.map((badge) => (
            <div key={badge.text} className="flex items-center gap-2 text-muted-foreground">
              <badge.icon className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium tracking-wide uppercase">{badge.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tools Grid */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto pb-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="text-left">
            <h2 className="font-headline text-4xl font-bold mb-4">Powerful Tools for You</h2>
            <p className="text-muted-foreground">The only toolkit you'll ever need for your files.</p>
          </div>
          <Link href="/pdf-tools">
            <Button variant="outline" className="rounded-full group">
              View All Tools <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link key={tool.title} href={tool.href}>
              <Card className="glass tool-card p-8 border-none flex flex-col h-full group">
                <div className="bg-secondary/10 p-4 rounded-2xl w-fit mb-6 group-hover:bg-secondary/20 transition-colors">
                  <tool.icon className="h-6 w-6 text-secondary" />
                </div>
                <Badge variant="outline" className="w-fit mb-4 text-[10px] uppercase tracking-tighter">
                  {tool.category}
                </Badge>
                <h3 className="text-xl font-headline font-bold mb-2 group-hover:text-primary transition-colors">
                  {tool.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                  {tool.desc}
                </p>
                <div className="flex items-center text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Try it now <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
