import { NextResponse } from "next/server"
import { runNewsPipeline } from "@/lib/news/pipeline"

export async function GET(request: Request) {
  const isCron = request.headers.get("x-vercel-cron")

  if (!isCron) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const store = await runNewsPipeline()
    return NextResponse.json({ updatedAt: store.updatedAt, curated: store.curatedItems.length })
  } catch (error) {
    return NextResponse.json({ error: "Cron refresh failed", details: String(error) }, { status: 500 })
  }
}
