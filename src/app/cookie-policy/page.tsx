
/**
 * @fileOverview Cookie Policy for EasyFiles.
 */

import { Metadata } from 'next';
import { Cookie } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cookie Policy | EasyFiles',
  description: 'Learn how EasyFiles uses cookies to enhance your experience and serve relevant ads.',
};

export default function CookiePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <header className="mb-16">
        <div className="bg-primary/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
          <Cookie className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-headline text-5xl font-bold mb-4">Cookie Policy</h1>
        <p className="text-muted-foreground">Last updated: June 16, 2024</p>
      </header>
      
      <div className="prose prose-invert max-w-none space-y-12 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-foreground">What are cookies?</h2>
          <p>Cookies are small text files that are placed on your computer by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">How we use cookies</h2>
          <p>EasyFiles uses cookies for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-4">
            <li><strong>Essential Cookies:</strong> These are required for the technical operation of our tools (e.g., maintaining your session during a PDF merge).</li>
            <li><strong>Analytical Cookies:</strong> We use tools like Google Analytics to understand how visitors interact with our website, which helps us improve our tools.</li>
            <li><strong>Advertising Cookies:</strong> We use Google AdSense to show ads. These cookies allow Google to serve ads that are relevant to your interests based on your browsing behavior.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">Managing your preferences</h2>
          <p>Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit <a href="https://www.aboutcookies.org" className="text-primary hover:underline">aboutcookies.org</a> or <a href="https://www.allaboutcookies.org" className="text-primary hover:underline">allaboutcookies.org</a>.</p>
        </section>

        <section className="bg-white/5 p-8 rounded-3xl border border-white/10">
          <h3 className="font-bold text-foreground mb-4">Opting out of Advertising Cookies</h3>
          <p className="m-0 text-sm">You can opt out of personalized advertising by visiting Google's <a href="https://www.google.com/settings/ads" className="text-primary hover:underline">Ads Settings</a> or by visiting <a href="https://www.aboutads.info" className="text-primary hover:underline">www.aboutads.info</a>.</p>
        </section>
      </div>
    </div>
  );
}
