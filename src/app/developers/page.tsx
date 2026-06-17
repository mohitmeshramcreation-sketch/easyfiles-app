'use client';

/**
 * @fileOverview Developer portal for managing API Keys.
 */

import { useState, useMemo } from 'react';
import { useUser, useFirestore, useCollection } from '@/firebase';
import { collection, query, where, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Key, Copy, Trash2, Plus, Code, ShieldCheck, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

export default function DevelopersPage() {
  const { user, loading: authLoading } = useUser();
  const db = useFirestore();
  const { toast } = useToast();
  const [newKeyName, setNewKeyName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const keysQuery = useMemo(() => {
    if (!db || !user) return null;
    return query(collection(db, 'apiKeys'), where('userId', '==', user.uid));
  }, [db, user]);

  const { data: keys, loading: keysLoading } = useCollection(keysQuery);

  const generateKey = async () => {
    if (!user || !db || !newKeyName.trim()) return;
    setIsGenerating(true);

    const key = `ef_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    
    try {
      await addDoc(collection(db, 'apiKeys'), {
        userId: user.uid,
        name: newKeyName,
        key: key,
        createdAt: serverTimestamp(),
      });
      setNewKeyName('');
      toast({ title: "API Key Generated", description: "Your new key is ready to use." });
    } catch (e) {
      toast({ variant: "destructive", title: "Generation Failed", description: "Could not create API key." });
    } finally {
      setIsGenerating(false);
    }
  };

  const deleteKey = async (id: string) => {
    if (!db) return;
    try {
      await deleteDoc(doc(db, 'apiKeys', id));
      toast({ title: "Key Revoked", description: "The API key has been deleted." });
    } catch (e) {
      toast({ variant: "destructive", title: "Delete Failed", description: "Could not revoke key." });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "API key copied to clipboard." });
  };

  if (authLoading) return <div className="max-w-5xl mx-auto py-20 px-4"><Skeleton className="h-[400px] w-full" /></div>;

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-32 px-4 text-center">
        <div className="bg-primary/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <Code className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-headline font-bold mb-4">Developer Portal</h1>
        <p className="text-muted-foreground text-lg mb-8">Sign in to generate API keys and integrate EasyFiles into your apps.</p>
        <Button size="lg" className="rounded-full px-12" onClick={() => {/* Sign in trigger handled by middleware or separate login component if desired */}}>
          Sign In to Get Started
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-headline font-bold mb-2">Developer Dashboard</h1>
        <p className="text-muted-foreground">Manage your API keys for programmatic access to EasyFiles tools.</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <Card className="glass p-8 border-none">
            <h3 className="text-xl font-headline font-bold mb-6 flex items-center gap-2">
              <Key className="h-5 w-5 text-primary" /> Your API Keys
            </h3>
            
            {keysLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ) : keys && keys.length > 0 ? (
              <div className="space-y-4">
                {keys.map((k) => (
                  <div key={k.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between group">
                    <div>
                      <p className="font-bold text-sm mb-1">{k.name}</p>
                      <code className="text-xs text-muted-foreground bg-black/20 px-2 py-1 rounded">
                        {k.key.substring(0, 8)}****************{k.key.substring(k.key.length - 4)}
                      </code>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" onClick={() => copyToClipboard(k.key)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => deleteKey(k.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed rounded-3xl border-white/5">
                <p className="text-muted-foreground">No API keys found. Generate one to get started.</p>
              </div>
            )}
          </Card>

          <Card className="glass p-8 border-none bg-primary/5">
            <h3 className="text-xl font-headline font-bold mb-4">Generate New Key</h3>
            <div className="flex gap-4">
              <Input 
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="Key Label (e.g. Production App)"
                className="h-12 rounded-xl bg-white/5"
              />
              <Button disabled={isGenerating || !newKeyName.trim()} onClick={generateKey} className="rounded-xl h-12 px-8">
                {isGenerating ? "Generating..." : "Create Key"} <Plus className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card className="glass p-6 border-none">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <Zap className="h-4 w-4 text-secondary" /> Quick Start
            </h4>
            <div className="space-y-4 text-xs text-muted-foreground leading-relaxed">
              <p>Include your API key in the header of your requests:</p>
              <pre className="bg-black/40 p-3 rounded-xl overflow-x-auto text-primary">
                {`Authorization: Bearer YOUR_API_KEY`}
              </pre>
              <p>Current Rate Limits:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>100 requests / minute</li>
                <li>50MB file upload limit</li>
              </ul>
            </div>
          </Card>

          <Card className="glass p-6 border-none">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" /> Security Best Practices
            </h4>
            <ul className="space-y-3 text-xs text-muted-foreground">
              <li>• Never share your keys publicly.</li>
              <li>• Use environment variables to store keys.</li>
              <li>• Rotate your keys every 90 days.</li>
              <li>• Delete keys immediately if compromised.</li>
            </ul>
          </Card>
        </aside>
      </div>
    </div>
  );
}