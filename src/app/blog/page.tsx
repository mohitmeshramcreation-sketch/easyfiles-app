
/**
 * @fileOverview Blog listing page for EasyFiles.
 * Essential for SEO and driving traffic to tools.
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, User, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const metadata: Metadata = {
  title: 'Blog - Expert PDF Tips & AI Insights | EasyFiles',
  description: 'Discover the latest tips on document productivity, image optimization, and how AI is changing the way we handle files.',
};

const posts = [
  {
    slug: 'reduce-pdf-size-without-losing-quality',
    title: 'How to Reduce PDF Size Without Losing Quality',
    excerpt: 'Learn the professional secrets to compressing your documents for email while keeping text sharp and images clear.',
    category: 'PDF Tips',
    date: 'June 10, 2024',
    author: 'Admin',
    image: 'https://picsum.photos/seed/pdf-compress/800/450'
  },
  {
    slug: 'best-free-pdf-tools-for-students',
    title: 'Best Free PDF Tools for Students in 2024',
    excerpt: 'From merging assignments to summarizing research papers, discover the must-have tools for modern academic success.',
    category: 'Student Tools',
    date: 'June 12, 2024',
    author: 'AI Expert',
    image: 'https://picsum.photos/seed/student-tools/800/450'
  },
  {
    slug: 'how-ai-can-help-manage-documents',
    title: 'How AI Can Help Manage and Understand Documents',
    excerpt: 'Artificial Intelligence isn\'t just for chat. Learn how Gemini 2.5 helps you scan, OCR, and summarize complex files.',
    category: 'AI Productivity',
    date: 'June 15, 2024',
    author: 'Tech Writer',
    image: 'https://picsum.photos/seed/ai-docs/800/450'
  }
];

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <header className="text-center mb-16">
        <h1 className="font-headline text-5xl md:text-7xl font-bold mb-6">Our <span className="text-gradient">Blog</span></h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Guides, insights, and expert tips to help you master your digital document workflow.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search articles..." className="pl-12 rounded-full h-12 bg-white/5 border-white/10" />
        </div>
        <div className="flex gap-2">
          {['All', 'PDF Tips', 'AI', 'Productivity'].map(cat => (
            <Badge key={cat} variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-primary/10 transition-colors">
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, idx) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="glass tool-card border-none overflow-hidden h-full flex flex-col group animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  data-ai-hint="document office"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm border-none">
                    {post.category}
                  </Badge>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.date}</span>
                  <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                </div>
                <h3 className="text-xl font-headline font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-sm font-bold text-primary">
                  Read Article <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
