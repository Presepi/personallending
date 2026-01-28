"use client"

import { useEffect, useState } from "react"

interface NewsTeaserItem {
  id: string
  titleRu: string
  link: string
  source: string
}

interface NewsTeaserResponse {
  curatedItems: NewsTeaserItem[]
}

export function NewsTeaser() {
  const [items, setItems] = useState<NewsTeaserItem[]>([])

  useEffect(() => {
    let isMounted = true
    fetch("/api/news")
      .then((response) => response.json())
      .then((data: NewsTeaserResponse) => {
        if (!isMounted) return
        setItems(data.curatedItems?.slice(0, 5) || [])
      })
      .catch(() => {
        if (!isMounted) return
        setItems([])
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="pt-24 pb-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-2xl border border-border/60 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Автообновляемые новости
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">
                Самое важное за сегодня
              </h2>
            </div>
            <a
              href="/news"
              className="text-sm font-semibold text-primary hover:text-primary/80"
            >
              Смотреть все →
            </a>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {items.length ? (
              items.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-border/60 bg-background/60 p-4 transition hover:border-primary/40"
                >
                  <p className="text-xs text-muted-foreground">{item.source}</p>
                  <p className="mt-2 text-sm font-semibold text-foreground">
                    {item.titleRu}
                  </p>
                </a>
              ))
            ) : (
              <div className="text-sm text-muted-foreground">
                Новости обновляются. Скоро здесь появятся свежие материалы.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
