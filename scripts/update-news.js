const { runNewsPipeline } = require("../lib/news/pipeline")

const start = Date.now()

runNewsPipeline()
  .then((store) => {
    console.log(`News updated: ${store.curatedItems.length} curated items`)
    console.log(`Updated at: ${store.updatedAt}`)
    console.log(`Elapsed: ${Date.now() - start}ms`)
  })
  .catch((error) => {
    console.error("News update failed:", error)
    process.exit(1)
  })
