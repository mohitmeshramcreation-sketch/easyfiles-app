
import { FileText, Clock, Shield, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function PDFToolsPage() {
  const tools = [
    { title: 'Compress PDF', desc: 'Reduce file size while keeping quality.', icon: Clock, href: '/tools/compress-pdf' },
    { title: 'Merge PDF', desc: 'Combine multiple PDFs into one.', icon: FileText, href: '/tools/merge-pdf' },
    { title: 'Split PDF', desc: 'Extract pages or split a PDF.', icon: Shield, href: '/tools/split-pdf' },
    { title: 'AI PDF Summary', desc: 'Get key insights instantly.', icon: Sparkles, href: '/tools/ai-pdf-summary' },
    { title: 'PDF Chat', desc: 'Ask questions to your documents.', icon: MessageSquare, href: '/tools/pdf-chat' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
      <div className="mb-16">
        <h1 className="font-headline text-5xl font-bold mb-4">PDF Tools</h1>
        <p className="text-muted-foreground text-xl max-w-2xl">
          Everything you need to manage, convert, and understand your PDF documents.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool) => (
          <Link key={tool.title} href={tool.href}>
            <Card className="glass tool-card p-8 border-none flex flex-col h-full group">
              <div className="bg-primary/10 p-4 rounded-2xl w-fit mb-6 group-hover:bg-primary/20 transition-colors">
                <tool.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-headline font-bold mb-2 group-hover:text-primary transition-colors">
                {tool.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                {tool.desc}
              </p>
              <div className="flex items-center text-sm font-bold text-primary">
                Try Tool <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
