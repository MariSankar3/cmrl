"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Expand } from "lucide-react"

const galleryItems = [
  {
    src: "/images/gallery-1.jpg",
    title: "Station Architecture",
    subtitle: "Futuristic Design",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/images/gallery-2.jpg",
    title: "Night Operations",
    subtitle: "24/7 Service",
    span: "",
  },
  {
    src: "/images/gallery-3.jpg",
    title: "Control Systems",
    subtitle: "AI Powered",
    span: "",
  },
  {
    src: "/images/gallery-4.jpg",
    title: "Tunnel Engineering",
    subtitle: "Precision Built",
    span: "md:col-span-2",
  },
  {
    src: "/images/gallery-5.jpg",
    title: "Train Interior",
    subtitle: "Premium Comfort",
    span: "",
  },
  {
    src: "/images/gallery-6.jpg",
    title: "Platform View",
    subtitle: "Urban Gateway",
    span: "",
  },
]

export default function GalleryShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section ref={ref} className="relative py-32 md:py-40 px-6 overflow-hidden bg-dark-base">
      {/* Background */}
      <div className="absolute inset-0 bg-dots opacity-15" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-blue/20 bg-neon-blue/[0.05] text-neon-blue text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse" />
            Visual Gallery
          </span>
          <h2
            className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-none"
          >
            The Metro{" "}
            <span className="text-gradient-neon">Experience</span>
          </h2>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[220px]">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group ${item.span}`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image placeholder with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-dark-card via-dark-raised to-dark-overlay" />
              
              {/* Simulated metro visuals via CSS gradients */}
              <div className="absolute inset-0 opacity-60" style={{
                background: i % 3 === 0
                  ? "linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(3,7,18,0.9) 50%, rgba(0,212,255,0.04) 100%)"
                  : i % 3 === 1
                    ? "linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(3,7,18,0.9) 50%, rgba(34,211,238,0.04) 100%)"
                    : "linear-gradient(135deg, rgba(34,211,238,0.08) 0%, rgba(3,7,18,0.9) 50%, rgba(245,158,11,0.04) 100%)",
              }} />

              {/* Grid pattern inside cards */}
              <div className="absolute inset-0 bg-grid opacity-20" />

              {/* Neon border on hover */}
              <div className="absolute inset-0 rounded-2xl border border-white/[0.04] group-hover:border-neon-blue/30 transition-colors duration-500" />
              
              {/* Light reflection effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Zoom overlay */}
              <motion.div
                animate={{ scale: hoveredIndex === i ? 1.08 : 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              />

              {/* Content overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-neon-blue font-bold mb-1">
                      {item.subtitle}
                    </p>
                    <h3 className="text-lg font-bold text-white tracking-tight">{item.title}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <Expand className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-3 left-3 w-4 h-4 border-l border-t border-white/10 opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-white/10 opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue/15 to-transparent" />
    </section>
  )
}
