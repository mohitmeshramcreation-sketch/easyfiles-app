
/**
 * @fileOverview Overview page for all PDF-related tools in EasyFiles.
 * Unique additions: Organize PDF, Watermark PDF, AI Redact.
 */

import { FileText, Clock, Shield, Sparkles, MessageSquare, ArrowRight, ImageIcon, RotateCw, Lock, Globe, LayoutPanelTop, EyeOff, Stamp } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

export default function PDFToolsPage() {
  const tools = [
    { title: 'Images to PDF', desc: 'Convert multiple photos into one PDF.', icon: ImageIcon, href: '/tools/images-to-pdf', color: 'text-primary' },
    { title: 'Organize PDF', desc: 'Visually reorder or delete pages.', icon: LayoutPanelTop, href: '/tools/organize-pdf', color: 'text-secondary' },
    { title: 'AI Redactor', desc: 'Auto-hide sensitive info with AI.', icon: EyeOff, href: '/tools/ai-redact-pdf', color: 'text-destructive' },
    { title: 'Watermark PDF', desc: 'Add text branding to your files.', icon: Stamp, href: '/tools/watermark-pdf', color: 'text-primary' },
    { title: 'AI PDF Summary', desc: 'Get key insights instantly with AI.', icon: Sparkles, href: '/tools/ai-pdf-summary', color: 'text-secondary' },
    { title: 'Compress PDF', desc: 'Reduce file size while keeping quality.', icon: Clock, href: '/tools/compress-pdf', color: 'text-primary' },
    { title: 'Merge PDF', desc: 'Combine multiple PDFs into one.', icon: FileText, href: '/tools/merge-pdf', color: 'text-secondary' },
    { title: 'Split PDF', desc: 'Extract specific pages or ranges.', icon: Shield, href: '/tools/split-pdf', color: 'text-primary' },
    { title: 'Rotate PDF', desc: 'Quickly change page orientation.', icon: RotateCw, href: '/tools/rotate-pdf', color: 'text-secondary' },
    { title: 'Protect PDF', desc: 'Add password security to files.', icon: Lock, href: '/tools/protect-pdf', color: 'text-primary' },
    { title: 'PDF Chat', desc: 'Ask questions to your documents.', icon: MessageSquare, href: '/tools/pdf-chat', color: 'text-secondary' },
    { title: 'AI Translator', desc: 'Translate PDFs with Gemini AI.', icon: Globe, href: '/tools/ai-translator', color: 'text-primary' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
      <div className="mb-16">
        <h1 className="font-headline text-5xl md:text-6xl font-bold mb-4 tracking-tight">PDF Smart <span className="text-gradient">Suite</span></h1>
        <p className="text-muted-foreground text-xl max-w-2xl">
          Professional-grade tools for managing, converting, and securing your documents locally.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool) => (
          <Link key={tool.title} href={tool.href}>
            <Card className="glass tool-card p-8 border-none flex flex-col h-full group">
              <div className="bg-white/5 p-4 rounded-2xl w-fit mb-6 group-hover:bg-primary/10 transition-colors">
                <tool.icon className={`h-6 w-6 ${tool.color}`} />
              </div>
              <h3 className="text-xl font-headline font-bold mb-2 group-hover:text-primary transition-colors">
                {tool.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                {tool.desc}
              </p>
              <div className={`flex items-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity ${tool.color}`}>
                Launch Tool <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
