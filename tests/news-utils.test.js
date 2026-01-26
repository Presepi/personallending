const assert = require("node:assert/strict")
const { test } = require("node:test")

const { dedupeByLink, truncateText } = require("../lib/news/utils")

test("dedupeByLink removes duplicates", () => {
  const items = [
    { link: "https://example.com/1" },
    { link: "https://example.com/1" },
    { link: "https://example.com/2" },
  ]
  const result = dedupeByLink(items)
  assert.equal(result.length, 2)
})

test("truncateText limits length with ellipsis", () => {
  const text = "abcdefghijklmnopqrstuvwxyz"
  const truncated = truncateText(text, 10)
  assert.ok(truncated.length <= 10)
  assert.ok(truncated.endsWith("…"))
})
