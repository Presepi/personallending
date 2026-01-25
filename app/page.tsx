"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { LiveCounters } from "@/components/live-counters"
import { Services } from "@/components/services"
import { Insights } from "@/components/insights"
import { HowItWorks } from "@/components/how-it-works"
import { About } from "@/components/about"
import { Footer } from "@/components/footer"
import { ChatWidget } from "@/components/chat-widget"

export default function Home() {
  const [language, setLanguage] = useState<"en" | "ru">("en")
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      <Header language={language} onLanguageChange={setLanguage} />
      <Hero language={language} onOpenChat={() => setChatOpen(true)} />
      <LiveCounters language={language} />
      <Services language={language} />
      <Insights language={language} />
      <HowItWorks language={language} />
      <About language={language} />
      <Footer language={language} />
      <ChatWidget 
        language={language} 
        isOpen={chatOpen} 
        onToggle={() => setChatOpen(!chatOpen)} 
      />
    </main>
  )
}
