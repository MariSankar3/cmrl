"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Zap, Shield, Wifi, Gauge } from "lucide-react"

const features = [
  {
    icon: Gauge,
    color: "from-neon-blue to-cyan-400",
    glow: "rgba(0, 212, 255, 0.3)",
    title: "Hyper Speed",
    desc: "Trains reach 80 km/h with precision intervals of 3 minutes during peak hours, delivering unmatched speed across the network.",
    stat: "80 km/h",
    statLabel: "MAX SPEED",
  },
  {
    icon: Shield,
    color: "from-neon-gold to-amber-400",
    glow: "rgba(245, 158, 11, 0.3)",
    title: "AI-Powered Safety",
    desc: "24/7 intelligent surveillance with automated emergency response and real-time incident detection across every station.",
    stat: "99.8%",
    statLabel: "UPTIME",
  },
  {
    icon: Zap,
    color: "from-emerald-400 to-neon-green",
    glow: "rgba(34, 197, 94, 0.3)",
    title: "Zero Emissions",
    desc: "Fully powered by renewable energy sources. Every ride reduces carbon footprint by up to 90% versus private vehicles.",
    stat: "100%",
    statLabel: "RENEWABLE",
  },
  {
    icon: Wifi,
    color: "from-violet-400 to-purple-500",
    glow: "rgba(139, 92, 246, 0.3)",
    title: "Always Connected",
    desc: "High-speed 5G and Wi-Fi coverage throughout all stations and deep tunnels, keeping passengers connected at all times.",
    stat: "5G",
    statLabel: "COVERAGE",
  },
]

export default function SmartInfrastructure() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-32 md:py-40 px-6 overflow-hidden bg-dark-base">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(0,212,255,0.04),transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-blue/20 bg-neon-blue/[0.05] text-neon-blue text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse" />
            Smart Infrastructure
          </span>
          <h2
            className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-none"
          >
            Engineered for{" "}
            <span className="text-gradient-neon">Tomorrow</span>
          </h2>
          <p className="mt-6 text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
            From climate-controlled coaches to AI-driven safety systems, every detail is crafted for an exceptional experience.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="glass-card p-8 md:p-10 group relative overflow-hidden"
              >
                {/* Top glow line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Background ambient glow on hover */}
                <div
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: feature.glow }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon + Stat row */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}
                      style={{ boxShadow: `0 8px 30px ${feature.glow}` }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-extrabold text-white/90 font-bricolage">{feature.stat}</div>
                      <div className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-bold font-jakarta">{feature.statLabel}</div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/40 leading-relaxed text-sm">{feature.desc}</p>

                  {/* Hover reveal indicator */}
                  <div className="mt-6 flex items-center gap-2 text-neon-blue text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <div className="w-6 h-px bg-neon-blue" />
                    <span className="text-[10px] uppercase tracking-[0.2em]">Learn more</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue/15 to-transparent" />
    </section>
  )
}
