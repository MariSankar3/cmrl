"use client"

import { useEffect, useRef, useState } from "react"
import { useScroll, motion } from "framer-motion"

/* ─────────────────────────────────────────────────────────
   Metro Tunnel Scroll — scroll-driven frame animation
   Frames: /metro-tunnel/ezgif-frame-001.jpg … 240.jpg
   Narrative:
     0–40%   : Tunnel appears, darkness glows with depth
     40–70%  : Train emerges from far end
     70–100% : Train rushes toward viewer, full reveal
   Brand colour: #0000FF  (deep blue)
───────────────────────────────────────────────────────── */

const FRAME_COUNT = 240
const PAD = (n: number) => String(n).padStart(3, "0")
const FRAME_SRC = (i: number) => `/metro-tunnel/ezgif-frame-${PAD(i)}.jpg`
const GOLD = "rgba(0,0,255,"

// Scene caption data
const CAPTIONS = [
  { start: 0.00, end: 0.25, line1: "Deep Beneath Chennai", line2: "The Tunnel Awaits", phase: "tunnel" },
  { start: 0.30, end: 0.55, line1: "A Light Stirs", line2: "In The Darkness", phase: "light" },
  { start: 0.60, end: 0.82, line1: "Chennai Metro", line2: "Arrives", phase: "train" },
  { start: 0.85, end: 1.00, line1: "Your Journey", line2: "Begins Now", phase: "cta" },
]

