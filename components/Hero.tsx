"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import MagneticWrapper from "./MagneticWrapper";
import TextReveal from "./TextReveal";
import { useSectionView } from "@/hooks/useSectionView";

import GlitchText from "./GlitchText";

const Hero = () => {
  const { ref } = useSectionView({ sectionName: "hero" });
  const [greeting, setGreeting] = React.useState("Hello");

  React.useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={ref}
      id="home"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Video Background with Parallax */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-light dark:to-bg-dark z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero-poster.jpg"
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl md:text-2xl text-secondary font-medium mb-4"
        >
          {greeting}, I&apos;m
        </motion.div>

        <TextReveal
          text="Anand Patel"
          className="text-5xl md:text-8xl font-bold text-text-light mb-6 justify-center"
        />

        <div className="text-2xl md:text-4xl text-gray-200 mb-8 font-light flex items-center justify-center gap-3">
          <span>I am a</span>
          <GlitchText />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
        >
          A passionate developer crafting beautiful, functional, and
          user-centered web applications.
        </motion.p>

        <MagneticWrapper className="inline-block">
          <motion.button
            onClick={scrollToAbout}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-secondary text-black font-bold rounded-full text-lg hover:bg-opacity-90 transition-all shadow-[0_0_20px_rgba(100,255,218,0.3)]"
          >
            View My Work
          </motion.button>
        </MagneticWrapper>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 text-text-gray"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 1 },
          y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
        }}
      >
        <ArrowDown size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;
