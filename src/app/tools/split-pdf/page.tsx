
"use client";

import { useState } from 'react';
import { FileDropzone } from '@/components/shared/FileDropzone';
import { Button } from '@/components/ui/button';
import { Download, Scissors, AlertCircle, FileText, Layout, FileCheck } from 'lucide-react';
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
        toast({ variant: 'destructive', title: 'Invalid PDF', description: 'Could not read the PDF file. It might be corrupted or password protected.' });
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
          const [startStr, endStr] = part.split('-');
          const start = Number(startStr);
          const end = Number(endStr);
          if (!isNaN(start) && !isNaN(end)) {
            for (let i = Math.min(start, end); i <= Math.max(start, end); i++) {
              if (i > 0 && i <= totalPages) indices.push(i - 1);
            }
          }
        } else {
          const pageNum = Number(part);
          if (!isNaN(pageNum) && pageNum > 0 && pageNum <= totalPages) {
            indices.push(pageNum - 1);
          }
        }
      }

      const uniqueIndices = [...new Set(indices)].sort((a, b) => a - b);

      if (uniqueIndices.length === 0) {
        toast({ variant: 'destructive', title: "Invalid Range", description: "Please enter valid page numbers that exist in the document." });
        setIsLoading(false);
        return;
      }

      const splitPdfDoc = await PDFDocument.create();
      const copiedPages = await splitPdfDoc.copyPages(pdf, uniqueIndices);
      copiedPages.forEach((page) => splitPdfDoc.addPage(page));

      const pdfBytes = await splitPdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setSplitResultUrl(url);
      toast({ title: "Split Successful", description: `Extracted ${uniqueIndices.length} pages into a new document.` });
    } catch (error) {
      toast({ variant: "destructive", title: "Split Failed", description: "Could not process this PDF. It might be encrypted." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 text-secondary font-bold text-sm border-secondary/20">
          <Scissors className="h-4 w-4" />
          Precision PDF Extraction
        </div>
        <h1 className="font-headline text-5xl font-bold mb-4">Split PDF</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Extract specific pages or ranges from your document with pixel-perfect accuracy. No data leaves your browser.
        </p>
      </div>

      {!splitResultUrl ? (
        <div className="space-y-8 max-w-4xl mx-auto">
          <FileDropzone 
            accept="application/pdf"
            onFilesSelected={handleFileSelected}
          />
          {file && (
            <Card className="glass p-10 border-none grid md:grid-cols-2 gap-12 items-center shadow-2xl shadow-primary/5 animate-in slide-in-from-bottom-4">
              <div className="flex flex-col items-center text-center bg-white/5 p-8 rounded-3xl border border-white/5">
                <div className="bg-primary/20 p-5 rounded-3xl mb-6 shadow-xl shadow-primary/10">
                  <FileText className="h-12 w-12 text-primary" />
                </div>
                <h3 className="font-headline font-bold text-xl mb-2 truncate w-full px-4">{file.name}</h3>
                <Badge variant="secondary" className="rounded-full px-4 py-1 bg-secondary/20 text-secondary border-none">
                  {totalPages} Total Pages
                </Badge>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <Scissors className="h-4 w-4 text-primary" />
                    Define Page Range
                  </label>
                  <Input 
                    value={pageRange}
                    onChange={(e) => setPageRange(e.target.value)}
                    placeholder="e.g. 1, 3-5, 8"
                    className="rounded-xl h-14 text-xl font-mono bg-white/5 border-white/10 px-6"
                  />
                  <div className="flex items-start gap-2 text-[10px] text-muted-foreground uppercase tracking-wider px-1">
                    <AlertCircle className="h-3 w-3 mt-0.5" />
                    <span>Use commas for individual pages and dashes for ranges.</span>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full rounded-full h-14 text-lg font-bold shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 transition-all" 
                  onClick={splitPdf} 
                  disabled={isLoading}
                >
                  {isLoading ? "Extracting Pages..." : "Split & Download"}
                </Button>
              </div>
            </Card>
          )}
        </div>
      ) : (
        <Card className="glass p-16 border-none text-center max-w-2xl mx-auto shadow-2xl shadow-primary/10 animate-in zoom-in duration-500">
          <div className="bg-primary/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <FileCheck className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-4xl font-headline font-bold mb-4">Pages Extracted!</h2>
          <p className="text-muted-foreground text-lg mb-10">Your selected pages have been compiled into a new document. The original file remains untouched.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href={splitResultUrl} 
              download="zintl-extracted-document.pdf" 
              className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-12 text-lg font-bold text-primary-foreground hover:scale-105 transition-transform shadow-xl shadow-primary/20"
            >
              <Download className="mr-2 h-5 w-5" /> Download PDF
            </a>
            <Button variant="outline" className="rounded-full px-12 h-14 text-lg hover:bg-white/5" onClick={() => { setFile(null); setSplitResultUrl(null); }}>
              Split Another
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
