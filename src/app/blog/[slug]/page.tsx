
/**
 * @fileOverview Individual blog post page for EasyFiles.
 */

import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share2, Clock, User, Facebook, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

// Mock function for static data
const getPost = (slug: string) => {
  const posts: Record<string, any> = {
    'reduce-pdf-size-without-losing-quality': {
      title: 'How to Reduce PDF Size Without Losing Quality',
      category: 'PDF Tips',
      date: 'June 10, 2024',
      author: 'Admin',
      image: 'https://picsum.photos/seed/pdf-compress/1200/600',
      content: `
        <p>Large PDF files can be a major headache. Whether you're trying to email a portfolio or upload a contract, size limits are everywhere. But how do you shrink a file without making it look like a blurry mess?</p>
        
        <h2>1. Understand DPI (Dots Per Inch)</h2>
        <p>Standard monitors only display at 72 DPI. Print quality requires 300 DPI. For web viewing, a balanced 150 DPI is usually perfect. Our compression tool intelligently manages this for you.</p>
        
        <h2>2. Optimize Embedded Images</h2>
        <p>Most of the weight in a PDF comes from images. Using advanced compression algorithms like JPEG 2000 can significantly reduce file size while maintaining clarity.</p>
        
        <h2>3. Remove Unnecessary Metadata</h2>
        <p>Files often store hidden history, fonts that aren't used, and editing data. Cleaning this "bloat" can save megabytes instantly.</p>
      `
    },
    'best-free-pdf-tools-for-students': {
      title: 'Best Free PDF Tools for Students in 2024',
      category: 'Student Tools',
      date: 'June 12, 2024',
      author: 'AI Expert',
      image: 'https://picsum.photos/seed/student-tools/1200/600',
      content: `<p>In the digital classroom, PDFs are the primary currency. Here are the tools every student needs...</p>`
    },
    'how-ai-can-help-manage-documents': {
      title: 'How AI Can Help Manage and Understand Documents',
      category: 'AI Productivity',
      date: 'June 15, 2024',
      author: 'Tech Writer',
      image: 'https://picsum.photos/seed/ai-docs/1200/600',
      content: `<p>Artificial Intelligence has moved beyond simple chatbots. In the world of documents, it acts as a personal researcher...</p>`
    }
  };
  return posts[slug];
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPost(params.slug);
  return {
    title: `${post?.title} | EasyFiles Blog`,
    description: post?.excerpt,
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);

  if (!post) return <div className="py-20 text-center">Post not found</div>;

  return (
    <article className="max-w-4xl mx-auto px-4 py-24">
      <Link href="/blog">
        <Button variant="ghost" className="mb-12 rounded-full gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Button>
      </Link>

      <header className="mb-12">
        <Badge className="mb-6 bg-primary/20 text-primary border-none">{post.category}</Badge>
        <h1 className="font-headline text-4xl md:text-6xl font-bold mb-8 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-6 text-muted-foreground border-b border-white/5 pb-8">
          <div className="flex items-center gap-2"><User className="h-4 w-4" /> {post.author}</div>
          <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> {post.date}</div>
        </div>
      </header>

      <div className="rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl">
        <img src={post.image} alt={post.title} className="w-full h-auto" />
      </div>

      <div className="grid lg:grid-cols-4 gap-12">
        <div className="lg:col-span-3 prose prose-invert max-w-none prose-p:text-muted-foreground prose-headings:font-headline prose-headings:text-foreground leading-relaxed" 
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
        
        <aside className="space-y-8">
          <div className="glass p-6 rounded-3xl border-none sticky top-24">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <Share2 className="h-4 w-4 text-primary" /> Share Article
            </h4>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" className="rounded-full hover:bg-primary/10"><Facebook className="h-4 w-4" /></Button>
              <Button size="icon" variant="ghost" className="rounded-full hover:bg-primary/10"><Twitter className="h-4 w-4" /></Button>
              <Button size="icon" variant="ghost" className="rounded-full hover:bg-primary/10"><Linkedin className="h-4 w-4" /></Button>
            </div>
          </div>
          
          <div className="bg-primary/10 p-6 rounded-3xl border border-primary/20">
            <h4 className="font-bold mb-2">Try this tool!</h4>
            <p className="text-xs text-muted-foreground mb-4">Optimized your files instantly with our AI tools.</p>
            <Link href="/tools/images-to-pdf">
              <Button className="w-full rounded-full text-xs font-bold h-10">Launch Tools</Button>
            </Link>
          </div>
        </aside>
      </div>
    </article>
  );
}
