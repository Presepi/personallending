"use client"

import { MessageSquare, Target, Lightbulb, Rocket } from "lucide-react"

interface HowItWorksProps {
  language: "en" | "ru"
}

const content = {
  en: {
    headline: "How it works",
    subheadline: "Simple process, real results.",
    steps: [
      {
        icon: MessageSquare,
        number: "01",
        title: "You ask a question",
        description: "Start a conversation with my AI assistant or reach out directly. No commitment, just curiosity.",
      },
      {
        icon: Target,
        number: "02",
        title: "AI clarifies your goal",
        description: "The assistant helps identify exactly what you need. We cut through the noise together.",
      },
      {
        icon: Lightbulb,
        number: "03",
        title: "Strategy is proposed",
        description: "You receive a clear, actionable plan tailored to your situation and resources.",
      },
      {
        icon: Rocket,
        number: "04",
        title: "Real implementation",
        description: "We execute together or I guide you through. Consultation or hands-on — your choice.",
      },
    ],
  },
  ru: {
    headline: "Как это работает",
    subheadline: "Простой процесс, реальные результаты.",
    steps: [
      {
        icon: MessageSquare,
        number: "01",
        title: "Вы задаёте вопрос",
        description: "Начните разговор с моим ИИ-ассистентом или свяжитесь напрямую. Без обязательств, только интерес.",
      },
      {
        icon: Target,
        number: "02",
        title: "ИИ уточняет цель",
        description: "Ассистент помогает определить, что именно вам нужно. Вместе отсеиваем лишнее.",
      },
      {
        icon: Lightbulb,
        number: "03",
        title: "Предлагается стратегия",
        description: "Вы получаете чёткий, действенный план, адаптированный к вашей ситуации и ресурсам.",
      },
      {
        icon: Rocket,
        number: "04",
        title: "Реальное внедрение",
        description: "Работаем вместе или я провожу вас. Консультация или практика — ваш выбор.",
      },
    ],
  },
}

export function HowItWorks({ language }: HowItWorksProps) {
  const t = content[language]

  return (
    <section id="how-it-works" className="relative py-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t.headline}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subheadline}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                {/* Connector line */}
                {index < t.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-full h-px bg-gradient-to-r from-primary/40 to-transparent" />
                )}
                
                <div className="glass-card rounded-2xl p-6 text-center h-full">
                  <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6">
                    <Icon className="h-8 w-8 text-primary" />
                    <span className="absolute -top-2 -right-2 text-xs font-bold text-primary bg-background px-2 py-1 rounded-full border border-primary/30">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
