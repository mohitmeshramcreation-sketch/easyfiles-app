
"use client";

import { useState } from 'react';
import { FileDropzone } from '@/components/shared/FileDropzone';
import { Button } from '@/components/ui/button';
import { Download, ImageIcon, FileCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { PDFDocument } from 'pdf-lib';

export default function JPGToPDFPage() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFilesAdded = (files: File[]) => {
    setImageFiles(prev => [...prev, ...files]);
    setPdfUrl(null);
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

        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setPdfUrl(URL.createObjectURL(blob));
      toast({ title: "Conversion Complete", description: "Images converted to PDF successfully." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Could not convert images." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold mb-4">Image to PDF</h1>
        <p className="text-muted-foreground text-lg">Convert your JPG, PNG, and photos into professional PDF documents.</p>
      </div>

      {!pdfUrl ? (
        <div className="space-y-8">
          <FileDropzone 
            accept="image/*"
            multiple
            onFilesSelected={handleFilesAdded}
          />
          {imageFiles.length > 0 && (
            <Card className="glass p-8 border-none">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {imageFiles.map((file, i) => (
                  <div key={i} className="aspect-square rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2 relative overflow-hidden">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    <span className="absolute bottom-1 left-2 text-[10px] truncate w-full pr-4">{file.name}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full rounded-full h-14 text-lg font-bold" onClick={convertToPdf} disabled={isLoading}>
                {isLoading ? "Converting..." : "Convert to PDF"}
              </Button>
            </Card>
          )}
        </div>
      ) : (
        <Card className="glass p-12 border-none text-center">
          <div className="bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
            <FileCheck className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-3xl font-headline font-bold mb-4">PDF Ready!</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={pdfUrl} download="images-converted.pdf" className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-12 text-lg font-bold text-primary-foreground">
              Download PDF
            </a>
            <Button variant="outline" className="rounded-full px-12 h-14 text-lg" onClick={() => { setImageFiles([]); setPdfUrl(null); }}>
              New Conversion
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
