
"use client";

import { useState } from 'react';
import { FileDropzone } from '@/components/shared/FileDropzone';
import { askQuestionsFromPdf } from '@/ai/flows/pdf-qa-flow';
import { Button } from '@/components/ui/button';
import { Send, MessageSquare, FileText, User, Sparkles, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function PDFChatPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [pdfDataUri, setPdfDataUri] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const { toast } = useToast();

  const handleFileSelected = async (files: File[]) => {
    if (!files[0]) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setPdfDataUri(e.target?.result as string);
      setMessages([{ role: 'assistant', content: "Document uploaded! What would you like to know about it?" }]);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || !pdfDataUri || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await askQuestionsFromPdf({
        pdfDataUri,
        question: userMessage
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.answer }]);
    } catch (error) {
      toast({
        title: "AI Failed",
        description: "Could not get an answer. Try a different question.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 h-[calc(100vh-8rem)] flex flex-col">
      <div className="text-center mb-8 shrink-0">
        <h1 className="font-headline text-4xl font-bold mb-2">Chat with PDF</h1>
        <p className="text-muted-foreground">Ask anything about your document and get instant answers.</p>
      </div>

      {!pdfDataUri ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-2xl">
            <FileDropzone 
              accept="application/pdf"
              onFilesSelected={handleFileSelected}
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col glass rounded-[2rem] overflow-hidden border-none relative">
          {/* Document Info Header */}
          <div className="px-6 py-4 border-b flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-medium text-sm">Active Document</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => { setPdfDataUri(null); setMessages([]); }} className="rounded-full">
              <X className="h-4 w-4 mr-2" /> Change File
            </Button>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6 max-w-4xl mx-auto">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-4 ${msg.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === 'assistant' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'
                  }`}>
                    {msg.role === 'assistant' ? <Sparkles className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </div>
                  <div className={`p-4 rounded-2xl max-w-[80%] ${
                    msg.role === 'assistant' ? 'bg-muted/50 rounded-tl-none' : 'bg-primary text-primary-foreground rounded-tr-none'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-primary/20 shrink-0" />
                  <div className="p-4 rounded-2xl bg-muted/50 w-2/3 h-12" />
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Chat Input */}
          <div className="p-6 border-t bg-white/5">
            <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex gap-4">
              <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question about this PDF..."
                className="rounded-full h-12 px-6"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" className="h-12 w-12 rounded-full shrink-0" disabled={isLoading || !input.trim()}>
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
