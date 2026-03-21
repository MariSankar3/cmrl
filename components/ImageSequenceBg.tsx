"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Train, Zap, MapPin, Shield, Leaf, Wifi, ArrowRight, Activity } from "lucide-react"

const TOTAL_FRAMES = 478
const frames = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const num = String(i + 1).padStart(4, "0")
  return `/metrocmr/${num}.jpg`
})

const CONTENT_PHASES = [
  {
    id: "outdoors",
    start: 0,
    end: 80,
    chapter: "01",
    chapterLabel: "City Scale",
    accentColor: "#00d4ff",         // neon blue
    accentRgb: "0,212,255",
    title: "A City\nIn Motion",
    subtitle: "CHENNAI PULSE",
    description: "Witness the skyline shift as Chennai's arterial network bridges the horizon between suburb and city.",
    stat: { value: "45K+", label: "Daily Trains" },
    badge: "RAILWAY EXTERIOR",
    icon: Train,
    tag: "Elevated Network",
  },
  {
    id: "station",
    start: 100,
    end: 250,
    chapter: "02",
    chapterLabel: "Urban Sanctum",
    accentColor: "#a855f7",         // violet
    accentRgb: "168,85,247",
    title: "Synchronized\nArrival",
    subtitle: "URBAN SANCTUM",
    description: "Climate-controlled precision in our award-winning stations. Engineered for seamless human flow at metropolitan scale.",
    stat: { value: "98%", label: "On-Time Rate" },
    badge: "STATION CONCOURSE",
    icon: Shield,
    tag: "Smart Station",
  },
  {
    id: "tunnel",
    start: 251,
    end: 349,
    chapter: "03",
    chapterLabel: "Engineering Marvel",
    accentColor: "#22c55e",         // neon green
    accentRgb: "34,197,94",
    title: "Deep\nSubterranean",
    subtitle: "ENGINEERING MARVEL",
    description: "Deep beneath the surface, precision-cut tunnels enable ultra-high-speed transit with uninterrupted 5G connectivity.",
    stat: { value: "45m", label: "Below Ground" },
    badge: "TUNNEL NETWORK",
    icon: Wifi,
    tag: "Underground Infrastructure",
  },
  {
    id: "closeup",
    start: 350,
    end: 478,
    chapter: "04",
    chapterLabel: "The Future of Flow",
    accentColor: "#f59e0b",         // gold
    accentRgb: "245,158,11",
    title: "Peak\nPerformance",
    subtitle: "THE FUTURE OF FLOW",
    description: "Aerodynamic. Zero-emission. Purely efficient. The machine redefining what it means to move through Chennai.",
    stat: { value: "80 km/h", label: "Top Speed" },
    badge: "METRO CLOSE-UP",
    icon: Zap,
    tag: "Zero Emission Fleet",
  }
]

/* ═══════════════════════════════════════════════════════════
   Phase overlays — each one has a completely unique layout
═══════════════════════════════════════════════════════════ */

