"use client"

import { Shield, ArrowUp, RotateCcw, Sparkles } from "lucide-react"
import { useState, useRef, useEffect, useCallback } from "react"

interface ChatMessage {
  id: string
  text: string
  isUser: boolean
}

const botResponses: Record<string, string> = {
  malware:
    "Malware e um termo generico para qualquer software malicioso projetado para danificar, explorar ou obter acesso nao autorizado a sistemas. Inclui trojans, ransomware, spyware, worms e adware. A Cloud Ware detecta todos esses tipos em tempo real.",
  trojan:
    "Trojans sao programas maliciosos que se disfarcam de software legitimo. Eles enganam os usuarios para que os instalem, dando acesso remoto ao invasor. Dica: nunca baixe software de fontes nao confiaveis.",
  ransomware:
    "Ransomware e um tipo de malware que criptografa seus arquivos e exige pagamento para restaura-los. Para se proteger: mantenha backups regulares, atualize seu sistema e nunca abra anexos suspeitos.",
  spyware:
    "Spyware monitora secretamente suas atividades online, incluindo senhas, historico de navegacao e dados financeiros. Use um antimalware atualizado e evite instalar extensoes de navegador desconhecidas.",
  phishing:
    "Phishing e uma tecnica de engenharia social onde atacantes enviam mensagens falsas para roubar credenciais. Sempre verifique o remetente, nao clique em links suspeitos e ative a autenticacao em dois fatores.",
  proteger:
    "Para proteger seus dados: 1) Use senhas fortes e unicas, 2) Ative autenticacao em dois fatores, 3) Mantenha softwares atualizados, 4) Faca backups regulares, 5) Use a Cloud Ware para verificar arquivos suspeitos.",
  vpn:
    "Uma VPN criptografa sua conexao com a internet, protegendo seus dados em redes publicas. E essencial para quem trabalha remotamente ou usa Wi-Fi publico com frequencia.",
  firewall:
    "Firewall e uma barreira de seguranca que monitora e filtra o trafego de rede. Ele pode ser baseado em software ou hardware e e essencial para bloquear acessos nao autorizados ao seu sistema.",
  senha:
    "Uma senha forte deve ter no minimo 12 caracteres, misturando letras maiusculas, minusculas, numeros e simbolos. Evite usar informacoes pessoais. Considere usar um gerenciador de senhas.",
  "cloud ware":
    "A Cloud Ware e uma plataforma de ciberseguranca que utiliza inteligencia artificial para analisar arquivos e detectar malware em segundos. Voce pode enviar qualquer arquivo para verificacao na aba de Ameacas.",
  evo:
    "Oi! Eu sou a Evo, a inteligencia artificial da Cloud Ware. Fui criada para te ajudar com tudo sobre seguranca digital. Pode perguntar o que quiser!",
}

const defaultResponses = [
  "Essa e uma otima pergunta sobre seguranca! Posso te ajudar com informacoes sobre malware, ransomware, phishing, protecao de dados, VPN, firewall e muito mais. Sobre o que voce quer saber?",
  "Interessante! Na area de ciberseguranca, posso te explicar sobre diferentes tipos de ameacas e como se proteger. Tente me perguntar sobre malware, trojans, ransomware ou protecao de dados.",
  "Estou aqui para ajudar com qualquer duvida sobre seguranca digital. Posso falar sobre tipos de malware, dicas de protecao, phishing, senhas seguras e mais. O que te interessa?",
]

function findBotResponse(userMsg: string): string {
  const lower = userMsg.toLowerCase()
  for (const [key, response] of Object.entries(botResponses)) {
    if (lower.includes(key)) {
      return response
    }
  }
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
}

const welcomeMessage: ChatMessage = {
  id: "welcome",
  text: 'Ola! Eu sou a <strong>Evo</strong>, assistente inteligente da Cloud Ware. Posso te ajudar com duvidas sobre ciberseguranca, tipos de malware, como proteger seus dados e muito mais. Me conta, o que voce gostaria de saber?',
  isUser: false,
}

export function ChatSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, scrollToBottom])

  const sendMessage = () => {
    const text = input.trim()
    if (!text || isTyping) return

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      text,
      isUser: true,
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    const delay = 800 + Math.random() * 1200
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        text: findBotResponse(text),
        isUser: false,
      }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, delay)
  }

  const clearChat = () => {
    setMessages([welcomeMessage])
    setIsTyping(false)
  }

  return (
    <section className="mx-auto w-full max-w-3xl px-4 sm:px-6 pt-24 pb-8">
      <div className="flex flex-col rounded-2xl border border-border/40 bg-card overflow-hidden" style={{ height: "calc(100vh - 180px)", maxHeight: 700 }}>
        {/* Chat Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border/30">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-secondary border border-border/50">
            <Sparkles className="w-5 h-5 text-foreground/70" strokeWidth={1.5} />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-card" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground">Evo</span>
            <span className="text-xs text-emerald-500">Assistente IA da Cloud Ware</span>
          </div>
          <button
            onClick={clearChat}
            className="ml-auto flex items-center justify-center w-8 h-8 rounded-lg bg-transparent border-none cursor-pointer transition-colors hover:bg-accent"
            title="Limpar conversa"
          >
            <RotateCcw className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4" style={{ scrollbarWidth: "thin", scrollbarColor: "#262626 transparent" }}>
          {messages.map((msg) => (
            <div key={msg.id} className={msg.isUser ? "flex justify-end" : "flex gap-3 max-w-[85%]"}>
              {!msg.isUser && (
                <div className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg bg-secondary border border-border/50 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-foreground/60" strokeWidth={1.5} />
                </div>
              )}
              <div
                className={
                  msg.isUser
                    ? "bg-accent border border-border/50 rounded-xl rounded-br-sm px-4 py-3 max-w-[85%]"
                    : "bg-secondary border border-border/50 rounded-xl rounded-bl-sm px-4 py-3"
                }
              >
                <p
                  className="text-sm leading-relaxed text-foreground m-0"
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3 max-w-[85%]">
              <div className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg bg-secondary border border-border/50 mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-foreground/60" strokeWidth={1.5} />
              </div>
              <div className="bg-secondary border border-border/50 rounded-xl rounded-bl-sm px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-[5px] h-[5px] rounded-full bg-muted-foreground inline-block" style={{ animation: "typingBounce 1.2s infinite 0s" }} />
                  <span className="w-[5px] h-[5px] rounded-full bg-muted-foreground inline-block" style={{ animation: "typingBounce 1.2s infinite 0.15s" }} />
                  <span className="w-[5px] h-[5px] rounded-full bg-muted-foreground inline-block" style={{ animation: "typingBounce 1.2s infinite 0.3s" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="px-5 py-4 border-t border-border/30">
          <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-secondary px-4 py-3 transition-colors focus-within:border-foreground/20">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage()
                }
              }}
              className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
              placeholder="Converse com a Evo..."
              autoComplete="off"
            />
            <button
              onClick={sendMessage}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground border-none cursor-pointer transition-all hover:opacity-90 shrink-0"
            >
              <ArrowUp className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-3 m-0 opacity-60">
            Evo pode cometer erros. Verifique informacoes importantes.
          </p>
        </div>
      </div>
    </section>
  )
}
