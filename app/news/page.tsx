import fs from "fs/promises"
import path from "path"
import { NewsFeed } from "@/components/news-feed"
import type { NewsStore } from "@/lib/news/types"

export default async function NewsPage() {
  const filePath = path.join(process.cwd(), "data", "news.json")
  const data = await fs.readFile(filePath, "utf-8")
  const store = JSON.parse(data) as NewsStore

  return (
    <main className="min-h-screen bg-background pt-24">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Новости и инсайты
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
            Ежедневная подборка новостей из лучших источников: отбор AI, переводы на русский
            и краткие выводы для бизнеса и специалистов.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Обновлено: {new Date(store.updatedAt).toLocaleString("ru-RU")}
          </p>
        </div>

        {store.curatedItems.length ? (
          <NewsFeed items={store.curatedItems} />
        ) : (
          <div className="rounded-2xl border border-border/60 bg-background/60 p-8 text-sm text-muted-foreground">
            Пока нет свежих новостей. Запустите обновление, чтобы заполнить ленту.
          </div>
        )}
      </section>
    </main>
  )
}
