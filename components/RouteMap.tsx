"use client"

import { motion, MotionValue, useScroll, useTransform } from "framer-motion"
import { stations, Station } from "../data/stations"

function StationDot({ station, scrollYProgress }: { station: Station, scrollYProgress: MotionValue<number> }) {
  const isActive = useTransform(
    scrollYProgress,
    [station.scrollPos - 0.05, station.scrollPos, station.scrollPos + 0.05],
    [0.3, 1, 0.3]
  )

  return (
    <div className="relative group">
      <motion.div 
        style={{ opacity: isActive }}
        className="w-3 h-3 rounded-full bg-blue-500 cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.5)]"
      />
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-black/5 backdrop-blur-md px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-black border border-black/10">
        {station.name}
      </div>
    </div>
  )
}

function RouteSegment({ startPos, endPos, scrollYProgress }: { startPos: number, endPos: number, scrollYProgress: MotionValue<number> }) {
  const scaleX = useTransform(
    scrollYProgress,
    [startPos, endPos],
    [0, 1],
    { clamp: true }
  )

  return (
    <div className="w-12 h-[2px] bg-black/10 mx-1 overflow-hidden">
      <motion.div 
        className="h-full bg-blue-500"
        style={{ 
          width: "100%",
          transformOrigin: "left",
          scaleX
        }}
      />
    </div>
  )
}

export default function RouteMap() {
  const { scrollYProgress } = useScroll()
  
  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 px-8 py-4 rounded-2xl backdrop-blur-2xl border border-black/10 bg-white/90 shadow-2xl flex items-center gap-6">
      <div className="flex items-center gap-1">
        {stations.map((station, index) => (
          <div key={station.id} className="flex items-center">
            <StationDot station={station} scrollYProgress={scrollYProgress} />
            {index < stations.length - 1 && (
              <RouteSegment 
                startPos={station.scrollPos} 
                endPos={stations[index + 1].scrollPos} 
                scrollYProgress={scrollYProgress} 
              />
            )}
          </div>
        ))}
      </div>
      
      <div className="h-6 w-[1px] bg-black/10 mx-2" />
      
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500">Current Zone</span>
        <span className="text-xs font-medium text-black/70">Chennai Central Hub</span>
      </div>
    </div>
  )
}
