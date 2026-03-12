"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import MetroNavbar from "../components/MetroNavbar"
import MetroTunnelScroll from "../components/MetroTunnelScroll"
import MetroStationsOverlay from "../components/MetroStationsOverlay"
import MetroFooter from "../components/MetroFooter"

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Zap, Shield, Leaf, Wifi, ArrowRight, Play, ChevronDown, Train } from "lucide-react"

/* ────────────────────────────────────────
   Animated counter hook
──────────────────────────────────────── */
function useCounter(target: number, duration = 2000, started = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    let start = 0
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [started, target, duration])
  return count
}

/* ────────────────────────────────────────
   Stats data
──────────────────────────────────────── */
const stats = [
  { value: 32, suffix: "+", label: "Metro Stations", icon: "🚉" },
  { value: 54, suffix: " km", label: "Total Network", icon: "📏" },
  { value: 450, suffix: "k+", label: "Daily Riders", icon: "👥" },
  { value: 99, suffix: "%", label: "On-Time Rate", icon: "⚡" },
]

/* ────────────────────────────────────────
   Features data
──────────────────────────────────────── */
const features = [
  {
    icon: Zap,
    color: "from-amber-500 to-orange-500",
    glow: "shadow-amber-500/20",
    title: "Lightning Fast",
    desc: "Reach any part of Chennai in record time. Our trains run at 80 km/h with 3-minute intervals during peak hours.",
  },
  {
    icon: Leaf,
    color: "from-emerald-500 to-green-400",
    glow: "shadow-emerald-500/20",
    title: "100% Green Energy",
    desc: "Fully powered by renewable sources. Every ride reduces your carbon footprint by up to 90% versus a private car.",
  },
  {
    icon: Wifi,
    color: "from-amber-500 to-metro-gold",
    glow: "shadow-metro-gold/20",
    title: "Always Connected",
    desc: "High-speed Wi-Fi and 5G coverage throughout all stations and tunnels, keeping you productive on the move.",
  },
  {
    icon: Shield,
    color: "from-metro-gold to-amber-600",
    glow: "shadow-metro-gold/20",
    title: "AI-Powered Safety",
    desc: "24/7 intelligent surveillance, automated emergency response, and real-time incident detection keep every passenger safe.",
  },
]

