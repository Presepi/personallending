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
        title: "Entry point",
        description: "Formulate the task and context.",
      },
      {
        icon: Target,
        number: "02",
        title: "Analysis and focus",
        description: "Remove the noise, clarify the goal, choose the optimal approach.",
      },
      {
        icon: Lightbulb,
        number: "03",
        title: "Solution architecture",
        description: "Strategy, tools, implementation logic.",
      },
      {
        icon: Rocket,
        number: "04",
        title: "Practical implementation",
        description: "From ideas to working results.",
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
        title: "Входная точка",
        description: "Формулируем задачу и контекст.",
      },
      {
        icon: Target,
        number: "02",
        title: "Анализ и фокус",
        description: "Убираем шум, уточняем цель, выбираем оптимальный подход.",
      },
      {
        icon: Lightbulb,
        number: "03",
        title: "Архитектура решения",
        description: "Стратегия, инструменты, логика внедрения.",
      },
      {
        icon: Rocket,
        number: "04",
        title: "Практическая реализация",
        description: "От идей — к работающему результату.",
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
