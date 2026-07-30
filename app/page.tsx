"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

type Warning = { title: string; advice: string; points: number; test: RegExp };

const checks: Warning[] = [
  { title: "Pressure to act quickly", advice: "Scammers often use urgency so you do not have time to think. Pause before doing anything.", points: 2, test: /urgent|immediately|act now|today|last chance|suspend|within \d+ hours/i },
  { title: "Request for a password or code", advice: "Never share a password, one-time code, or login details from an email link.", points: 3, test: /password|passcode|verification code|one-time code|login details|credentials/i },
  { title: "Unexpected link language", advice: "Do not use an unexpected email link. Find the company’s official website yourself instead.", points: 2, test: /click here|verify your account|sign in now|confirm your account|update your payment/i },
  { title: "Money or gift-card request", advice: "Unexpected payments, wire transfers, cryptocurrency, and gift cards are common scam requests.", points: 3, test: /gift card|wire transfer|bitcoin|crypto|payment overdue|invoice attached/i },
  { title: "Unexpected attachment", advice: "Do not open an attachment you were not expecting, especially if the message feels rushed or unusual.", points: 2, test: /attachment|attached file|download the file|open the document/i },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [warnings, setWarnings] = useState<Warning[] | null>(null);
  useEffect(() => {
    const selectedEmail = sessionStorage.getItem("inboxguard_selected_email");
    if (selectedEmail) {
      sessionStorage.removeItem("inboxguard_selected_email");
      window.setTimeout(() => {
        setEmail(selectedEmail);
        document.getElementById("check")?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
    const gmailLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href="#check"]'));
    const openGmail = (event: Event) => {
      event.preventDefault();
      window.location.assign("/login");
    };
    gmailLinks.forEach((link) => link.addEventListener("click", openGmail));
    return () => gmailLinks.forEach((link) => link.removeEventListener("click", openGmail));
  }, []);
  function checkEmail(event: FormEvent) { event.preventDefault(); setWarnings(email.trim() ? checks.filter((check) => check.test.test(email)) : []); }
  const score = warnings?.reduce((total, warning) => total + warning.points, 0) ?? 0;
  const risk = score >= 5 ? "High risk" : score >= 2 ? "Worth checking" : "No common signs found";

  return <main>
    <nav className="nav container"><Link className="brand" href="/"><span>✦</span> Inbox Guard</Link><div className="nav-links"><a href="#check">Check an email</a><Link href="/learn">Learn</Link><Link href="/what-to-do">What to do</Link><Link href="/ask" prefetch>Cyber Helper</Link></div><Link className="nav-button" href="/ask" prefetch>Ask Cyber Helper <span>→</span></Link></nav>
    <section className="hero container"><div className="hero-copy"><p className="eyebrow"><i /> YOUR CALM, CLEAR EMAIL SAFETY GUIDE</p><h1>Not sure if an<br />email is safe?</h1><p className="hero-text">Paste an email to spot common warning signs, practice with a realistic example, or ask Cyber Helper a question.</p><div className="hero-actions"><a className="primary-button" href="#check">Check an email <span>→</span></a><Link className="text-link" href="/learn">Try an example <span>→</span></Link></div><p className="tiny-note">No judgment. No confusing jargon. Just clear help.</p></div><div className="hero-visual" aria-hidden="true"><div className="orb orb-one" /><div className="orb orb-two" /><div className="grid-lines" /><div className="shield"><div className="shield-check">✓</div></div><div className="float-card card-top"><span className="card-icon">✉</span><div><b>New message</b><small>Check before you click</small></div><em>!</em></div><div className="float-card card-bottom"><span className="safe-dot">✓</span><div><b>You&apos;re in control</b><small>Pause. Check. Decide.</small></div></div></div></section>
    <section className="trust-strip"><div className="container trust-content"><span className="heart">♥</span><p>Built to make cybersecurity feel less scary.</p><div className="trust-items"><span>✓ Simple language</span><span>✓ Your privacy matters</span><span>✓ Free to learn</span></div></div></section>
    <section className="purpose-section container"><p className="eyebrow"><i /> ABOUT INBOX GUARD</p><h2>Email safety help for suspicious messages.</h2><p>Inbox Guard is an email-safety and phishing-awareness tool. It checks message text for common warning signs and explains what to do next. You can paste an email directly, or optionally connect Gmail with read-only access to choose a recent message. Inbox Guard cannot send, edit, or delete your email.</p></section>
    <section id="check" className="checker-section container"><div className="section-heading"><p className="eyebrow"><i /> EMAIL CHECKER</p><h2>Let&apos;s look for warning signs.</h2><p>Paste the email text below. The checker looks for common phishing patterns and gives you a simple next step.</p><p className="privacy-note">🔒 Do not paste passwords, account numbers, or other private details. Your text is checked only in this browser.</p></div><form className="checker-card" onSubmit={checkEmail}><label htmlFor="email">EMAIL CONTENT</label><textarea id="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={'Example: “Your account will be suspended today. Click here to verify your password now.”'} /><div className="checker-footer"><span>🔒 Stays in this browser</span><button type="submit">Check this email <span>→</span></button></div>{warnings !== null && <div className={`risk-result ${score >= 5 ? "high" : score >= 2 ? "medium" : "low"}`} role="status"><p className="risk-label">{risk}</p>{warnings.length > 0 ? <><p className="risk-summary">{warnings.length} warning sign{warnings.length === 1 ? "" : "s"} found. Do not click links or share information until you verify the sender.</p>{warnings.map((warning) => <div className="warning-item" key={warning.title}><b>!</b><span><strong>{warning.title}</strong>{warning.advice}</span></div>)}</> : <p className="risk-summary">This does not guarantee the email is safe. Check the complete sender address and be careful with unexpected links or attachments.</p>}</div>}</form></section>
    <section className="learn-section"><div className="container"><div className="section-heading centered"><p className="eyebrow"><i /> LEARN BY TRYING</p><h2>Can you spot the fake?</h2><p>Click through a realistic practice email to see how a phishing message tries to trick you.</p><Link className="primary-button learn-button" href="/learn">Open the practice email <span>→</span></Link></div></div></section>
    <section className="action-section container"><div><p className="eyebrow"><i /> IF SOMETHING HAPPENED</p><h2>Clicked, downloaded, or shared something?</h2><p>Do not panic. Follow a simple, safe checklist for the situation you are in.</p></div><Link className="action-link" href="/what-to-do">See what to do now <span>→</span></Link></section>
    <section className="report-section"><div className="container report-content"><div><p className="eyebrow"><i /> REPORT A SCAM</p><h2>Help stop the next one.</h2><p>If you are in the United States, you can report suspected scams to the FTC or forward phishing email to the Anti-Phishing Working Group.</p></div><div className="report-links"><a href="https://reportfraud.ftc.gov/" target="_blank" rel="noreferrer">Report to the FTC <span>↗</span></a><a href="mailto:reportphishing@apwg.org">Forward phishing email <span>↗</span></a></div></div></section>
    <footer><div className="container footer-content"><Link className="brand" href="/"><span>✦</span> Inbox Guard</Link><p>Pause. Check. Decide.</p><div className="footer-links"><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms of Service</Link><Link href="/ask">Cyber Helper →</Link></div></div></footer>
  </main>;
}
