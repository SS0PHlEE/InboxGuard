import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Inbox Guard",
  description: "How Inbox Guard handles information when you use the email checker or connect Gmail.",
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <nav className="nav container">
        <Link className="brand" href="/"><span>✦</span> inboxguard</Link>
        <Link className="back-link" href="/">← Back to home</Link>
      </nav>

      <header className="privacy-hero container">
        <p className="eyebrow"><i /> PRIVACY POLICY</p>
        <h1>Your email stays yours.</h1>
        <p>Inbox Guard is designed to help you check suspicious email while collecting as little information as possible.</p>
        <p className="privacy-updated">Last updated: July 29, 2026</p>
      </header>

      <section className="privacy-content container">
        <article>
          <h2>Information you provide</h2>
          <p>You can paste email text directly into the checker. That checker runs in your browser. Do not include passwords, verification codes, financial account numbers, or other information you do not want to share.</p>
        </article>

        <article>
          <h2>Connecting Gmail</h2>
          <p>Connecting Gmail is optional. If you choose to connect it, Inbox Guard asks Google for read-only permission so you can select a recent inbox message to check. Inbox Guard cannot send, edit, or delete your email.</p>
          <p>Inbox Guard requests the Google OAuth scope <code>https://www.googleapis.com/auth/gmail.readonly</code>. Google also provides basic account information needed for the connection, such as your account identity.</p>
        </article>

        <article>
          <h2>How Gmail data is handled</h2>
          <p>When you connect Gmail, a short-lived access token is stored in a secure, HTTP-only browser cookie. Inbox Guard&apos;s server uses that token to request up to 10 recent inbox messages from Google and sends the message details to your browser so you can choose one.</p>
          <p>Inbox Guard does not use a database to permanently store your Gmail access token or email messages. When you select a message, its text is placed in your browser&apos;s session storage and removed after it is copied into the checker. The access cookie expires automatically and is deleted when you disconnect.</p>
        </article>

        <article>
          <h2>How information is used</h2>
          <p>Gmail information is used only to provide the user-facing email selection and safety checking features you request. Inbox Guard does not sell Gmail data, use it for advertising, or share it with data brokers.</p>
        </article>

        <article>
          <h2>Sharing and disclosure</h2>
          <p>Information is shared with service providers only as needed to operate the app, including Google for Gmail access and Vercel for application hosting. Information may also be disclosed when required by law or to protect the security and integrity of the service.</p>
        </article>

        <article>
          <h2>Your choices and deletion</h2>
          <p>Gmail access is optional. Use the <strong>Disconnect</strong> button on the Gmail page to delete the access cookie from your browser. You can also revoke Inbox Guard&apos;s access at any time from your Google Account&apos;s third-party connections page. Closing the browser session clears session-stored email text.</p>
        </article>

        <article>
          <h2>Security</h2>
          <p>Inbox Guard uses HTTPS in production and limits Gmail access to read-only permission. No online service can guarantee absolute security, but access is limited to what is needed for the feature.</p>
        </article>

        <article>
          <h2>Children&apos;s privacy</h2>
          <p>Inbox Guard is not directed to children under 13, and it does not knowingly collect personal information from children under 13.</p>
        </article>

        <article>
          <h2>Changes to this policy</h2>
          <p>This policy may be updated as Inbox Guard changes. The latest version will always be posted on this page with its updated date.</p>
        </article>

        <article>
          <h2>Contact</h2>
          <p>For privacy questions or requests, contact Inbox Guard using the developer support email shown on the Google authorization screen.</p>
        </article>
      </section>

      <footer>
        <div className="container footer-content">
          <Link className="brand" href="/"><span>✦</span> inboxguard</Link>
          <p>Pause. Check. Decide.</p>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
      </footer>
    </main>
  );
}
