"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type GmailMessage = { id: string; from: string; subject: string; date: string; snippet: string; body: string };

export default function GmailPage() {
  const [messages, setMessages] = useState<GmailMessage[]>([]);
  const [connected, setConnected] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/gmail/messages").then(async (response) => {
      const data = await response.json();
      setConnected(Boolean(data.connected));
      setMessages(data.messages || []);
      if (data.error) setError(data.error);
    }).catch(() => {
      setConnected(false);
      setError("The Gmail connection could not be checked.");
    });
  }, []);

  function selectMessage(message: GmailMessage) {
    sessionStorage.setItem("inboxguard_selected_email", `From: ${message.from}\nSubject: ${message.subject}\nDate: ${message.date}\n\n${message.body || message.snippet}`);
    window.location.assign("/#check");
  }

  return <main className="gmail-page">
    <nav className="nav container"><Link className="brand" href="/"><span>✦</span> inboxguard</Link><Link className="back-link" href="/">← Back to home</Link></nav>
    <section className="gmail-shell container">
      <div className="gmail-intro"><p className="eyebrow"><i /> CHECK YOUR INBOX</p><h1>Bring in an email from Gmail.</h1><p>Connect with read-only access, choose a message, and Inbox Guard will copy it into the safety checker.</p><div className="gmail-privacy"><span>🔒</span><p><b>You stay in control.</b><br />Inbox Guard cannot send, edit, or delete email. Disconnect whenever you like.</p></div></div>
      <div className="gmail-card">
        {connected === null && <p className="gmail-status">Checking your connection…</p>}
        {connected === false && <><div className="google-mark">G</div><h2>Connect your Gmail</h2><p>Google will show exactly what Inbox Guard can read before you approve access.</p><a className="gmail-connect" href="/api/gmail/connect">Continue with Google <span>→</span></a>{error && <p className="gmail-error">{error}</p>}</>}
        {connected === true && <><div className="gmail-card-heading"><div><p className="eyebrow"><i /> RECENT INBOX</p><h2>Choose an email to check</h2></div><form action="/api/gmail/disconnect" method="post"><button type="submit">Disconnect</button></form></div>{error && <p className="gmail-error">{error}</p>}<div className="gmail-list">{messages.map((message) => <button key={message.id} type="button" onClick={() => selectMessage(message)}><span className="gmail-sender">{message.from}</span><strong>{message.subject}</strong><small>{message.snippet}</small><em>Check →</em></button>)}{!error && messages.length === 0 && <p className="gmail-status">No inbox messages found.</p>}</div></>}
      </div>
    </section>
  </main>;
}
