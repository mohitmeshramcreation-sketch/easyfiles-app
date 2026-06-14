/**
 * @fileOverview Contact page for EasyFiles.
 */

"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Mail, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-24">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <h1 className="font-headline text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-muted-foreground text-lg mb-12">
            Have questions, feedback, or need help? We're here for you. Reach out and our team will get back to you within 24 hours.
          </p>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="bg-primary/10 p-3 rounded-xl h-fit">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold">Email Us</h4>
                <p className="text-muted-foreground">support@easyfiles.online</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-secondary/10 p-3 rounded-xl h-fit">
                <MessageCircle className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h4 className="font-bold">Live Chat</h4>
                <p className="text-muted-foreground">Available for Pro users</p>
              </div>
            </div>
          </div>
        </div>

        <Card className="glass p-8 border-none">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input placeholder="Your Name" className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="your@email.com" className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea placeholder="How can we help?" className="min-h-[150px] rounded-xl" />
            </div>
            <Button className="w-full rounded-full h-12 font-bold text-lg">Send Message</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
