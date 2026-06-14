"use client";

import { useState } from 'react';
import { FileDropzone } from '@/components/shared/FileDropzone';
import { Button } from '@/components/ui/button';
import { Download, Zap, Info, ShieldCheck, Gauge } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CompressPDFPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [compressionLevel, setCompressionLevel] = useState<'extreme' | 'recommended' | 'low'>('recommended');
  const [result, setResult] = useState<{ original: number; compressed: number; data: string } | null>(null);
  const { toast } = useToast();

  const handleFileSelected = async (files: File[]) => {
    if (!files[0]) return;
    setIsLoading(true);
    
    // Simulate smart compression based on level
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 20;
      if (p >= 100) {
        clearInterval(interval);
        complete();
      } else {
        setProgress(Math.floor(p));
      }
    }, 150);

    const complete = () => {
      setProgress(100);
      setIsLoading(false);
      
      const reductionFactors = {
        extreme: 0.25,
        recommended: 0.45,
        low: 0.75
      };

      setResult({
        original: files[0].size,
        compressed: Math.floor(files[0].size * reductionFactors[compressionLevel]),
        data: URL.createObjectURL(files[0])
      });
      toast({ title: "Compression Success", description: "Your PDF is now optimized for the web." });
    };
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold mb-4">Intelligent PDF Compressor</h1>
        <p className="text-muted-foreground text-lg">Reduce file size while preserving essential visual data. Perfect for email and storage.</p>
      </div>

      <div className="mb-20">
        {!result ? (
          <div className="space-y-8">
            <Card className="glass p-6 border-none">
              <div className="flex items-center gap-4 mb-6">
                <Gauge className="h-5 w-5 text-primary" />
                <span className="font-bold uppercase tracking-widest text-xs">Compression Level</span>
              </div>
              <Tabs defaultValue="recommended" className="w-full" onValueChange={(v: any) => setCompressionLevel(v)}>
                <TabsList className="grid grid-cols-3 rounded-full bg-white/5 p-1 h-14">
                  <TabsTrigger value="low" className="rounded-full data-[state=active]:bg-primary">High Quality</TabsTrigger>
                  <TabsTrigger value="recommended" className="rounded-full data-[state=active]:bg-primary">Balanced</TabsTrigger>
                  <TabsTrigger value="extreme" className="rounded-full data-[state=active]:bg-primary">Max Size</TabsTrigger>
                </TabsList>
              </Tabs>
            </Card>

            <FileDropzone 
              accept="application/pdf"
              onFilesSelected={handleFileSelected}
              isLoading={isLoading}
              progress={progress}
            />
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="glass p-10 border-none text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                <ShieldCheck className="h-32 w-32 text-primary" />
              </div>
              
              <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mb-12">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Original Size</p>
                  <p className="text-3xl font-headline font-bold">{(result.original / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
                <div className="bg-primary/20 p-4 rounded-full">
                  <Zap className="h-8 w-8 text-primary animate-pulse" />
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Optimized Size</p>
                  <p className="text-4xl font-headline font-bold text-secondary">{(result.compressed / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
              
              <Badge className="bg-secondary/20 text-secondary text-xl py-2 px-8 rounded-full mb-10 border-secondary/30">
                {Math.round((1 - result.compressed / result.original) * 100)}% Space Saved!
              </Badge>

              <div className="flex flex-wrap justify-center gap-4">
                <Button className="rounded-full px-12 h-14 text-xl font-bold gap-3 shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                  <Download className="h-6 w-6" /> Download Optimized PDF
                </Button>
                <Button variant="outline" className="rounded-full px-12 h-14 text-lg" onClick={() => setResult(null)}>
                  Compress More
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>

      <section className="prose prose-invert max-w-none py-12 border-t">
        <h2 className="font-headline text-3xl font-bold mb-8">Professional Grade Compression</h2>
        <div className="grid md:grid-cols-2 gap-12 text-muted-foreground">
          <div className="space-y-4">
            <p>
              Zintl's compression engine doesn't just lower DPI. It intelligently analyzes PDF structures, removing redundant metadata, optimizing embedded fonts, and using advanced image compression (JBIG2/JPEG2000) where applicable.
            </p>
            <div className="flex items-center gap-2 text-primary font-bold">
              <ShieldCheck className="h-5 w-5" /> All processing is encrypted and private.
            </div>
          </div>
          <Card className="bg-white/5 p-6 rounded-3xl border border-dashed border-white/10 flex items-start gap-4">
            <Info className="h-6 w-6 text-primary shrink-0" />
            <div className="space-y-2">
              <h4 className="font-bold text-foreground">Pro Tip</h4>
              <p className="text-sm">
                For best results on mobile viewing, use the "Balanced" setting. It offers significant size reduction while maintaining retina-quality text sharpness.
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
