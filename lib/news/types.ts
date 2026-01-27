export interface RssSource {
  name: string
  url: string
}

export interface RawNewsItem {
  id: string
  title: string
  link: string
  publishedAt: string
  source: string
  summary: string
}

export interface CuratedNewsItem extends RawNewsItem {
  reason: string
  tags: string[]
  titleRu: string
  summaryRu: string
}

export interface NewsStore {
  updatedAt: string
  rawItems: RawNewsItem[]
  curatedItems: CuratedNewsItem[]
}
