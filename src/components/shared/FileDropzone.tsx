"use client";

import { useState, useRef } from 'react';
import { Upload, X, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface FileDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  isLoading?: boolean;
  progress?: number;
}

export function FileDropzone({
  onFilesSelected,
  accept = "*",
  multiple = false,
  maxSize = 50,
  isLoading = false,
  progress = 0
}: FileDropzoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      setSelectedFiles(files);
      onFilesSelected(files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
      onFilesSelected(files);
    }
  };

  const clearFiles = () => {
    setSelectedFiles([]);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="w-full">
      {!selectedFiles.length ? (
        <div
          className={`relative glass rounded-[2rem] p-12 text-center border-2 border-dashed transition-all duration-300 ${
            dragActive ? "border-primary bg-primary/5 scale-[1.01]" : "border-muted hover:border-primary/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept={accept}
            multiple={multiple}
            onChange={handleChange}
          />
          <div className="bg-primary/10 p-4 rounded-2xl w-fit mx-auto mb-6">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-headline font-bold mb-2">Drag and drop your files</h3>
          <p className="text-muted-foreground mb-6">
            Limit {maxSize}MB per file. {accept !== "*" && `Supports ${accept}`}
          </p>
          <Button variant="outline" className="rounded-full px-8">
            Choose Files
          </Button>
        </div>
      ) : (
        <div className="glass rounded-[2rem] p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/20 p-3 rounded-xl">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <h4 className="font-bold leading-none mb-1">
                  {selectedFiles.length > 1 ? `${selectedFiles.length} files selected` : selectedFiles[0].name}
                </h4>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {(selectedFiles.reduce((acc, f) => acc + f.size, 0) / (1024 * 1024)).toFixed(2)} MB total
                </p>
              </div>
            </div>
            {!isLoading && (
              <button onClick={clearFiles} className="p-2 hover:bg-muted rounded-full transition-colors">
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {isLoading && (
            <div className="space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="flex justify-between text-sm mb-2">
                <span className="flex items-center gap-2 font-medium">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  Processing...
                </span>
                <span className="text-primary font-bold">{progress}%</span>
              </div>
              <Progress value={progress} className="h-3 rounded-full" />
            </div>
          )}

          {!isLoading && progress === 100 && (
            <div className="flex flex-col items-center py-6 text-center animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-green-500/20 p-4 rounded-full mb-4">
                <CheckCircle2 className="h-10 w-10 text-green-500" />
              </div>
              <h3 className="text-xl font-headline font-bold mb-2">Task Completed!</h3>
              <p className="text-muted-foreground mb-6">Your file is ready for download.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}