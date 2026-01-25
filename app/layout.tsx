import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _inter = Inter({ subsets: ["latin", "cyrillic"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'Taras | Digital Consultant',
    template: '%s | Taras',
  },
  description:
    'Digital marketing, AI, blockchain, and web development consulting. Daily business news, marketing research translations, and trend briefs for growth-minded teams and individual readers.',
  generator: 'v0.app',
  keywords: [
    'digital marketing',
    'AI consulting',
    'blockchain',
    'web3',
    'landing pages',
    'digital transformation',
    'business news',
    'marketing research',
    'trend analysis',
    'маркетинг',
    'переводы исследований',
    'бизнес-новости',
    'тренды',
  ],
  authors: [{ name: 'Taras' }],
  openGraph: {
    title: 'Taras | Digital Consultant',
    description:
      'Auto-updated business news, marketing research translations, and trend insights for companies and individual professionals.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taras | Digital Consultant',
    description:
      'Business insights, research translations, and trend briefs for smarter growth.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0d0d14',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Taras",
    jobTitle: "Digital Consultant",
    knowsAbout: [
      "Digital marketing",
      "AI consulting",
      "Blockchain",
      "Web3",
      "Marketing research",
      "Business intelligence",
    ],
    sameAs: ["https://t.me/barillax"],
  }

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`font-sans antialiased`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Analytics />
      </body>
    </html>
  )
}
