import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages, model = 'gpt-3.5-turbo', temperature = 0.7 } = req.body
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'No messages provided' })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'No OpenAI API key set' })
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        stream: false,
      }),
    })
    const data = await response.json()
    if (!response.ok) {
      return res.status(response.status).json(data)
    }
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from OpenAI', details: error })
  }
}
