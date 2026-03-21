"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Leaf, Zap, TreePine, Droplets } from "lucide-react"

/* ── Animated counter hook ── */
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

const ecoStats = [
  {
    value: 12000,
    suffix: "+",
    unit: "tons",
    label: "CO₂ Saved Annually",
    icon: Leaf,
    color: "text-emerald-400",
    glow: "rgba(52, 211, 153, 0.2)",
    description: "Equivalent to planting 200,000 trees every year",
  },
  {
    value: 90,
    suffix: "%",
    unit: "",
    label: "Energy Efficiency",
    icon: Zap,
    color: "text-neon-blue",
    glow: "rgba(0, 212, 255, 0.2)",
    description: "Regenerative braking recovers 35% of energy",
  },
  {
    value: 100,
    suffix: "%",
    unit: "",
    label: "Green Stations",
    icon: TreePine,
    color: "text-green-400",
    glow: "rgba(74, 222, 128, 0.2)",
    description: "Solar-powered with rainwater harvesting",
  },
  {
    value: 45,
    suffix: "M",
    unit: "liters",
    label: "Water Recycled",
    icon: Droplets,
    color: "text-cyan-400",
    glow: "rgba(34, 211, 238, 0.2)",
    description: "Advanced water reclamation at every facility",
  },
]

export default function SustainabilitySection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const c0 = useCounter(ecoStats[0].value, 2200, isInView)
  const c1 = useCounter(ecoStats[1].value, 1800, isInView)
  const c2 = useCounter(ecoStats[2].value, 1600, isInView)
  const c3 = useCounter(ecoStats[3].value, 2000, isInView)
  const counts = [c0, c1, c2, c3]

  return (
    <section ref={ref} className="relative py-32 md:py-40 px-6 overflow-hidden bg-dark-base">
      {/* Background effects */}
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(52,211,153,0.04),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.05] text-emerald-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Sustainability
          </span>
          <h2
            className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-none"
          >
            Green by{" "}
            <span className="text-gradient-gold">Design</span>
          </h2>
          <p className="mt-6 text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
            Every component of our network is engineered to minimize environmental impact while maximizing efficiency.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ecoStats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="glass-card p-8 text-center group relative overflow-hidden"
              >
                {/* Top glow line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
                
                {/* Ambient glow */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: stat.glow }}
                />

                <div className="relative z-10">
                  <div className={`inline-flex w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] items-center justify-center mb-5 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="mb-1">
                    <span className="text-4xl md:text-5xl font-extrabold text-white font-bricolage">
                      {counts[i].toLocaleString()}
                    </span>
                    <span className={`text-2xl font-bold ${stat.color} ml-1`}>{stat.suffix}</span>
                    {stat.unit && (
                      <span className="text-sm text-white/30 ml-2">{stat.unit}</span>
                    )}
                  </div>

                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold mb-3">
                    {stat.label}
                  </div>

                  <p className="text-xs text-white/30 leading-relaxed">{stat.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/15 to-transparent" />
    </section>
  )
}
