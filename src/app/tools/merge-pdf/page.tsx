
"use client";

import { useState } from 'react';
import { FileDropzone } from '@/components/shared/FileDropzone';
import { Button } from '@/components/ui/button';
import { Download, FileStack, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PDFDocument } from 'pdf-lib';

export default function MergePDFPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFilesAdded = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
    setMergedPdfUrl(null);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setMergedPdfUrl(null);
  };

  const mergeFiles = async () => {
    if (files.length < 2) {
      toast({ title: "More files needed", description: "Select at least two PDFs to merge." });
      return;
    }

    setIsLoading(true);
    try {
      const mergedPdf = await PDFDocument.create();
      for (const file of files) {
        const fileArrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(fileArrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setMergedPdfUrl(URL.createObjectURL(blob));
      toast({ title: "Success!", description: "Documents merged successfully." });
    } catch (error) {
      toast({ variant: "destructive", title: "Merge failed", description: "Could not merge some files. Ensure they are not password protected." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold mb-4">Merge PDF</h1>
        <p className="text-muted-foreground text-lg">Combine multiple PDF files into one single document in seconds.</p>
      </div>

      <div className="space-y-8">
        {!mergedPdfUrl ? (
          <>
            <FileDropzone 
              accept="application/pdf"
              multiple
              onFilesSelected={handleFilesAdded}
            />
            
            {files.length > 0 && (
              <Card className="glass p-6 border-none space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-headline font-bold text-xl">Files to Merge</h3>
                  <Badge variant="outline">{files.length} Files Selected</Badge>
                </div>
                <div className="space-y-2">
                  {files.map((file, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 group">
                      <div className="flex items-center gap-3">
                        <FileStack className="h-4 w-4 text-primary" />
                        <span className="text-sm truncate max-w-[200px] md:max-w-md">{file.name}</span>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button className="w-full rounded-full h-14 text-lg font-bold" onClick={mergeFiles} disabled={isLoading || files.length < 2}>
                  {isLoading ? "Merging..." : "Merge Files"}
                </Button>
              </Card>
            )}
          </>
        ) : (
          <Card className="glass p-12 border-none text-center animate-in zoom-in duration-300">
            <div className="bg-green-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Download className="h-10 w-10 text-green-500" />
            </div>
            <h2 className="text-3xl font-headline font-bold mb-4">Files Merged!</h2>
            <p className="text-muted-foreground mb-8">Your combined PDF is ready for download.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={mergedPdfUrl} download="merged-document.pdf" className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-12 text-lg font-bold text-primary-foreground hover:bg-primary/90">
                Download PDF
              </a>
              <Button variant="outline" className="rounded-full px-12 h-14 text-lg" onClick={() => { setFiles([]); setMergedPdfUrl(null); }}>
                Start Over
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
