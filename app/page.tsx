"use client"

import { useEffect, useRef, useState } from "react"
import MetroNavbar from "../components/MetroNavbar"
import ImageSequenceBg from "../components/ImageSequenceBg"
import MetroStationsOverlay from "../components/MetroStationsOverlay"
import MetroFooter from "../components/MetroFooter"

import { motion, useInView } from "framer-motion"
import { Zap, Shield, Leaf, Wifi, ArrowRight } from "lucide-react"

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

      {/* ── CHAPTER III: METRO CMR — SCROLL-DRIVEN IMAGE SEQUENCE ── */}
      <ImageSequenceBg />

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
