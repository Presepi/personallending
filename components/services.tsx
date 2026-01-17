"use client"

import { TrendingUp, Globe, Brain, Blocks, FileText, GraduationCap } from "lucide-react"

interface ServicesProps {
  language: "en" | "ru"
}

const content = {
  en: {
    headline: "What I do",
    subheadline: "Services built on real experience, not theory.",
    services: [
      {
        icon: TrendingUp,
        title: "Marketing & Growth",
        description: "Digital marketing strategies that actually work. From audience research to conversion optimization.",
      },
      {
        icon: Globe,
        title: "Websites & Landing Pages",
        description: "Modern, fast, conversion-focused websites. Built to perform and designed to impress.",
      },
      {
        icon: Brain,
        title: "AI Tools & Workflows",
        description: "Implement AI into your business. Automate tasks, generate content, and work smarter.",
      },
      {
        icon: Blocks,
        title: "Blockchain & Web3",
        description: "Navigate the decentralized world. From basic understanding to advanced implementations.",
      },
      {
        icon: FileText,
        title: "AI Content Creation",
        description: "Create content at scale without losing quality. Text, images, video — all powered by AI.",
      },
      {
        icon: GraduationCap,
        title: "Digital & Financial Literacy",
        description: "Master the basics that matter. Digital tools, online safety, and smart money management.",
      },
    ],
  },
  ru: {
    headline: "Чем я занимаюсь",
    subheadline: "Услуги, основанные на реальном опыте, а не на теории.",
    services: [
      {
        icon: TrendingUp,
        title: "Маркетинг и рост",
        description: "Стратегии цифрового маркетинга, которые действительно работают. От исследования аудитории до оптимизации конверсии.",
      },
      {
        icon: Globe,
        title: "Сайты и лендинги",
        description: "Современные, быстрые сайты, ориентированные на конверсию. Созданы для результата и впечатлений.",
      },
      {
        icon: Brain,
        title: "ИИ-инструменты и процессы",
        description: "Внедрение ИИ в ваш бизнес. Автоматизация задач, генерация контента и умная работа.",
      },
      {
        icon: Blocks,
        title: "Блокчейн и Web3",
        description: "Навигация в децентрализованном мире. От базового понимания до продвинутых внедрений.",
      },
      {
        icon: FileText,
        title: "Создание контента с ИИ",
        description: "Создавайте контент в масштабе без потери качества. Текст, изображения, видео — всё на базе ИИ.",
      },
      {
        icon: GraduationCap,
        title: "Цифровая и финансовая грамотность",
        description: "Освойте основы, которые важны. Цифровые инструменты, онлайн-безопасность и умное управление деньгами.",
      },
    ],
  },
}

export function Services({ language }: ServicesProps) {
  const t = content[language]

  return (
    <section id="services" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t.headline}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subheadline}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.map((service, index) => {
            const Icon = service.icon
            return (
              <div 
                key={index}
                className="glass-card rounded-2xl p-8 group hover:scale-[1.02] transition-all duration-300 hover:border-primary/30"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
