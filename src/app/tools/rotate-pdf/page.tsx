"use client";

/**
 * @fileOverview Tool for rotating pages within a PDF document.
 */

import { useState } from 'react';
import { FileDropzone } from '@/components/shared/FileDropzone';
import { Button } from '@/components/ui/button';
import { Download, RotateCw, FileCheck, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PDFDocument, degrees } from 'pdf-lib';

export default function RotatePDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rotatedPdfUrl, setRotatedPdfUrl] = useState<string | null>(null);
  const [rotation, setRotation] = useState<number>(90);
  const { toast } = useToast();

  const handleFileSelected = (files: File[]) => {
    if (files[0]) {
      setFile(files[0]);
      setRotatedPdfUrl(null);
    }
  };

  const rotatePdf = async () => {
    if (!file) return;
    setIsLoading(true);

    try {
      const fileArrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(fileArrayBuffer);
      const pages = pdf.getPages();
      
      pages.forEach((page) => {
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees(currentRotation + rotation));
      });

      const pdfBytes = await pdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setRotatedPdfUrl(URL.createObjectURL(blob));
      toast({ title: "Success", description: "All pages rotated successfully." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Could not rotate PDF." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold mb-4">Rotate PDF</h1>
        <p className="text-muted-foreground text-lg">Quickly rotate all pages in your PDF document by 90, 180, or 270 degrees.</p>
      </div>

      {!rotatedPdfUrl ? (
        <div className="space-y-8">
          <FileDropzone accept="application/pdf" onFilesSelected={handleFileSelected} />
          {file && (
            <Card className="glass p-8 border-none flex flex-col items-center gap-6 animate-in slide-in-from-bottom-4">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl w-full">
                <FileText className="h-8 w-8 text-primary" />
                <div className="flex-1 truncate font-medium">{file.name}</div>
                <Badge variant="outline">{Math.round(file.size / 1024)} KB</Badge>
              </div>
              
              <div className="flex gap-4">
                {[90, 180, 270].map((deg) => (
                  <Button 
                    key={deg}
                    variant={rotation === deg ? "default" : "outline"}
                    className="rounded-full"
                    onClick={() => setRotation(deg)}
                  >
                    {deg}°
                  </Button>
                ))}
              </div>

              <Button className="w-full rounded-full h-14 text-lg font-bold" onClick={rotatePdf} disabled={isLoading}>
                {isLoading ? "Processing..." : `Rotate & Download`}
              </Button>
            </Card>
          )}
        </div>
      ) : (
        <Card className="glass p-16 border-none text-center animate-in zoom-in duration-500">
          <div className="bg-primary/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <RotateCw className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-4xl font-headline font-bold mb-4">Rotation Ready!</h2>
          <div className="flex justify-center gap-4">
            <a href={rotatedPdfUrl} download="rotated-document.pdf" className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-12 text-lg font-bold text-primary-foreground">
              <Download className="mr-2 h-5 w-5" /> Download PDF
            </a>
            <Button variant="outline" className="rounded-full px-8 h-14" onClick={() => { setFile(null); setRotatedPdfUrl(null); }}>
              New File
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
