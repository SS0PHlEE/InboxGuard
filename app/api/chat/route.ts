const systemPrompt = `You are Cyber Helper for a beginner-friendly cybersecurity website called Inbox Guard. Answer only cybersecurity and online-safety questions. Be calm, clear, and practical. Use short paragraphs or bullets when useful. Never ask for passwords, verification codes, API keys, or private personal information. If a person might be in immediate danger, tell them to contact an appropriate trusted local service. For suspected account compromise, give safe immediate steps such as changing the password from the official site, enabling two-factor authentication, and contacting the company or IT team through a trusted contact method. Make clear that you are providing general safety guidance, not professional legal, financial, or emergency advice.`;

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return Response.json({ error: "Cyber Helper has no API key yet. Add your Groq key to .env.local, then restart the website." }, { status: 503 });
  }

  try {
    const body = await request.json();
    const question = typeof body.question === "string" ? body.question.trim() : "";

    if (!question) return Response.json({ error: "Please type a question first." }, { status: 400 });
    if (question.length > 2000) return Response.json({ error: "Please keep your question under 2,000 characters." }, { status: 400 });

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: question },
        ],
        temperature: 0.3,
        max_completion_tokens: 500,
      }),
    });

    const result = await groqResponse.json();

    if (!groqResponse.ok) {
      console.error("Groq chat request failed", groqResponse.status);
      if (groqResponse.status === 401) return Response.json({ error: "Cyber Helper could not verify its API key. Check that the complete Groq key is in .env.local, then restart the website." }, { status: 401 });
      if (groqResponse.status === 429) return Response.json({ error: "Cyber Helper has reached its temporary free usage limit. Please try again in a little while." }, { status: 429 });
      return Response.json({ error: "Cyber Helper cannot answer right now. Please try again shortly." }, { status: 502 });
    }

    const answer = result.choices?.[0]?.message?.content?.trim();
    if (!answer) return Response.json({ error: "Cyber Helper received an empty answer. Please try again." }, { status: 502 });

    return Response.json({ answer });
  } catch (error) {
    console.error("Cyber Helper error", error);
    return Response.json({ error: "Cyber Helper cannot connect right now. Please try again shortly." }, { status: 500 });
  }
}
