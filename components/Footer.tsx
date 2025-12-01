"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  ArrowUp,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";
import MagneticWrapper from "./MagneticWrapper";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    // Clock updater
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
    <footer className="relative bg-background-dark border-t border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <a
              href="#"
              className="text-3xl font-bold text-text-light tracking-tight"
              aria-label="Anand Patel Portfolio Home"
            >
              Anand<span className="text-secondary">.dev</span>
            </a>
            <p className="text-text-gray leading-relaxed max-w-xs">
              Crafting pixel-perfect mobile experiences and scalable systems for the modern web.
            </p>
            {/* Live Time Widget */}
            <div className="flex items-center gap-2 text-sm text-text-gray/80 bg-white/5 w-fit px-3 py-1.5 rounded-full border border-white/5">
                <Clock size={14} className="text-secondary" />
                <span>{time || "Loading..."}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-text-light mb-6">Explore</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group flex items-center text-text-gray hover:text-secondary transition-colors w-fit"
                  >
                    <span className="w-0 group-hover:w-2 h-[2px] bg-secondary mr-0 group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-text-light mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="mailto:hello@anand.dev" 
                  className="flex items-center gap-3 text-text-gray hover:text-text-light transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-white/5 text-secondary group-hover:bg-secondary group-hover:text-background-dark transition-all">
                    <Mail size={18} />
                  </div>
                  hello@anand.dev
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-text-gray group">
                  <div className="p-2 rounded-lg bg-white/5 text-secondary">
                    <MapPin size={18} />
                  </div>
                  Gujarat, India
                </div>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-lg font-bold text-text-light mb-6">Follow Me</h4>
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map((social, index) => (
                <MagneticWrapper key={index}>
                  <a
                    href={social.href}
                    className="p-3 rounded-xl bg-white/5 border border-white/5 text-text-gray hover:bg-secondary hover:text-background-dark hover:border-secondary transition-all duration-300 flex items-center justify-center"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                </MagneticWrapper>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-gray text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Anand Patel. Built with precision.
          </p>
          <div className="flex items-center gap-6 text-sm text-text-gray">
             <p className="flex items-center gap-1.5">
                Code by <span className="text-text-light font-medium">Anand</span>
             </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <MagneticWrapper>
              <button
                onClick={scrollToTop}
                className="p-4 rounded-full bg-secondary text-background-dark shadow-[0_0_20px_rgba(100,255,218,0.3)] hover:shadow-[0_0_30px_rgba(100,255,218,0.5)] transition-shadow flex items-center justify-center group"
                aria-label="Scroll to top"
              >
                <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform duration-300" />
              </button>
            </MagneticWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
