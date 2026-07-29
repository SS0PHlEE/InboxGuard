import Link from "next/link";

export default function AskLoading() {
  return (
    <main className="ask-page">
      <nav className="nav container">
        <Link className="brand" href="/">
          <span>✦</span> inboxguard
        </Link>
        <Link className="back-link" href="/">
          ← Back to home
        </Link>
      </nav>
      <section
        className="ask-shell container"
        aria-label="Loading Cyber Helper"
        aria-busy="true"
      >
        <div className="ask-intro">
          <p className="eyebrow"><i /> CYBER HELPER</p>
          <h1>Ask your cybersecurity question.</h1>
          <p>Getting Cyber Helper ready…</p>
        </div>
        <div className="chat-card chat-loading">
          <div className="chat-heading">
            <span className="helper-avatar">✦</span>
            <div>
              <b>Cyber Helper</b>
              <small>Opening your private chat</small>
            </div>
          </div>
          <div className="chat-loading-body">
            <span className="loading-dot" />
            <span className="loading-dot" />
            <span className="loading-dot" />
          </div>
        </div>
      </section>
    </main>
  );
}
