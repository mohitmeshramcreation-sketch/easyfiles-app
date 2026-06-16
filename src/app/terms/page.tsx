
/**
 * @fileOverview Professional Terms of Service for EasyFiles.
 */

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | EasyFiles',
  description: 'Understand the rules and guidelines for using EasyFiles document tools.',
};

export default function TermsPage() {
  const lastUpdated = "June 16, 2024";

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <header className="mb-16">
        <h1 className="font-headline text-5xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
      </header>
      
      <div className="prose prose-invert max-w-none space-y-12 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
          <p>By accessing and using easyfiles.online ("the Website"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">2. Use License</h2>
          <p>Permission is granted to use the tools provided on EasyFiles for personal or commercial use. This is the grant of a license, not a transfer of title, and under this license, you may not:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Attempt to decompile or reverse engineer any software contained on the Website;</li>
            <li>Use the Website for any unlawful purpose or to process illegal content;</li>
            <li>Remove any copyright or other proprietary notations from the materials;</li>
            <li>Use any automated system or software to extract data from the Website (scraping).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">3. User Responsibilities</h2>
          <p>You are solely responsible for the content of the files you upload. You must ensure you have the legal right to process and modify the documents you provide to our service.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">4. Service Availability & Accuracy</h2>
          <p>While we strive for 100% accuracy, AI-generated results (like summaries and translations) are provided "as is." We do not guarantee that the service will be uninterrupted, timely, secure, or error-free.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">5. Limitation of Liability</h2>
          <p>In no event shall EasyFiles or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the Website.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">6. Governing Law</h2>
          <p>These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which the service operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
        </section>

        <section className="p-8 glass rounded-3xl border-none">
          <h3 className="font-bold text-foreground mb-4">Questions?</h3>
          <p className="m-0 text-muted-foreground">Contact our legal team at <span className="text-primary font-bold">legal@easyfiles.online</span> for any clarification.</p>
        </section>
      </div>
    </div>
  );
}
