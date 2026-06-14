/**
 * @fileOverview The about page for EasyFiles.
 */

import { Zap, Shield, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <h1 className="font-headline text-5xl font-bold mb-8">About EasyFiles</h1>
      <p className="text-xl text-muted-foreground leading-relaxed mb-12">
        EasyFiles was founded with a single mission: to make document productivity fast, accessible, and smart for everyone. We believe that file management shouldn't be a chore, and AI should be a partner in helping you understand your documents faster.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="glass p-8 rounded-3xl">
          <div className="bg-primary/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-bold mb-2">Speed First</h3>
          <p className="text-sm text-muted-foreground">Every millisecond counts. We optimize our processing pipeline for instant results.</p>
        </div>
        <div className="glass p-8 rounded-3xl">
          <div className="bg-secondary/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
            <Shield className="h-6 w-6 text-secondary" />
          </div>
          <h3 className="font-bold mb-2">Security Always</h3>
          <p className="text-sm text-muted-foreground">Your data is yours. We encrypt everything and delete files automatically after 24 hours.</p>
        </div>
        <div className="glass p-8 rounded-3xl">
          <div className="bg-primary/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-bold mb-2">User Focused</h3>
          <p className="text-sm text-muted-foreground">Built for the modern web with an intuitive interface that just works.</p>
        </div>
      </div>
    </div>
  );
}
