"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  /* Mouse-follow glow */
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
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-dark-base">
      {/* DEEP BACKGROUND — Night city gradient */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        {/* Layered atmospheric gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0a0f1e] to-[#030712]" />
        
        {/* Distant city glow — bottom horizon */}
        <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-neon-blue/[0.04] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-1/4 w-1/2 h-[30%] bg-[radial-gradient(ellipse_at_bottom,rgba(0,212,255,0.08),transparent_70%)]" />
        
        {/* Subtle cyan sky haze */}
        <div className="absolute top-0 left-0 right-0 h-[50%] bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(0,212,255,0.04),transparent)]" />
        
        {/* Gold accent — station lights glow */}
        <div className="absolute bottom-[15%] left-[10%] w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(245,158,11,0.06),transparent_60%)] blur-xl" />
        <div className="absolute bottom-[20%] right-[15%] w-[150px] h-[150px] bg-[radial-gradient(circle,rgba(245,158,11,0.04),transparent_60%)] blur-xl" />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-40" />
      </motion.div>

      {/* Atmospheric fog layers */}
      <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-dark-base via-dark-base/60 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_50%,transparent_30%,rgba(3,7,18,0.6)_100%)] z-[5] pointer-events-none" />

      {/* Light streak effects */}
      <div className="absolute top-[20%] left-0 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-neon-blue/40 to-transparent animate-light-streak opacity-30" style={{ animationDelay: "0s", animationDuration: "6s" }} />
      <div className="absolute top-[45%] left-0 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent animate-light-streak opacity-20" style={{ animationDelay: "2s", animationDuration: "8s" }} />
      <div className="absolute top-[70%] left-0 w-[250px] h-[1px] bg-gradient-to-r from-transparent via-neon-gold/20 to-transparent animate-light-streak opacity-25" style={{ animationDelay: "4s", animationDuration: "7s" }} />

      {/* Mouse-follow glow */}
      <div ref={glowRef} className="cursor-glow opacity-50" />

      {/* ─── HERO CONTENT ─── */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-neon-blue/20 bg-neon-blue/[0.05] backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse shadow-[0_0_8px_rgba(0,212,255,0.6)]" />
            <span className="text-neon-blue text-[10px] font-bold uppercase tracking-[0.3em]">
              Chennai Metro Rail
            </span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(3rem,8vw,8rem)] font-extrabold text-white tracking-tighter leading-[0.9] mb-6"
        >
          Urban Mobility
          <br />
          <span className="text-gradient-neon">Redefined</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed font-light tracking-wide"
        >
          Step into the future of transit. A cinematic journey through one of India&apos;s most advanced metropolitan rail networks.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-12 flex items-center gap-4"
        >
          <button className="btn-primary text-sm px-8 py-3.5">
            Begin Journey
          </button>
          <button className="btn-ghost text-sm px-8 py-3.5">
            Explore Network
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-[9px] uppercase tracking-[0.4em] font-bold">Scroll to explore</span>
        <ChevronDown className="w-5 h-5 text-neon-blue/60 animate-scroll-hint" />
      </motion.div>

      {/* Bottom edge glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent z-30" />
    </section>
  )
}
