"use client";

/**
 * @fileOverview Navigation component for DocuMind.
 */

import Link from 'next/link';
import { Zap, Menu, X, Sparkles, Rocket } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Images to PDF', href: '/tools/images-to-pdf', featured: true },
    { name: 'PDF Tools', href: '/pdf-tools' },
    { name: 'Image Tools', href: '/image-tools' },
    { name: 'AI Features', href: '/ai-tools' },
    { name: 'Pricing', href: '/pricing' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full px-4 py-3 md:px-8">
      <div className="mx-auto max-w-7xl glass rounded-full px-6 py-2 flex items-center justify-between border-white/10 shadow-lg shadow-primary/5">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-1.5 rounded-lg group-hover:rotate-12 transition-transform shadow-sm">
            <Zap className="h-5 w-5 text-background fill-current" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight">DocuMind</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-medium transition-all flex items-center gap-1.5 hover:scale-105 ${
                link.featured ? 'text-primary font-bold' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {link.featured && <Sparkles className="h-3.5 w-3.5 animate-pulse" />}
              {link.name}
            </Link>
          ))}
          <Link href="/tools/images-to-pdf">
            <Button variant="default" size="sm" className="rounded-full px-6 font-bold shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90">
              <Rocket className="h-4 w-4 mr-2" /> Launch Tool
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4 glass rounded-3xl p-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300 z-50 border-white/10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`block text-lg font-medium py-2 ${link.featured ? 'text-primary font-bold' : 'text-foreground'}`}
              onClick={() => setIsOpen(false)}
            >
              <span className="flex items-center gap-2">
                {link.featured && <Sparkles className="h-4 w-4" />}
                {link.name}
              </span>
            </Link>
          ))}
          <Button className="w-full rounded-2xl py-6 text-lg font-bold shadow-xl shadow-primary/20">Get Started Now</Button>
        </div>
      )}
    </nav>
  );
}
