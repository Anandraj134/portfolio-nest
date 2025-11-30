"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  ArrowUp,
  Heart,
} from "lucide-react";
import MagneticWrapper from "./MagneticWrapper";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: <Github size={20} />, href: "#", label: "GitHub" },
    { icon: <Linkedin size={20} />, href: "#", label: "LinkedIn" },
    { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
    { icon: <Instagram size={20} />, href: "#", label: "Instagram" },
  ];

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-black/20 border-t border-secondary/10 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <a
              href="#"
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-purple-600 inline-block"
              aria-label="Anand Patel Portfolio Home"
            >
              Anand Patel
            </a>
            <p className="text-text-gray max-w-xs">
              Building digital experiences that combine creativity with
              technical excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-text-foreground dark:text-text-light mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-text-gray hover:text-secondary transition-colors relative group inline-block py-1"
                  >
                    {link.name}
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-lg font-bold text-text-foreground dark:text-text-light mb-6">
              Connect
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <MagneticWrapper key={index}>
                  <a
                    href={social.href}
                    className="p-3 rounded-full bg-secondary/5 text-text-gray hover:bg-secondary hover:text-bg-dark transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                </MagneticWrapper>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-secondary/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-gray text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Anand Patel. All rights reserved.
          </p>
          <p className="text-text-gray text-sm flex items-center gap-1">
            Made with <Heart size={14} className="text-red-500 fill-red-500" />{" "}
            using Next.js & Tailwind
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              pointerEvents: "auto",
            }}
            exit={{ opacity: 0, y: 20, pointerEvents: "none" }}
            className="fixed bottom-8 right-8 z-40"
          >
            <MagneticWrapper>
              <button
                onClick={scrollToTop}
                className="p-4 rounded-full bg-secondary text-bg-dark shadow-lg hover:shadow-xl transition-shadow min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Scroll to top"
              >
                <ArrowUp size={24} color="black" />
              </button>
            </MagneticWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
