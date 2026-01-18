"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface ChatWidgetProps {
  language: "en" | "ru"
  isOpen: boolean
  onToggle: () => void
}

interface Message {
  id: string
  role: "assistant" | "user"
  content: string
}

const content = {
  en: {
    title: "AI Assistant",
    subtitle: "Ask me anything",
    placeholder: "Type your message...",
    greeting: "Hello! I'm Taras's AI assistant. How can I help you today? Whether you have questions about digital marketing, AI, blockchain, or web development — I'm here to guide you.",
    responses: [
      "That's a great question! Based on your interest, I'd recommend starting with a brief consultation to understand your specific needs better. Would you like me to explain more about the process?",
      "I can help with that. Taras has extensive experience in this area. Let me share some insights that might be useful for your situation.",
      "Interesting! This is actually one of the areas where Taras has done a lot of work. Would you like to know more about specific solutions or get a personalized recommendation?",
    ],
  },
  ru: {
    title: "ИИ-ассистент",
    subtitle: "Задайте любой вопрос",
    placeholder: "Введите сообщение...",
    greeting: "Привет! Я ИИ-ассистент Тараса. Чем могу помочь сегодня? Если у вас есть вопросы о цифровом маркетинге, ИИ, блокчейне или веб-разработке — я здесь, чтобы помочь.",
    responses: [
      "Отличный вопрос! Исходя из вашего интереса, я бы рекомендовал начать с краткой консультации, чтобы лучше понять ваши конкретные потребности. Хотите, расскажу подробнее о процессе?",
      "Я могу с этим помочь. У Тараса большой опыт в этой области. Позвольте поделиться некоторыми идеями, которые могут быть полезны в вашей ситуации.",
      "Интересно! Это как раз одна из областей, где Тарас много работал. Хотите узнать больше о конкретных решениях или получить персональную рекомендацию?",
    ],
  },
}

export function ChatWidget({ language, isOpen, onToggle }: ChatWidgetProps) {
  const t = content[language]
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Add greeting message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "greeting",
          role: "assistant",
          content: t.greeting,
        },
      ])
    }
  }, [isOpen, messages.length, t.greeting])

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    try {
      // Call ChatGPT API
      const response = await fetch("/api/chatgpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: "user", content: input }
          ],
          language: language
        }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to get response")
      }

      const aiResponse = data.choices?.[0]?.message?.content || (
        language === "en" 
          ? "I apologize, I couldn't process that request. Please try again."
          : "Извините, я не смог обработать этот запрос. Пожалуйста, попробуйте еще раз."
      )

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
      }
      
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: language === "en"
          ? "Sorry, I'm having trouble connecting right now. Please try again in a moment."
          : "Извините, у меня проблемы с подключением. Пожалуйста, попробуйте еще раз через минуту.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <>
      {/* Chat bubble */}
      <button
        onClick={onToggle}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-md transition-all duration-300 ${
          isOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="glass-card rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[500px] max-h-[calc(100vh-6rem)]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">{t.title}</h3>
                <p className="text-xs text-muted-foreground">{t.subtitle}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onToggle} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    message.role === "assistant" ? "bg-primary/20" : "bg-accent/20"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <Bot className="h-4 w-4 text-primary" />
                  ) : (
                    <User className="h-4 w-4 text-accent" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "assistant"
                      ? "bg-secondary text-foreground rounded-tl-sm"
                      : "bg-primary text-primary-foreground rounded-tr-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.placeholder}
                className="flex-1 bg-secondary border-border"
              />
              <Button type="submit" size="icon" className="shrink-0 bg-primary hover:bg-primary/90">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