/* ────────────────────────────────────────
   Premium Tunnel Intro (“First Section”)
   Appears above the animated scroll section
──────────────────────────────────────── */
function TunnelIntroSection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden bg-[#050505]">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(158,116,72,0.07),transparent)]" />
      <div className="absolute inset-0 bg-grid-gold opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-metro-gold/40 to-transparent" />

      {/* Vertical rail */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-metro-gold/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center justify-center mb-16"
        >
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-metro-gold/25 bg-metro-gold/8">
            <Train className="w-3.5 h-3.5 text-metro-gold" />
            <span className="text-[11px] uppercase tracking-[0.35em] text-metro-gold-light font-bold">
              Chennai Metro — Line 1 &amp; Line 2
            </span>
          </div>
        </motion.div>

        {/* Main title block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Big display text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <h2
              className="text-[clamp(3rem,7vw,7rem)] font-black text-white tracking-tighter leading-[0.85] mb-8"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Into The{" "}
              <span
                style={{
                  WebkitTextStroke: "1px rgba(158,116,72,0.9)",
                  color: "transparent",
                }}
              >
                Tunnel
              </span>
              <br />
              <span className="text-white/15">And Beyond</span>
            </h2>
            <p className="text-base text-white/45 leading-relaxed max-w-md mb-8">
              Scroll down to ride inside Chennai Metro’s underground network —
              a cinematic journey through the tunnels that connect the city.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-metro-gold/60" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-metro-gold/70 font-semibold">
                Scroll-Driven Experience
              </span>
            </div>
          </motion.div>

          {/* Right: Feature pills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-4"
          >
            {[
              { icon: "⚡", title: "Underground Express", desc: "Fastest route through Chennai’s heart — zero traffic, every time." },
              { icon: "🚇", title: "165+ Trains Daily", desc: "Frequent services from 5 AM to midnight across both corridors." },
              { icon: "📍", title: "45 Active Stations", desc: "Connecting airport, suburbs, business districts and cultural hubs." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }}
                viewport={{ once: true }}
                className="group flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-metro-gold/25 hover:bg-metro-gold/[0.04] transition-all duration-500"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-metro-gold/10 border border-metro-gold/20 flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1" style={{ fontFamily: "Syne, sans-serif" }}>{item.title}</h3>
                  <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom divider with scroll hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-metro-gold/30" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-white/20 font-medium">
              Journey Below
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-metro-gold/30" />
          </div>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 opacity-40"
          >
            <ChevronDown className="w-5 h-5 text-metro-gold" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────
   Interactive Hero Section
──────────────────────────────────────── */
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  delay: Math.random() * 5,
  duration: Math.random() * 6 + 6,
  opacity: Math.random() * 0.4 + 0.1,
}))

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  // Raw mouse values
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  // Spring smoothed values for parallax orbs
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })

  // Orb 1 parallax (left-top area)
  const orb1X = useTransform(springX, [0, 1], ["-20%", "20%"])
  const orb1Y = useTransform(springY, [0, 1], ["-20%", "20%"])
  // Orb 2 parallax (right-bottom area, opposite)
  const orb2X = useTransform(springX, [0, 1], ["20%", "-20%"])
  const orb2Y = useTransform(springY, [0, 1], ["20%", "-20%"])

  // Spotlight position (direct mouse, no spring)
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    const nx = (e.clientX - rect.left) / rect.width
    const ny = (e.clientY - rect.top) / rect.height
    mouseX.set(nx)
    mouseY.set(ny)
    setSpotlight({ x: nx * 100, y: ny * 100 })
  }, [mouseX, mouseY])

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Static radial top gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(158,116,72,0.14),rgba(0,0,0,0))]" />
      {/* Grid */}
      <div className="absolute inset-0 bg-grid-gold opacity-100" />

      {/* Cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-75"
        style={{
          background: `radial-gradient(400px circle at ${spotlight.x}% ${spotlight.y}%, rgba(158,116,72,0.11), transparent 70%)`,
        }}
      />

      {/* Parallax orb 1 */}
      <motion.div
        style={{ x: orb1X, y: orb1Y }}
        className="absolute top-1/4 left-1/4 w-80 h-80 bg-metro-gold/12 rounded-full blur-[90px] pointer-events-none"
      />
      {/* Parallax orb 2 */}
      <motion.div
        style={{ x: orb2X, y: orb2Y }}
        className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-metro-gold-light/10 rounded-full blur-[120px] pointer-events-none"
      />
      {/* Center static glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] bg-metro-gold-dark/18 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-metro-gold-light"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
            }}
            animate={{ y: [0, -30, 0], opacity: [p.opacity, p.opacity * 2.2, p.opacity] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Content — pt-16 so it starts BELOW the fixed 64px navbar */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center pt-16 px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-metro-gold/30 bg-metro-gold/10 text-metro-gold-light text-xs font-bold uppercase tracking-[0.2em] mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-metro-gold animate-blink" />
          Next-Gen Urban Transit
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(3.5rem,9vw,8rem)] font-black text-white tracking-tighter leading-[0.88] mb-8 max-w-5xl"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          Ride The{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-metro-gold via-metro-gold-light to-metro-gold animate-gradient">
            Future
          </span>
          <br />
          <span className="text-white/20">Of Chennai</span>
        </motion.h1>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mb-12 leading-relaxed"
        >
          Experience the seamless rhythm of Chennai through its state-of-the-art metro network.
          Comfort, speed, and sustainability—redefined for tomorrow.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(158,116,72,0.55)" }}
            whileTap={{ scale: 0.96 }}
            className="btn-primary flex items-center gap-2"
          >
            Begin Journey
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="btn-ghost flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            Watch Film
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 flex flex-col items-center gap-3 opacity-40"
      >
        <span className="text-[9px] uppercase tracking-[0.35em] text-white font-medium"></span>
        <ChevronDown className="w-4 h-4 text-white" />
      </motion.div>
    </section>
  )
}

