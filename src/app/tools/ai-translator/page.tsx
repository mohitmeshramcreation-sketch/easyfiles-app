"use client";

/**
 * @fileOverview AI-powered document translator tool.
 */

import { useState } from 'react';
import { FileDropzone } from '@/components/shared/FileDropzone';
import { translateDocument } from '@/ai/flows/translate-document-flow';
import { Button } from '@/components/ui/button';
import { Languages, Download, Sparkles, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AITranslatorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [language, setLanguage] = useState('Spanish');
  const { toast } = useToast();

  const handleFileSelected = async (files: File[]) => {
    if (!files[0]) return;
    setIsLoading(true);
    setProgress(20);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUri = e.target?.result as string;
        setProgress(50);
        const result = await translateDocument({ pdfDataUri: dataUri, targetLanguage: language });
        setTranslatedText(result.translatedText);
        setProgress(100);
      };
      reader.readAsDataURL(files[0]);
    } catch (error) {
      toast({ variant: "destructive", title: "Translation Failed", description: "AI could not translate this document." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold mb-4">AI Document Translator</h1>
        <p className="text-muted-foreground text-lg">Break language barriers. Translate PDFs into dozens of languages with AI accuracy.</p>
      </div>

      {!translatedText ? (
        <div className="space-y-8 max-w-2xl mx-auto">
          <Card className="glass p-6 border-none">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 block flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" /> Target Language
            </label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="h-12 rounded-xl">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {['Spanish', 'French', 'German', 'Italian', 'Japanese', 'Chinese', 'Hindi', 'Arabic'].map(lang => (
                  <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>
          <FileDropzone accept="application/pdf" onFilesSelected={handleFileSelected} isLoading={isLoading} progress={progress} />
        </div>
      ) : (
        <Card className="glass p-10 border-none space-y-8 animate-in zoom-in duration-500">
          <h3 className="text-2xl font-headline font-bold flex items-center gap-2">
            <Languages className="h-6 w-6 text-primary" /> Translated Content ({language})
          </h3>
          <div className="bg-background/50 p-8 rounded-3xl border max-h-[500px] overflow-y-auto whitespace-pre-wrap leading-relaxed">
            {translatedText}
          </div>
          <div className="flex gap-4">
             <Button className="rounded-full px-8 gap-2" onClick={() => window.print()}>
               <Download className="h-4 w-4" /> Download Result
             </Button>
             <Button variant="outline" className="rounded-full px-8" onClick={() => setTranslatedText(null)}>
               New Translation
             </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
