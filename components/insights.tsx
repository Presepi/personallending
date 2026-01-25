"use client"

import { BookOpen, LineChart, Newspaper, Sparkles } from "lucide-react"

interface InsightsProps {
  language: "en" | "ru"
}

const content = {
  en: {
    headline: "Insights that keep you ahead",
    subheadline:
      "A living knowledge hub with auto-updated business news, translated marketing research, and trend summaries you can apply immediately.",
    valueTitle: "Built for businesses and individual readers",
    valueItems: [
      {
        title: "For businesses",
        points: [
          "Weekly digests of market shifts and competitor moves.",
          "Practical recommendations for growth, positioning, and retention.",
          "Signal-based alerts on AI, Web3, and digital transformation.",
        ],
      },
      {
        title: "For individual professionals",
        points: [
          "Short explainers of complex research and analytics.",
          "Actionable checklists for marketing, content, and productivity.",
          "Career-ready trend briefs for AI, fintech, and e-commerce.",
        ],
      },
    ],
    feedTitle: "Auto-updated feeds",
    feedNote:
      "Curated news blocks update daily with highlights, sources, and my takeaways so you find value fast.",
    feedItems: [
      {
        icon: Newspaper,
        label: "Business news",
        title: "Retail and fintech: growth opportunities in 2024",
        meta: "Auto-refreshing daily summaries",
      },
      {
        icon: BookOpen,
        label: "Research translations",
        title: "Marketing effectiveness: what recent studies actually show",
        meta: "Translated and simplified insights",
      },
      {
        icon: LineChart,
        label: "Trend radar",
        title: "AI adoption, creator economy, and B2B performance",
        meta: "Monthly trend signals + recommendations",
      },
    ],
    ctaTitle: "Want a custom brief?",
    ctaDescription:
      "I prepare personalized research briefs for your niche, with sources, hypotheses, and next actions.",
    ctaLabel: "Request a brief",
    badge: "Insight hub",
  },
  ru: {
    headline: "Инсайты, которые дают преимущество",
    subheadline:
      "Живой центр знаний с автообновляемыми бизнес-новостями, переводами маркетинговых исследований и краткими трендами, которые можно применять сразу.",
    valueTitle: "Полезно для бизнеса и для индивидуальных читателей",
    valueItems: [
      {
        title: "Для бизнеса",
        points: [
          "Еженедельные дайджесты рынков и действий конкурентов.",
          "Практические рекомендации по росту, позиционированию и удержанию.",
          "Сигнальные обновления по AI, Web3 и цифровой трансформации.",
        ],
      },
      {
        title: "Для индивидуальных специалистов",
        points: [
          "Короткие объяснения сложных исследований и аналитики.",
          "Чек-листы для маркетинга, контента и продуктивности.",
          "Быстрые обзоры трендов в AI, финтехе и e-commerce.",
        ],
      },
    ],
    feedTitle: "Автообновляемые блоки",
    feedNote:
      "Подборки новостей обновляются каждый день: ключевые факты, источники и мои выводы — чтобы вы находили полезное быстрее.",
    feedItems: [
      {
        icon: Newspaper,
        label: "Бизнес-новости",
        title: "Ритейл и финтех: точки роста в 2024",
        meta: "Ежедневные краткие обзоры",
      },
      {
        icon: BookOpen,
        label: "Переводы исследований",
        title: "Эффективность маркетинга: что показывают свежие исследования",
        meta: "Перевод и упрощенные выводы",
      },
      {
        icon: LineChart,
        label: "Радар трендов",
        title: "AI-адаптация, creator economy и B2B-эффективность",
        meta: "Ежемесячные сигналы + рекомендации",
      },
    ],
    ctaTitle: "Нужен персональный бриф?",
    ctaDescription:
      "Соберу исследовательский бриф по вашей нише: источники, гипотезы и следующие шаги.",
    ctaLabel: "Запросить бриф",
    badge: "Центр инсайтов",
  },
}

export function Insights({ language }: InsightsProps) {
  const t = content[language]

  return (
    <section id="insights" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            <Sparkles className="h-4 w-4" />
            {t.badge}
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-foreground">
            {t.headline}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            {t.subheadline}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-16">
          {t.valueItems.map((item) => (
            <div
              key={item.title}
              className="glass-card rounded-2xl p-8 border border-border/60"
            >
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {item.title}
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                {item.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr,1fr] items-start">
          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-foreground mb-3">
              {t.feedTitle}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t.feedNote}
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {t.feedItems.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="rounded-xl border border-border/60 bg-background/40 p-4"
                  >
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary mb-3">
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {item.meta}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-8 border border-primary/40 bg-primary/5">
            <h3 className="text-xl font-semibold text-foreground mb-3">
              {t.ctaTitle}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t.ctaDescription}
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              {t.ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
