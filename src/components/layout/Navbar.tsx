"use client";

import Link from 'next/link';
import { Zap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'PDF Tools', href: '/pdf-tools' },
    { name: 'Image Tools', href: '/image-tools' },
    { name: 'AI Features', href: '/ai-tools' },
    { name: 'Pricing', href: '/pricing' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full px-4 py-3 md:px-8">
      <div className="mx-auto max-w-7xl glass rounded-full px-6 py-2 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <Zap className="h-5 w-5 text-background fill-current" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight">Zintl</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Button variant="default" size="sm" className="rounded-full px-6 font-semibold">
            Get Started
          </Button>
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
        <div className="md:hidden absolute top-20 left-4 right-4 glass rounded-3xl p-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="block text-lg font-medium text-foreground py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button className="w-full rounded-2xl py-6 text-lg font-bold">Get Started</Button>
        </div>
      )}
    </nav>
  );
}