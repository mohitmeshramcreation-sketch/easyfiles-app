"use client";

import { useState } from 'react';
import { FileDropzone } from '@/components/shared/FileDropzone';
import { Button } from '@/components/ui/button';
import { Download, Scissors, AlertCircle, FileText, Layout } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PDFDocument } from 'pdf-lib';

export default function SplitPDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [splitResultUrl, setSplitResultUrl] = useState<string | null>(null);
  const [pageRange, setPageRange] = useState<string>('1');
  const [totalPages, setTotalPages] = useState<number>(0);
  const { toast } = useToast();

  const handleFileSelected = async (files: File[]) => {
    if (files[0]) {
      try {
        const fileArrayBuffer = await files[0].arrayBuffer();
        const pdf = await PDFDocument.load(fileArrayBuffer);
        setTotalPages(pdf.getPageCount());
        setFile(files[0]);
        setSplitResultUrl(null);
      } catch (e) {
        toast({ variant: 'destructive', title: 'Invalid PDF', description: 'Could not read the PDF file.' });
      }
    }
  };

  const splitPdf = async () => {
    if (!file) return;
    setIsLoading(true);

    try {
      const fileArrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(fileArrayBuffer);
      
      // Parse range: e.g., "1, 2-5, 7"
      const indices: number[] = [];
      const parts = pageRange.split(',').map(p => p.trim());
      
      for (const part of parts) {
        if (part.includes('-')) {
          const [start, end] = part.split('-').map(Number);
          for (let i = start; i <= end; i++) {
            if (i > 0 && i <= totalPages) indices.push(i - 1);
          }
        } else {
          const pageNum = Number(part);
          if (pageNum > 0 && pageNum <= totalPages) indices.push(pageNum - 1);
        }
      }

      if (indices.length === 0) {
        toast({ variant: 'destructive', title: "Invalid Range", description: "Please enter valid page numbers." });
        setIsLoading(false);
        return;
      }

      const splitPdfDoc = await PDFDocument.create();
      const copiedPages = await splitPdfDoc.copyPages(pdf, [...new Set(indices)]);
      copiedPages.forEach((page) => splitPdfDoc.addPage(page));

      const pdfBytes = await splitPdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setSplitResultUrl(URL.createObjectURL(blob));
      toast({ title: "Split complete", description: `Extracted ${indices.length} pages into a new document.` });
    } catch (error) {
      toast({ variant: "destructive", title: "Split failed", description: "Could not process this PDF. It might be encrypted." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold mb-4">Precision PDF Splitter</h1>
        <p className="text-muted-foreground text-lg">Extract specific pages or ranges from your document with pixel-perfect accuracy.</p>
      </div>

      {!splitResultUrl ? (
        <div className="space-y-8">
          <FileDropzone 
            accept="application/pdf"
            onFilesSelected={handleFileSelected}
          />
          {file && (
            <Card className="glass p-8 border-none grid md:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-3xl mb-4">
                  <FileText className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-1 truncate w-full px-4">{file.name}</h3>
                <Badge variant="secondary" className="rounded-full">
                  {totalPages} Pages total
                </Badge>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Scissors className="h-4 w-4" />
                    Extract Pages (e.g. 1, 3-5)
                  </label>
                  <Input 
                    value={pageRange}
                    onChange={(e) => setPageRange(e.target.value)}
                    placeholder="Enter page numbers..."
                    className="rounded-xl h-12 text-lg font-mono"
                  />
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    Separate with commas or use dashes for ranges
                  </p>
                </div>

                <Button size="lg" className="w-full rounded-full h-14 text-lg font-bold" onClick={splitPdf} disabled={isLoading}>
                  {isLoading ? "Extracting..." : "Split & Download"}
                </Button>
              </div>
            </Card>
          )}
        </div>
      ) : (
        <Card className="glass p-12 border-none text-center animate-in zoom-in duration-300">
          <div className="bg-secondary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Download className="h-10 w-10 text-secondary" />
          </div>
          <h2 className="text-4xl font-headline font-bold mb-4">Pages Extracted!</h2>
          <p className="text-muted-foreground mb-10">Your selected pages have been compiled into a new PDF document.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={splitResultUrl} download="zintl-extracted-pages.pdf" className="inline-flex h-14 items-center justify-center rounded-full bg-secondary px-12 text-lg font-bold text-secondary-foreground hover:scale-105 transition-transform">
              <Download className="mr-2 h-5 w-5" /> Download PDF
            </a>
            <Button variant="outline" className="rounded-full px-12 h-14 text-lg" onClick={() => { setFile(null); setSplitResultUrl(null); }}>
              Split Another
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
