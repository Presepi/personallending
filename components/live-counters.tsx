"use client"

import { useEffect, useState } from "react"
import { Globe, Code2, Brain, Rocket } from "lucide-react"

interface LiveCountersProps {
  language: "en" | "ru"
}

const content = {
  en: {
    headline: "Digital transformation is happening right now.",
    counters: [
      { label: "People going online today", baseValue: 847293, icon: Globe },
      { label: "New websites launched today", baseValue: 12847, icon: Code2 },
      { label: "AI requests processed today", baseValue: 2847293, icon: Brain },
      { label: "Digital projects started today", baseValue: 4829, icon: Rocket },
    ],
  },
  ru: {
    headline: "Цифровая трансформация происходит прямо сейчас.",
    counters: [
      { label: "Людей выходят в онлайн сегодня", baseValue: 847293, icon: Globe },
      { label: "Новых сайтов запущено сегодня", baseValue: 12847, icon: Code2 },
      { label: "ИИ-запросов обработано сегодня", baseValue: 2847293, icon: Brain },
      { label: "Цифровых проектов начато сегодня", baseValue: 4829, icon: Rocket },
    ],
  },
}

function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    const startValue = displayValue
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = Math.floor(startValue + (value - startValue) * easeOutQuart)
      
      setDisplayValue(currentValue)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [value, duration])

  return <span>{displayValue.toLocaleString()}</span>
}

export function LiveCounters({ language }: LiveCountersProps) {
  const t = content[language]
  const [values, setValues] = useState(t.counters.map(c => c.baseValue))

  useEffect(() => {
    const interval = setInterval(() => {
      setValues(prev => prev.map((val, i) => {
        const increment = [Math.floor(Math.random() * 50), Math.floor(Math.random() * 5), Math.floor(Math.random() * 200), Math.floor(Math.random() * 3)]
        return val + increment[i]
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-16 text-balance">
          {t.headline}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.counters.map((counter, index) => {
            const Icon = counter.icon
            return (
              <div 
                key={index}
                className="glass-card rounded-2xl p-6 text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  <AnimatedCounter value={values[index]} />
                </div>
                <p className="text-sm text-muted-foreground">{counter.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