export default function MetroTunnelScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [progress, setProgress] = useState(0)
  const [loadProgress, setLoadProgress] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // ── Preload frames ──────────────────────────────────
  useEffect(() => {
    let loadedCount = 0
    const imgs: HTMLImageElement[] = []

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image()
      img.src = FRAME_SRC(i)
      img.onload = () => {
        loadedCount++
        setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100))
        if (loadedCount === FRAME_COUNT) setImagesLoaded(true)
      }
      imgs.push(img)
    }
    imagesRef.current = imgs
  }, [])

  // ── Resize canvas ──────────────────────────────────
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // ── Draw frame + cinematic vignette ────────────────
  const drawFrame = (idx: number, prog: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    const img = imagesRef.current[idx - 1]
    if (!canvas || !ctx || !img) return

    // Cover fill
    const IR = img.width / img.height
    const CR = canvas.width / canvas.height
    let dw: number, dh: number, ox: number, oy: number
    if (IR > CR) {
      dh = canvas.height; dw = dh * IR
      ox = (canvas.width - dw) / 2; oy = 0
    } else {
      dw = canvas.width; dh = dw / IR
      ox = 0; oy = (canvas.height - dh) / 2
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, ox, oy, dw, dh)

    // Cinematic vignette
    const vigOpacity = 0.6 - prog * 0.3
    const vig = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, canvas.height * 0.1,
      canvas.width / 2, canvas.height / 2, canvas.width * 0.8
    )
    vig.addColorStop(0, `rgba(0,0,0,0)`)
    vig.addColorStop(1, `rgba(0,0,0,${vigOpacity.toFixed(2)})`)
    ctx.fillStyle = vig
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Golden glow in early tunnel frames
    if (prog < 0.45) {
      const glowAlpha = (0.45 - prog) * 0.3
      const glow = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.height * 0.6
      )
      glow.addColorStop(0, `${GOLD}${glowAlpha.toFixed(3)})`)
      glow.addColorStop(1, `rgba(0,0,0,0)`)
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    // Strong bottom dark band so text is always readable
    const bottomBand = ctx.createLinearGradient(0, canvas.height * 0.45, 0, canvas.height)
    bottomBand.addColorStop(0, `rgba(0,0,0,0)`)
    bottomBand.addColorStop(0.55, `rgba(0,0,0,0.72)`)
    bottomBand.addColorStop(1, `rgba(0,0,0,0.92)`)
    ctx.fillStyle = bottomBand
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  // ── Scroll → frame ─────────────────────────────────
  useEffect(() => {
    return scrollYProgress.on("change", (p) => {
      setProgress(p)
      if (!imagesLoaded) return
      const idx = Math.max(1, Math.min(FRAME_COUNT, Math.round(1 + p * (FRAME_COUNT - 1))))
      requestAnimationFrame(() => drawFrame(idx, p))
    })
  }, [imagesLoaded, scrollYProgress])

  // draw first frame when loaded
  useEffect(() => {
    if (imagesLoaded) drawFrame(1, 0)
  }, [imagesLoaded])

  // Active caption
  const caption = CAPTIONS.find((c) => progress >= c.start && progress <= c.end)

  return (
    <div ref={containerRef} className="relative" style={{ height: "800vh" }}>
      {/* ── Sticky viewport ─────────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">

        {/* Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Loading overlay */}
        {!imagesLoaded && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white">
            <div className="relative mb-8">
              <div
                className="absolute inset-0 rounded-full animate-ping scale-125"
                style={{ border: "1px solid rgba(0,0,255,0.2)" }}
              />
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{ border: "2px solid rgba(0,0,255,0.5)" }}
              >
                <span className="text-2xl font-black uppercase tracking-tighter" style={{ color: "#3333FF" }}>
                  {loadProgress}
                </span>
              </div>
            </div>
            <div className="w-64 h-px bg-black/10 rounded-full overflow-hidden mb-4">
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${loadProgress}%`,
                  background: "linear-gradient(to right, #0000CC, #0000FF, #3333FF)"
                }}
              />
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-black/50 font-semibold">
              Entering The Tunnel
            </p>
          </div>
        )}

        {/* ── Top header strip ──────────────────────── */}
        {imagesLoaded && (
          <div
            className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 pt-24 pb-8 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.85) 0%, transparent 100%)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-px h-8" style={{ background: "rgba(0,0,255,0.8)" }} />
              <span
                className="text-[11px] uppercase tracking-[0.35em] font-bold"
                style={{ color: "#3333FF", textShadow: "0 1px 4px rgba(255,255,255,0.9)" }}
              >
                Chennai Metro Rail
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "#0000FF" }}
              />
              <span className="text-[10px] uppercase tracking-[0.25em] text-black/60 font-medium"
                style={{ textShadow: "0 1px 3px rgba(255,255,255,0.9)" }}>
                Scroll to Journey
              </span>
            </div>
          </div>
        )}

        {/* ── Scene caption ──────────────────────────── */}
        {imagesLoaded && caption && (
          <div className={`absolute inset-0 z-10 flex flex-col items-center pointer-events-none justify-end pb-20 ${
            caption.phase === 'tunnel' ? 'md:justify-center md:pb-0' : 'md:justify-end md:pb-24'
          }`}>
            <motion.div
              key={caption.line1}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center px-6 max-w-4xl"
            >
              {/* Phase label */}
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                style={{
                  background: "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(0,0,255,0.5)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span
                  className="text-[10px] uppercase tracking-[0.4em] font-bold"
                  style={{ color: "#3333FF" }}
                >
                  {caption.phase === "tunnel" && "— The Tunnel —"}
                  {caption.phase === "light" && "— A Train Approaches —"}
                  {caption.phase === "train" && "— Arrival —"}
                  {caption.phase === "cta" && "— Chennai Metro —"}
                </span>
              </div>

              {/* Main headline — dark backdrop for legibility */}
              <div className="px-8 py-5">
                <h2
                  className="text-5xl md:text-7xl lg:text-8xl font-black text-black tracking-tighter leading-[0.9] mb-2"
                  style={{
                    fontFamily: "Syne, sans-serif",
                    textShadow: "0 2px 20px rgba(255,255,255,1), 0 0 60px rgba(255,255,255,0.8)"
                  }}
                >
                  {caption.line1}
                </h2>
                <h2
                  className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]"
                  style={{
                    fontFamily: "Syne, sans-serif",
                    WebkitTextStroke: "1.5px #0000FF",
                    color: "transparent",
                    textShadow: "none",
                    filter: "drop-shadow(0 2px 8px rgba(0, 0, 255, 0.5))",
                  }}
                >
                  {caption.line2}
                </h2>
              </div>
            </motion.div>
          </div>
        )}

        {/* ── Scan line effect ──────────────────────── */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.025) 2px, rgba(0,0,0,0.025) 4px)",
          }}
        />

        {/* ── Bottom gradient fade ─────────────────── */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  )
}
