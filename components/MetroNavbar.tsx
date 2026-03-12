"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, MapPin, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const navItems = ["Routes", "Stations", "Tickets", "Schedule", "Contact"]

export default function MetroNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/80 backdrop-blur-2xl  shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo & Title */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 overflow-hidden rounded-lg">
              <Image 
                src="/metrologo.png" 
                alt="Logo" 
                fill 
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-[1.1]">
              <span className="font-bold tracking-tight text-white text-base" style={{ fontFamily: "Syne, sans-serif" }}>
                CHENNAI METRO RAIL LIMITED
              </span>
              <span className="text-[8px] uppercase tracking-[0.2em] text-[#9E7448] font-semibold">
                Smart Urban Mobility
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                onMouseEnter={() => setActiveItem(item)}
                onMouseLeave={() => setActiveItem(null)}
                className="relative px-3.5 py-1.5 text-[13px] font-medium text-white/70 hover:text-white transition-colors duration-200 rounded-full"
              >
                <AnimatePresence>
                  {activeItem === item && (
                    <motion.span
                      layoutId="navHighlight"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-white/[0.07] border border-white/[0.1] rounded-full"
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-10">{item}</span>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white btn-primary"
            >
              <MapPin className="w-3 h-3" />
              Plan Journey
            </motion.button>
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-72 bg-[#080808] border-l border-white/[0.06] flex flex-col p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-white font-semibold text-sm" style={{ fontFamily: "Syne, sans-serif" }}>
                  Navigation
                </span>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg bg-white/5 text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <nav className="flex flex-col gap-1.5">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/[0.05] transition-all group"
                    >
                      <span className="font-medium text-sm">{item}</span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto">
                <button className="w-full btn-primary text-center text-sm py-3">Plan Journey</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
