import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: "easeOut" },
  }),
};

function ImageCard({ src, title, subtitle, tall, custom }) {
  return (
    <motion.div
      custom={custom}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={`relative rounded-3xl overflow-hidden group cursor-pointer ${tall ? "row-span-2" : ""}`}
    >
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <img
          src={src}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="text-white/60 text-xs uppercase tracking-widest mb-1">{subtitle}</p>
        <h3 className="text-white font-bold text-xl leading-tight">{title}</h3>
      </div>
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
        <span className="text-accent text-sm">↗</span>
      </div>
    </motion.div>
  );
}

function TextCard({ tag, title, body, accent, custom }) {
  return (
    <motion.div
      custom={custom}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={`rounded-3xl p-8 flex flex-col justify-between card-hover cursor-pointer ${
        accent
          ? "bg-accent text-[#071f17]"
          : "glass-dark"
      }`}
    >
      <div>
        <span className={`text-xs font-semibold uppercase tracking-widest ${accent ? "text-[#071f17]/60" : "text-accent"}`}>
          {tag}
        </span>
        <h3 className={`text-2xl font-black mt-3 leading-tight ${accent ? "text-[#071f17]" : "text-white"}`}>
          {title}
        </h3>
        <p className={`mt-3 text-sm leading-relaxed ${accent ? "text-[#071f17]/70" : "text-white/50"}`}>
          {body}
        </p>
      </div>
      <div className={`mt-6 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-transform duration-300 hover:scale-110 ${
        accent ? "bg-[#071f17] text-accent" : "bg-accent text-[#071f17]"
      }`}>
        →
      </div>
    </motion.div>
  );
}

function StatCard({ value, label, custom }) {
  return (
    <motion.div
      custom={custom}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="glass-dark rounded-3xl p-8 card-hover"
    >
      <div className="text-5xl font-black text-gradient mb-2">{value}</div>
      <div className="text-white/50 text-sm">{label}</div>
      <div className="mt-4 h-1 w-12 bg-accent rounded-full" />
    </motion.div>
  );
}

export default function GridSection() {
  return (
    <section className="bg-[#f7f5f0] py-24 px-6 lg:px-16">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto mb-14"
      >
        <span className="text-accent text-sm font-semibold uppercase tracking-widest">Our Platform</span>
        <h2 className="text-4xl lg:text-5xl font-black text-[#0b3d2e] mt-2 leading-tight">
          Intelligence meets <br />
          <span className="text-accent">Nature</span>
        </h2>
      </motion.div>

      {/* Collage grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[280px]">

        {/* Row 1 */}
        <ImageCard
          src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80"
          title="Green Intelligence"
          subtitle="AI Platform"
          tall
          custom={0}
        />
        <TextCard
          tag="Core Feature"
          title="Predict with Confidence"
          body="Our AI engine analyzes 7-day mandi data to forecast prices with high accuracy."
          custom={1}
        />
        <ImageCard
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80"
          title="Real Farmers, Real Data"
          subtitle="Community"
          custom={2}
        />

        {/* Row 2 */}
        <StatCard value="98%" label="Prediction accuracy on historical data" custom={3} />
        <ImageCard
          src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600&q=80"
          title="Weather-Driven Insights"
          subtitle="Live Data"
          custom={4}
        />
        <TextCard
          tag="Market"
          title="Live Market Trends"
          body="Track price movements across districts and mandals in real time."
          accent
          custom={5}
        />

        {/* Row 3 */}
        <ImageCard
          src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80"
          title="Harvest Intelligence"
          subtitle="Analytics"
          custom={6}
        />
        <StatCard value="10+" label="Districts covered across India" custom={7} />
        <ImageCard
          src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&q=80"
          title="Smart Alerts System"
          subtitle="Notifications"
          custom={8}
        />
      </div>
    </section>
  );
}
