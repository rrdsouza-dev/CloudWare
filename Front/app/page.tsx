"use client"

import { useState, useCallback } from "react"
import { Shield, Check, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { ScanSection } from "@/components/scan-section"
import { NewsSection } from "@/components/news-section"
import { ChatSection } from "@/components/chat-section"
import { ProcessingOverlay } from "@/components/processing-overlay"

type TabName = "scan" | "news" | "chat"

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabName>("scan")
  const [processing, setProcessing] = useState(false)
  const [showComplete, setShowComplete] = useState(false)

  const handleTabChange = useCallback((tab: TabName) => {
    setActiveTab(tab)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const handleProcessFile = useCallback(() => {
    setProcessing(true)
  }, [])

  const handleProcessComplete = useCallback(() => {
    setProcessing(false)
    setShowComplete(true)
    setTimeout(() => setShowComplete(false), 2500)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />

      <main>
        {/* Scan Tab */}
        {activeTab === "scan" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <ScanSection onProcessFile={handleProcessFile} />
          </div>
        )}

        {/* News Tab */}
        {activeTab === "news" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <NewsSection />
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === "chat" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <ChatSection />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-8 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-foreground/50" strokeWidth={1.5} />
            <span className="text-xs text-muted-foreground">
              Cloud Ware &mdash; Cybersecurity Platform
            </span>
          </div>
          <p className="text-xs text-muted-foreground m-0">
            &copy; {new Date().getFullYear()} Cloud Ware. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* Processing Overlay */}
      <ProcessingOverlay active={processing} onComplete={handleProcessComplete} />

      {/* Complete Toast */}
      {showComplete && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-lg bg-emerald-600 text-foreground px-5 py-3 shadow-xl"
          style={{ animation: "slideUp 0.3s ease" }}
        >
          <Check className="w-4 h-4" strokeWidth={2} />
          <span className="text-sm font-semibold">Analise concluida</span>
        </div>
      )}
    </div>
  )
}