/* ────────────────────────────────────────
   Stats Section Component
──────────────────────────────────────── */
function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const c0 = useCounter(stats[0].value, 1800, isInView)
  const c1 = useCounter(stats[1].value, 2000, isInView)
  const c2 = useCounter(stats[2].value, 2200, isInView)
  const c3 = useCounter(stats[3].value, 1600, isInView)
  const counts = [c0, c1, c2, c3]

  return (
    <section ref={ref} className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#030303]" />
      <div className="absolute inset-0 bg-grid-gold opacity-100" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-metro-gold/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-metro-gold/20 to-transparent" />

      <div className="relative max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className="stat-card text-center"
          >
            <div className="text-3xl mb-3">{s.icon}</div>
            <div className="text-4xl md:text-5xl font-black text-white mb-1" style={{ fontFamily: "Syne, sans-serif" }}>
              {counts[i]}
              <span className="text-metro-gold">{s.suffix}</span>
            </div>
            <div className="text-xs uppercase tracking-[0.15em] text-white/40 font-semibold">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ────────────────────────────────────────
   Features Section Component
──────────────────────────────────────── */
function FeaturesSection() {
  return (
    <section className="relative py-32 px-6 bg-[#020202] overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-100" />
      {/* Ambient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-metro-gold/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-metro-gold/30 bg-metro-gold/10 text-metro-gold-light text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-metro-gold animate-pulse" />
            Why Chennai Metro
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none" style={{ fontFamily: "Syne, sans-serif" }}>
            Beyond Just{" "}
            <span className="text-gradient-gold">Transportation</span>
          </h2>
          <p className="mt-6 text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            From climate-controlled coaches to AI-driven safety systems, every detail of Chennai Metro is engineered to deliver an exceptional commuter experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card-glass p-8 group relative overflow-hidden"
              >
                {/* Top gradient line */}
                <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-metro-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-xl ${feature.glow} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "Syne, sans-serif" }}>
                  {feature.title}
                </h3>
                <p className="text-white/55 leading-relaxed text-sm">{feature.desc}</p>

                <div className="mt-6 flex items-center gap-2 text-metro-gold text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────
   Main Page
──────────────────────────────────────── */
export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <MetroNavbar />

      {/* ────── METRO TUNNEL SCROLL (first section) ────── */}
      <section className="relative">
        <MetroTunnelScroll />
      </section>

      {/* ────── TUNNEL INTRO ────── */}
      <TunnelIntroSection />

      {/* ────── HERO ────── */}
      <HeroSection />

      {/* ────── STATS ────── */}
      <StatsSection />

      {/* ────── MAP ────── */}
      <section className="relative bg-black">
        <MetroStationsOverlay />
      </section>

      {/* ────── FEATURES ────── */}
      <FeaturesSection />

      {/* ────── CTA ────── */}
      <section className="relative py-40 flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#020202]">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(158,116,72,0.10),rgba(0,0,0,0))]" />
        <div className="absolute inset-0 bg-grid-gold opacity-50" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-metro-gold/30 to-transparent" />

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-metro-gold/25 bg-metro-gold/10 text-metro-gold-light text-xs font-bold uppercase tracking-widest mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-metro-gold animate-pulse" />
            Ready to go?
          </span>

          <h2
            className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Move{" "}
            <span className="text-gradient-gold">Smarter.</span>
            <br />
            <span className="text-white/25">Live Better.</span>
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
              Get Your Ticket Now
              <ArrowRight className="w-5 h-5" />
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

      <MetroFooter />
    </main>
  )
}
