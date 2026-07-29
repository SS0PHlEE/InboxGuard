"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type Message = { from: "helper" | "you"; text: string };

const starters = [
  "How can I spot phishing?",
  "I clicked a suspicious link",
  "How do I make a strong password?",
];

export default function AskPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "helper",
      text: "Hi, I’m Cyber Helper. Ask me anything about staying safe online — there are no silly questions.",
    },
  ]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function sendQuestion(event: FormEvent) {
    event.preventDefault();
    const cleanQuestion = question.trim();
    if (!cleanQuestion || isLoading) return;

    setQuestion("");
    setIsLoading(true);
    setMessages((current) => [...current, { from: "you", text: cleanQuestion }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: cleanQuestion }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Cyber Helper could not answer right now.");
      setMessages((current) => [...current, { from: "helper", text: data.answer }]);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Cyber Helper could not answer right now.";
      setMessages((current) => [...current, { from: "helper", text: message }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="ask-page">
      <nav className="nav container">
        <Link className="brand" href="/"><span>✦</span> inboxguard</Link>
        <Link className="back-link" href="/">← Back to home</Link>
      </nav>
      <section className="ask-shell container">
        <div className="ask-intro">
          <p className="eyebrow"><i /> CYBER HELPER</p>
          <h1>Ask your cybersecurity question.</h1>
          <p>Get a clear, calm answer to online-safety questions.</p>
          <div className="helper-note"><span>✦</span><p><b>Private key, private connection</b><br />Your API key stays on the website server and is never shown in the browser.</p></div>
        </div>
        <div className="chat-card">
          <div className="chat-heading"><span className="helper-avatar">✦</span><div><b>Cyber Helper</b><small>Here to help you stay safe</small></div><span className="online">● Online</span></div>
          <div className="messages" aria-live="polite">
            {messages.map((message, index) => <div className={`message ${message.from}`} key={`${message.text}-${index}`}>{message.text}</div>)}
            {isLoading && <div className="message helper">Cyber Helper is thinking…</div>}
          </div>
          <div className="starter-questions">{starters.map((starter) => <button key={starter} type="button" onClick={() => setQuestion(starter)} disabled={isLoading}>{starter}</button>)}</div>
          <form className="chat-form" onSubmit={sendQuestion}>
            <label className="sr-only" htmlFor="question">Your cybersecurity question</label>
            <input id="question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Type your question here..." disabled={isLoading} />
            <button type="submit" disabled={isLoading}>{isLoading ? "Thinking…" : <>Send <span>→</span></>}</button>
          </form>
          <p className="chat-privacy">🔒 Do not share passwords, verification codes, or private personal information.</p>
        </div>
      </section>
    </main>
  );
}
