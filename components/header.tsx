"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

interface HeaderProps {
  language: "en" | "ru"
  onLanguageChange: (lang: "en" | "ru") => void
}

const content = {
  en: {
    insights: "Insights",
    news: "News",
    services: "Services",
    howItWorks: "How it works",
    about: "About",
    contact: "Contact",
  },
  ru: {
    insights: "Инсайты",
    news: "Новости",
    services: "Услуги",
    howItWorks: "Как это работает",
    about: "Обо мне",
    contact: "Контакт",
  },
}

export function Header({ language, onLanguageChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = content[language]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold text-lg">T</span>
            </div>
            <span className="font-semibold text-foreground">Taras</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#insights" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.insights}
            </a>
            <a href="/news" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.news}
            </a>
            <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.services}
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.howItWorks}
            </a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.about}
            </a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.contact}
            </a>
          </nav>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-full bg-secondary p-1">
              <button
                onClick={() => onLanguageChange("en")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  language === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange("ru")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  language === "ru" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                RU
              </button>
            </div>

            <Button
              variant="ghost"
