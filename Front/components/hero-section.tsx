"use client"

import React from "react"

import { useState, useCallback } from "react"
import { Upload, ArrowRight, Cloud, FileText } from "lucide-react"

export function HeroSection() {
  const [fileName, setFileName] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) setFileName(file.name)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setFileName(file.name)
  }, [])

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20">
      {/* Cloud Watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <Cloud
          className="h-[420px] w-[420px] text-foreground/[0.02] md:h-[600px] md:w-[600px]"
          strokeWidth={0.5}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-8">
        {/* Badge */}
        <div className="flex items-center gap-2 rounded-full border border-border/50 bg-secondary px-4 py-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="text-xs font-medium text-muted-foreground">
            Sistema operacional
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-balance text-center text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
          O que você deseja verificar hoje?
        </h1>

        <p className="max-w-md text-center text-base leading-relaxed text-muted-foreground">
          Envie qualquer arquivo para análise avançada de ameaças. Detecção de malware em segundos com inteligência artificial.
        </p>

        {/* Upload Area */}
        <div
          className={`group relative w-full cursor-pointer rounded-xl border bg-card transition-all ${
            isDragging
              ? "border-foreground/30 bg-accent"
              : "border-border/50 hover:border-foreground/20"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <label className="flex cursor-pointer flex-col items-center gap-4 px-6 py-10 md:py-12">
            <input
              type="file"
              className="sr-only"
              onChange={handleFileChange}
              aria-label="Upload de arquivo para análise"
            />

            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border/50 bg-secondary transition-colors group-hover:border-foreground/20">
              {fileName ? (
                <FileText className="h-6 w-6 text-foreground" strokeWidth={1.5} />
              ) : (
                <Upload className="h-6 w-6 text-muted-foreground" strokeWidth={1.5} />
              )}
            </div>

            {fileName ? (
              <div className="flex flex-col items-center gap-1">
                <p className="text-sm font-medium text-foreground">{fileName}</p>
                <p className="text-xs text-muted-foreground">Arquivo selecionado</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1">
                <p className="text-sm font-medium text-foreground">
                  Arraste um arquivo ou clique para selecionar
                </p>
                <p className="text-xs text-muted-foreground">
                  Suporta .exe, .dll, .pdf, .doc e outros formatos
                </p>
              </div>
            )}
          </label>

          {/* Submit Button */}
          <div className="border-t border-border/30 px-6 py-4">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
            >
              Enviar para análise
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
