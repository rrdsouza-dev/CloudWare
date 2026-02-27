"use client"

import { Cloud, Upload, ArrowRight, FileText, Bug, Eye, Lock, Skull, Wifi, TriangleAlert } from "lucide-react"
import { useRef, useState, useCallback } from "react"

interface ScanSectionProps {
  onProcessFile: () => void
}

const threats = [
  {
    icon: Bug,
    title: "Trojan",
    desc: "Disfarca-se como software legitimo para obter acesso nao autorizado ao sistema do usuario.",
  },
  {
    icon: Eye,
    title: "Spyware",
    desc: "Monitora secretamente a atividade do usuario e coleta informacoes pessoais sem consentimento.",
  },
  {
    icon: Lock,
    title: "Ransomware",
    desc: "Criptografa os dados da vitima e exige pagamento em troca da chave de descriptografia.",
  },
  {
    icon: Skull,
    title: "Rootkit",
    desc: "Esconde-se profundamente no sistema operacional para manter o acesso privilegiado de forma persistente.",
  },
  {
    icon: Wifi,
    title: "Worm",
    desc: "Se auto-replica e se espalha automaticamente pela rede sem necessidade de interacao do usuario.",
  },
  {
    icon: TriangleAlert,
    title: "Adware",
    desc: "Exibe anuncios indesejados e pode redirecionar pesquisas para sites maliciosos.",
  },
]

const MAX_FILE_SIZE = 100 * 1024 * 1024

export function ScanSection({ onProcessFile }: ScanSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const [showSizeModal, setShowSizeModal] = useState(false)
  const [submitFlash, setSubmitFlash] = useState(false)

  const handleFile = useCallback((file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      setShowSizeModal(true)
      setSelectedFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ""
      return
    }
    setSelectedFile(file)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const handleSubmit = () => {
    if (!selectedFile) {
      setSubmitFlash(true)
      setTimeout(() => setSubmitFlash(false), 400)
      return
    }
    onProcessFile()
  }

  const resetUpload = () => {
    setSelectedFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <>
      <div className={showSizeModal ? "block" : "hidden"}>
        <SizeModal
          onClose={() => {
            setShowSizeModal(false)
            resetUpload()
          }}
          onSelectAnother={() => {
            setShowSizeModal(false)
            resetUpload()
            fileInputRef.current?.click()
          }}
        />
      </div>

      {/* HERO */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20">
        {/* Cloud Watermark - cinza mais claro */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.07]">
          <Cloud className="w-[420px] h-[420px] md:w-[600px] md:h-[600px]" strokeWidth={0.5} style={{ color: "#e0e0e0" }} />
        </div>

        <div className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-8">
          {/* Badge */}
          <div className="flex items-center gap-2 rounded-full border border-border/50 px-4 py-1.5 bg-secondary">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground">Sistema operacional</span>
          </div>

          {/* Heading */}
          <h1 className="text-balance text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground">
            O que voce deseja verificar hoje?
          </h1>

          <p className="max-w-md text-center text-sm sm:text-base leading-relaxed text-muted-foreground">
            Envie qualquer arquivo para analise avancada de ameacas. Deteccao de malware em segundos com inteligencia artificial.
          </p>

          {/* Upload Area */}
          <div
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`
              group relative w-full cursor-pointer rounded-xl border bg-card transition-all
              ${dragging ? "border-foreground/30 bg-accent" : "border-border/50 hover:border-foreground/20"}
            `}
          >
            <label className="flex cursor-pointer flex-col items-center gap-4 px-6 py-10 md:py-12">
              <input
                ref={fileInputRef}
                type="file"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFile(file)
                }}
                aria-label="Upload de arquivo para analise"
              />
              <div className={`
                flex h-14 w-14 items-center justify-center rounded-xl border bg-secondary transition-colors
                ${selectedFile ? "border-foreground/20" : "border-border/50"}
              `}>
                {selectedFile ? (
                  <FileText className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                ) : (
                  <Upload className="w-6 h-6 text-muted-foreground" strokeWidth={1.5} />
                )}
              </div>
              <div className="flex flex-col items-center gap-1">
                {selectedFile ? (
                  <>
                    <p className="text-sm font-medium text-foreground m-0">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground m-0">Arquivo selecionado</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium text-foreground m-0">Arraste um arquivo ou clique para selecionar</p>
                    <p className="text-xs text-muted-foreground m-0">Suporta .exe, .dll, .pdf, .doc e outros formatos</p>
                  </>
                )}
              </div>
            </label>

            <div className="border-t border-border/30 px-6 py-4">
              <button
                onClick={handleSubmit}
                className={`
                  flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 
                  text-sm font-semibold text-primary-foreground transition-all 
                  hover:opacity-90 border-none cursor-pointer active:scale-[0.98]
                  ${submitFlash ? "outline outline-2 outline-foreground/20 outline-offset-2" : ""}
                `}
              >
                Enviar para analise
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MALWARE CARDS */}
      <section className="mx-auto w-full max-w-7xl px-6 py-24">
        <div className="mb-12 flex flex-col items-center gap-3">
          <h2 className="text-balance text-center text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Ameacas que detectamos
          </h2>
          <p className="max-w-lg text-center text-sm leading-relaxed text-muted-foreground">
            Nossa plataforma identifica e classifica os principais tipos de malware em tempo real.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {threats.map((threat) => (
            <article
              key={threat.title}
              className="group rounded-xl border border-border/40 p-6 bg-card transition-all duration-200 hover:border-foreground/15"
            >
              <div className="flex flex-col gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border/50 bg-secondary transition-colors group-hover:border-foreground/20">
                  <threat.icon className="w-5 h-5 text-muted-foreground transition-colors group-hover:text-foreground" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-sm font-semibold text-foreground m-0">{threat.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground m-0">{threat.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

/* SIZE MODAL */
function SizeModal({ onClose, onSelectAnother }: { onClose: () => void; onSelectAnother: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-2xl"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="relative flex flex-col items-center gap-6 rounded-2xl border border-border/50 p-8 sm:p-10 bg-card max-w-[380px] w-[calc(100%-40px)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-lg bg-transparent border border-border/50 cursor-pointer transition-colors hover:bg-accent"
          aria-label="Fechar aviso"
        >
          <span className="text-muted-foreground text-sm">X</span>
        </button>
        <div className="flex items-center justify-center w-20 h-20 rounded-2xl border border-border/50 bg-secondary" style={{ animation: "gentleShake 2s ease-in-out infinite" }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8c8c8c" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
            <line x1="10" y1="11" x2="8" y2="15" style={{ stroke: "#ff4444", strokeWidth: 1.5 }} />
            <line x1="8" y1="15" x2="10" y2="17" style={{ stroke: "#ff4444", strokeWidth: 1.5 }} />
            <line x1="14" y1="10" x2="15" y2="14" style={{ stroke: "#ff4444", strokeWidth: 1.5 }} />
            <line x1="15" y1="14" x2="13" y2="16" style={{ stroke: "#ff4444", strokeWidth: 1.5 }} />
          </svg>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <h3 className="text-base font-bold text-foreground m-0">Arquivo muito pesado</h3>
          <p className="text-sm leading-relaxed text-muted-foreground m-0">
            O arquivo excede o limite maximo de 100 MB. Por favor, selecione um arquivo menor para analise.
          </p>
        </div>
        <button
          onClick={onSelectAnother}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-border/60 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-accent bg-transparent cursor-pointer"
        >
          Selecionar outro arquivo
        </button>
      </div>
    </div>
  )
}
