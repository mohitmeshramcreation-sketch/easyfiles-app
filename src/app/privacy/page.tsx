export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 prose prose-invert">
      <h1 className="font-headline text-5xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-muted-foreground">Last updated: May 20, 2024</p>
      
      <section className="mt-12">
        <h2 className="font-headline text-2xl font-bold">1. Information We Collect</h2>
        <p>Zintl AI collects minimal data required to provide document processing services. We collect files you upload for the sole purpose of processing them.</p>
      </section>

      <section className="mt-8">
        <h2 className="font-headline text-2xl font-bold">2. Data Security & Deletion</h2>
        <p>Your files are encrypted during transit. All processed files are automatically and permanently deleted from our servers after 24 hours. We do not store or claim ownership of your data.</p>
      </section>

      <section className="mt-8">
        <h2 className="font-headline text-2xl font-bold">3. Advertising</h2>
        <p>We use third-party advertising companies like Google AdSense to serve ads when you visit our website. These companies may use information about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.</p>
      </section>

      <section className="mt-8">
        <h2 className="font-headline text-2xl font-bold">4. Cookies</h2>
        <p>We use cookies to enhance your experience and analyze our traffic. You can choose to disable cookies in your browser settings.</p>
      </section>

      <section className="mt-12 p-8 glass rounded-3xl border-none">
        <h3 className="font-bold mb-4">Contact Us</h3>
        <p className="m-0">If you have questions about our privacy practices, please reach out to us at privacy@zintl.ai</p>
      </section>
    </div>
  );
}