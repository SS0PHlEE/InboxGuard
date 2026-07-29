type GmailHeader = { name?: string; value?: string };
type GmailPart = { mimeType?: string; body?: { data?: string }; parts?: GmailPart[] };

function decodeBase64Url(value: string) {
  return Buffer.from(value.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
}

function findTextPart(part: GmailPart): string {
  if (part.mimeType === "text/plain" && part.body?.data) return decodeBase64Url(part.body.data);
  for (const child of part.parts || []) {
    const text = findTextPart(child);
    if (text) return text;
  }
  return "";
}

export async function GET(request: Request) {
  const accessToken = request.headers.get("cookie")?.split("; ").find((item) => item.startsWith("gmail_access_token="))?.slice("gmail_access_token=".length);
  if (!accessToken) return Response.json({ connected: false, messages: [] }, { status: 401 });
  const headers = { Authorization: `Bearer ${accessToken}` };
  const listResponse = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=10&labelIds=INBOX", { headers, cache: "no-store" });
  if (listResponse.status === 401) return Response.json({ connected: false, messages: [], error: "Your Gmail connection expired. Please reconnect." }, { status: 401 });
  if (!listResponse.ok) {
    const googleError = await listResponse.json().catch(() => null);
    const reason = googleError?.error?.errors?.[0]?.reason;
    const message = googleError?.error?.message || "";
    console.error("Gmail message list failed", { status: listResponse.status, reason, message });
    if (reason === "accessNotConfigured" || /has not been used|is disabled/i.test(message)) {
      return Response.json({ connected: true, messages: [], error: "The Gmail API is not enabled for this Google Cloud project. Enable Gmail API, wait a minute, then refresh." }, { status: 503 });
    }
    if (reason === "insufficientPermissions" || /insufficient.*scope|permission/i.test(message)) {
      return Response.json({ connected: false, messages: [], error: "Gmail read permission was not granted. Disconnect, then connect again and approve Gmail access." }, { status: 403 });
    }
    return Response.json({ connected: true, messages: [], error: "Gmail could not load messages right now." }, { status: 502 });
  }
  const list = await listResponse.json();
  const messages = await Promise.all((list.messages || []).map(async ({ id }: { id: string }) => {
    const response = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${encodeURIComponent(id)}?format=full`, { headers, cache: "no-store" });
    if (!response.ok) return null;
    const message = await response.json();
    const messageHeaders = (message.payload?.headers || []) as GmailHeader[];
    const header = (name: string) => messageHeaders.find((item) => item.name?.toLowerCase() === name)?.value || "";
    return {
      id, from: header("from"), subject: header("subject") || "(No subject)", date: header("date"),
      snippet: message.snippet || "", body: findTextPart(message.payload || {}).slice(0, 12000),
    };
  }));
  return Response.json({ connected: true, messages: messages.filter(Boolean) });
}
