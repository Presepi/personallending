# News Pipeline

## Overview
This project maintains an automated news pipeline that:
- Collects RSS items from configured sources.
- Deduplicates and keeps raw items for 30 days.
- Uses the existing AI API key to pick the most interesting items.
- Translates the selected news to Russian.
- Publishes a curated list to the website.

The output is stored in `data/news.json` and displayed on `/news`.

## Data schema (sample)
```json
{
  "updatedAt": "2024-05-01T12:00:00.000Z",
  "rawItems": [
    {
      "id": "a1b2c3d4e5f6g7h8",
      "title": "Sample headline",
      "link": "https://example.com/news",
      "publishedAt": "2024-05-01T10:00:00.000Z",
      "source": "TechCrunch",
      "summary": "Short summary"
    }
  ],
  "curatedItems": [
    {
      "id": "a1b2c3d4e5f6g7h8",
      "title": "Sample headline",
      "titleRu": "Пример заголовка",
      "summary": "Short summary",
      "summaryRu": "Краткий перевод",
      "link": "https://example.com/news",
      "publishedAt": "2024-05-01T10:00:00.000Z",
      "source": "TechCrunch",
      "reason": "Strong business impact",
      "tags": ["AI", "Startups"]
    }
  ]
}
```

## RSS sources
Sources live in `config/rss-sources.json`. Add new feeds by appending:

```json
{
  "name": "New Source",
  "url": "https://example.com/feed"
}
```

## Running locally
1. Add API keys to `.env.local`:
   - `OPENROUTER_API_KEY` **or** `OPENAI_API_KEY`
2. Run the pipeline:
   ```bash
   npm run news:update
   ```
3. Open `/news` in the app.

## Scheduling
GitHub Actions runs the pipeline every hour and on manual trigger:
- `.github/workflows/news-refresh.yml`

To run manually:
1. Go to **Actions** → **News refresh**.
2. Click **Run workflow**.

## Manual refresh endpoint
If you need a server-side refresh:
```
POST /api/news/refresh?token=YOUR_SECRET
```
Set `NEWS_REFRESH_TOKEN` in your environment.

## Acceptance criteria
- The `/news` page renders 5–15 curated items after a run.
- Items are translated to Russian and include tags.
- Secrets remain in env variables.
