
"use client";

import { useState } from 'react';
import { FileDropzone } from '@/components/shared/FileDropzone';
import { Button } from '@/components/ui/button';
import { Download, ImageIcon, FileCheck, ArrowUp, ArrowDown, Trash2, Layout, Sparkles, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PDFDocument } from 'pdf-lib';

export default function ImagesToPDFPage() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [scaling, setScaling] = useState<'fit' | 'original'>('fit');
  const { toast } = useToast();

  const handleFilesAdded = (files: File[]) => {
    const validFiles = files.filter(f => f.type.startsWith('image/'));
    if (validFiles.length < files.length) {
      toast({
        title: "Invalid files detected",
        description: "Only image files (JPG, PNG, etc.) are supported.",
        variant: "destructive"
      });
    }
    setImageFiles(prev => [...prev, ...validFiles]);
    setPdfUrl(null);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...imageFiles];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newFiles.length) return;
    [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]];
    setImageFiles(newFiles);
  };

  const removeItem = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const convertToPdf = async () => {
    if (imageFiles.length === 0) return;
    setIsLoading(true);

    try {
      const pdfDoc = await PDFDocument.create();
      for (const file of imageFiles) {
        const imageBytes = await file.arrayBuffer();
        let image;
        try {
          if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
            image = await pdfDoc.embedJpg(imageBytes);
          } else if (file.type === 'image/png') {
            image = await pdfDoc.embedPng(imageBytes);
          } else {
            console.warn(`Skipping unsupported format: ${file.type}`);
            continue;
          }
        } catch (e) {
          console.error(`Error embedding ${file.name}:`, e);
          continue;
        }

        const isLandscape = orientation === 'landscape';
        // A4 Standard points
        const pageWidth = isLandscape ? 841.89 : 595.28;
        const pageHeight = isLandscape ? 595.28 : 841.89;

        const page = pdfDoc.addPage([pageWidth, pageHeight]);

        let drawWidth = image.width;
        let drawHeight = image.height;

        if (scaling === 'fit') {
          const ratio = Math.min(pageWidth / image.width, pageHeight / image.height);
          drawWidth = image.width * ratio;
          drawHeight = image.height * ratio;
        }

        page.drawImage(image, {
          x: (pageWidth - drawWidth) / 2,
          y: (pageHeight - drawHeight) / 2,
          width: drawWidth,
          height: drawHeight,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      toast({ title: "Conversion Complete", description: `Successfully converted ${imageFiles.length} images.` });
    } catch (error) {
      toast({ variant: "destructive", title: "Conversion Error", description: "An unexpected error occurred during PDF generation." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 text-primary font-bold text-sm border-primary/20">
          <Sparkles className="h-4 w-4" />
          Advanced Image to PDF Workflow
        </div>
        <h1 className="font-headline text-5xl font-bold mb-4">Images to PDF</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          The most powerful tool for combining your photos into a single, high-quality document. Reorder, rotate, and scale with ease.
        </p>
      </div>

      {!pdfUrl ? (
        <div className="grid lg:grid-cols-4 gap-8 items-start">
          <div className="lg:col-span-3 space-y-8">
            <FileDropzone 
              accept="image/*"
              multiple
              onFilesSelected={handleFilesAdded}
            />
            
            {imageFiles.length > 0 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline font-bold text-xl">Order Images</h3>
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-none">{imageFiles.length} Files</Badge>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setImageFiles([])} className="text-muted-foreground hover:text-destructive">
                    Clear All
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {imageFiles.map((file, i) => (
                    <div key={i} className="glass p-3 rounded-2xl flex items-center justify-between group border-white/5 hover:border-primary/20 transition-all hover:bg-white/5">
                      <div className="flex items-center gap-4 truncate">
                        <span className="text-xs font-bold text-muted-foreground w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">{i + 1}</span>
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <ImageIcon className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-sm font-medium truncate">{file.name}</span>
                      </div>
                      <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => moveItem(i, 'up')} disabled={i === 0}>
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => moveItem(i, 'down')} disabled={i === imageFiles.length - 1}>
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeItem(i)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24">
            <Card className="glass p-6 border-none shadow-2xl shadow-primary/5">
              <h3 className="font-headline font-bold text-xl mb-6 flex items-center gap-2">
                <Layout className="h-5 w-5 text-primary" />
                Layout Settings
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Page Orientation</label>
                  <Select value={orientation} onValueChange={(v: any) => setOrientation(v)}>
                    <SelectTrigger className="rounded-xl h-12 bg-white/5 border-white/10">
                      <SelectValue placeholder="Select orientation" />
                    </SelectTrigger>
                    <SelectContent className="glass border-white/10">
                      <SelectItem value="portrait">Portrait (A4)</SelectItem>
                      <SelectItem value="landscape">Landscape (A4)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Image Scaling</label>
                  <Select value={scaling} onValueChange={(v: any) => setScaling(v)}>
                    <SelectTrigger className="rounded-xl h-12 bg-white/5 border-white/10">
                      <SelectValue placeholder="Select scaling" />
                    </SelectTrigger>
                    <SelectContent className="glass border-white/10">
                      <SelectItem value="fit">Fit to Page (Auto)</SelectItem>
                      <SelectItem value="original">Original Size</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  className="w-full rounded-full h-14 text-lg font-bold shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 transition-all" 
                  onClick={convertToPdf} 
                  disabled={isLoading || imageFiles.length === 0}
                >
                  {isLoading ? "Processing..." : `Convert to PDF`}
                </Button>
                
                <div className="flex items-start gap-2 bg-white/5 p-4 rounded-xl border border-white/5">
                  <AlertCircle className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Processing occurs locally in your browser. No images are uploaded to our database for privacy.
                  </p>
                </div>
              </div>
            </Card>
          </aside>
        </div>
      ) : (
        <Card className="glass p-16 border-none text-center max-w-2xl mx-auto shadow-2xl shadow-primary/10 animate-in zoom-in duration-500">
          <div className="bg-primary/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <FileCheck className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-4xl font-headline font-bold mb-4 tracking-tight">PDF is Ready!</h2>
          <p className="text-muted-foreground text-lg mb-10">We've compiled your images into a professional PDF document. Your privacy was maintained throughout.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href={pdfUrl} 
              download="zintl-converted-document.pdf" 
              className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-12 text-lg font-bold text-primary-foreground hover:scale-105 transition-transform shadow-xl shadow-primary/20"
            >
              <Download className="mr-2 h-5 w-5" /> Download PDF
            </a>
            <Button variant="outline" className="rounded-full px-12 h-14 text-lg hover:bg-white/5" onClick={() => { setImageFiles([]); setPdfUrl(null); }}>
              Start New Batch
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
