import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/login", request.url), 303);
  response.cookies.delete("gmail_access_token");
  response.cookies.delete("gmail_oauth_state");
  return response;
}
