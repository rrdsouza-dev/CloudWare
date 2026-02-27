"use client"

import { Newspaper, ArrowRight, ShieldAlert, Bot, Database, Smartphone, Globe, KeyRound, Clock, ExternalLink } from "lucide-react"
import Image from "next/image"

export interface NewsItem {
  id: string
  category: string
  categoryColor: string
  icon: React.ReactNode
  time: string
  title: string
  summary: string
  imageUrl?: string
  link?: string
}

const defaultNews: NewsItem[] = [
  {
    id: "1",
    category: "Seguranca",
    categoryColor: "text-red-400",
    icon: <ShieldAlert className="w-4 h-4 text-red-400" strokeWidth={1.5} />,
    time: "2h atras",
    title: "Nova vulnerabilidade zero-day descoberta em sistemas Linux",
    summary: "Pesquisadores identificaram uma falha critica no kernel Linux que permite escalacao de privilegios sem autenticacao.",
    imageUrl: "",
    link: "#",
  },
  {
    id: "2",
    category: "IA",
    categoryColor: "text-blue-400",
    icon: <Bot className="w-4 h-4 text-blue-400" strokeWidth={1.5} />,
    time: "5h atras",
    title: "IA generativa esta sendo usada para criar malware polimorfico",
    summary: "Especialistas alertam que ferramentas de IA estao sendo exploradas para gerar codigo malicioso que muda sua estrutura continuamente.",
    imageUrl: "",
    link: "#",
  },
  {
    id: "3",
    category: "Vazamento",
    categoryColor: "text-amber-400",
    icon: <Database className="w-4 h-4 text-amber-400" strokeWidth={1.5} />,
    time: "8h atras",
    title: "Vazamento massivo expoe 200 milhoes de registros de saude",
    summary: "Uma falha de configuracao em servidor cloud expoe dados medicos sensiveis de pacientes de multiplos paises.",
    imageUrl: "",
    link: "#",
  },
  {
    id: "4",
    category: "Mobile",
    categoryColor: "text-emerald-400",
    icon: <Smartphone className="w-4 h-4 text-emerald-400" strokeWidth={1.5} />,
    time: "12h atras",
    title: "Novo trojan bancario para Android atinge 50 apps financeiros",
    summary: "Malware sofisticado se disfarca de aplicativo de produtividade e intercepta credenciais de apps bancarios.",
    imageUrl: "",
    link: "#",
  },
  {
    id: "5",
    category: "Ransomware",
    categoryColor: "text-cyan-400",
    icon: <Globe className="w-4 h-4 text-cyan-400" strokeWidth={1.5} />,
    time: "1d atras",
    title: "Grupo de ransomware ataca infraestrutura critica em 12 paises",
    summary: "Operacao coordenada mira hospitais, usinas de energia e sistemas de transporte com variante avancada de ransomware.",
    imageUrl: "",
    link: "#",
  },
  {
    id: "6",
    category: "Criptografia",
    categoryColor: "text-cyan-400",
    icon: <KeyRound className="w-4 h-4 text-cyan-400" strokeWidth={1.5} />,
    time: "2d atras",
    title: "Computacao quantica ameaca algoritmos de criptografia atuais",
    summary: "NIST finaliza novos padroes de criptografia pos-quantica para proteger dados contra futuros computadores quanticos.",
    imageUrl: "",
    link: "#",
  },
]

interface NewsSectionProps {
  news?: NewsItem[]
}

export function NewsSection({ news = defaultNews }: NewsSectionProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pt-28 pb-24">
      {/* Header */}
      <div className="mb-12 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-border/50 px-4 py-1.5 bg-secondary">
          <Newspaper className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
          <span className="text-xs font-medium text-muted-foreground">Noticias</span>
        </div>
        <h2 className="text-balance text-center text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Ultimas noticias em ciberseguranca
        </h2>
        <p className="max-w-lg text-center text-sm leading-relaxed text-muted-foreground">
          Fique por dentro das novidades e ameacas mais recentes no mundo da tecnologia.
        </p>
      </div>

      {/* Featured News (first item) */}
      <div className="mb-6">
        <FeaturedNewsCard item={news[0]} />
      </div>

      {/* News Grid (remaining) */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {news.slice(1).map((item, index) => (
          <NewsCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  )
}

function FeaturedNewsCard({ item }: { item: NewsItem }) {
  return (
    <article
      className="group rounded-2xl border border-border/40 bg-card overflow-hidden transition-all duration-300 hover:border-foreground/15 hover:-translate-y-1"
      style={{ animation: "slideUp 0.5s ease forwards" }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image area */}
        <div className="relative w-full md:w-2/5 aspect-video md:aspect-auto min-h-[200px] bg-secondary overflow-hidden">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-3 text-muted-foreground/40">
                <Newspaper className="w-12 h-12" strokeWidth={0.8} />
                <span className="text-xs">Imagem da noticia</span>
              </div>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background/80 backdrop-blur-md border border-border/30 px-3 py-1">
              <span className={`text-xs font-medium ${item.categoryColor}`}>{item.category}</span>
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="text-xs">{item.time}</span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-foreground m-0 leading-snug text-pretty">
            {item.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground m-0">
            {item.summary}
          </p>
          <a
            href={item.link || "#"}
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors mt-2 no-underline group/link"
          >
            Ler noticia completa
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" strokeWidth={2} />
          </a>
        </div>
      </div>
    </article>
  )
}

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  return (
    <article
      className="group rounded-xl border border-border/40 bg-card overflow-hidden transition-all duration-300 hover:border-foreground/15 hover:-translate-y-1"
      style={{ animation: `slideUp 0.4s ease forwards`, animationDelay: `${index * 0.08}s`, opacity: 0, animationFillMode: "forwards" }}
    >
      {/* Image area */}
      <div className="relative w-full aspect-[16/9] bg-secondary overflow-hidden">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-2 text-muted-foreground/30">
              <Newspaper className="w-8 h-8" strokeWidth={0.8} />
              <span className="text-[10px]">Imagem da noticia</span>
            </div>
          </div>
        )}
        <div className="absolute top-2.5 left-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-background/80 backdrop-blur-md border border-border/30 px-2.5 py-0.5">
            {item.icon}
            <span className={`text-[11px] font-medium ${item.categoryColor}`}>{item.category}</span>
          </span>
        </div>
        <div className="absolute top-2.5 right-2.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-background/70 backdrop-blur-md border border-border/30 px-2 py-0.5 text-muted-foreground">
            <Clock className="w-3 h-3" strokeWidth={1.5} />
            <span className="text-[10px]">{item.time}</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-foreground m-0 leading-snug text-pretty">
          {item.title}
        </h3>
        <p className="text-xs leading-relaxed text-muted-foreground m-0 line-clamp-2">
          {item.summary}
        </p>
        <a
          href={item.link || "#"}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors mt-auto no-underline group/link"
        >
          Ler mais
          <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" strokeWidth={2} />
        </a>
      </div>
    </article>
  )
}
