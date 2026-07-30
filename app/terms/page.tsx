import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Inbox Guard",
  description: "The terms that apply when you use Inbox Guard.",
};

export default function TermsPage() {
  return (
    <main className="privacy-page">
      <nav className="nav container">
        <Link className="brand" href="/"><span>✦</span> Inbox Guard</Link>
        <Link className="back-link" href="/">← Back to home</Link>
      </nav>

      <header className="privacy-hero container">
        <p className="eyebrow"><i /> TERMS OF SERVICE</p>
        <h1>Clear terms, plain language.</h1>
        <p>These terms explain the rules for using Inbox Guard and the limits of the service.</p>
        <p className="privacy-updated">Last updated: July 29, 2026</p>
      </header>

      <section className="privacy-content container">
        <article>
          <h2>Accepting these terms</h2>
          <p>By accessing or using Inbox Guard, you agree to these Terms of Service and the Privacy Policy. If you do not agree, do not use the service.</p>
        </article>

        <article>
          <h2>What Inbox Guard provides</h2>
          <p>Inbox Guard offers educational tools that help identify common warning signs in email, practice recognizing phishing attempts, and review messages selected from a connected Gmail account.</p>
          <p>The service provides general informational guidance only. It is not a substitute for professional cybersecurity, legal, financial, or law-enforcement advice, and it cannot guarantee that any email is safe or malicious.</p>
        </article>

        <article>
          <h2>Your responsibilities</h2>
          <p>You are responsible for the information you submit, the decisions you make after using the service, and keeping your accounts and devices secure. Do not paste passwords, verification codes, financial account numbers, or other highly sensitive information into Inbox Guard.</p>
          <p>You may use the service only in compliance with applicable laws and the rights of others.</p>
        </article>

        <article>
          <h2>Gmail connection</h2>
          <p>Connecting Gmail is optional. If you connect it, you authorize Inbox Guard to use Google&apos;s read-only Gmail permission to display recent messages for you to select and check. Inbox Guard cannot send, edit, or delete your email.</p>
          <p>You may disconnect through Inbox Guard or revoke access through your Google Account at any time. Your use of Gmail remains subject to Google&apos;s own terms and policies.</p>
        </article>

        <article>
          <h2>Acceptable use</h2>
          <p>You may not misuse Inbox Guard, attempt to gain unauthorized access to the service or another person&apos;s account, interfere with operation of the service, introduce malicious code, scrape the service in an abusive manner, or use it to violate another person&apos;s privacy or rights.</p>
        </article>

        <article>
          <h2>Availability and changes</h2>
          <p>Inbox Guard may change, suspend, or discontinue features at any time. The service may occasionally be unavailable because of maintenance, technical problems, or changes to third-party services such as Google or Vercel.</p>
        </article>

        <article>
          <h2>Third-party services</h2>
          <p>Inbox Guard relies on third-party services and may link to external websites. Those services are controlled by their respective providers, and Inbox Guard is not responsible for their content, availability, security, or privacy practices.</p>
        </article>

        <article>
          <h2>No warranties</h2>
          <p>Inbox Guard is provided “as is” and “as available,” without warranties of any kind to the extent permitted by law. Results may be incomplete or inaccurate, and you should independently verify suspicious messages using trusted contact information.</p>
        </article>

        <article>
          <h2>Limitation of liability</h2>
          <p>To the fullest extent permitted by law, Inbox Guard and its developer will not be liable for indirect, incidental, special, consequential, or punitive damages, or for losses resulting from reliance on the service, phishing, fraud, account compromise, data loss, or service interruption.</p>
        </article>

        <article>
          <h2>Changes to these terms</h2>
          <p>These terms may be updated as Inbox Guard changes. The latest version will be posted on this page with its updated date. Continued use after an update means you accept the revised terms.</p>
        </article>

        <article>
          <h2>Contact</h2>
          <p>For questions about these terms, contact Inbox Guard using the developer support email shown on the Google authorization screen.</p>
        </article>
      </section>

      <footer>
        <div className="container footer-content">
          <Link className="brand" href="/"><span>✦</span> Inbox Guard</Link>
          <p>Pause. Check. Decide.</p>
          <div className="footer-links"><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms of Service</Link></div>
        </div>
      </footer>
    </main>
  );
}
