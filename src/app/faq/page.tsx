
/**
 * @fileOverview Dedicated FAQ page for EasyFiles.
 * Covers general, PDF, and AI tool questions.
 */

import { Metadata } from 'next';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Shield, Sparkles, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | EasyFiles',
  description: 'Get answers to common questions about file security, tool usage, and AI processing on EasyFiles.',
};

export default function FAQPage() {
  const faqs = [
    {
      category: "General",
      icon: HelpCircle,
      items: [
        { q: "Is EasyFiles completely free?", a: "Yes, our core tools are free to use. We offer a Pro plan for users who need higher file size limits and priority AI processing." },
        { q: "Do I need to create an account?", a: "No, most tools can be used without an account. However, Pro features require a login to manage your subscription." },
        { q: "What is your data retention policy?", a: "We have a strict privacy policy. Files processed locally stay on your device. Files processed on our servers are automatically and permanently deleted within 24 hours." }
      ]
    },
    {
      category: "Security & Privacy",
      icon: Shield,
      items: [
        { q: "Are my files secure?", a: "Absolutely. We use SSL encryption for all transfers. Our 'Images to PDF' tool works 100% locally in your browser, meaning your photos never even touch our servers." },
        { q: "Does EasyFiles sell my data?", a: "Never. We do not sell user data or file content. We earn revenue through non-intrusive ads and Pro subscriptions." }
      ]
    },
    {
      category: "PDF Tools",
      icon: FileText,
      items: [
        { q: "How do I compress a PDF?", a: "Simply upload your file to the 'Compress PDF' tool, choose your desired compression level (Balanced is recommended), and download the optimized version." },
        { q: "Can I merge multiple formats into one PDF?", a: "Currently, our merge tool supports PDF files. You can use 'Images to PDF' to convert photos first, then merge them." }
      ]
    },
    {
      category: "AI Features",
      icon: Sparkles,
      items: [
        { q: "How accurate is the AI Summary?", a: "Our AI is powered by Gemini 2.5, which is highly accurate. However, we recommend reviewing summaries for critical documents as AI can sometimes miss subtle nuances." },
        { q: "Is the AI Scanner better than standard OCR?", a: "Yes. Our AI scanner doesn't just read text; it understands document structure, enhances image quality, and deskews photos automatically." }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <header className="text-center mb-16">
        <h1 className="font-headline text-5xl font-bold mb-4">Frequently Asked <span className="text-gradient">Questions</span></h1>
        <p className="text-muted-foreground text-lg">Everything you need to know about using EasyFiles effectively.</p>
      </header>

      <div className="space-y-12">
        {faqs.map((group, idx) => (
          <section key={group.category} className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${idx * 100}ms` }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-2 rounded-lg">
                <group.icon className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-headline font-bold">{group.category}</h2>
            </div>
            <Accordion type="single" collapsible className="glass rounded-[2rem] overflow-hidden border-none px-6">
              {group.items.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-white/5 last:border-none">
                  <AccordionTrigger className="text-left font-bold py-6 hover:text-primary transition-colors">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        ))}
      </div>

      <div className="mt-24 glass p-12 rounded-[3rem] border-none text-center">
        <h3 className="text-2xl font-headline font-bold mb-4">Still have questions?</h3>
        <p className="text-muted-foreground mb-8">Our support team is always ready to help you with specific inquiries.</p>
        <a href="/contact">
          <Button className="rounded-full px-12 h-14 text-lg font-bold">Contact Support</Button>
        </a>
      </div>
    </div>
  );
}
