import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { MalwareCards } from "@/components/malware-cards"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <MalwareCards />
      </main>
      <Footer />
    </div>
  )
}
