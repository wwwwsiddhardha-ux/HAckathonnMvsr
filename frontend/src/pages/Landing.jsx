import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "../components/Hero";
import GridSection from "../components/GridSection";
import Features from "../components/Features";
import Footer from "../components/Footer";

export default function Landing({ onGetStarted }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen">

      {/* Sticky Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-dark shadow-xl shadow-black/30 py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-[#071f17] font-black">
              🌾
            </div>
            <span className="text-white font-black text-lg tracking-tight">Farmer's Choice</span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {["Features", "Platform", "About"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-white/50 text-sm hover:text-white transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={onGetStarted}
              className="hidden sm:block px-5 py-2.5 bg-accent text-[#071f17] font-bold text-sm rounded-full hover:bg-green-400 transition-all duration-300"
            >
              Launch App
            </motion.button>
            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-white/60 hover:text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-dark border-t border-white/10 px-6 py-4 flex flex-col gap-4"
            >
              {["Features", "Platform", "About"].map((link) => (
                <a key={link} href="#" className="text-white/60 text-sm hover:text-white">{link}</a>
              ))}
              <button
                onClick={onGetStarted}
                className="px-5 py-2.5 bg-accent text-[#071f17] font-bold text-sm rounded-full w-fit"
              >
                Launch App
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Page sections */}
      <Hero onGetStarted={onGetStarted} />
      <GridSection />
      <Features />
      <Footer />
    </div>
  );
}
