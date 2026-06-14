"use client";

import { useState } from 'react';
import { FileDropzone } from '@/components/shared/FileDropzone';
import { Button } from '@/components/ui/button';
import { Download, ImageIcon, FileCheck, ArrowUp, ArrowDown, Trash2, Layout, Sparkles } from 'lucide-react';
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
    setImageFiles(prev => [...prev, ...files]);
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
        if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
          image = await pdfDoc.embedJpg(imageBytes);
        } else if (file.type === 'image/png') {
          image = await pdfDoc.embedPng(imageBytes);
        } else {
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
      setPdfUrl(URL.createObjectURL(blob));
      toast({ title: "Conversion Complete", description: `Converted ${imageFiles.length} images to PDF.` });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Could not convert images." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 text-primary font-bold text-sm">
          <Sparkles className="h-4 w-4" />
          Our Most Popular Tool
        </div>
        <h1 className="font-headline text-5xl font-bold mb-4">Advanced Images to PDF</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Upload dozens of photos, reorder them instantly, and export as a professional PDF with custom layout settings.
        </p>
      </div>

      {!pdfUrl ? (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <FileDropzone 
              accept="image/*"
              multiple
              onFilesSelected={handleFilesAdded}
            />
            
            {imageFiles.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-xl">Selected Images</h3>
                  <Badge variant="secondary" className="px-4 py-1 rounded-full">{imageFiles.length} Files</Badge>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {imageFiles.map((file, i) => (
                    <div key={i} className="glass p-3 rounded-2xl flex items-center justify-between group border-white/5 hover:border-primary/20 transition-all">
                      <div className="flex items-center gap-4 truncate">
                        <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}.</span>
                        <div className="bg-white/5 p-2 rounded-lg">
                          <ImageIcon className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-sm font-medium truncate">{file.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
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

          <aside className="space-y-6">
            <Card className="glass p-6 border-none sticky top-24">
              <h3 className="font-headline font-bold text-xl mb-6 flex items-center gap-2">
                <Layout className="h-5 w-5 text-primary" />
                PDF Settings
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-muted-foreground">Orientation</label>
                  <Select value={orientation} onValueChange={(v: any) => setOrientation(v)}>
                    <SelectTrigger className="rounded-xl h-12">
                      <SelectValue placeholder="Select orientation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="portrait">Portrait (Vertical)</SelectItem>
                      <SelectItem value="landscape">Landscape (Horizontal)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-muted-foreground">Image Fit</label>
                  <Select value={scaling} onValueChange={(v: any) => setScaling(v)}>
                    <SelectTrigger className="rounded-xl h-12">
                      <SelectValue placeholder="Select scaling" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fit">Fit to Page (Auto-resize)</SelectItem>
                      <SelectItem value="original">Original Image Size</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  className="w-full rounded-full h-14 text-lg font-bold shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 transition-all" 
                  onClick={convertToPdf} 
                  disabled={isLoading || imageFiles.length === 0}
                >
                  {isLoading ? "Generating..." : `Convert to PDF`}
                </Button>
                
                <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">
                  Processing on your device
                </p>
              </div>
            </Card>
          </aside>
        </div>
      ) : (
        <Card className="glass p-12 border-none text-center max-w-2xl mx-auto">
          <div className="bg-primary/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <FileCheck className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-4xl font-headline font-bold mb-4 tracking-tight">PDF is Ready!</h2>
          <p className="text-muted-foreground text-lg mb-10">All images were successfully combined into a high-quality document.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={pdfUrl} download="zintl-converted-images.pdf" className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-12 text-lg font-bold text-primary-foreground hover:scale-105 transition-transform shadow-xl shadow-primary/20">
              <Download className="mr-2 h-5 w-5" /> Download Document
            </a>
            <Button variant="outline" className="rounded-full px-12 h-14 text-lg" onClick={() => { setImageFiles([]); setPdfUrl(null); }}>
              New Project
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
