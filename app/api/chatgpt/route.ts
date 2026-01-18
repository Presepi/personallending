import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { messages, model = 'gpt-3.5-turbo', temperature = 0.7 } = await req.json()
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 })
    }

    // Try OpenRouter first if key is available, fallback to OpenAI
    const openrouterKey = process.env.OPENROUTER_API_KEY
    const openaiKey = process.env.OPENAI_API_KEY
    
    const useOpenRouter = !!openrouterKey
    const apiKey = useOpenRouter ? openrouterKey : openaiKey
    const apiUrl = useOpenRouter 
      ? 'https://openrouter.ai/api/v1/chat/completions'
      : 'https://api.openai.com/v1/chat/completions'
    const modelToUse = useOpenRouter ? 'openai/gpt-3.5-turbo' : model
    
    if (!apiKey) {
      return NextResponse.json({ 
        error: 'No API key set. Please set OPENROUTER_API_KEY or OPENAI_API_KEY' 
      }, { status: 500 })
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    }
    
    if (useOpenRouter) {
      headers['HTTP-Referer'] = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      headers['X-Title'] = 'Personal Lending Chat'
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: modelToUse,
        messages,
        temperature,
        stream: false,
      }),
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      console.error('OpenAI API error:', {
        status: response.status,
        error: data
      })
      return NextResponse.json({ 
        error: 'OpenAI API error', 
        details: data,
        status: response.status 
      }, { status: response.status })
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('OpenAI API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch from OpenAI', details: String(error) },
      { status: 500 }
    )
  }
}
