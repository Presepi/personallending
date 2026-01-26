const assert = require("node:assert/strict")
const { test } = require("node:test")

const { parseFeed } = require("../lib/news/pipeline")

test("parseFeed extracts rss items", () => {
  const xml = `
    <rss>
      <channel>
        <item>
          <title>Test Item</title>
          <link>https://example.com/test</link>
          <pubDate>Mon, 01 Jan 2024 10:00:00 GMT</pubDate>
          <description><![CDATA[Summary here]]></description>
        </item>
      </channel>
    </rss>
  `
  const items = parseFeed(xml, "Test")
  assert.equal(items.length, 1)
  assert.equal(items[0].title, "Test Item")
  assert.equal(items[0].source, "Test")
})

test("parseFeed extracts atom entries", () => {
  const xml = `
    <feed>
      <entry>
        <title>Atom Item</title>
        <link href="https://example.com/atom"/>
        <updated>2024-01-01T12:00:00Z</updated>
        <summary>Atom summary</summary>
      </entry>
    </feed>
  `
  const items = parseFeed(xml, "Atom")
  assert.equal(items.length, 1)
  assert.equal(items[0].link, "https://example.com/atom")
})
