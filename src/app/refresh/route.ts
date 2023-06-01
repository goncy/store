import {revalidatePath} from "next/cache";
import {NextResponse} from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  revalidatePath("/");

  return NextResponse.json({revalidated: true});
}
