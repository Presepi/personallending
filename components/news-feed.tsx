"use client"

import { useMemo, useState } from "react"
import type { CuratedNewsItem } from "@/lib/news/types"
import { format } from "date-fns"

interface NewsFeedProps {
  items: CuratedNewsItem[]
}

export function NewsFeed({ items }: NewsFeedProps) {
  const [activeTag, setActiveTag] = useState<string>("all")
  const [activeSource, setActiveSource] = useState<string>("all")

  const tags = useMemo(() => {
    const allTags = items.flatMap((item) => item.tags || [])
    return ["all", ...Array.from(new Set(allTags))]
  }, [items])

  const sources = useMemo(() => {
    const allSources = items.map((item) => item.source)
    return ["all", ...Array.from(new Set(allSources))]
  }, [items])

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesTag = activeTag === "all" || item.tags?.includes(activeTag)
      const matchesSource = activeSource === "all" || item.source === activeSource
      return matchesTag && matchesSource
    })
  }, [items, activeTag, activeSource])

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-background/60 p-6">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
            Фильтры
          </h3>
          <p className="text-sm text-muted-foreground">
            Выберите тему или источник, чтобы быстро найти нужные инсайты.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                activeTag === tag
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {tag === "all" ? "Все теги" : tag}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {sources.map((source) => (
            <button
              key={source}
              type="button"
              onClick={() => setActiveSource(source)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                activeSource === source
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {source === "all" ? "Все источники" : source}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="glass-card rounded-2xl border border-border/60 p-6"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="rounded-full border border-border/60 px-2 py-1">
                {item.source}
              </span>
              <span>{format(new Date(item.publishedAt), "dd MMM yyyy")}</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              {item.titleRu}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              {item.summaryRu}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-5">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-primary hover:text-primary/80"
              >
                Оригинал →
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
