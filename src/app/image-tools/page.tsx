
import { ImageIcon, Camera, Cpu, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

export default function ImageToolsPage() {
  const tools = [
    { title: 'JPG to PDF', desc: 'Convert images into high-quality PDFs.', icon: ImageIcon, href: '/tools/jpg-to-pdf' },
    { title: 'AI Scanner', desc: 'Scan, enhance and OCR your photos.', icon: Cpu, href: '/tools/ai-scanner' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
      <div className="mb-16">
        <h1 className="font-headline text-5xl font-bold mb-4 text-gradient">Image Tools</h1>
        <p className="text-muted-foreground text-xl max-w-2xl">
          Professional-grade image processing powered by advanced AI and computer vision.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool) => (
          <Link key={tool.title} href={tool.href}>
            <Card className="glass tool-card p-8 border-none flex flex-col h-full group">
              <div className="bg-secondary/10 p-4 rounded-2xl w-fit mb-6 group-hover:bg-secondary/20 transition-colors">
                <tool.icon className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-headline font-bold mb-2 group-hover:text-secondary transition-colors">
                {tool.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                {tool.desc}
              </p>
              <div className="flex items-center text-sm font-bold text-secondary">
                Try Tool <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
