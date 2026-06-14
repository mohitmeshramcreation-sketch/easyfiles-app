"use client";

import { useState } from 'react';
import { FileDropzone } from '@/components/shared/FileDropzone';
import { scanOcrDocument } from '@/ai/flows/scan-ocr-document-flow';
import { Button } from '@/components/ui/button';
import { Download, Sparkles, FileText, Smartphone, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';

export default function AIScannerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ pdf: string; text: string } | null>(null);
  const { toast } = useToast();

  const handleFileSelected = async (files: File[]) => {
    if (!files[0]) return;
    
    setIsLoading(true);
    setProgress(15);

    try {
      const file = files[0];
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        const dataUri = e.target?.result as string;
        setProgress(30);
        
        try {
          const scanResult = await scanOcrDocument({ photoDataUri: dataUri });
          setProgress(100);
          setResult({
            pdf: scanResult.searchablePdfDataUri,
            text: scanResult.extractedText
          });
        } catch (error) {
          toast({
            title: "Scanning Failed",
            description: "We couldn't process this image. Please ensure it's a clear photo of a document.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast({
        title: "Upload Failed",
        description: "An error occurred while reading your image.",
        variant: "destructive",
      });
    }
  };

  const downloadPdf = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.href = result.pdf;
    link.download = 'scanned-document.pdf';
    link.click();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 text-secondary font-bold text-sm">
          <Camera className="h-4 w-4" />
          Computer Vision
        </div>
        <h1 className="font-headline text-5xl font-bold mb-4">AI Document Scanner</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Turn your photos into high-quality, searchable PDFs instantly with AI-powered OCR.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2">
          {!result ? (
            <FileDropzone 
              accept="image/*"
              onFilesSelected={handleFileSelected}
              isLoading={isLoading}
              progress={progress}
            />
          ) : (
            <div className="space-y-6 animate-in fade-in zoom-in duration-500">
              <Card className="glass p-8 border-none">
                <h3 className="text-xl font-headline font-bold mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Extracted Text
                </h3>
                <div className="bg-background/50 p-6 rounded-2xl max-h-96 overflow-y-auto mb-8 border">
                  <p className="text-sm text-muted-foreground leading-relaxed font-mono">
                    {result.text || "No text could be extracted."}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button className="rounded-full px-8 gap-2 bg-primary text-primary-foreground" onClick={downloadPdf}>
                    <Download className="h-4 w-4" /> Download Searchable PDF
                  </Button>
                  <Button variant="outline" className="rounded-full px-8" onClick={() => setResult(null)}>
                    Scan Another
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>

        <aside className="space-y-8">
          {/* AdSense Placeholder */}
          <div className="w-full h-64 bg-muted/20 border border-dashed rounded-2xl flex items-center justify-center text-muted-foreground/30 text-[10px] tracking-widest uppercase text-center p-4">
            Advertisement<br/>(AI Tools Sponsor)
          </div>

          <Card className="glass p-6 border-none">
            <h4 className="font-headline font-bold mb-4 flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-secondary" />
              Pro Tips
            </h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <div className="min-w-[1.5rem] h-6 flex items-center justify-center bg-secondary/20 text-secondary rounded-full font-bold">1</div>
                <span>Keep the camera steady and use good lighting.</span>
              </li>
              <li className="flex gap-2">
                <div className="min-w-[1.5rem] h-6 flex items-center justify-center bg-secondary/20 text-secondary rounded-full font-bold">2</div>
                <span>Ensure the document covers most of the frame.</span>
              </li>
              <li className="flex gap-2">
                <div className="min-w-[1.5rem] h-6 flex items-center justify-center bg-secondary/20 text-secondary rounded-full font-bold">3</div>
                <span>Avoid glares and shadows for better OCR accuracy.</span>
              </li>
            </ul>
          </Card>
        </aside>
      </div>

      <section className="mt-20 pt-16 border-t">
        <h2 className="font-headline text-3xl font-bold mb-12 text-center">Why use Zintl AI Scanner?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Intelligent Enhancement', desc: 'Auto-fixes contrast, shadows, and perspective for a perfect scan.' },
            { title: 'Searchable Results', desc: 'Converts your image text into searchable data within the PDF file.' },
            { title: 'Batch Support', desc: 'Process multiple pages and photos into a single document.' },
          ].map((feature) => (
            <div key={feature.title} className="glass p-6 rounded-3xl">
              <div className="bg-primary/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-headline font-bold mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}