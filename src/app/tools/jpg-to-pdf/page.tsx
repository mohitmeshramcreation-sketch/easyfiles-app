"use client";

import { useState } from 'react';
import { FileDropzone } from '@/components/shared/FileDropzone';
import { Button } from '@/components/ui/button';
import { Download, ImageIcon, FileCheck, ArrowUp, ArrowDown, Trash2, Layout } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PDFDocument } from 'pdf-lib';

export default function JPGToPDFPage() {
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
        <h1 className="font-headline text-5xl font-bold mb-4">Advanced Image to PDF</h1>
        <p className="text-muted-foreground text-lg">Reorder your photos, choose orientation, and convert to professional PDF.</p>
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
                  <h3 className="font-bold text-xl">Selected Images ({imageFiles.length})</h3>
                  <Button variant="ghost" size="sm" onClick={() => setImageFiles([])} className="text-destructive">Clear All</Button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {imageFiles.map((file, i) => (
                    <div key={i} className="glass p-3 rounded-2xl flex items-center justify-between group border-white/5">
                      <div className="flex items-center gap-4 truncate">
                        <Badge variant="secondary" className="h-6 w-6 flex items-center justify-center p-0 rounded-full shrink-0">
                          {i + 1}
                        </Badge>
                        <div className="bg-white/5 p-2 rounded-lg">
                          <ImageIcon className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-sm font-medium truncate">{file.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => moveItem(i, 'up')} disabled={i === 0}>
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => moveItem(i, 'down')} disabled={i === imageFiles.length - 1}>
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => removeItem(i)} className="text-muted-foreground hover:text-destructive">
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
                Settings
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-muted-foreground">Page Orientation</label>
                  <Select value={orientation} onValueChange={(v: any) => setOrientation(v)}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select orientation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="portrait">Portrait (Vertical)</SelectItem>
                      <SelectItem value="landscape">Landscape (Horizontal)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-muted-foreground">Image Scaling</label>
                  <Select value={scaling} onValueChange={(v: any) => setScaling(v)}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select scaling" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fit">Fit to Page (Recommended)</SelectItem>
                      <SelectItem value="original">Original Size</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  className="w-full rounded-full h-14 text-lg font-bold shadow-lg shadow-primary/20" 
                  onClick={convertToPdf} 
                  disabled={isLoading || imageFiles.length === 0}
                >
                  {isLoading ? "Converting..." : "Generate PDF"}
                </Button>
                
                <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">
                  Secure processing enabled
                </p>
              </div>
            </Card>
          </aside>
        </div>
      ) : (
        <Card className="glass p-12 border-none text-center max-w-2xl mx-auto">
          <div className="bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
            <FileCheck className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-4xl font-headline font-bold mb-4">PDF Created!</h2>
          <p className="text-muted-foreground mb-10">Your images have been successfully converted into a high-quality PDF document.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={pdfUrl} download="zintl-images.pdf" className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-12 text-lg font-bold text-primary-foreground hover:scale-105 transition-transform">
              <Download className="mr-2 h-5 w-5" /> Download PDF
            </a>
            <Button variant="outline" className="rounded-full px-12 h-14 text-lg" onClick={() => { setImageFiles([]); setPdfUrl(null); }}>
              New Batch
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
