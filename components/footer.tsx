"use client"

import { Send, Mail, Phone } from "lucide-react"

interface FooterProps {
  language: "en" | "ru"
}

const content = {
  en: {
    contact: "Contact",
    telegram: "Telegram",
    email: "Email",
    phone: "Phone",
    status: "Self-employed digital consultant",
    privacy: "Privacy Policy",
    offer: "Public Offer",
    rights: "All rights reserved.",
  },
  ru: {
    contact: "Контакт",
    telegram: "Телеграм",
    email: "Email",
    phone: "Телефон",
    status: "Самозанятый цифровой консультант",
    privacy: "Политика конфиденциальности",
    offer: "Публичная оферта",
    rights: "Все права защищены.",
  },
}

export function Footer({ language }: FooterProps) {
  const t = content[language]
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contact" className="relative py-16 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold text-lg">T</span>
              </div>
              <span className="font-semibold text-foreground">Taras</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {t.status}
            </p>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t.contact}</h3>
            <div className="space-y-3">
              <a 
                href="https://t.me/barillax" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Send className="h-4 w-4" />
                @barillax
              </a>
              <a 
                href="mailto:shylotarasart@gmail.com" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                shylotarasart@gmail.com
              </a>
              <a 
                href="tel:+375336884417" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                +375 33 688-44-17
              </a>
            </div>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <div className="space-y-3">
              <a 
                href="#" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t.privacy}
              </a>
              <a 
                href="#" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t.offer}
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Taras. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
