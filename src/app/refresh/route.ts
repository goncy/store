import {revalidateTag} from "next/cache";
import {NextResponse} from "next/server";

export function POST(request: Request) {
  const secret = process.env.SECRET;

  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("Unauthorized", {status: 401});
  }

  revalidateTag("products", "max");
  revalidateTag("store", "max");
  revalidateTag("fields", "max");

  return NextResponse.json({revalidated: true});
}
