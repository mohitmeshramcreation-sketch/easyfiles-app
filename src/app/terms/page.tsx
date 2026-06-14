/**
 * @fileOverview Terms of service for DocuMind.
 */

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 prose prose-invert">
      <h1 className="font-headline text-5xl font-bold mb-8">Terms of Service</h1>
      <p className="text-muted-foreground">Last updated: May 20, 2024</p>
      
      <section className="mt-12">
        <h2 className="font-headline text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
        <p>By accessing and using DocuMind AI, you agree to be bound by these terms. If you do not agree, please do not use our services.</p>
      </section>

      <section className="mt-8">
        <h2 className="font-headline text-2xl font-bold text-foreground">2. Usage License</h2>
        <p>DocuMind grants you a personal, non-exclusive license to use our document tools for personal or professional use. You are responsible for the content of the files you process.</p>
      </section>

      <section className="mt-8">
        <h2 className="font-headline text-2xl font-bold text-foreground">3. Privacy and Data</h2>
        <p>Your privacy is paramount. While we process files for your immediate needs, we do not store documents permanently. AI-processed files are removed after 24 hours.</p>
      </section>

      <section className="mt-8">
        <h2 className="font-headline text-2xl font-bold text-foreground">4. Limitation of Liability</h2>
        <p>DocuMind is provided "as is". We are not liable for any data loss or errors resulting from the use of our automated document tools.</p>
      </section>

      <section className="mt-12 p-8 glass rounded-3xl border-none">
        <h3 className="font-bold mb-4">Questions?</h3>
        <p className="m-0 text-muted-foreground">Contact us at legal@documind.ai for any clarification on our terms.</p>
      </section>
    </div>
  );
}
