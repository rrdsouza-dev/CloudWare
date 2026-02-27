"use client"

import { useState } from "react"
import { Shield, Menu, X, Scan, Newspaper, MessageCircle } from "lucide-react"

type TabName = "scan" | "news" | "chat"

interface NavbarProps {
  activeTab: TabName
  onTabChange: (tab: TabName) => void
}

const tabs: { id: TabName; label: string; icon: React.ReactNode }[] = [
  { id: "scan", label: "Ameacas", icon: <Scan className="w-4 h-4" /> },
  { id: "news", label: "Noticias", icon: <Newspaper className="w-4 h-4" /> },
  { id: "chat", label: "Evo Chat", icon: <MessageCircle className="w-4 h-4" /> },
]

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">
        {/* Logo */}
        <button
          onClick={() => onTabChange("scan")}
          className="flex items-center gap-2 bg-transparent border-none cursor-pointer p-0"
        >
          <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-foreground/70" strokeWidth={1.5} />
          <span className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-foreground whitespace-nowrap">
            Cloud Ware
          </span>
        </button>

        {/* Desktop Nav - Pill style navigation */}
        <div className="hidden md:flex items-center rounded-full border border-border/50 bg-secondary/80 p-1 gap-0.5" style={{ animation: "pulseGlow 4s ease-in-out infinite" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium 
                transition-all duration-300 cursor-pointer border-none
                ${activeTab === tab.id
                  ? "bg-foreground text-background shadow-lg"
                  : "bg-transparent text-muted-foreground hover:text-foreground"
                }
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground md:hidden bg-transparent border border-border/50 rounded-lg p-2 cursor-pointer transition-colors hover:bg-accent"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl px-6 
          overflow-hidden transition-all duration-300
          ${mobileOpen ? "max-h-[400px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"}
        `}
      >
        <div className="flex flex-col gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                onTabChange(tab.id)
                setMobileOpen(false)
              }}
              className={`
                flex items-center gap-3 text-left text-sm font-medium 
                bg-transparent border-none cursor-pointer py-3 px-3 rounded-xl
                transition-all duration-200
                ${activeTab === tab.id
                  ? "text-foreground bg-accent/80"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
                }
              `}
            >
              <span className={`
                flex items-center justify-center w-8 h-8 rounded-lg border transition-colors
                ${activeTab === tab.id 
                  ? "bg-foreground text-background border-foreground/20" 
                  : "bg-secondary border-border/50"
                }
              `}>
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
