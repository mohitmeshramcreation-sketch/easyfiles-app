
"use client";

import { useState } from 'react';
import { FileDropzone } from '@/components/shared/FileDropzone';
import { Button } from '@/components/ui/button';
import { Download, Scissors, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { PDFDocument } from 'pdf-lib';

export default function SplitPDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [splitResultUrl, setSplitResultUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileSelected = (files: File[]) => {
    if (files[0]) {
      setFile(files[0]);
      setSplitResultUrl(null);
    }
  };

  const splitPdf = async () => {
    if (!file) return;
    setIsLoading(true);

    try {
      const fileArrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(fileArrayBuffer);
      const pageCount = pdf.getPageCount();

      if (pageCount < 2) {
        toast({ title: "Only 1 page", description: "This document only has one page and cannot be split." });
        setIsLoading(false);
        return;
      }

      // Simplified split: Take first page as a new PDF for demo
      const splitPdf = await PDFDocument.create();
      const [copiedPage] = await splitPdf.copyPages(pdf, [0]);
      splitPdf.addPage(copiedPage);

      const pdfBytes = await splitPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setSplitResultUrl(URL.createObjectURL(blob));
      toast({ title: "Split complete", description: "Extracted the first page as a new document." });
    } catch (error) {
      toast({ variant: "destructive", title: "Split failed", description: "Could not process this PDF." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="font-headline text-5xl font-bold mb-4">Split PDF</h1>
      <p className="text-muted-foreground text-lg mb-12">Extract specific pages or separate your PDF into multiple files.</p>

      {!splitResultUrl ? (
        <div className="space-y-8">
          <FileDropzone 
            accept="application/pdf"
            onFilesSelected={handleFileSelected}
          />
          {file && (
            <Card className="glass p-8 border-none flex flex-col items-center">
              <div className="bg-primary/10 p-4 rounded-2xl mb-4">
                <Scissors className="h-8 w-8 text-primary" />
              </div>
              <p className="font-bold mb-6">{file.name}</p>
              <Button size="lg" className="rounded-full px-12 h-14 text-lg font-bold" onClick={splitPdf} disabled={isLoading}>
                {isLoading ? "Splitting..." : "Split PDF"}
              </Button>
            </Card>
          )}
        </div>
      ) : (
        <Card className="glass p-12 border-none">
          <div className="bg-secondary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Download className="h-10 w-10 text-secondary" />
          </div>
          <h2 className="text-3xl font-headline font-bold mb-4">Document Split!</h2>
          <p className="text-muted-foreground mb-8">Your extracted page is ready.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={splitResultUrl} download="split-page.pdf" className="inline-flex h-14 items-center justify-center rounded-full bg-secondary px-12 text-lg font-bold text-secondary-foreground">
              Download Page 1
            </a>
            <Button variant="outline" className="rounded-full px-12 h-14 text-lg" onClick={() => { setFile(null); setSplitResultUrl(null); }}>
              Try Again
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
