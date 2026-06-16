
/**
 * @fileOverview DMCA and Copyright Policy for EasyFiles.
 */

import { Metadata } from 'next';
import { Copyright, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'DMCA & Copyright Policy | EasyFiles',
  description: 'Information about copyright protection and how to report intellectual property issues on EasyFiles.',
};

export default function CopyrightPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <header className="mb-16">
        <div className="bg-secondary/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
          <Copyright className="h-8 w-8 text-secondary" />
        </div>
        <h1 className="font-headline text-5xl font-bold mb-4">DMCA Policy</h1>
        <p className="text-muted-foreground">Digital Millennium Copyright Act Compliance</p>
      </header>
      
      <div className="prose prose-invert max-w-none space-y-12 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <Scale className="h-6 w-6 text-primary" /> Notification of Infringement
          </h2>
          <p>EasyFiles respects the intellectual property rights of others. If you believe that your work has been copied in a way that constitutes copyright infringement, please provide our Copyright Agent with the following information in writing:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright interest;</li>
            <li>A description of the copyrighted work that you claim has been infringed;</li>
            <li>A description of where the material that you claim is infringing is located on the site;</li>
            <li>Your address, telephone number, and email address;</li>
            <li>A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law;</li>
            <li>A statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">Contact Our Agent</h2>
          <p>Email your notification to: <span className="text-primary font-bold">dmca@easyfiles.online</span></p>
          <p className="text-sm mt-4 italic">Please note: Because EasyFiles does not store user-uploaded content permanently (all files are deleted within 24 hours), we typically do not have long-term access to infringing files. However, we will act promptly on all valid reports.</p>
        </section>

        <section className="bg-white/5 p-8 rounded-3xl border border-white/10">
          <h3 className="font-bold text-foreground mb-4">Counter-Notification</h3>
          <p className="m-0 text-sm">If you believe that your content was removed by mistake or misidentification, you may submit a counter-notification to the email above including the required legal statements under the DMCA.</p>
        </section>
      </div>
    </div>
  );
}
