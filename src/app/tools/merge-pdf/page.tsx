"use client";

/**
 * @fileOverview A utility tool for merging multiple PDF documents into a single file.
 * Verified to include all necessary components like Badge and FileDropzone.
 */

import { useState } from 'react';
import { FileDropzone } from '@/components/shared/FileDropzone';
import { Button } from '@/components/ui/button';
import { Download, FileStack, Plus, Trash2, ArrowUp, ArrowDown, FileCheck } from 'lucide-react';
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
    const pdfs = newFiles.filter(f => f.type === 'application/pdf');
    if (pdfs.length < newFiles.length) {
      toast({
        title: "Invalid file type",
        description: "Only PDF files can be merged.",
        variant: "destructive"
      });
    }
    setFiles(prev => [...prev, ...pdfs]);
    setMergedPdfUrl(null);
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...files];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newFiles.length) return;
    [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]];
    setFiles(newFiles);
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
        try {
          const fileArrayBuffer = await file.arrayBuffer();
          const pdf = await PDFDocument.load(fileArrayBuffer);
          const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
          copiedPages.forEach((page) => mergedPdf.addPage(page));
        } catch (fileError) {
          console.error(`Error processing file ${file.name}:`, fileError);
          throw new Error(`Could not process "${file.name}". It might be encrypted or corrupted.`);
        }
      }
      
      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      
      if (mergedPdfUrl) {
        URL.revokeObjectURL(mergedPdfUrl);
      }
      
      const url = URL.createObjectURL(blob);
      setMergedPdfUrl(url);
      
      toast({ title: "Success!", description: "Documents merged successfully." });
    } catch (error: any) {
      console.error("Merge error:", error);
      toast({ 
        variant: "destructive", 
        title: "Merge failed", 
        description: error.message || "Could not merge some files. Ensure they are not password protected." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold mb-4">Merge PDF</h1>
        <p className="text-muted-foreground text-lg">Combine multiple PDF documents into one single file. Fast, secure, and accurate.</p>
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
              <Card className="glass p-8 border-none space-y-6 shadow-2xl shadow-primary/5 animate-in slide-in-from-bottom-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <h3 className="font-headline font-bold text-xl">Files to Merge</h3>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {files.length} Files Selected
                  </Badge>
                </div>
                <div className="space-y-2">
                  {files.map((file, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 group hover:border-primary/20 transition-all">
                      <div className="flex items-center gap-3 truncate">
                        <span className="text-xs font-bold text-muted-foreground w-6 h-6 flex items-center justify-center bg-white/10 rounded-full">{i + 1}</span>
                        <FileStack className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-sm font-medium truncate max-w-[200px] md:max-w-md">{file.name}</span>
                      </div>
                      <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => moveFile(i, 'up')} disabled={i === 0}>
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => moveFile(i, 'down')} disabled={i === files.length - 1}>
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeFile(i)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  className="w-full rounded-full h-14 text-lg font-bold shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 transition-all" 
                  onClick={mergeFiles} 
                  disabled={isLoading || files.length < 2}
                >
                  {isLoading ? "Merging Documents..." : `Merge ${files.length} PDF Files`}
                </Button>
              </Card>
            )}
          </>
        ) : (
          <Card className="glass p-16 border-none text-center animate-in zoom-in duration-500 shadow-2xl shadow-primary/10">
            <div className="bg-primary/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <FileCheck className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-4xl font-headline font-bold mb-4">Merge Successful!</h2>
            <p className="text-muted-foreground text-lg mb-10">Your combined PDF is ready. We've optimized the file structure while keeping visual fidelity.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href={mergedPdfUrl} 
                download="documind-merged-document.pdf" 
                className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-12 text-lg font-bold text-primary-foreground hover:scale-105 transition-transform shadow-xl shadow-primary/20"
              >
                <Download className="mr-2 h-5 w-5" /> Download Merged PDF
              </a>
              <Button variant="outline" className="rounded-full px-12 h-14 text-lg hover:bg-white/5" onClick={() => { setFiles([]); setMergedPdfUrl(null); }}>
                Start Over
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
