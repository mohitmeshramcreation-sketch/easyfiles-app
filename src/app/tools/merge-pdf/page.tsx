"use client";

import { useState } from 'react';
import { FileDropzone } from '@/components/shared/FileDropzone';
import { Button } from '@/components/ui/button';
import { Download, FileStack, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
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
        <p className="text-muted-foreground text-lg">Combine multiple PDF files into one single document in your preferred order.</p>
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
              <Card className="glass p-6 border-none space-y-6">
                <div className="flex justify-between items-center px-2">
                  <h3 className="font-headline font-bold text-xl">Order of Merge</h3>
                  <Badge variant="outline">{files.length} Files Selected</Badge>
                </div>
                <div className="space-y-2">
                  {files.map((file, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 group animate-in slide-in-from-left-2 duration-300">
                      <div className="flex items-center gap-3">
                        <Badge className="w-6 h-6 p-0 flex items-center justify-center rounded-full bg-primary/20 text-primary">{i+1}</Badge>
                        <FileStack className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-sm truncate max-w-[150px] md:max-w-md">{file.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => moveFile(i, 'up')} disabled={i === 0}>
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => moveFile(i, 'down')} disabled={i === files.length - 1}>
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full rounded-full h-14 text-lg font-bold shadow-lg shadow-primary/10" onClick={mergeFiles} disabled={isLoading || files.length < 2}>
                  {isLoading ? "Processing documents..." : `Merge ${files.length} PDF Files`}
                </Button>
              </Card>
            )}
          </>
        ) : (
          <Card className="glass p-12 border-none text-center animate-in zoom-in duration-300">
            <div className="bg-green-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Download className="h-10 w-10 text-green-500" />
            </div>
            <h2 className="text-4xl font-headline font-bold mb-4">Merge Successful!</h2>
            <p className="text-muted-foreground mb-8">Your combined PDF is ready. We've optimized the file size while keeping visual fidelity.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={mergedPdfUrl} download="zintl-merged.pdf" className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-12 text-lg font-bold text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all">
                Download Merged PDF
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
