import {revalidatePath} from "next/cache";
import {NextResponse} from "next/server";

export function GET() {
  revalidatePath("/");

  return NextResponse.json({revalidated: true});
}
