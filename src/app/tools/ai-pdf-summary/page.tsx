"use client";

import { useState } from 'react';
import { FileDropzone } from '@/components/shared/FileDropzone';
import { summarizePdf } from '@/ai/flows/summarize-pdf-flow';
import { Button } from '@/components/ui/button';
import { Download, Sparkles, FileText, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';

export default function AIPDFSummaryPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [summary, setSummary] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileSelected = async (files: File[]) => {
    if (!files[0]) return;
    
    setIsLoading(true);
    setProgress(10);

    try {
      const file = files[0];
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        const dataUri = e.target?.result as string;
        setProgress(40);
        
        try {
          const result = await summarizePdf({ pdfDataUri: dataUri });
          setProgress(100);
          setSummary(result.summary);
        } catch (error) {
          toast({
            title: "AI Processing Failed",
            description: "We couldn't summarize this document. Please try a different PDF.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast({
        title: "Upload Failed",
        description: "An error occurred while reading your file.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Tool Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 text-primary font-bold text-sm">
          <Sparkles className="h-4 w-4" />
          AI Intelligence
        </div>
        <h1 className="font-headline text-5xl font-bold mb-4">AI PDF Summarizer</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Get the key insights from any document in seconds. Our AI reads your PDF so you don't have to.
        </p>
      </div>

      {/* Main Action Area */}
      <div className="mb-20">
        {!summary ? (
          <FileDropzone 
            accept="application/pdf"
            onFilesSelected={handleFileSelected}
            isLoading={isLoading}
            progress={progress}
          />
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <Card className="glass p-8 border-none overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4">
                <FileText className="h-24 w-24 text-primary/5 -rotate-12" />
              </div>
              <h3 className="text-2xl font-headline font-bold mb-6 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                Document Summary
              </h3>
              <div className="prose prose-invert max-w-none mb-8">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {summary}
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button className="rounded-full px-8 gap-2" onClick={() => window.print()}>
                  <Download className="h-4 w-4" /> Download Summary
                </Button>
                <Button variant="outline" className="rounded-full px-8" onClick={() => setSummary(null)}>
                  Upload New File
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Google AdSense placement area - Tool Sidebar/Below */}
      <div className="mb-20 h-24 bg-muted/20 border border-dashed rounded-xl flex items-center justify-center text-muted-foreground/30 text-[10px] tracking-widest uppercase">
        Advertisement
      </div>

      {/* SEO Content Section */}
      <section className="prose prose-invert max-w-none py-12 border-t">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-headline text-3xl font-bold mb-6">How Zintl AI Summarizer Works</h2>
            <p className="text-muted-foreground leading-relaxed">
              Zintl uses state-of-the-art Large Language Models (LLMs) to analyze your PDF documents. Unlike traditional tools that just pull out random sentences, Zintl understands context, tone, and the logical structure of your document.
            </p>
            <ul className="space-y-4 text-muted-foreground mt-8">
              <li className="flex gap-3">
                <div className="bg-primary/20 p-1 rounded-full h-fit mt-1"><ChevronRight className="h-3 w-3 text-primary" /></div>
                <span>Analyzes 100+ pages in seconds.</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-primary/20 p-1 rounded-full h-fit mt-1"><ChevronRight className="h-3 w-3 text-primary" /></div>
                <span>Detects key entities and conclusions.</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-primary/20 p-1 rounded-full h-fit mt-1"><ChevronRight className="h-3 w-3 text-primary" /></div>
                <span>Works with research papers, contracts, and books.</span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-headline text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-foreground mb-2">Is my data secure?</h4>
                <p className="text-sm text-muted-foreground">Yes. Zintl uses bank-grade encryption and automatically deletes files 24 hours after processing.</p>
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-2">Can it summarize images?</h4>
                <p className="text-sm text-muted-foreground">Not directly in this tool, but you can use our "AI Scanner" to convert images to PDFs first.</p>
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-2">Is there a page limit?</h4>
                <p className="text-sm text-muted-foreground">Free users can summarize documents up to 50MB and 200 pages.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}