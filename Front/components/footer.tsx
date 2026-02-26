import { Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/30">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-8 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <span className="text-xs text-muted-foreground">
            Cloud Ware &mdash; Cybersecurity Platform
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Cloud Ware. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
