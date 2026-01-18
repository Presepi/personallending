"use client"

import { useEffect, useState } from "react"

const techWords = [
  "OpenAI",
  "Bitcoin",
  "USDT",
  "Crypto",
  "Web3",
  "NFT",
  "DeFi",
  "ChatGPT",
  "Gemini",
  "Ethereum",
  "Blockchain",
  "AI",
  "Machine Learning",
  "Solana",
  "MetaMask",
  "Smart Contracts",
  "Binance",
  "Coinbase",
  "Lightning",
  "Layer 2",
  "Arbitrum",
  "Polygon",
  "Avalanche",
  "Cardano",
  "XRP",
  "Litecoin",
  "Staking",
  "Yield Farming",
  "Liquidity Pool",
  "Uniswap",
  "Aave",
  "Curve",
  "DAO",
  "Token",
  "Tokenomics",
  "MEV",
  "Bull Market",
  "Bear Market",
  "HODL",
  "Moon",
  "FUD",
  "FOMO",
  "Portfolio",
  "Trading",
  "Futures",
  "Leverage",
  "Arbitrage",
  "Volatility",
  "ATH",
  "Support",
  "Resistance",
  "Breakout",
  "Trend",
  "Momentum",
  "RSI",
  "MACD",
  "Stock Market",
  "Forex",
  "Commodities",
  "Gold",
  "Oil",
  "S&P 500",
  "Nasdaq",
  "Dow Jones",
  "Treasury",
  "Bond",
  "Interest Rate",
  "Inflation",
  "GDP",
  "Earnings",
  "Dividend",
  "Penny Stock",
  "Blue Chip",
  "ETF",
  "Mutual Fund",
  "Index Fund",
  "IPO",
  "Merger",
  "Acquisition",
  "Startup",
  "Venture Capital",
  "Private Equity",
  "Hedge Fund",
  "Bank",
  "Insurance",
  "Real Estate",
  "Property",
  "Mortgage",
  "Credit",
  "Debt",
  "Loan",
  "Interest",
  "Annual Return",
  "ROI",
  "Profit",
  "Loss",
  "Revenue",
  "Expense",
  "Balance Sheet",
  "Income Statement",
  "Cash Flow",
  "Liquidity",
  "Solvency",
]

interface FallingWord {
  id: number
  word: string
  left: number
  delay: number
  duration: number
  opacity: number
}

export function MatrixText() {
  const [words, setWords] = useState<FallingWord[]>([])
  const [nextId, setNextId] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const randomWord = techWords[Math.floor(Math.random() * techWords.length)]
      const newWord: FallingWord = {
        id: nextId,
        word: randomWord,
        left: Math.random() * 90,
        delay: 0,
        duration: 3 + Math.random() * 4,
        opacity: Math.random() * 0.5 + 0.3,
      }

      setWords((prev) => [...prev, newWord])
      setNextId((prev) => prev + 1)

      // Remove old words after animation
      setTimeout(() => {
        setWords((prev) => prev.filter((w) => w.id !== newWord.id))
      }, (newWord.duration + 0.5) * 1000)
    }, 300)

    return () => clearInterval(interval)
  }, [nextId])

  return (
    <div className="relative w-full h-64 overflow-hidden bg-gradient-to-b from-background/50 to-background/0 rounded-lg border border-primary/10">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(0deg, transparent 24%, rgba(0, 255, 170, 0.05) 25%, rgba(0, 255, 170, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 170, 0.05) 75%, rgba(0, 255, 170, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 170, 0.05) 25%, rgba(0, 255, 170, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 170, 0.05) 75%, rgba(0, 255, 170, 0.05) 76%, transparent 77%, transparent)",
          backgroundSize: "50px 50px",
        }} />
      </div>

      {/* Falling words */}
      {words.map((item) => (
        <div
          key={item.id}
          className="absolute text-xs sm:text-sm font-mono text-primary pointer-events-none select-none whitespace-nowrap animate-pulse"
          style={{
            left: `${item.left}%`,
            top: "-20px",
            opacity: item.opacity,
            animation: `fall ${item.duration}s linear forwards`,
            animationDelay: `${item.delay}s`,
          }}
        >
          {item.word}
        </div>
      ))}

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(280px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
