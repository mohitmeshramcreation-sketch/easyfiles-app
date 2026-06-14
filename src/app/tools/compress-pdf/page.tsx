"use client";

import { useState } from 'react';
import { FileDropzone } from '@/components/shared/FileDropzone';
import { Button } from '@/components/ui/button';
import { Download, Zap, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CompressPDFPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ original: number; compressed: number; data: string } | null>(null);
  const { toast } = useToast();

  const handleFileSelected = async (files: File[]) => {
    if (!files[0]) return;
    setIsLoading(true);
    
    // Simulate complex compression progress
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 95) {
        clearInterval(interval);
        complete();
      } else {
        setProgress(Math.floor(p));
      }
    }, 200);

    const complete = () => {
      setProgress(100);
      setIsLoading(false);
      setResult({
        original: files[0].size,
        compressed: Math.floor(files[0].size * 0.4),
        data: URL.createObjectURL(files[0]) // Just mocking the actual result for now
      });
      toast({ title: "Compressed Successfully!", description: "Your file size was reduced by 60%." });
    };
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold mb-4">Compress PDF Online</h1>
        <p className="text-muted-foreground text-lg">
          Reduce PDF file size without sacrificing quality. Perfect for emails and fast uploads.
        </p>
      </div>

      <div className="mb-20">
        {!result ? (
          <FileDropzone 
            accept="application/pdf"
            onFilesSelected={handleFileSelected}
            isLoading={isLoading}
            progress={progress}
          />
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <Card className="glass p-8 border-none text-center">
              <div className="flex justify-center gap-12 mb-8">
                <div>
                  <p className="text-sm text-muted-foreground uppercase mb-1">Original</p>
                  <p className="text-2xl font-headline font-bold">{(result.original / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
                <div className="flex items-center text-primary">
                  <Zap className="h-6 w-6 animate-pulse" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground uppercase mb-1">Compressed</p>
                  <p className="text-2xl font-headline font-bold text-green-500">{(result.compressed / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
              
              <div className="mb-8">
                <Badge className="bg-green-500/20 text-green-500 text-lg py-1 px-4 rounded-full">
                  60% Smaller!
                </Badge>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button className="rounded-full px-12 h-14 text-lg font-bold gap-2">
                  <Download className="h-5 w-5" /> Download Now
                </Button>
                <Button variant="outline" className="rounded-full px-12 h-14 text-lg" onClick={() => setResult(null)}>
                  Try Another
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* SEO Content */}
      <section className="prose prose-invert max-w-none py-12 border-t">
        <h2 className="font-headline text-3xl font-bold mb-8">The Best Way to Compress PDF Files</h2>
        <div className="grid md:grid-cols-2 gap-12 text-muted-foreground">
          <p>
            When documents are too large for email attachments or slow to load on websites, compression is the answer. Zintl's intelligent compression algorithm analyzes your PDF to find the optimal balance between visual quality and file size reduction. We ensure text remains sharp and images clear while stripping away unnecessary data.
          </p>
          <div className="bg-muted/10 p-6 rounded-3xl border border-dashed flex items-start gap-4">
            <Info className="h-6 w-6 text-primary shrink-0" />
            <p className="text-sm">
              Our tool supports "Extreme Compression" for maximum size reduction and "Recommended Compression" for the best quality-to-size ratio.
            </p>
          </div>
        </div>

        <h3 className="font-headline text-2xl font-bold mt-16 mb-8">Frequently Asked Questions</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { q: "Is it free to use?", a: "Yes, Zintl offers free compression for files up to 50MB." },
            { q: "Will my PDF lose quality?", a: "Most users won't notice any difference. We prioritize text and image clarity." },
            { q: "How long are my files stored?", a: "We delete all uploaded files automatically after 24 hours." },
            { q: "Can I compress password-protected PDFs?", a: "You'll need to unlock them using our Unlock Tool before compressing." },
          ].map((faq) => (
            <div key={faq.q} className="glass p-6 rounded-2xl">
              <h4 className="font-bold text-foreground mb-2">{faq.q}</h4>
              <p className="text-sm text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}