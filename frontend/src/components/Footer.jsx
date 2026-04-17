import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#030e0a] border-t border-white/5 pt-16 pb-8 px-6 lg:px-16">
      <div className="max-w-6xl mx-auto">

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/5">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center text-[#071f17] font-black text-lg">
                🌾
              </div>
              <span className="text-white font-black text-xl tracking-tight">Farmer's Choice</span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              AI-powered crop price intelligence for the modern Indian farmer.
              Real data. Real insights. Real impact.
            </p>
            <div className="flex gap-3 mt-6">
              {["𝕏", "in", "gh"].map((s) => (
                <motion.div
                  key={s}
                  whileHover={{ scale: 1.1, backgroundColor: "#22c55e", color: "#071f17" }}
                  className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/50 text-xs font-bold cursor-pointer transition-colors duration-300"
                >
                  {s}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Platform</h4>
            <ul className="space-y-3">
              {["About", "Features", "How It Works", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/40 text-sm hover:text-accent transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Team */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Team</h4>
            <div className="glass-dark rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">
                  A9
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Team Alpha Nine</div>
                  <div className="text-white/30 text-xs">Hackathon 2024</div>
                </div>
              </div>
              <p className="text-white/30 text-xs leading-relaxed">
                Built with passion for farmers and powered by cutting-edge AI technology.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-white/20 text-xs">
            © 2024 Farmer's Choice · Team Alpha Nine · All rights reserved
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-white/20 text-xs">System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
