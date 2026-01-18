"use client"
import { useState } from "react"

export default function ChatGptWidget() {
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a helpful assistant." },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    const newMessages = [...messages, { role: "user", content: input }]
    setMessages(newMessages)
    setInput("")
    try {
      const res = await fetch("/api/chatgpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "API error")
      const reply = data.choices?.[0]?.message?.content || "(no reply)"
      setMessages([...newMessages, { role: "assistant", content: reply }])
    } catch (err: any) {
      setError(err.message || "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 max-w-full z-50 bg-background border border-primary/20 rounded-xl shadow-lg">
      <div className="p-4 border-b border-primary/10 font-bold text-primary">AI Chat Assistant</div>
      <div className="p-4 h-64 overflow-y-auto space-y-2 text-sm">
        {messages.slice(1).map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left text-accent"}>
            <span className="inline-block px-2 py-1 rounded bg-primary/10">{m.content}</span>
          </div>
        ))}
        {loading && <div className="text-muted-foreground">AI is typing...</div>}
        {error && <div className="text-red-500">{error}</div>}
      </div>
      <form onSubmit={sendMessage} className="flex border-t border-primary/10">
        <input
          className="flex-1 px-3 py-2 bg-transparent outline-none"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask me anything..."
          disabled={loading}
        />
        <button type="submit" className="px-4 py-2 text-primary font-bold" disabled={loading || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  )
}
