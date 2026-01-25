"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, Calendar } from "lucide-react"
import { ParticleBackground } from "./particle-background"

interface HeroProps {
  language: "en" | "ru"
  onOpenChat: () => void
}

const content = {
  en: {
    headline: "Daily insights on business, marketing, and digital trends.",
    subheadline: "I curate business news, translate marketing research, and share trend briefs so you can act fast. Consulting is available after you get immediate value.",
    ctaPrimary: "Talk to my AI assistant",
    ctaSecondary: "Get a consultation",
  },
  ru: {
    headline: "Ежедневные инсайты о бизнесе, маркетинге и цифровых трендах.",
    subheadline: "Я собираю бизнес-новости, перевожу маркетинговые исследования и готовлю краткие тренд-обзоры, чтобы вы могли действовать быстрее. Консультация — после полезности.",
    ctaPrimary: "Поговорить с ИИ-ассистентом",
    ctaSecondary: "Получить консультацию",
  },
}

export function Hero({ language, onOpenChat }: HeroProps) {
  const t = content[language]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <ParticleBackground />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
          {t.headline}
        </h1>
        
        <p className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
          {t.subheadline}
        </p>
        
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg" 
            className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base glow-primary"
            onClick={onOpenChat}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            {t.ctaPrimary}
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="glass border-border hover:bg-secondary/50 px-8 py-6 text-base bg-transparent"
            asChild
          >
            <a href="#contact">
              <Calendar className="mr-2 h-5 w-5" />
              {t.ctaSecondary}
            </a>
          </Button>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-muted-foreground/50 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
