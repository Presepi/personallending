import { NextRequest, NextResponse } from "next/server"
import { runNewsPipeline } from "@/lib/news/pipeline"

export async function POST(request: NextRequest) {
  const token = request.headers.get("x-refresh-token") || request.nextUrl.searchParams.get("token")
  const expectedToken = process.env.NEWS_REFRESH_TOKEN

  if (!expectedToken || token !== expectedToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const store = await runNewsPipeline()
    return NextResponse.json({ updatedAt: store.updatedAt, curated: store.curatedItems.length })
  } catch (error) {
    return NextResponse.json({ error: "Refresh failed", details: String(error) }, { status: 500 })
  }
}
