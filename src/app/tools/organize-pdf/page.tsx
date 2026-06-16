
"use client";

/**
 * @fileOverview Organize PDF - Visual page reordering and deletion.
 */

import { useState } from 'react';
import { FileDropzone } from '@/components/shared/FileDropzone';
import { Button } from '@/components/ui/button';
import { Download, LayoutPanelTop, ArrowUp, ArrowDown, Trash2, FileCheck, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PDFDocument } from 'pdf-lib';

export default function OrganizePDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pageIndices, setPageIndices] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileSelected = async (files: File[]) => {
    if (files[0]) {
      try {
        const fileArrayBuffer = await files[0].arrayBuffer();
        const pdf = await PDFDocument.load(fileArrayBuffer);
        const count = pdf.getPageCount();
        setPageIndices(Array.from({ length: count }, (_, i) => i));
        setFile(files[0]);
        setResultUrl(null);
      } catch (e) {
        toast({ variant: 'destructive', title: 'Invalid PDF', description: 'Could not read file.' });
      }
    }
  };

  const movePage = (index: number, direction: 'up' | 'down') => {
    const newIndices = [...pageIndices];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newIndices.length) return;
    [newIndices[index], newIndices[newIndex]] = [newIndices[newIndex], newIndices[index]];
    setPageIndices(newIndices);
  };

  const removePage = (index: number) => {
    setPageIndices(prev => prev.filter((_, i) => i !== index));
  };

  const processPdf = async () => {
    if (!file || pageIndices.length === 0) return;
    setIsLoading(true);

    try {
      const fileArrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(fileArrayBuffer);
      const newPdf = await PDFDocument.create();
      
      const copiedPages = await newPdf.copyPages(pdf, pageIndices);
      copiedPages.forEach(p => newPdf.addPage(p));

      const pdfBytes = await newPdf.save();
      setResultUrl(URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' })));
      toast({ title: "Document Reorganized", description: "Your new PDF structure is ready." });
    } catch (e) {
      toast({ variant: 'destructive', title: 'Process Failed', description: 'Could not generate PDF.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold mb-4">Organize PDF</h1>
        <p className="text-muted-foreground text-lg">Visually reorder, rotate, or delete pages from your PDF documents.</p>
      </div>

      {!resultUrl ? (
        <div className="space-y-8">
          <FileDropzone accept="application/pdf" onFilesSelected={handleFileSelected} />
          {file && (
            <div className="grid lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-4">
                {pageIndices.map((originalIdx, i) => (
                  <Card key={`${originalIdx}-${i}`} className="glass p-4 border-none flex flex-col items-center gap-4 group">
                    <div className="aspect-[3/4] w-full bg-white/5 rounded-xl flex items-center justify-center border border-white/10 relative overflow-hidden">
                      <span className="text-4xl font-bold opacity-10">Page {originalIdx + 1}</span>
                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary" className="bg-primary/20 text-primary">{i + 1}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => movePage(i, 'up')} disabled={i === 0}>
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => movePage(i, 'down')} disabled={i === pageIndices.length - 1}>
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removePage(i)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
              <aside className="space-y-6">
                <Card className="glass p-6 border-none sticky top-24">
                  <h3 className="font-headline font-bold text-xl mb-4 flex items-center gap-2">
                    <LayoutPanelTop className="h-5 w-5 text-primary" />
                    Layout Summary
                  </h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Original Pages</span>
                      <span>{file.size > 0 ? 'Loading...' : '...'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">New Total</span>
                      <span className="font-bold text-primary">{pageIndices.length}</span>
                    </div>
                  </div>
                  <Button className="w-full rounded-full h-14 font-bold" onClick={processPdf} disabled={isLoading}>
                    {isLoading ? <RefreshCw className="h-5 w-5 animate-spin mr-2" /> : "Save Changes"}
                  </Button>
                </Card>
              </aside>
            </div>
          )}
        </div>
      ) : (
        <Card className="glass p-16 border-none text-center max-w-2xl mx-auto shadow-2xl">
          <div className="bg-primary/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <FileCheck className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-3xl font-headline font-bold mb-4">Ready to Download!</h2>
          <div className="flex justify-center gap-4">
            <a href={resultUrl} download="organized-document.pdf" className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-12 text-lg font-bold">
              <Download className="mr-2 h-5 w-5" /> Download PDF
            </a>
            <Button variant="outline" className="rounded-full px-8 h-14" onClick={() => { setFile(null); setResultUrl(null); }}>
              Start Over
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
