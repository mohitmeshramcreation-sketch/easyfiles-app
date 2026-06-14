
import { Sparkles, MessageSquare, Cpu, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

export default function AIToolsPage() {
  const tools = [
    { title: 'AI PDF Summary', desc: 'Instant insights from long documents.', icon: Sparkles, href: '/tools/ai-pdf-summary' },
    { title: 'PDF Chat', desc: 'Interact with your documents using AI.', icon: MessageSquare, href: '/tools/pdf-chat' },
    { title: 'AI Scanner', desc: 'Intelligent document enhancement and OCR.', icon: Cpu, href: '/tools/ai-scanner' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
      <div className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 text-primary font-bold text-sm">
          <Sparkles className="h-4 w-4" />
          Powered by Gemini 2.5
        </div>
        <h1 className="font-headline text-5xl md:text-6xl font-bold mb-4 tracking-tight">AI Features</h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
          Experience the future of document productivity with our state-of-the-art AI toolkit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <div className="flex items-center text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Launch AI <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
