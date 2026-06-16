
"use client";

/**
 * @fileOverview Watermark PDF - Add professional text watermarks to documents.
 */

import { useState } from 'react';
import { FileDropzone } from '@/components/shared/FileDropzone';
import { Button } from '@/components/ui/button';
import { Download, Type, FileCheck, Layout } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export default function WatermarkPDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('CONFIDENTIAL');
  const [opacity, setOpacity] = useState(0.3);
  const [isLoading, setIsLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileSelected = (files: File[]) => {
    if (files[0]) {
      setFile(files[0]);
      setResultUrl(null);
    }
  };

  const applyWatermark = async () => {
    if (!file || !text) return;
    setIsLoading(true);

    try {
      const fileArrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(fileArrayBuffer);
      const font = await pdf.embedFont(StandardFonts.HelveticaBold);
      const pages = pdf.getPages();

      pages.forEach(page => {
        const { width, height } = page.getSize();
        page.drawText(text, {
          x: width / 4,
          y: height / 2,
          size: 60,
          font,
          color: rgb(0.5, 0.5, 0.5),
          opacity: opacity,
          rotate: { type: 'degrees', angle: 45 },
        });
      });

      const pdfBytes = await pdf.save();
      setResultUrl(URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' })));
      toast({ title: "Watermark Applied", description: "Your branded document is ready." });
    } catch (e) {
      toast({ variant: "destructive", title: "Error", description: "Could not apply watermark." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold mb-4">Watermark PDF</h1>
        <p className="text-muted-foreground text-lg">Add text watermarks to your documents for branding or security.</p>
      </div>

      {!resultUrl ? (
        <div className="space-y-8">
          <FileDropzone accept="application/pdf" onFilesSelected={handleFileSelected} />
          {file && (
            <Card className="glass p-10 border-none space-y-8 animate-in slide-in-from-bottom-4">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Type className="h-4 w-4" /> Watermark Text
                  </label>
                  <Input value={text} onChange={(e) => setText(e.target.value)} className="h-12 rounded-xl" placeholder="e.g. DRAFT" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Layout className="h-4 w-4" /> Opacity
                  </label>
                  <Input type="range" min="0.1" max="1" step="0.1" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="h-12" />
                </div>
              </div>
              <Button className="w-full rounded-full h-14 text-lg font-bold" onClick={applyWatermark} disabled={isLoading}>
                {isLoading ? "Processing..." : "Generate Watermarked PDF"}
              </Button>
            </Card>
          )}
        </div>
      ) : (
        <Card className="glass p-16 border-none text-center">
          <div className="bg-primary/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <FileCheck className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-3xl font-headline font-bold mb-4">Branding Complete</h2>
          <div className="flex justify-center gap-4">
            <a href={resultUrl} download="watermarked-document.pdf" className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-12 text-lg font-bold">
              <Download className="mr-2 h-5 w-5" /> Download Result
            </a>
            <Button variant="outline" className="rounded-full px-8 h-14" onClick={() => { setFile(null); setResultUrl(null); }}>
              New File
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
