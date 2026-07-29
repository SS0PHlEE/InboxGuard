const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";

export const gmailScopes = [
  "openid",
  "email",
  "profile",
  "https://www.googleapis.com/auth/gmail.readonly",
];

export function getGoogleConfig() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;
  return { clientId, clientSecret };
}

export function getCallbackUrl(request: Request) {
  return process.env.GOOGLE_REDIRECT_URI || new URL("/api/gmail/callback", request.url).toString();
}

export function makeGoogleAuthUrl(request: Request, state: string) {
  const config = getGoogleConfig();
  if (!config) return null;
  const url = new URL(GOOGLE_AUTH_URL);
  url.searchParams.set("client_id", config.clientId);
  url.searchParams.set("redirect_uri", getCallbackUrl(request));
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", gmailScopes.join(" "));
  url.searchParams.set("access_type", "online");
  url.searchParams.set("include_granted_scopes", "true");
  url.searchParams.set("prompt", "consent");
  url.searchParams.set("state", state);
  return url;
}

export async function exchangeCode(request: Request, code: string) {
  const config = getGoogleConfig();
  if (!config) throw new Error("Google OAuth is not configured.");
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: config.clientId,
      client_secret: config.clientSecret,
      redirect_uri: getCallbackUrl(request),
      grant_type: "authorization_code",
    }),
  });
  const result = await response.json();
  if (!response.ok || typeof result.access_token !== "string") throw new Error("Google did not return a usable access token.");
  return { accessToken: result.access_token as string, expiresIn: typeof result.expires_in === "number" ? result.expires_in : 3600 };
}
