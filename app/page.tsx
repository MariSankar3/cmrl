"use client"

import { useEffect, useRef } from "react"
import MetroNavbar from "../components/MetroNavbar"
import HeroSection from "../components/HeroSection"
import ImageSequenceBg from "../components/ImageSequenceBg"
import SmartInfrastructure from "../components/SmartInfrastructure"
import MetroStationsOverlay from "../components/MetroStationsOverlay"
import SustainabilitySection from "../components/SustainabilitySection"
import TechInnovation from "../components/TechInnovation"
import GalleryShowcase from "../components/GalleryShowcase"
import MetroFooter from "../components/MetroFooter"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

/* ════════════════════════════════════════════════════════════════
   Mouse-Follow Cursor Glow (Global)
════════════════════════════════════════════════════════════════ */
function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + "px"
        glowRef.current.style.top = e.clientY + "px"
      }
    }
    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-[9999] opacity-30 mix-blend-screen"
      style={{
        background: "radial-gradient(circle, rgba(0, 212, 255, 0.06) 0%, transparent 70%)",
        transform: "translate(-50%, -50%)",
        transition: "opacity 0.3s ease",
      }}
    />
  )
}

/* ════════════════════════════════════════════════════════════════
   Cinematic Transition Divider
════════════════════════════════════════════════════════════════ */
function SectionDivider() {
  return (
    <div className="relative h-32 bg-dark-base overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[80%] h-px bg-gradient-to-r from-transparent via-neon-blue/20 to-transparent" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-neon-blue/30 shadow-[0_0_20px_rgba(0,212,255,0.3)]" />
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════
   Main Page — Cinematic Journey Order
════════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <main className="relative min-h-screen bg-dark-base">
      {/* Global cursor glow */}
      <CursorGlow />

      {/* Navigation */}
      <MetroNavbar />

      {/* 1. HERO — Cinematic Landing */}
      <HeroSection />

      {/* 2. IMAGE SEQUENCE — Scroll-driven journey (requested as section 2) */}
      <ImageSequenceBg />

      {/* Transition */}
      <SectionDivider />

      {/* 3. SMART INFRASTRUCTURE — Floating 3D cards */}
      <SmartInfrastructure />

      {/* 4. METRO NETWORK — Animated stations overlay */}
      <section className="relative bg-dark-base">
        <MetroStationsOverlay />
      </section>

      {/* 5. SUSTAINABILITY — Eco counters */}
      <SustainabilitySection />

      {/* Transition */}
      <SectionDivider />

      {/* 6. TECHNOLOGY & INNOVATION — Hologram panels */}
      <TechInnovation />

      {/* 7. GALLERY — Visual showcase */}
      <GalleryShowcase />

      {/* ── CINEMATIC CTA ── */}
      <section className="relative py-40 flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-dark-base">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(0,212,255,0.04),rgba(3,7,18,0))]" />
        <div className="absolute inset-0 bg-grid opacity-15" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue/20 to-transparent" />

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-blue/20 bg-neon-blue/[0.05] text-neon-blue text-[10px] font-bold uppercase tracking-[0.3em] mb-8">
            <Sparkles className="w-3 h-3" />
            The Future Awaits
          </span>
          <h2
            className="text-6xl md:text-8xl font-extrabold text-white tracking-tighter leading-none mb-6"
          >
            Move{" "}
            <span className="text-gradient-neon">Smarter.</span>
            <br />
            <span className="text-white/20">Live Better.</span>
          </h2>
          <p className="text-xl text-white/40 max-w-xl mx-auto mb-12 leading-relaxed">
            Join over 450,000 daily commuters who choose the smarter, faster, and greener way to travel across Chennai.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="btn-primary flex items-center gap-2 text-base px-10 py-4"
            >
              Begin Your Journey
              <Sparkles className="w-5 h-5 opacity-60" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="btn-ghost text-base px-10 py-4"
            >
              View All Routes
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* 8. FOOTER */}
      <MetroFooter />
    </main>
  )
}
