"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight, Train, Zap, MapPin, Shield, Leaf, Wifi, Sparkles } from "lucide-react"

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
    chapter: "CHAPTER I",
    title: "A City in Motion",
    subtitle: "CHENNAI PULSE",
    description: "Witness the skyline shift as Chennai's arterial network bridges the horizon between suburb and city.",
    badge: "RAILWAY EXTERIOR",
    features: [
      { icon: Train, title: "Commuter Pulse", desc: "Arterial tracks connecting millions daily." },
      { icon: MapPin, title: "Elevated Transit", desc: "Gliding above the metropolitan bustle." }
    ]
  },
  {
    id: "station",
    start: 100,
    end: 250,
    chapter: "CHAPTER II",
    title: "Synchronized Arrival",
    subtitle: "URBAN SANCTUM",
    description: "Entering the climate-controlled precision of our award-winning stations. Designed for seamless human flow.",
    badge: "STATION CONCOURSE",
    features: [
      { icon: Shield, title: "Invisible Security", desc: "AI-integrated surveillance and safety systems." },
      { icon: Zap, title: "Frictionless AI", desc: "Biometric and contactless payment ecosystem." }
    ]
  },
  {
    id: "tunnel",
    start: 251,
    end: 349,
    chapter: "CHAPTER III",
    title: "Deep Subterranean",
    subtitle: "ENGINEERING MARVEL",
    description: "Deep beneath the surface, a silent network of precision-cut tunnels enables ultra-high-speed metropolitan transit.",
    badge: "TUNNEL NETWORK",
    features: [
      { icon: Train, title: "Precision Boring", desc: "TBM-engineered subterranean infrastructure." },
      { icon: Wifi, title: "Quantum Connect", desc: "Uninterrupted 5G coverage 100ft below ground." }
    ]
  },
  {
    id: "closeup",
    start: 350,
    end: 478,
    chapter: "CHAPTER IV",
    title: "Peak Performance",
    subtitle: "THE FUTURE OF FLOW",
    description: "A close-up on the engineering that drives our city. Aerodynamic, zero-emission, and purely efficient.",
    badge: "METRO CLOSE-UP",
    features: [
      { icon: Leaf, title: "Zero Emission", desc: "100% sustainable energy powered fleet." },
      { icon: Zap, title: "High Velocity", desc: "80 km/h with 180s peak frequency." }
    ]
  }
]

export default function ImageSequenceBg() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<(HTMLImageElement | null)[]>(Array(TOTAL_FRAMES).fill(null))
  
  // Performance Refs
  const currentRef = useRef(0)
  const targetRef = useRef(0)
  const animFrameRef = useRef<number>(0)
  
  const [loaded, setLoaded] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const [activePhaseIndex, setActivePhaseIndex] = useState(0)

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 150 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)
  
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5])
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-15, 15])
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-15, 15])

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    mouseX.set((clientX / innerWidth) - 0.5)
    mouseY.set((clientY / innerHeight) - 0.5)
  }

  /* ── 1. LAGLESS PRELOADING ── */
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

  /* ── 2. CANVAS DRAWING ── */
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

  /* ── 3. PERFORMANCE LOOP ── */
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
        currentRef.current += diff * 0.18
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

  return (
    <div 
      ref={sectionRef} 
      className="relative w-full bg-[#030303]" 
      style={{ height: "650vh" }}
      onMouseMove={handleMouseMove}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ isolation: "isolate" }}>
        
        {/* HIGH-PERFORMANCE CANVAS */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ imageRendering: "auto", display: loaded ? "block" : "none" }}
        />

        {/* ULTRA-MODERN LOADING SHIMMER */}
        {!loaded && (
          <div className="absolute inset-0 bg-[#020202] flex flex-col items-center justify-center gap-6">
            <div className="relative w-64 h-[2px] rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${loadProgress}%` }}
                className="h-full bg-gradient-to-r from-metro-gold via-amber-200 to-metro-gold shadow-[0_0_20px_rgba(158,116,72,0.4)]"
              />
            </div>
            <p className="text-metro-gold/40 text-[9px] tracking-[0.5em] uppercase font-black animate-pulse">
              Initializing Experience · {loadProgress}%
            </p>
          </div>
        )}

        {/* CINEMATIC DIM OVERLAYS */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none z-10" />

        {/* INTERACTIVE CONTENT OVERLAY */}
        <div className="absolute inset-0 z-20 flex items-center justify-center p-6 md:p-12 pointer-events-none">
          <AnimatePresence mode="wait">
            {activePhase && (
              <motion.div
                key={activePhase.id}
                style={{ rotateX, rotateY, x: translateX, y: translateY, perspective: 1000 }}
                initial={{ opacity: 0, filter: "blur(20px)", scale: 0.95 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-5xl mix-blend-difference pointer-events-auto"
              >
                <div className="flex flex-col items-start gap-6">
                 k

                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="text-[clamp(3.5rem,9vw,9rem)] font-bold text-white tracking-tighter leading-[0.85] mb-2"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    {activePhase.title}
                  </motion.h1>

                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="text-lg md:text-2xl text-white max-w-2xl mb-12 leading-tight font-light tracking-tight italic opacity-70"
                  >
                    {activePhase.description}
                  </motion.p>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="group flex items-center gap-12"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative px-10 py-5 overflow-hidden border border-white/20 rounded-full transition-all duration-500 hover:border-white/60 bg-white/5 backdrop-blur-sm"
                    >
                      <span className="relative z-10 text-white text-xs font-bold uppercase tracking-[0.5em] flex items-center gap-4">
                        Explore <Sparkles className="w-4 h-4 text-white/40" />
                      </span>
                      <motion.div 
                        className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"
                        initial={false}
                      />
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}





