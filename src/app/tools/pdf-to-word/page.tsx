"use client";

import { useState } from 'react';
import { FileDropzone } from '@/components/shared/FileDropzone';
import { Button } from '@/components/ui/button';
import { FileText, Download, Sparkles, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';

export default function PDFToWordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();

  const handleFileSelected = async (files: File[]) => {
    if (!files[0]) return;
    setIsLoading(true);
    setProgress(0);

    // Mock processing for this specific conversion
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          setIsCompleted(true);
          toast({
            title: "Conversion Complete",
            description: "Your document is ready in Word format.",
          });
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold mb-4">PDF to Word</h1>
        <p className="text-muted-foreground text-lg">Convert your PDF documents into editable Microsoft Word files with high accuracy.</p>
      </div>

      <div className="mb-20">
        {!isCompleted ? (
          <FileDropzone 
            accept="application/pdf"
            onFilesSelected={handleFileSelected}
            isLoading={isLoading}
            progress={progress}
          />
        ) : (
          <Card className="glass p-16 border-none text-center animate-in zoom-in duration-500">
            <div className="bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
              <FileText className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-3xl font-headline font-bold mb-4">Ready to Download</h2>
            <p className="text-muted-foreground mb-10">We've preserved the layout and formatting of your PDF in the new .docx file.</p>
            <div className="flex justify-center gap-4">
              <Button className="rounded-full px-12 h-14 text-lg font-bold gap-2">
                <Download className="h-5 w-5" /> Download Word File
              </Button>
              <Button variant="outline" className="rounded-full px-8 h-14" onClick={() => setIsCompleted(false)}>
                Convert Another
              </Button>
            </div>
          </Card>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-20 pt-16 border-t border-white/5">
        <div className="flex gap-4">
          <div className="bg-secondary/10 p-3 rounded-2xl h-fit">
            <Sparkles className="h-6 w-6 text-secondary" />
          </div>
          <div>
            <h4 className="font-bold mb-2">Smart Formatting</h4>
            <p className="text-sm text-muted-foreground">Our engine identifies tables, headers, and footers to keep your document editable.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="bg-primary/10 p-3 rounded-2xl h-fit">
            <AlertCircle className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h4 className="font-bold mb-2">Privacy Guaranteed</h4>
            <p className="text-sm text-muted-foreground">Files are processed in an encrypted sandbox and deleted immediately after download.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
