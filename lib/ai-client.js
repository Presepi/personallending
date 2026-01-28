async function createChatCompletion(messages, options = {}) {
  const openrouterKey = process.env.OPENROUTER_API_KEY
  const openaiKey = process.env.OPENAI_API_KEY

  const useOpenRouter = !!openrouterKey
  const apiKey = useOpenRouter ? openrouterKey : openaiKey
  const apiUrl = useOpenRouter
    ? "https://openrouter.ai/api/v1/chat/completions"
    : "https://api.openai.com/v1/chat/completions"
  const model = useOpenRouter ? "openai/gpt-3.5-turbo" : options.model || "gpt-3.5-turbo"

  if (!apiKey) {
    throw new Error("Missing OPENROUTER_API_KEY or OPENAI_API_KEY")
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  }

  if (useOpenRouter) {
    headers["HTTP-Referer"] = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    headers["X-Title"] = "Personal Lending News"
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model,
      messages,
      temperature: options.temperature ?? 0.4,
      stream: false,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    const errorMessage = data?.error?.message || data?.error || "AI request failed"
    throw new Error(errorMessage)
  }

  return data
}

module.exports = {
  createChatCompletion,
}
