"use client"

import { useScroll, motion, useTransform, useSpring } from "framer-motion"
import { useRef, useState, useEffect } from "react"

const blueStationsData = [
  { name: "Wimco Depot", x: 60, y: 150, align: "top" },
  { name: "Wimco", x: 95, y: 150, align: "bottom" },
  { name: "Thiruvott", x: 130, y: 150, align: "top" },
  { name: "Theradi", x: 165, y: 150, align: "bottom" },
  { name: "Kaladipet", x: 200, y: 150, align: "top" },
  { name: "TollGate", x: 235, y: 150, align: "bottom" },
  { name: "New Wash", x: 275, y: 150, align: "top" },
  { name: "Tondiarpet", x: 310, y: 150, align: "bottom" },
  { name: "Sri Theag", x: 345, y: 150, align: "top" },
  { name: "Wash'pet", x: 380, y: 150, align: "bottom" },
  { name: "Mannadi", x: 415, y: 150, align: "top" },
  { name: "High Court", x: 450, y: 150, align: "bottom" },
  { name: "Central", x: 490, y: 150, align: "top", isInterchange: true },
  { name: "Govt Est", x: 530, y: 150, align: "bottom" },
  { name: "LIC", x: 570, y: 150, align: "top" },
  { name: "1000 Lights", x: 610, y: 150, align: "bottom" },
  { name: "AG-DMS", x: 650, y: 150, align: "top" },
  { name: "Teynampet", x: 690, y: 150, align: "bottom" },
  { name: "Nandanam", x: 730, y: 150, align: "top" },
  { name: "Saidapet", x: 770, y: 150, align: "bottom" },
  { name: "Little Mt", x: 810, y: 150, align: "top" },
  { name: "Guindy", x: 850, y: 150, align: "bottom" },
  { name: "Alandur", x: 900, y: 200, align: "top", isInterchange: true },
  { name: "Nanganallur", x: 940, y: 250, align: "bottom" },
  { name: "Meenamb", x: 975, y: 250, align: "top" },
  { name: "Airport", x: 1010, y: 250, align: "bottom", hasIcon: true }
]

const greenStationsData = [
  { name: "Central", x: 490, y: 150, align: "bottom", isInterchange: true },
  { name: "Egmore", x: 520, y: 250, align: "bottom" },
  { name: "Nehru Pk", x: 546, y: 250, align: "top" },
  { name: "Kilpauk", x: 572, y: 250, align: "bottom" },
  { name: "Pachaiyap", x: 598, y: 250, align: "top" },
  { name: "Shenoy Ngr", x: 624, y: 250, align: "bottom" },
  { name: "Anna East", x: 650, y: 250, align: "top" },
  { name: "Anna Twr", x: 676, y: 250, align: "bottom" },
  { name: "Thirumang", x: 702, y: 250, align: "top" },
  { name: "Koyambedu", x: 728, y: 250, align: "bottom" },
  { name: "Koyam Dpt", x: 754, y: 250, align: "top" },
  { name: "CMBT", x: 780, y: 250, align: "bottom" },
  { name: "Arumbak", x: 806, y: 250, align: "top" },
  { name: "Vadapalani", x: 832, y: 250, align: "bottom" },
  { name: "Ashok Ngr", x: 858, y: 250, align: "top" },
  { name: "Ekkattu", x: 884, y: 250, align: "bottom" },
  { name: "Alandur", x: 900, y: 200, align: "bottom", isInterchange: true },
  { name: "St Thomas", x: 940, y: 150, align: "top" }
]

const blueMapped = blueStationsData.map((s, i) => ({
  ...s,
  start: i * (0.5 / blueStationsData.length),
  end: (i + 1) * (0.5 / blueStationsData.length)
}))

const greenMapped = greenStationsData.map((s, i) => ({
  ...s,
  start: 0.5 + i * (0.5 / greenStationsData.length),
  end: 0.5 + (i + 1) * (0.5 / greenStationsData.length)
}))

