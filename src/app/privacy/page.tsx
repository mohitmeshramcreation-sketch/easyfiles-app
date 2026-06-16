
/**
 * @fileOverview Comprehensive Privacy Policy for EasyFiles.
 * Essential for Google AdSense and user trust.
 */

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Your Data is Secure | EasyFiles',
  description: 'EasyFiles values your privacy. Learn how we handle your files, data security, and our strict auto-deletion policies.',
};

export default function PrivacyPage() {
  const lastUpdated = "June 16, 2024";

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <header className="mb-16">
        <h1 className="font-headline text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
      </header>
      
      <div className="prose prose-invert max-w-none space-y-12 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-foreground">1. Introduction</h2>
          <p>Welcome to EasyFiles ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website easyfiles.online and use our document tools.</p>
        </section>

        <section className="bg-primary/5 p-8 rounded-[2rem] border border-primary/10">
          <h2 className="text-2xl font-bold text-primary mb-4">2. The "No Storage" Commitment</h2>
          <p className="text-foreground font-medium mb-4 italic">"Your files are your own. We do not store, view, or share your documents."</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Client-Side Processing:</strong> Most of our tools (like Images to PDF, Merge, Split) run entirely in your web browser. Your files never leave your computer.</li>
            <li><strong>Cloud Processing:</strong> For AI-powered tools that require server-side computation, files are encrypted during transit and processed in a secure sandbox.</li>
            <li><strong>Automatic Deletion:</strong> All server-side processed files are automatically and permanently deleted within 24 hours. We do not maintain any long-term storage of user files.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">3. Information We Collect</h2>
          <p>We collect minimal data required to provide and improve our services:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Usage Data:</strong> Anonymous information about how you interact with the site (e.g., page views, tool usage frequency).</li>
            <li><strong>Cookies:</strong> Essential cookies for website functionality and analytical cookies to understand traffic patterns.</li>
            <li><strong>Advertising Data:</strong> We use Google AdSense to serve ads. Google may use cookies to serve ads based on your prior visits to this or other websites.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">4. Google AdSense & Third Parties</h2>
          <p>Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-primary hover:underline">Google Ad Settings</a>.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">5. Data Security</h2>
          <p>We implement bank-grade SSL encryption for all data transmissions. Our infrastructure is regularly audited to ensure the highest standards of digital safety.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">6. Your Rights</h2>
          <p>Depending on your location (such as the EU under GDPR), you may have rights regarding your data, including the right to access, correct, or delete any personal information we may have. Since we store minimal personal data and no user files, most requests are handled by the automatic nature of our system.</p>
        </section>

        <section className="p-8 glass rounded-3xl border-none">
          <h3 className="font-bold text-foreground mb-4">Contact Privacy Team</h3>
          <p className="m-0">If you have any questions regarding this policy, please contact us at <span className="font-bold text-primary">privacy@easyfiles.online</span></p>
        </section>
      </div>
    </div>
  );
}
