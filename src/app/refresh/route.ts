import type {NextRequest} from "next/server";

import {revalidateTag} from "next/cache";
import {NextResponse} from "next/server";

export function GET(request: NextRequest) {
  if (request.nextUrl.searchParams.get("secret") !== process.env.SECRET!) {
    return new Response("Unauthorized", {status: 401});
  }

  revalidateTag("products");
  revalidateTag("store");
  revalidateTag("fields");

  return NextResponse.json({revalidated: true});
}