// Chapter 1 — LEFT COLUMN: cinematic headline split across side
function PhaseOutdoors({ phase }: { phase: typeof CONTENT_PHASES[0] }) {
  const Icon = phase.icon
  return (
    <div className="absolute inset-0 flex items-end justify-start p-8 md:p-16 pointer-events-none z-20">
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -80 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl"
      >
        {/* Chapter pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 mb-6"
        >
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black font-jakarta"
            style={{ background: `rgba(${phase.accentRgb},0.15)`, border: `1px solid rgba(${phase.accentRgb},0.4)`, color: phase.accentColor }}
          >
            {phase.chapter}
          </span>
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold font-jakarta" style={{ color: phase.accentColor }}>
            {phase.chapterLabel}
          </span>
        </motion.div>

        {/* Big split headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-[clamp(3rem,8vw,8rem)] font-extrabold text-white tracking-tighter leading-[0.88] mb-8"
          style={{ textShadow: `0 0 80px rgba(${phase.accentRgb},0.3)` }}
        >
          {phase.title.split("\n").map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </motion.h1>

        {/* Bottom row: stat + description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex items-start gap-8"
        >
          <div className="flex-shrink-0 text-center">
            <div className="text-3xl font-extrabold font-jakarta" style={{ color: phase.accentColor }}>{phase.stat.value}</div>
            <div className="text-[10px] uppercase tracking-widest text-white/40 mt-1">{phase.stat.label}</div>
          </div>
          <div className="w-px h-12 bg-white/10 flex-shrink-0 mt-1" />
          <p className="text-base text-white/60 leading-relaxed max-w-sm">{phase.description}</p>
        </motion.div>
      </motion.div>

      {/* Right side icon badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="absolute right-8 md:right-16 bottom-16 hidden md:flex flex-col items-center gap-2"
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-xl"
          style={{ background: `rgba(${phase.accentRgb},0.12)`, border: `1px solid rgba(${phase.accentRgb},0.35)` }}
        >
          <Icon className="w-7 h-7" style={{ color: phase.accentColor }} />
        </div>
        <span className="text-[9px] uppercase tracking-widest font-bold font-jakarta" style={{ color: phase.accentColor }}>{phase.tag}</span>
      </motion.div>
    </div>
  )
}

// Chapter 2 — CENTERED with frosted glass card, big stat on right
function PhaseStation({ phase }: { phase: typeof CONTENT_PHASES[0] }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-8 md:p-16 pointer-events-none z-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: -40 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl"
      >
        {/* Big number + label — top center */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-10"
        >
          <div
            className="text-[clamp(5rem,15vw,12rem)] font-black leading-none tracking-tighter"
            style={{ color: `rgba(${phase.accentRgb},0.9)`, textShadow: `0 0 120px rgba(${phase.accentRgb},0.4)` }}
          >
            {phase.stat.value}
          </div>
          <div className="text-sm uppercase tracking-[0.5em] text-white/40 font-bold font-jakarta -mt-4">{phase.stat.label}</div>
        </motion.div>

        {/* Glass card — chapter + title + description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="rounded-2xl p-8 md:p-10 backdrop-blur-2xl flex flex-col md:flex-row items-start md:items-center gap-8"
          style={{
            background: `rgba(0,0,0,0.45)`,
            border: `1px solid rgba(${phase.accentRgb},0.25)`,
            boxShadow: `0 0 60px rgba(${phase.accentRgb},0.08), inset 0 1px 0 rgba(255,255,255,0.05)`
          }}
        >
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold font-jakarta mb-3 block" style={{ color: phase.accentColor }}>{phase.chapter} — {phase.chapterLabel}</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tighter leading-tight mb-0">
              {phase.title.replace("\n", " ")}
            </h2>
          </div>
          <div className="w-px h-20 bg-white/10 hidden md:block flex-shrink-0" />
          <p className="text-base text-white/55 leading-relaxed flex-1">{phase.description}</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

// Chapter 3 — RIGHT-ALIGNED vertical stack with animated data lines
function PhaseTunnel({ phase }: { phase: typeof CONTENT_PHASES[0] }) {
  const Icon = phase.icon
  const bars = [85, 72, 100, 63, 91]
  return (
    <div className="absolute inset-0 flex items-center justify-end p-8 md:p-16 pointer-events-none z-20">
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 80 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        {/* HUD-style header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex items-center gap-2 mb-6"
        >
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: phase.accentColor }} />
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold font-jakarta" style={{ color: phase.accentColor }}>SYSTEM STATUS — LIVE</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-[clamp(2.8rem,6vw,6rem)] font-extrabold text-white tracking-tighter leading-[0.88] mb-4"
        >
          {phase.title.split("\n").map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-white/60 leading-relaxed mb-8"
        >
          {phase.description}
        </motion.p>

        {/* Animated bar chart — fake sensor data */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl p-5 backdrop-blur-xl"
          style={{ background: `rgba(0,0,0,0.4)`, border: `1px solid rgba(${phase.accentRgb},0.2)` }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] uppercase tracking-[0.35em] text-white/30 font-bold font-jakarta">Tunnel Telemetry</span>
            <Activity className="w-3 h-3" style={{ color: phase.accentColor }} />
          </div>
          <div className="flex items-end gap-1.5 h-12">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-sm"
                style={{ background: phase.accentColor, opacity: 0.6 + i * 0.08 }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: h / 100 }}
                transition={{ delay: 0.5 + i * 0.05, duration: 0.6, ease: "backOut" }}
                style={{ height: `${h}%`, background: phase.accentColor, borderRadius: "2px" }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {["T1","T2","T3","T4","T5"].map(t => (
              <span key={t} className="text-[8px] text-white/20 font-jakarta">{t}</span>
            ))}
          </div>
        </motion.div>

        {/* Big stat */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-4 mt-6"
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `rgba(${phase.accentRgb},0.12)`, border: `1px solid rgba(${phase.accentRgb},0.3)` }}>
            <Icon className="w-5 h-5" style={{ color: phase.accentColor }} />
          </div>
          <div>
            <div className="text-xl font-black font-jakarta" style={{ color: phase.accentColor }}>{phase.stat.value}</div>
            <div className="text-[10px] uppercase tracking-widest text-white/30">{phase.stat.label}</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

// Chapter 4 — FULL-BLEED dramatic reveal with horizontal rules and gold accents
function PhaseCloseup({ phase }: { phase: typeof CONTENT_PHASES[0] }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:px-20 pointer-events-none z-20">
      {/* Top horizontal rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-px mb-10 origin-left"
        style={{ background: `linear-gradient(to right, rgba(${phase.accentRgb},0.6), transparent)` }}
      />

      {/* Center — chapter + massive headline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full text-center"
      >
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.8em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="block text-[10px] uppercase font-bold font-jakarta mb-6"
          style={{ color: phase.accentColor }}
        >
          {phase.chapter} — {phase.chapterLabel}
        </motion.span>

        <h1
          className="text-[clamp(3.5rem,10vw,11rem)] font-extrabold tracking-tighter leading-[0.85]"
          style={{
            WebkitTextStroke: `1px rgba(${phase.accentRgb},0.6)`,
            color: "transparent",
            textShadow: `0 0 120px rgba(${phase.accentRgb},0.25)`
          }}
        >
          {phase.title.replace("\n", " ")}
        </h1>
        <h1
          className="text-[clamp(3.5rem,10vw,11rem)] font-extrabold text-white tracking-tighter leading-[0.85] -mt-4"
        >
          {phase.title.split("\n")[1]}
        </h1>
      </motion.div>

      {/* Bottom row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.35, duration: 0.7 }}
        className="w-full flex items-center justify-between mt-10 gap-6"
      >
        <p className="text-sm text-white/50 max-w-xs leading-relaxed">{phase.description}</p>
        <div className="flex items-center gap-6 flex-shrink-0">
          <div className="text-right">
            <div className="text-3xl font-black font-jakarta" style={{ color: phase.accentColor }}>{phase.stat.value}</div>
            <div className="text-[10px] uppercase tracking-widest text-white/30">{phase.stat.label}</div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, x: 4 }}
            whileTap={{ scale: 0.97 }}
            className="pointer-events-auto flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] px-6 py-3 rounded-full font-jakarta"
            style={{
              background: `rgba(${phase.accentRgb},0.12)`,
              border: `1px solid rgba(${phase.accentRgb},0.4)`,
              color: phase.accentColor
            }}
          >
            Explore <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>

      {/* Bottom horizontal rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-px mt-10 origin-right"
        style={{ background: `linear-gradient(to left, rgba(${phase.accentRgb},0.6), transparent)` }}
      />
    </div>
  )
}

const PHASE_RENDERERS = [PhaseOutdoors, PhaseStation, PhaseTunnel, PhaseCloseup]

/* ═══════════════════════════════════════════════════════════
   Main component
═══════════════════════════════════════════════════════════ */
export default function ImageSequenceBg() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<(HTMLImageElement | null)[]>(Array(TOTAL_FRAMES).fill(null))

  const currentRef = useRef(0)
  const targetRef = useRef(0)
  const animFrameRef = useRef<number>(0)

  const [loaded, setLoaded] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const [activePhaseIndex, setActivePhaseIndex] = useState(0)

  /* ── PRELOADING ── */
  useEffect(() => {
    let count = 0
    let mounted = true
    frames.forEach((src, i) => {
      const img = new Image()
      img.src = src
      const done = () => {
        if (!mounted) return
        imagesRef.current[i] = img
        count++
        if (count % 10 === 0 || count === TOTAL_FRAMES) {
          setLoadProgress(Math.round((count / TOTAL_FRAMES) * 100))
        }
        if (count === TOTAL_FRAMES) setLoaded(true)
      }
      img.onload = done
      img.onerror = done
    })
    return () => { mounted = false }
  }, [])

  /* ── CANVAS DRAWING ── */
  const drawFrame = (frame: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return
    const imgIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(frame)))
    const img = imagesRef.current[imgIndex]
    if (img && img.complete && img.naturalWidth) {
      const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight)
      const sw = img.naturalWidth * scale
      const sh = img.naturalHeight * scale
      const dx = (canvas.width - sw) / 2
      const dy = (canvas.height - sh) / 2
      ctx.drawImage(img, dx, dy, sw, sh)
    }
  }

  /* ── PERFORMANCE LOOP ── */
  useEffect(() => {
    if (!loaded) return
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth * window.devicePixelRatio
        canvasRef.current.height = window.innerHeight * window.devicePixelRatio
        drawFrame(currentRef.current)
      }
    }
    window.addEventListener("resize", handleResize)
    handleResize()

    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrollable = el.offsetHeight - window.innerHeight
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable))
      targetRef.current = progress * (TOTAL_FRAMES - 1)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    const animate = () => {
      const diff = targetRef.current - currentRef.current
      if (Math.abs(diff) > 0.05) {
        // Fast catch-up: bigger steps so fast scrolling never gets "stuck"
        currentRef.current += diff * 0.4
        drawFrame(currentRef.current)
        const currentFrame = Math.round(currentRef.current)
        const phaseIdx = CONTENT_PHASES.findIndex(p => currentFrame >= p.start && currentFrame <= p.end)
        setActivePhaseIndex(prev => (prev !== phaseIdx ? phaseIdx : prev))
      }
      animFrameRef.current = requestAnimationFrame(animate)
    }
    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [loaded])

  const activePhase = CONTENT_PHASES[activePhaseIndex]
  const PhaseRenderer = activePhaseIndex >= 0 ? PHASE_RENDERERS[activePhaseIndex] : null

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-dark-base"
      style={{ height: "650vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ imageRendering: "auto", display: loaded ? "block" : "none" }}
        />

        {/* Loading */}
        {!loaded && (
          <div className="absolute inset-0 bg-dark-base flex flex-col items-center justify-center gap-6">
            <div className="relative w-64 h-[2px] rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${loadProgress}%` }}
                className="h-full bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-blue shadow-[0_0_20px_rgba(0,212,255,0.4)]"
              />
            </div>
            <p className="text-neon-blue/40 text-[9px] tracking-[0.5em] uppercase font-black animate-pulse">
              Initializing Experience · {loadProgress}%
            </p>
          </div>
        )}

        {/* Base cinematic overlays — always present */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/80 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_30%,rgba(0,0,0,0.4)_100%)] pointer-events-none z-10" />

        {/* Chapter progress bar top */}
        {loaded && (
          <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none">
            <div className="h-[1.5px] bg-white/5">
              <motion.div
                className="h-full"
                style={{
                  width: `${((activePhaseIndex + 1) / CONTENT_PHASES.length) * 100}%`,
                  background: activePhase ? activePhase.accentColor : "#00d4ff",
                  boxShadow: activePhase ? `0 0 12px rgba(${activePhase.accentRgb},0.6)` : "none",
                  transition: "width 0.6s ease, background 0.6s ease"
                }}
              />
            </div>
          </div>
        )}

        {/* Chapter counter — top right */}
        {loaded && activePhase && (
          <motion.div
            key={activePhase.id + "-counter"}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-8 right-8 md:top-10 md:right-12 z-30 pointer-events-none"
          >
            <div className="flex items-center gap-2">
              {CONTENT_PHASES.map((p, i) => (
                <div
                  key={p.id}
                  className="rounded-full transition-all duration-500"
                  style={{
                    width: i === activePhaseIndex ? "24px" : "6px",
                    height: "6px",
                    background: i === activePhaseIndex ? activePhase.accentColor : "rgba(255,255,255,0.2)"
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Chapter badge — bottom left */}
        {loaded && activePhase && (
          <motion.div
            key={activePhase.id + "-badge"}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-8 left-8 md:bottom-10 md:left-12 z-30 pointer-events-none"
          >
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] uppercase tracking-[0.35em] font-bold font-jakarta backdrop-blur-sm"
              style={{
                background: `rgba(${activePhase.accentRgb},0.1)`,
                border: `1px solid rgba(${activePhase.accentRgb},0.3)`,
                color: activePhase.accentColor
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: activePhase.accentColor }} />
              {activePhase.badge}
            </span>
          </motion.div>
        )}

        {/* THE UNIQUE PHASE OVERLAYS */}
        <AnimatePresence mode="wait">
          {loaded && activePhase && PhaseRenderer && (
            <PhaseRenderer key={activePhase.id} phase={activePhase} />
          )}
        </AnimatePresence>

        {/* Bottom neon edge */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-blue/20 to-transparent z-20 pointer-events-none" />
      </div>
    </div>
  )
}
