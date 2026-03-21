"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Brain, Radio, Monitor, Eye, Cpu, Activity } from "lucide-react"

const techFeatures = [
  {
    icon: Brain,
    title: "AI Command Center",
    description: "Neural network-driven operations center processes 50,000+ data points per second for predictive maintenance and real-time optimization.",
    highlights: ["Predictive Analytics", "Auto-Diagnostics", "Smart Scheduling"],
    accentColor: "neon-blue",
  },
  {
    icon: Radio,
    title: "Smart Signal Array",
    description: "Adaptive signaling system dynamically optimizes train spacing, reducing delays and maximizing throughput across all corridors.",
    highlights: ["Adaptive Routing", "Dynamic Spacing", "Zero Conflict"],
    accentColor: "neon-gold",
  },
  {
    icon: Monitor,
    title: "Digital Twin Network",
    description: "Complete virtual replica of the entire metro system enables simulation, testing, and predictive scenario modeling in real-time.",
    highlights: ["Virtual Simulation", "Scenario Testing", "Live Sync"],
    accentColor: "neon-cyan",
  },
]

function HolographicPanel({ feature, index, isInView }: { feature: typeof techFeatures[0]; index: number; isInView: boolean }) {
  const Icon = feature.icon
  const colorMap: Record<string, string> = {
    "neon-blue": "#00d4ff",
    "neon-gold": "#f59e0b",
    "neon-cyan": "#22d3ee",
  }
  const color = colorMap[feature.accentColor] || "#00d4ff"

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
      style={{ perspective: "1000px" }}
    >
      <div className="glass-card p-8 md:p-10 relative overflow-hidden">
        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div
            className="absolute left-0 right-0 h-[1px] animate-scan-line"
            style={{ background: `linear-gradient(90deg, transparent, ${color}40, transparent)` }}
          />
        </div>

        {/* Top corner decorative elements */}
        <div className="absolute top-4 right-4 flex items-center gap-2 opacity-30">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
          <span className="text-[8px] font-mono uppercase tracking-widest" style={{ color }}>
            SYS.{String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* HUD corner brackets */}
        <div className="absolute top-0 left-0 w-6 h-6 border-l border-t opacity-20 group-hover:opacity-50 transition-opacity" style={{ borderColor: color }} />
        <div className="absolute top-0 right-0 w-6 h-6 border-r border-t opacity-20 group-hover:opacity-50 transition-opacity" style={{ borderColor: color }} />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-l border-b opacity-20 group-hover:opacity-50 transition-opacity" style={{ borderColor: color }} />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-r border-b opacity-20 group-hover:opacity-50 transition-opacity" style={{ borderColor: color }} />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon area with holographic effect */}
          <div className="mb-8 flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center relative animate-hologram"
              style={{
                background: `linear-gradient(135deg, ${color}15, ${color}05)`,
                border: `1px solid ${color}30`,
                boxShadow: `0 0 30px ${color}10`,
              }}
            >
              <Icon className="w-8 h-8" style={{ color }} />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight">{feature.title}</h3>
              <div className="flex items-center gap-1.5 mt-1">
                <Activity className="w-3 h-3" style={{ color }} />
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold" style={{ color: `${color}99` }}>
                  Active Module
                </span>
              </div>
            </div>
          </div>

          <p className="text-white/40 leading-relaxed text-sm mb-6">{feature.description}</p>

          {/* Highlight chips */}
          <div className="flex flex-wrap gap-2">
            {feature.highlights.map((h) => (
              <span
                key={h}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                style={{
                  background: `${color}08`,
                  border: `1px solid ${color}20`,
                  color: `${color}cc`,
                }}
              >
                <Cpu className="w-2.5 h-2.5" />
                {h}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />
      </div>
    </motion.div>
  )
}

export default function TechInnovation() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-32 md:py-40 px-6 overflow-hidden bg-dark-raised">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-dense opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue/20 to-transparent" />

      {/* Ambient orbs */}
      <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(0,212,255,0.03),transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(245,158,11,0.02),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-blue/20 bg-neon-blue/[0.05] text-neon-blue text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
            <Eye className="w-3 h-3" />
            Technology & Innovation
          </span>
          <h2
            className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-none"
          >
            Intelligent{" "}
            <span className="text-gradient-premium">Systems</span>
          </h2>
          <p className="mt-6 text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
            Next-generation control systems and AI-driven monitoring powering the most advanced metro network.
          </p>
        </motion.div>

        {/* Feature Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {techFeatures.map((feature, i) => (
            <HolographicPanel key={feature.title} feature={feature} index={i} isInView={isInView} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue/15 to-transparent" />
    </section>
  )
}
