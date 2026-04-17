import React from "react";
import { motion } from "framer-motion";

export default function Hero({ onGetStarted }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#071f17]">

      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b3d2e] via-[#071f17] to-[#030e0a]" />

      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#22c55e] opacity-[0.06] blur-[120px] pointer-events-none" />

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-16 w-24 h-24 rounded-full bg-[#22c55e] opacity-20 blur-2xl"
      />
      <motion.div
        animate={{ y: [0, 25, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-32 right-20 w-40 h-40 rounded-full bg-[#22c55e] opacity-10 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/2 right-10 w-16 h-16 rounded-full bg-accent opacity-20 blur-xl"
      />

      {/* Grid overlay texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(34,197,94,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,197,94,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Nature image strip — right side */}
      <div className="absolute right-0 top-0 h-full w-2/5 hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"
          alt="farm"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071f17] via-[#071f17]/60 to-transparent" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 py-24">
        <div className="max-w-3xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-accent text-sm font-medium tracking-widest uppercase">
              AI-Powered Platform
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6"
          >
            Smart Farming{" "}
            <span className="text-gradient block">Intelligence</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg sm:text-xl text-white/60 font-light leading-relaxed mb-10 max-w-xl"
          >
            Predict crop prices using AI &amp; real-time weather data.
            Empowering farmers with market intelligence at their fingertips.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={onGetStarted}
              className="px-8 py-4 bg-accent text-[#071f17] font-bold text-base rounded-full shadow-lg shadow-accent/30 hover:bg-green-400 transition-all duration-300"
            >
              Get Started →
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 glass text-white font-medium text-base rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-white/10"
          >
            {[
              { value: "5+", label: "Crops Tracked" },
              { value: "10+", label: "Districts" },
              { value: "Real-time", label: "Weather Data" },
              { value: "AI", label: "Predictions" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-black text-accent">{stat.value}</div>
                <div className="text-sm text-white/40 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
      >
        <span className="text-xs text-white tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
}
