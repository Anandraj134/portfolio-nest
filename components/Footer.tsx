"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Clock } from "lucide-react";
import MagneticWrapper from "./MagneticWrapper";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    // Simple clock
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZoneName: "short",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);

    // Scroll listener
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-background-dark border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left Side: Copyright */}
        <div className="text-text-gray/60 text-sm font-medium">
          &copy; {new Date().getFullYear()} Anand Patel
        </div>

        {/* Right Side: Time & Tech Credit */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Local Time Widget */}
          <div className="flex items-center gap-2 text-xs text-text-gray/60 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
            <Clock size={12} className="text-secondary/70" />
            <span>{time} IST</span>
          </div>

          <div className="text-text-gray/30 text-xs font-mono hidden sm:block">
            Built with Next.js
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <MagneticWrapper>
              <button
                onClick={scrollToTop}
                className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-text-light hover:bg-secondary hover:text-black hover:border-secondary transition-all duration-300 shadow-lg"
                aria-label="Scroll to top"
              >
                <ArrowUp size={20} />
              </button>
            </MagneticWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
