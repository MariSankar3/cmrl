"use client"

import { useEffect, useRef, useState } from "react"
import MetroNavbar from "../components/MetroNavbar"
import MetroTunnelScroll from "../components/MetroTunnelScroll"
import MetroStationsOverlay from "../components/MetroStationsOverlay"
import MetroFooter from "../components/MetroFooter"

import { motion, useInView } from "framer-motion"
import { Zap, Shield, Leaf, Wifi, ArrowRight, ChevronDown, Train, MapPin, Clock, Users } from "lucide-react"

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

/* ════════════════════════════════════════════════════════════════
   SECTION 1 — CITY HERO
   bg-attachment:fixed keeps the image rock-steady while user scrolls
════════════════════════════════════════════════════════════════ */
function CityHeroSection() {
  return (
    <section
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      {/* Fixed background via CSS — no JS, no repaints */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "url('/city.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      />
      {/* Cinematic overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/25 to-black/85 pointer-events-none" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/45 via-transparent to-black/25 pointer-events-none" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(158,116,72,0.07),transparent)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center pt-20 px-6 text-center">
        {/* Chapter badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="h-px w-12 bg-metro-gold/60" />
          <span className="text-[10px] uppercase tracking-[0.5em] text-metro-gold-light font-bold">
            Chapter I
          </span>
          <div className="h-px w-12 bg-metro-gold/60" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(3.5rem,9vw,8.5rem)] font-black text-white tracking-tighter leading-[0.88] mb-6 max-w-5xl"
          style={{
            fontFamily: "Syne, sans-serif",
            textShadow: "0 2px 60px rgba(0,0,0,0.8), 0 0 120px rgba(0,0,0,0.5)",
          }}
        >
          A City{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-metro-gold via-metro-gold-light to-metro-gold animate-gradient">
            Always
          </span>
          <br />
          <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.22)", color: "transparent" }}>
            In Motion
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="text-lg md:text-xl text-white/90 max-w-2xl mb-12 leading-relaxed"
          style={{ textShadow: "0 1px 20px rgba(0,0,0,0.9)" }}
        >
          Chennai never sleeps. A Metropolitan pulse of 12 million lives,
          connected by one seamless network — the Chennai Metro Rail.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(158,116,72,0.6)" }}
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
            <MapPin className="w-4 h-4" />
            View Network Map
          </motion.button>
        </motion.div>

        {/* Live stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="flex items-center gap-6 md:gap-10 flex-wrap justify-center"
        >
          {[
            { icon: Train, label: "Active Lines", value: "3" },
            { icon: Users, label: "Daily Riders", value: "450K+" },
            { icon: Clock, label: "Avg Wait Time", value: "3 min" },
            { icon: MapPin, label: "Stations", value: "45" },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.08 }}
                className="flex items-center gap-2"
              >
                <div className="w-7 h-7 rounded-lg bg-metro-gold/15 border border-metro-gold/25 flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 text-metro-gold" />
                </div>
                <div className="text-left">
                  <div
                    className="text-white font-bold text-sm leading-none"
                    style={{ textShadow: "0 1px 8px rgba(0,0,0,1)" }}
                  >
                    {item.value}
                  </div>
                  <div className="text-white/80 text-[10px] tracking-wider">{item.label}</div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 flex flex-col items-center gap-2 opacity-50 z-10"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-white font-medium">Scroll</span>
        <ChevronDown className="w-4 h-4 text-white" />
      </motion.div>

      {/* Bottom vignette to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════
   SECTION 2 — STATION STORY
   bg-attachment:fixed keeps image stable while scrolling
════════════════════════════════════════════════════════════════ */
function StationSection() {
  const stationFeatures = [
    { number: "01", title: "Smart Entry Gates", desc: "Tap-and-go AFC gates with biometric support and contactless ticketing." },
    { number: "02", title: "Climate-Controlled Comfort", desc: "Every platform and concourse is air-conditioned to 23°C year-round." },
    { number: "03", title: "Universal Accessibility", desc: "Elevators, tactile paths, and audio guidance at every station." },
    { number: "04", title: "Real-Time Displays", desc: "Next train countdowns, route updates, and live crowd density indicators." },
  ]

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      {/* Fixed background via CSS */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "url('/station.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      />
      {/* Cinematic overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/92 via-black/65 to-black/20 pointer-events-none" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_80%_at_20%_50%,rgba(158,116,72,0.05),transparent)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-32">
        <div className="max-w-xl">
          {/* Chapter badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="h-px w-12 bg-metro-gold/60" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-metro-gold-light font-bold">
              Chapter II
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-[clamp(2.8rem,6vw,6rem)] font-black text-white tracking-tighter leading-[0.9] mb-6"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Where Every{" "}
            <span className="text-gradient-gold">Journey</span>
            <br />
            <span className="text-white/20">Begins</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            viewport={{ once: true }}
            className="text-base md:text-lg text-white/90 leading-relaxed mb-12 max-w-md"
          >
            Each of our 45 stations is engineered to be more than a transit point —
            a gateway designed for the people of Chennai, every hour of the day.
          </motion.p>

          {/* Feature list */}
          <div className="space-y-4">
            {stationFeatures.map((f, i) => (
              <motion.div
                key={f.number}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                viewport={{ once: true }}
                className="group flex items-start gap-5 p-5 rounded-2xl border border-white/5 bg-black/30 backdrop-blur-sm hover:border-metro-gold/30 hover:bg-metro-gold/[0.05] transition-all duration-500 cursor-default"
              >
                <span className="flex-shrink-0 text-[11px] font-black text-metro-gold/80 group-hover:text-metro-gold transition-colors duration-300 pt-0.5 tracking-widest">
                  {f.number}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1" style={{ fontFamily: "Syne, sans-serif" }}>
                    {f.title}
                  </h3>
                  <p className="text-xs text-white/75 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-10"
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(158,116,72,0.5)" }}
              whileTap={{ scale: 0.96 }}
              className="btn-primary flex items-center gap-2"
            >
              Explore Stations
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════
   Stats Section
════════════════════════════════════════════════════════════════ */
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

/* ════════════════════════════════════════════════════════════════
   Features Section
════════════════════════════════════════════════════════════════ */
function FeaturesSection() {
  return (
    <section className="relative py-32 px-6 bg-[#020202] overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-100" />
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
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-metro-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-xl ${feature.glow} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "Syne, sans-serif" }}>{feature.title}</h3>
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

/* ════════════════════════════════════════════════════════════════
   Main Page
════════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <MetroNavbar />

      {/* ── CHAPTER I: CITY HERO ── */}
      <CityHeroSection />

      {/* ── CHAPTER II: STATION STORY ── */}
      <StationSection />

      {/* ── CHAPTER III: METRO TUNNEL SCROLL (directly, no intro) ── */}
      <section className="relative">
        <MetroTunnelScroll />
      </section>

      {/* ── STATS ── */}
      <StatsSection />

      {/* ── MAP ── */}
      <section className="relative bg-black">
        <MetroStationsOverlay />
      </section>

      {/* ── FEATURES ── */}
      <FeaturesSection />

      {/* ── CTA ── */}
      <section className="relative py-40 flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#020202]">
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
