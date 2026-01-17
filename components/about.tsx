"use client"

interface AboutProps {
  language: "en" | "ru"
}

const content = {
  en: {
    headline: "About me",
    paragraphs: [
      "I'm not here to sell you dreams. I'm here to share what I've learned from years of building, failing, and succeeding in the digital space.",
      "10+ years in blockchain, from early Bitcoin days to modern DeFi. Years of working with AI before it became mainstream. Countless websites, marketing campaigns, and digital transformations.",
      "I believe in learning by doing. Every recommendation I give is backed by personal experience — not theory from a textbook.",
      "My goal is simple: help you understand the digital world better and use it to your advantage. No hype, no pressure, just honest guidance.",
    ],
    stats: [
      { value: "10+", label: "Years in blockchain" },
      { value: "100+", label: "Projects delivered" },
      { value: "50+", label: "Clients helped" },
    ],
  },
  ru: {
    headline: "Обо мне",
    paragraphs: [
      "Я здесь не для того, чтобы продавать мечты. Я здесь, чтобы поделиться тем, чему научился за годы создания, неудач и успехов в цифровом пространстве.",
      "10+ лет в блокчейне, от ранних дней Bitcoin до современного DeFi. Годы работы с ИИ до того, как это стало мейнстримом. Бесчисленные сайты, маркетинговые кампании и цифровые трансформации.",
      "Я верю в обучение через практику. Каждая моя рекомендация подкреплена личным опытом — не теорией из учебника.",
      "Моя цель проста: помочь вам лучше понять цифровой мир и использовать его в своих интересах. Без хайпа, без давления, только честное руководство.",
    ],
    stats: [
      { value: "10+", label: "Лет в блокчейне" },
      { value: "100+", label: "Проектов выполнено" },
      { value: "50+", label: "Клиентов" },
    ],
  },
}

export function About({ language }: AboutProps) {
  const t = content[language]

  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Avatar / Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl" />
              
              {/* Abstract avatar */}
              <div className="relative glass-card rounded-full w-full h-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
                
                {/* Stylized silhouette */}
                <svg 
                  viewBox="0 0 200 200" 
                  className="w-48 h-48 sm:w-60 sm:h-60 text-foreground/20"
                  fill="currentColor"
                >
                  <circle cx="100" cy="70" r="35" />
                  <path d="M100 115 C50 115 30 160 30 200 L170 200 C170 160 150 115 100 115" />
                </svg>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full animate-pulse" />
                <div className="absolute bottom-8 left-8 w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex justify-center gap-8 mt-8">
              {t.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
              {t.headline}
            </h2>
            
            <div className="space-y-6">
              {t.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
