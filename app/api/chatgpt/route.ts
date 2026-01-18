import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_MESSAGES = {
  en: `You are Taras's AI assistant. Taras is a digital consultant and expert in digital marketing, AI, blockchain, and web development. 

When users ask how to contact Taras, always provide these contact details:
- Telegram: @barillax
- Email: shylotarasart@gmail.com
- Phone: +375 33 688-44-17

Be friendly, professional, and helpful. When appropriate, suggest they reach out via one of the contact methods above for consultations or specific project inquiries.`,
  
  ru: `Вы - ИИ-ассистент Тараса. Тарас - цифровой консультант и эксперт в области цифрового маркетинга, ИИ, блокчейна и веб-разработки.

Когда пользователи спрашивают, как связаться с Тарасом, всегда предоставляйте эту контактную информацию:
- Telegram: @barillax
- Email: shylotarasart@gmail.com
- Телефон: +375 33 688-44-17

Будьте дружелюбны, профессиональны и полезны. При необходимости предложите им связаться через один из указанных способов для консультаций или обсуждения конкретных проектов.`
}

export async function POST(req: NextRequest) {
  try {
    const { messages, model = 'gpt-3.5-turbo', temperature = 0.7, language = 'en' } = await req.json()
    
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
    
    // Add system message with contact info
    const enhancedMessages = [
      {
        role: 'system' as const,
        content: SYSTEM_MESSAGES[language as keyof typeof SYSTEM_MESSAGES] || SYSTEM_MESSAGES.en
      },
      ...messages
    ]

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: modelToUse,
        messages: enhancedMessages,
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