export default function MetroStationsOverlay() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 30,
    restDelta: 0.001
  })

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    return smoothScroll.on("change", (latest) => {
      setProgress(latest)
    })
  }, [smoothScroll])

  return (
    <div ref={containerRef} className="relative w-full h-[600vh] z-30 bg-dark-base">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(0,212,255,0.02),transparent)] pointer-events-none" />

      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* Branding */}
        <div className="absolute top-16 left-6 md:top-24 md:left-12 z-40 pointer-events-none">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             className="flex flex-col"
           >
              <span className="text-neon-blue font-bold uppercase tracking-[0.4em] text-[9px] md:text-xs mb-1.5">Network Topology</span>
              <h2 className="text-2xl md:text-5xl font-extrabold text-white uppercase tracking-tighter leading-none">
                METRO <br /> <span className="text-gradient-neon">NETWORK</span>
              </h2>
           </motion.div>
        </div>

        <div className="absolute bottom-12 right-12 z-40 pointer-events-none hidden md:block">
           <div className="flex flex-col items-end text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">
              <span>Chennai Metropolitan Area</span>
              <span className="text-neon-blue/40">System Version 4.0.2</span>
           </div>
        </div>

        {/* SVG Map */}
        <motion.div 
          style={{ 
            scale: useTransform(smoothScroll, [0, 0.9, 0.9], [0.9, 1.1, 1.1]),
            y: useTransform(smoothScroll, [0, 1], [0, 1])
          }}
          className="relative w-full h-screen flex items-center justify-center pointer-events-auto overflow-hidden"
        >
           
           <svg 
             viewBox="0 0 1100 400" 
             className="h-[35vh] w-auto md:w-full md:h-auto overflow-visible pointer-events-none relative z-10 transition-transform duration-1000 ease-in-out rotate-90 md:rotate-0"
           >
              <defs>
                <filter id="neonGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feFlood floodColor="#00d4ff" floodOpacity="0.4" result="color" />
                  <feComposite in="color" in2="blur" operator="in" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="greenGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feFlood floodColor="#22c55e" floodOpacity="0.4" result="color" />
                  <feComposite in="color" in2="blur" operator="in" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Blue Line Base Track */}
              <path 
                d="M 60,150 L 850,150 L 900,200 L 940,250 L 1010,250" 
                fill="none" 
                stroke="#0e3b4e"
                strokeWidth="10" 
                strokeLinejoin="round"
                className="opacity-60"
              />
              
              {/* Green Line Base Track */}
              <path 
                d="M 490,150 L 520,250 L 884,250 L 900,200 L 940,150" 
                fill="none" 
                stroke="#0a3d1e"
                strokeWidth="10" 
                strokeLinejoin="round"
                className="opacity-60"
              />

              {/* Active Blue Line */}
              <motion.path 
                d="M 60,150 L 850,150 L 900,200 L 940,250 L 1010,250" 
                fill="none" 
                stroke="#00d4ff" 
                strokeWidth="10" 
                strokeLinejoin="round"
                filter="url(#neonGlow)"
                style={{
                  pathLength: useTransform(scrollYProgress, [0, 0.5], [0, 1]),
                  opacity: useTransform(scrollYProgress, [0, 0.05], [0, 1])
                }}
              />

              {/* Active Green Line */}
              <motion.path 
                d="M 490,150 L 520,250 L 884,250 L 900,200 L 940,150" 
                fill="none" 
                stroke="#22c55e" 
                strokeWidth="10" 
                strokeLinejoin="round"
                filter="url(#greenGlow)"
                style={{
                  pathLength: useTransform(scrollYProgress, [0.5, 1], [0, 1]),
                  opacity: useTransform(scrollYProgress, [0.45, 0.55], [0, 1])
                }}
              />

              {/* Blue Line Stations */}
              {blueMapped.map((s) => {
                const isActive = progress >= s.start && progress < s.end
                const isPassed = progress >= s.end

                return (
                  <g key={`blue-${s.name}`}>
                    <circle 
                      cx={s.x} 
                      cy={s.y} 
                      r={s.isInterchange ? 10 : 6} 
                      fill={isPassed || isActive ? "#00d4ff" : "#1e293b"} 
                      stroke="#0f172a"
                      strokeWidth="2"
                    />
                    
                    {(isPassed || isActive) && (
                       <circle cx={s.x} cy={s.y} r={s.isInterchange ? 6 : 4} fill="#0f172a" />
                    )}

                    <text 
                      x={s.x + 6} 
                      y={s.align === "top" ? s.y - 12 : s.y + 16} 
                      fill={isActive ? "#00d4ff" : "rgba(255,255,255,0.35)"} 
                      fontSize={isActive ? "10" : "8"} 
                      fontWeight={isActive ? "bold" : "600"}
                      className="font-jakarta transition-all duration-300 pointer-events-auto cursor-default hover:fill-[#00d4ff]"
                      textAnchor="start"
                      transform={`rotate(${s.align === "top" ? -45 : 45} ${s.x + 6} ${s.align === "top" ? s.y - 12 : s.y + 16})`}
                    >
                      {s.name}
                    </text>
                    
                    {s.hasIcon && (
                      <g transform={`translate(${s.x + 20}, ${s.y - 8})`}>
                         <path d="M10.5 4.5l-1.5 6h-6l-1.5 1.5 4.5 1.5 1.5 4.5 1.5-1.5v-6l6-1.5 1.5-4.5h-10.5z" fill="#00d4ff" />
                      </g>
                    )}
                  </g>
                )
              })}

              {/* Green Line Stations */}
              {greenMapped.map((s) => {
                const isActive = progress >= s.start && progress < s.end
                const isPassed = progress >= s.end

                return (
                  <g key={`green-${s.name}`}>
                    {!s.isInterchange && (
                       <>
                         <circle 
                           cx={s.x} 
                           cy={s.y} 
                           r={6} 
                           fill={isPassed || isActive ? "#22c55e" : "#1e293b"} 
                           stroke="#0f172a"
                           strokeWidth="2"
                         />
                         {(isPassed || isActive) && (
                            <circle cx={s.x} cy={s.y} r={4} fill="#0f172a" />
                         )}
                       </>
                    )}

                    <text 
                      x={s.x + 6} 
                      y={s.align === "top" ? s.y - 12 : s.y + 16} 
                      fill={isActive ? "#22c55e" : "rgba(255,255,255,0.35)"} 
                      fontSize={isActive ? "10" : "8"} 
                      fontWeight={isActive ? "bold" : "600"}
                      className="font-jakarta transition-all duration-300 pointer-events-auto cursor-default hover:fill-[#22c55e]"
                      textAnchor="start"
                      transform={`rotate(${s.align === "top" ? -45 : 45} ${s.x + 6} ${s.align === "top" ? s.y - 12 : s.y + 16})`}
                    >
                      {s.name}
                    </text>
                  </g>
                )
              })}

              
              {/* Dotted extensions */}
              <g className="opacity-30">
                 <path d="M 940,150 Q 955,150 965,120" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="4,4" />
                 <circle cx="965" cy="120" r="3" fill="#ef4444" />
                 <text x="975" y="123" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="sans-serif">Suburban</text>

                 <path d="M 1010,250 Q 1030,250 1030,210" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="4,4" />
                 <circle cx="1030" cy="210" r="3" fill="#ef4444" />
                 <text x="1035" y="220" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="sans-serif">Tirisulam</text>
              </g>

           </svg>
        </motion.div>
      </div>
    </div>
  )
}
