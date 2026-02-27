"use client"

import { Cloud } from "lucide-react"
import { useEffect, useState } from "react"

interface ProcessingOverlayProps {
  active: boolean
  onComplete: () => void
}

export function ProcessingOverlay({ active, onComplete }: ProcessingOverlayProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!active) {
      setProgress(0)
      return
    }

    let current = 0
    const interval = setInterval(() => {
      current += Math.random() * 12 + 3
      if (current >= 95) {
        current = 95
        clearInterval(interval)
      }
      setProgress(current)
    }, 300)

    const timeout = setTimeout(() => {
      clearInterval(interval)
      setProgress(100)
      setTimeout(() => {
        onComplete()
      }, 500)
    }, 4000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [active, onComplete])

  return (
    <div
      className={`
        fixed inset-0 z-[100] flex flex-col items-center justify-center
        bg-black/92 backdrop-blur-xl transition-opacity duration-300
        ${active ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Cloud animation */}
        <div className="relative" style={{ width: 140, height: 120 }}>
          <div className="absolute" style={{ top: 36, left: -10, width: 32, height: 2, background: "rgba(255,255,255,0.25)", borderRadius: 2, animation: "windStreak1 1.8s ease-in-out infinite" }} />
          <div className="absolute" style={{ top: 52, left: -18, width: 24, height: 2, background: "rgba(255,255,255,0.18)", borderRadius: 2, animation: "windStreak2 2.2s ease-in-out infinite 0.4s" }} />
          <div className="absolute" style={{ top: 68, left: -6, width: 28, height: 2, background: "rgba(255,255,255,0.2)", borderRadius: 2, animation: "windStreak3 2s ease-in-out infinite 0.8s" }} />
          <div className="flex items-center justify-center w-full h-full" style={{ animation: "cloudFloat 2.4s ease-in-out infinite" }}>
            <Cloud className="text-foreground" style={{ width: 80, height: 80, strokeWidth: 1 }} />
          </div>
          <div className="absolute" style={{ top: 40, right: -14, width: 28, height: 2, background: "rgba(255,255,255,0.2)", borderRadius: 2, animation: "windStreak1 1.8s ease-in-out infinite 0.3s" }} />
          <div className="absolute" style={{ top: 58, right: -8, width: 20, height: 2, background: "rgba(255,255,255,0.15)", borderRadius: 2, animation: "windStreak2 2.2s ease-in-out infinite 0.7s" }} />
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-base font-semibold text-foreground m-0 tracking-wide">
            Vasculhando
            <span className="inline-block w-6 text-left">
              {active && <DotAnimation />}
            </span>
          </p>
          <p className="text-xs text-muted-foreground m-0">Analisando o arquivo em busca de ameacas</p>
        </div>

        <div className="w-48 h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${progress}%`, background: "rgba(255,255,255,0.35)" }}
          />
        </div>
      </div>
    </div>
  )
}

function DotAnimation() {
  const [dots, setDots] = useState("")
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."))
    }, 400)
    return () => clearInterval(interval)
  }, [])
  return <>{dots}</>
}
