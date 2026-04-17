import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    icon: "📈",
    title: "Price Prediction",
    desc: "AI-powered 5-day price forecasts using historical mandi data and trend analysis.",
    color: "from-green-500/20 to-green-900/10",
    border: "border-green-500/20",
  },
  {
    icon: "🌦",
    title: "Weather Insights",
    desc: "Real-time OpenWeather integration adjusts predictions based on rain, heat, and humidity.",
    color: "from-sky-500/20 to-sky-900/10",
    border: "border-sky-500/20",
  },
  {
    icon: "📊",
    title: "Market Trends",
    desc: "Visualize price movements across crops, districts, and mandals with interactive charts.",
    color: "from-amber-500/20 to-amber-900/10",
    border: "border-amber-500/20",
  },
  {
    icon: "🔔",
    title: "Smart Alerts",
    desc: "Instant alerts for heavy rain, extreme heat, and significant price drops or spikes.",
    color: "from-rose-500/20 to-rose-900/10",
    border: "border-rose-500/20",
  },
];

export default function Features() {
  return (
    <section className="relative bg-[#071f17] py-28 px-6 lg:px-16 overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent opacity-[0.04] blur-[100px] rounded-full pointer-events-none" />

      {/* Floating animated dot */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 w-5 h-5 rounded-full bg-accent opacity-60 shadow-lg shadow-accent/50"
      />
      <motion.div
        animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-24 left-16 w-3 h-3 rounded-full bg-accent opacity-40"
      />

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">What We Offer</span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mt-3 leading-tight">
            Built for the <span className="text-gradient">Modern Farmer</span>
          </h2>
          <p className="text-white/40 mt-4 max-w-xl mx-auto text-base leading-relaxed">
            Every feature is designed to give farmers a competitive edge in volatile markets.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`relative rounded-3xl p-7 bg-gradient-to-br ${f.color} border ${f.border} glass-dark cursor-pointer group`}
            >
              {/* Icon */}
              <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300 inline-block">
                {f.icon}
              </div>

              {/* Title */}
              <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>

              {/* Desc */}
              <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20 glass-dark rounded-3xl p-10 flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-2xl font-black text-white">Ready to predict smarter?</h3>
            <p className="text-white/40 mt-1 text-sm">Join thousands of farmers making data-driven decisions.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 bg-accent text-[#071f17] font-bold rounded-full shadow-lg shadow-accent/30 hover:bg-green-400 transition-all duration-300 whitespace-nowrap"
          >
            Start Predicting →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
