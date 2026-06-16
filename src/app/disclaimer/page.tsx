
/**
 * @fileOverview Disclaimer page for EasyFiles.
 */

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer | EasyFiles',
  description: 'Legal disclaimer regarding tool accuracy, AI results, and service limitations.',
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <header className="mb-16">
        <h1 className="font-headline text-5xl font-bold mb-4">Disclaimer</h1>
        <p className="text-muted-foreground">Last updated: June 16, 2024</p>
      </header>
      
      <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-foreground">1. Accuracy of Information</h2>
          <p>The information and tools provided on EasyFiles are for general informational purposes only. While we endeavor to keep the tools accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, or services contained on the website for any purpose.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">2. AI-Generated Content</h2>
          <p>Our AI-powered tools (including PDF Summary, Chat, and Translator) utilize Large Language Models (LLMs). These models are capable of generating "hallucinations" or factually incorrect information. Users should independently verify any critical information obtained through these AI tools. EasyFiles is not responsible for any decisions made based on AI-generated summaries or translations.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">3. Professional Advice</h2>
          <p>The content on this website does not constitute legal, financial, or professional advice. Always seek the advice of a qualified professional with any questions you may have regarding document security, legal contracts, or financial records.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">4. External Links</h2>
          <p>Through this website, you are able to link to other websites which are not under the control of EasyFiles. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.</p>
        </section>

        <section className="p-8 glass rounded-3xl border-none">
          <p className="m-0 text-sm font-bold uppercase tracking-widest text-center">Use of this platform constitutes acceptance of this disclaimer.</p>
        </section>
      </div>
    </div>
  );
}
