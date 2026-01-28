const crypto = require("crypto")

function createNewsId(input) {
  return crypto.createHash("sha256").update(input).digest("hex").slice(0, 16)
}

function truncateText(value, maxLength) {
  if (value.length <= maxLength) {
    return value
  }
  return `${value.slice(0, Math.max(0, maxLength - 1))}…`
}

function dedupeByLink(items) {
  const seen = new Set()
  return items.filter((item) => {
    if (seen.has(item.link)) {
      return false
    }
    seen.add(item.link)
    return true
  })
}

function withinDays(dateIso, days) {
  const date = new Date(dateIso)
  if (Number.isNaN(date.getTime())) {
    return false
  }
  const threshold = Date.now() - days * 24 * 60 * 60 * 1000
  return date.getTime() >= threshold
}

module.exports = {
  createNewsId,
  truncateText,
  dedupeByLink,
  withinDays,
}
