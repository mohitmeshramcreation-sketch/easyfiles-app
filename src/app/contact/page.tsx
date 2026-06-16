
"use client";

/**
 * @fileOverview Professional Contact page for EasyFiles.
 * Includes support, business, and feedback sections for AdSense compliance.
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Mail, MessageCircle, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast({
        title: "Message Sent!",
        description: "We've received your inquiry and will get back to you within 24 hours.",
      });
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="grid lg:grid-cols-2 gap-20">
        <div>
          <header className="mb-12">
            <h1 className="font-headline text-5xl md:text-6xl font-bold mb-6">Get in <span className="text-gradient">Touch</span></h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Have questions, feedback, or need technical assistance? Our dedicated support team is ready to help you optimize your document workflow.
            </p>
          </header>

          <div className="space-y-10">
            <div className="flex gap-6">
              <div className="bg-primary/10 p-4 rounded-2xl h-fit">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-1">General Support</h4>
                <p className="text-muted-foreground">For help with tools and usage:</p>
                <p className="font-medium text-primary">support@easyfiles.online</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="bg-secondary/10 p-4 rounded-2xl h-fit">
                <MessageCircle className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-1">Business Enquiries</h4>
                <p className="text-muted-foreground">For partnerships and API access:</p>
                <p className="font-medium text-secondary">business@easyfiles.online</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="bg-primary/10 p-4 rounded-2xl h-fit">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-1">Global HQ</h4>
                <p className="text-muted-foreground">EasyFiles Inc.</p>
                <p className="text-sm text-muted-foreground">Cloud-First Operations | Global Support Team</p>
              </div>
            </div>
          </div>
        </div>

        <Card className="glass p-10 border-none shadow-2xl shadow-primary/5">
          {!isSuccess ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
                  <Input required placeholder="Jane Doe" className="h-12 rounded-xl bg-white/5 border-white/10" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                  <Input required type="email" placeholder="jane@example.com" className="h-12 rounded-xl bg-white/5 border-white/10" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Subject</label>
                <Input required placeholder="How can we help you?" className="h-12 rounded-xl bg-white/5 border-white/10" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Message</label>
                <Textarea required placeholder="Describe your inquiry in detail..." className="min-h-[160px] rounded-2xl bg-white/5 border-white/10" />
              </div>
              <Button disabled={isSubmitting} className="w-full rounded-full h-14 font-bold text-lg shadow-xl shadow-primary/20">
                {isSubmitting ? "Sending..." : "Send Message"} <Send className="ml-2 h-5 w-5" />
              </Button>
            </form>
          ) : (
            <div className="py-20 text-center animate-in fade-in zoom-in">
              <div className="bg-green-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="h-10 w-10 text-green-500" />
              </div>
              <h3 className="text-3xl font-headline font-bold mb-4">Message Sent!</h3>
              <p className="text-muted-foreground mb-8">Thank you for reaching out. We'll be in touch soon.</p>
              <Button variant="outline" className="rounded-full px-8" onClick={() => setIsSuccess(false)}>
                Send another message
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
