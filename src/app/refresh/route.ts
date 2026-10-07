import {createHash, timingSafeEqual} from "node:crypto";

import {revalidateTag} from "next/cache";
import {NextResponse} from "next/server";

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

function isAuthorized(request: Request) {
  const secret = process.env.SECRET;
  const header = request.headers.get("authorization") ?? "";
  const [scheme, token] = header.split(" ");

  if (!secret || scheme !== "Bearer" || !token) return false;

  // Hashing gives equal-length buffers, as `timingSafeEqual` requires, without leaking the secret length.
  return timingSafeEqual(digest(token), digest(secret));
}

export function POST(request: Request) {
  if (!isAuthorized(request)) {
    return new Response("Unauthorized", {status: 401});
  }

  revalidateTag("products", "max");
  revalidateTag("store", "max");
  revalidateTag("fields", "max");

  return NextResponse.json({revalidated: true});
}

export function GET() {
  return new Response("Method Not Allowed", {status: 405, headers: {Allow: "POST"}});
}
