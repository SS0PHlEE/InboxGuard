import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { makeGoogleAuthUrl } from "@/lib/google-oauth";

export async function GET(request: Request) {
  const state = randomBytes(24).toString("hex");
  const authUrl = makeGoogleAuthUrl(request, state);
  if (!authUrl) return NextResponse.redirect(new URL("/login?error=not-configured", request.url));
  const response = NextResponse.redirect(authUrl);
  response.cookies.set("gmail_oauth_state", state, {
    httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 600, path: "/",
  });
  return response;
}
