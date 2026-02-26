"use client"

import { useState } from "react"
import { Shield, Menu, X } from "lucide-react"

const navLinks = [
  { label: "Produto", href: "#" },
  { label: "Recursos", href: "#" },
  { label: "Docs", href: "#" },
  { label: "Contato", href: "#" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <Shield className="h-6 w-6 text-foreground" strokeWidth={1.5} />
          <span className="text-lg font-bold tracking-tight text-foreground">
            Cloud Ware
          </span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Sign In Button */}
        <div className="hidden md:block">
          <a
            href="#"
            className="rounded-lg border border-border/60 bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
          >
            Sign In
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border/40 bg-background/95 px-6 pb-6 pt-4 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#"
                className="inline-block rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
              >
                Sign In
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
