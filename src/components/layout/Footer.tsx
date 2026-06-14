import Link from 'next/link';
import { Zap, Github, Twitter, Instagram } from 'lucide-react';

/**
 * @fileOverview Global footer for DocuMind.
 */

export function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Tools',
      links: [
        { name: 'Images to PDF', href: '/tools/images-to-pdf' },
        { name: 'Compress PDF', href: '/tools/compress-pdf' },
        { name: 'Merge PDF', href: '/tools/merge-pdf' },
        { name: 'Split PDF', href: '/tools/split-pdf' },
      ],
    },
    {
      title: 'AI Tools',
      links: [
        { name: 'AI PDF Summary', href: '/tools/ai-pdf-summary' },
        { name: 'PDF Chat', href: '/tools/pdf-chat' },
        { name: 'AI Scanner', href: '/tools/ai-scanner' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Pricing', href: '/pricing' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy', href: '/privacy' },
        { name: 'Terms', href: '/terms' },
      ],
    },
  ];

  return (
    <footer className="w-full bg-background border-t mt-20 pt-16 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-12">
        <div className="col-span-2 space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <Zap className="h-5 w-5 text-background fill-current" />
            </div>
            <span className="font-headline font-bold text-2xl tracking-tight">DocuMind</span>
          </Link>
          <p className="text-muted-foreground max-w-sm leading-relaxed">
            Revolutionizing document productivity for the modern era. Fast, secure, and AI-powered.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="p-2 glass rounded-full hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="p-2 glass rounded-full hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="p-2 glass rounded-full hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {sections.map((section) => (
          <div key={section.title} className="space-y-4">
            <h4 className="font-headline font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              {section.title}
            </h4>
            <ul className="space-y-3">
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <p>&copy; {currentYear} DocuMind AI. All rights reserved.</p>
        <div className="flex gap-8">
          <span>Secure Document Processing</span>
          <span>Status: Active</span>
        </div>
      </div>
    </footer>
  );
}
