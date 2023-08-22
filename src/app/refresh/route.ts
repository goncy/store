import {revalidateTag} from "next/cache";
import {NextResponse} from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  revalidateTag("products");
  revalidateTag("store");
  revalidateTag("fields");

  return NextResponse.json({revalidated: true});
}
