
/**
 * @fileOverview Professional About Us page for EasyFiles.
 * Highlights mission, vision, and core values for trust and SEO.
 */

import { Zap, Shield, Heart, Target, Eye, Users } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Our Mission & Vision | EasyFiles',
  description: 'Learn about EasyFiles, the world\'s fastest AI-powered document utility platform dedicated to privacy, speed, and intelligence.',
};

export default function AboutPage() {
  const values = [
    { 
      title: 'Speed First', 
      desc: 'Every millisecond counts. We optimize our processing pipeline for instant results.', 
      icon: Zap,
      color: 'text-primary'
    },
    { 
      title: 'Security Always', 
      desc: 'Your data is yours. We encrypt everything and delete files automatically after processing.', 
      icon: Shield,
      color: 'text-secondary'
    },
    { 
      title: 'User Focused', 
      desc: 'Built for the modern web with an intuitive interface that just works for everyone.', 
      icon: Heart,
      color: 'text-primary'
    },
  ];

  const sections = [
    {
      title: "Our Mission",
      content: "EasyFiles was founded with a single mission: to make document productivity fast, accessible, and smart for everyone. We believe that file management shouldn't be a chore, and AI should be a partner in helping you understand your documents faster.",
      icon: Target
    },
    {
      title: "Our Vision",
      content: "We envision a world where document barriers don't exist. Whether you are a student translating a research paper, a business merging contracts, or a creator optimizing images, EasyFiles provides the tools to get it done in seconds.",
      icon: Eye
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-24">
      <header className="text-center mb-20">
        <h1 className="font-headline text-5xl md:text-7xl font-bold mb-8">About <span className="text-gradient">EasyFiles</span></h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
          The world's most intuitive AI-powered document platform. Empowering millions to manage their files with precision and privacy.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-12 mb-24">
        {sections.map((s) => (
          <div key={s.title} className="glass p-10 rounded-[2.5rem] border-none">
            <div className="bg-primary/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
              <s.icon className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-headline font-bold mb-4">{s.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{s.content}</p>
          </div>
        ))}
      </div>

      <section className="mb-24">
        <h2 className="font-headline text-4xl font-bold mb-12 text-center">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((v) => (
            <div key={v.title} className="glass p-8 rounded-3xl border-none text-center">
              <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <v.icon className={`h-8 w-8 ${v.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="glass p-12 rounded-[3rem] border-none text-center bg-gradient-to-br from-primary/5 to-secondary/5">
        <h2 className="text-3xl font-headline font-bold mb-6">Why Trust Us?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Unlike many online tools, EasyFiles prioritizes your privacy. Most of our tools run entirely in your browser using Client-Side processing, meaning your sensitive images and documents never even leave your device. For our AI tools, we use enterprise-grade encryption and a strict 24-hour auto-deletion policy.
        </p>
        <div className="flex justify-center gap-12 text-sm font-bold uppercase tracking-widest text-primary">
          <div className="flex items-center gap-2"><Shield className="h-4 w-4" /> 100% Private</div>
          <div className="flex items-center gap-2"><Zap className="h-4 w-4" /> Ultra Fast</div>
          <div className="flex items-center gap-2"><Users className="h-4 w-4" /> 1M+ Users</div>
        </div>
      </div>
    </div>
  );
}
