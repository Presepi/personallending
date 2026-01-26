const fs = require("fs/promises")
const path = require("path")
const { createChatCompletion } = require("../ai-client")
const { createNewsId, dedupeByLink, truncateText, withinDays } = require("./utils")

const MAX_RAW_ITEMS = 300
const RAW_RETENTION_DAYS = 30
const CANDIDATE_BATCH_SIZE = 40
const CURATED_COUNT = 10
const TRANSLATE_BATCH_SIZE = 5

async function loadSources() {
  const filePath = path.join(process.cwd(), "config", "rss-sources.json")
  const data = await fs.readFile(filePath, "utf-8")
  const parsed = JSON.parse(data)
  return parsed.sources
}

async function loadNewsStore() {
  const filePath = path.join(process.cwd(), "data", "news.json")
  const data = await fs.readFile(filePath, "utf-8")
  return JSON.parse(data)
}

async function saveNewsStore(store) {
  const filePath = path.join(process.cwd(), "data", "news.json")
  await fs.writeFile(filePath, JSON.stringify(store, null, 2))
}

function stripCdata(value) {
  return value.replace(/<!\\[CDATA\\[|\\]\\]>/g, "")
}

function stripTags(value) {
  return value.replace(/<[^>]*>/g, "").replace(/\\s+/g, " ").trim()
}

function extractTag(block, tag) {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i")
  const match = block.match(regex)
  if (!match) {
    return ""
  }
  return stripCdata(match[1]).trim()
}

function extractAtomLink(block) {
  const linkTag = block.match(/<link[^>]*>/i)
  if (!linkTag) {
    return ""
  }
  const hrefMatch = linkTag[0].match(/href=["']([^"']+)["']/i)
  return hrefMatch ? hrefMatch[1] : ""
}

function normalizeFeedItem(block, source) {
  const title = extractTag(block, "title")
  const link = extractTag(block, "link") || extractAtomLink(block)
  if (!title || !link) {
    return null
  }
  const pubDate =
    extractTag(block, "pubDate") ||
    extractTag(block, "updated") ||
    extractTag(block, "published") ||
    new Date().toISOString()
  const summary =
    extractTag(block, "content:encoded") ||
    extractTag(block, "description") ||
    extractTag(block, "summary") ||
    extractTag(block, "content")

  const cleanedSummary = truncateText(stripTags(summary || ""), 400)

  return {
    id: createNewsId(link),
    title: truncateText(stripTags(title), 180),
    link: link.trim(),
    publishedAt: new Date(pubDate).toISOString(),
    source,
    summary: cleanedSummary,
  }
}

function parseFeed(xml, source) {
  const items = []
  const itemMatches = xml.match(/<item[\s\S]*?<\/item>/gi)
  const entryMatches = xml.match(/<entry[\s\S]*?<\/entry>/gi)
  const blocks = itemMatches || entryMatches || []

  for (const block of blocks) {
    const item = normalizeFeedItem(block, source)
    if (item) {
      items.push(item)
    }
  }
  return items
}

async function fetchSource(source) {
  const response = await fetch(source.url)
  if (!response.ok) {
    throw new Error(`RSS fetch failed: ${source.name}`)
  }
  const xml = await response.text()
  return parseFeed(xml, source.name)
}

function limitToRecent(rawItems) {
  return rawItems.filter((item) => withinDays(item.publishedAt, RAW_RETENTION_DAYS))
}

function sortByDate(items) {
  return [...items].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

async function rankWithAi(items) {
  if (!items.length) {
    return []
  }

  const payload = items.map((item) => ({
    title: item.title,
    summary: truncateText(item.summary, 240),
    source: item.source,
    date: item.publishedAt,
    link: item.link,
  }))

  const systemMessage =
    "You are an editor selecting the most interesting news for digital business, marketing, and technology audiences. Return JSON only."
  const userMessage = `Select the top ${CURATED_COUNT} most relevant items. Provide reason and 2-4 tags per item.\nReturn JSON: {"items":[{"link":"...","reason":"...","tags":["AI","Startups"]}]}\nNews payload: ${JSON.stringify(
    payload
  )}`

  const response = await createChatCompletion(
    [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ],
    { temperature: 0.2 }
  )

  const content = response?.choices?.[0]?.message?.content
  if (!content) {
    return []
  }

  try {
    const parsed = JSON.parse(content)
    return (parsed.items || []).slice(0, CURATED_COUNT)
  } catch (error) {
    return []
  }
}

async function translateBatch(items) {
  if (!items.length) {
    return []
  }

  const payload = items.map((item) => ({
    link: item.link,
    title: item.title,
    summary: truncateText(item.summary, 280),
  }))

  const systemMessage = "Translate news titles and summaries to Russian. Keep it concise. Return JSON only."
  const userMessage = `Translate each item to Russian. Return JSON: {"items":[{"link":"...","titleRu":"...","summaryRu":"..."}]}. Payload: ${JSON.stringify(
    payload
  )}`

  const response = await createChatCompletion(
    [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ],
    { temperature: 0.3 }
  )

  const content = response?.choices?.[0]?.message?.content
  if (!content) {
    return []
  }

  try {
    const parsed = JSON.parse(content)
    return parsed.items || []
  } catch (error) {
    return []
  }
}

async function runNewsPipeline() {
  const sources = await loadSources()
  const results = await Promise.all(sources.map((source) => fetchSource(source)))
  const fetchedItems = results.flat()
  const existingStore = await loadNewsStore()
  const combined = dedupeByLink([...fetchedItems, ...(existingStore.rawItems || [])])
  const recent = limitToRecent(combined).slice(0, MAX_RAW_ITEMS)
  const candidates = sortByDate(recent).slice(0, CANDIDATE_BATCH_SIZE)

  let ranked = await rankWithAi(candidates)
  if (!ranked.length) {
    ranked = candidates.slice(0, CURATED_COUNT).map((item) => ({
      link: item.link,
      reason: "Trending in tech and business",
      tags: ["Tech"],
    }))
  }

  const rankedItems = ranked
    .map((rank) => {
      const base = candidates.find((item) => item.link === rank.link)
      if (!base) {
        return null
      }
      return { ...base, reason: rank.reason, tags: rank.tags }
    })
    .filter(Boolean)

  const translations = []
  for (let i = 0; i < rankedItems.length; i += TRANSLATE_BATCH_SIZE) {
    const batch = rankedItems.slice(i, i + TRANSLATE_BATCH_SIZE)
    const batchTranslations = await translateBatch(batch)
    translations.push(...batchTranslations)
  }

  const curatedItems = rankedItems.map((item) => {
    const translation = translations.find((entry) => entry.link === item.link)
    return {
      ...item,
      titleRu: translation?.titleRu || item.title,
      summaryRu: translation?.summaryRu || item.summary,
    }
  })

  const store = {
    updatedAt: new Date().toISOString(),
    rawItems: recent,
    curatedItems,
  }

  await saveNewsStore(store)
  return store
}

module.exports = {
  loadSources,
  loadNewsStore,
  parseFeed,
  runNewsPipeline,
  saveNewsStore,
}
