"use client"

import { motion } from "framer-motion"
import { Train, ArrowRight, Twitter, Github, Instagram, Youtube } from "lucide-react"

const quickLinks = ["Experience", "Network", "Smart Cards", "Metro Timings", "Innovation"]
const supportLinks = ["Help Center", "Contact Us", "Lost & Found", "Safety", "Feedback"]
const socialLinks = [
  { icon: Twitter, label: "Twitter" },
  { icon: Instagram, label: "Instagram" },
  { icon: Youtube, label: "YouTube" },
  { icon: Github, label: "GitHub" },
]

export default function MetroFooter() {
  return (
    <footer className="relative bg-dark-base text-gray-400 overflow-hidden border-t border-white/[0.04]">
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent" />
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-15" />
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[radial-gradient(ellipse,rgba(0,212,255,0.03),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-10">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand col */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-neon-cyan rounded-xl flex items-center justify-center shadow-lg shadow-neon-blue/20">
                <Train className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tighter">
                Chennai Metro
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/40">
              Providing carbon-neutral, safe, and world-class transit solutions for the vibrant city of Chennai. Building the future of urban mobility, one station at a time.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-neon-blue hover:border-neon-blue/30 hover:bg-neon-blue/10 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-white font-extrabold mb-6 text-sm uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-white/40 hover:text-neon-blue transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-0 h-px bg-neon-blue group-hover:w-3 transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="md:col-span-2">
            <h4 className="text-white font-extrabold mb-6 text-sm uppercase tracking-widest">
              Support
            </h4>
            <ul className="space-y-3 text-sm">
              {supportLinks.map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-white/40 hover:text-neon-blue transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-0 h-px bg-neon-blue group-hover:w-3 transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4">
            <h4 className="text-white font-extrabold mb-2 text-sm uppercase tracking-widest">
              Stay Updated
            </h4>
            <p className="text-sm text-white/40 mb-5">
              Get notified about new routes, special offers, and metro updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-neon-blue/50 focus:bg-white/[0.06] transition-all duration-200"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-3 rounded-xl bg-gradient-to-r from-neon-blue to-neon-cyan text-white font-semibold text-sm hover:shadow-lg hover:shadow-neon-blue/20 transition-all duration-200 flex items-center gap-1.5"
              >
                Join
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
            {/* Live status indicator */}
            <div className="mt-5 flex items-center gap-2 text-xs text-white/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
              All systems operational — Real-time service updates active
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/30 font-medium">
          <p>© {new Date().getFullYear()} Chennai Metro Rail Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-neon-blue transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-neon-blue transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-neon-blue transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
