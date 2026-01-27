import { NextResponse } from "next/server"
import { loadNewsStore } from "@/lib/news/pipeline"

export async function GET() {
  const store = await loadNewsStore()
  return NextResponse.json(store)
}
