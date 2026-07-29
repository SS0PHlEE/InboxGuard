import { NextResponse } from "next/server";
import { exchangeCode } from "@/lib/google-oauth";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const savedState = request.headers.get("cookie")?.split("; ").find((item) => item.startsWith("gmail_oauth_state="))?.split("=")[1];
  if (!code || !state || !savedState || state !== savedState) {
    return NextResponse.redirect(new URL("/login?error=invalid-callback", request.url));
  }
  try {
    const token = await exchangeCode(request, code);
    const response = NextResponse.redirect(new URL("/login?connected=1", request.url));
    response.cookies.delete("gmail_oauth_state");
    response.cookies.set("gmail_access_token", token.accessToken, {
      httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: token.expiresIn, path: "/",
    });
    return response;
  } catch {
    return NextResponse.redirect(new URL("/login?error=token-exchange", request.url));
  }
}
