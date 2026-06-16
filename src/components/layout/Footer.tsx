
/**
 * @fileOverview Global footer for EasyFiles.
 * Includes complete legal, tool, and company links for AdSense compliance and SEO.
 */

import Link from 'next/link';
import { Zap, Github, Twitter, Instagram, Mail, ShieldCheck } from 'lucide-react';

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
        { name: 'AI Summary', href: '/tools/ai-pdf-summary' },
        { name: 'AI Scanner', href: '/tools/ai-scanner' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Blog', href: '/blog' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Pricing', href: '/pricing' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Disclaimer', href: '/disclaimer' },
        { name: 'Cookie Policy', href: '/cookie-policy' },
        { name: 'DMCA Policy', href: '/copyright' },
      ],
    },
  ];

  return (
    <footer className="w-full bg-background border-t mt-20 pt-20 pb-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-24 mb-20">
        <div className="col-span-2 md:col-span-1 space-y-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-xl">
              <Zap className="h-6 w-6 text-background fill-current" />
            </div>
            <span className="font-headline font-bold text-3xl tracking-tight">EasyFiles</span>
          </Link>
          <p className="text-muted-foreground leading-relaxed">
            Leading the way in AI-powered document productivity. Fast, private, and secure tools for professionals and creators worldwide.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="p-2.5 glass rounded-full hover:text-primary transition-all hover:scale-110">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="p-2.5 glass rounded-full hover:text-primary transition-all hover:scale-110">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="p-2.5 glass rounded-full hover:text-primary transition-all hover:scale-110">
              <Github className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {sections.map((section) => (
          <div key={section.title} className="space-y-6">
            <h4 className="font-headline font-bold text-sm uppercase tracking-[0.2em] text-muted-foreground/50">
              {section.title}
            </h4>
            <ul className="space-y-4">
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[15px] text-muted-foreground hover:text-primary transition-colors font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[13px] text-muted-foreground/60">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <p>&copy; {currentYear} EasyFiles - Smart AI Document Tools. All rights reserved.</p>
          <Link href="/privacy" className="hover:text-primary">User Privacy</Link>
          <Link href="/terms" className="hover:text-primary">Legal Terms</Link>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-green-500/80 font-bold tracking-widest uppercase text-[10px]">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Systems Operational
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary/60" /> 
            <span className="font-medium tracking-tighter">SSL SECURED</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
