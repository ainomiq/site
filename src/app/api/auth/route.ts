import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";
  let password = "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    password = (formData.get("password") as string) || "";
  } else {
    const formData = await request.formData();
    password = (formData.get("password") as string) || "";
  }

  const expected = (process.env.SITE_PASSWORD || "XrpBtc2002!").trim();
  const match = password.trim() === expected;

  // Temporary debug — remove after confirming it works
  if (request.headers.get("x-debug") === "1") {
    return NextResponse.json({
      passwordLen: password.length,
      expectedLen: expected.length,
      match,
      passwordChars: [...password].map((c) => c.charCodeAt(0)),
      expectedChars: [...expected].map((c) => c.charCodeAt(0)),
    });
  }

  if (match) {
    const cookieStore = await cookies();
    cookieStore.set("site-auth", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    return NextResponse.redirect(new URL("/", request.url), 303);
  }

  return NextResponse.redirect(
    new URL("/password?error=1", request.url),
    303
  );
}
