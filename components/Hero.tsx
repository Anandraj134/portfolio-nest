"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import {
  ArrowDown,
  Smartphone,
  Zap,
  Code2,
  Layers,
  MousePointer2,
} from "lucide-react";
import MagneticWrapper from "./MagneticWrapper";
import TextReveal from "./TextReveal";
import GlitchText from "./GlitchText";
import { useSectionView } from "@/hooks/useSectionView";

const Hero = () => {
  const { ref } = useSectionView({ sectionName: "hero" });
  const [greeting, setGreeting] = useState("Hello");

  // Mouse position for spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  useEffect(() => {
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
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background-dark"
    >
      {/* --- Background Layer --- */}

      {/* --- Background Layer --- */}

      {/* Mouse Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(100, 255, 218, 0.1),
              transparent 80%
            )
          `,
        }}
      />

      {/* Floating Abstract Elements (Parallax) */}
      <FloatingIcon
        icon={<Smartphone size={40} />}
        delay={0}
        x={-20}
        y={-15}
        color="text-secondary"
        className="top-1/4 left-[10%] md:left-[15%]"
      />
      <FloatingIcon
        icon={<Code2 size={35} />}
        delay={1}
        x={20}
        y={-20}
        color="text-accent"
        className="top-1/3 right-[10%] md:right-[20%]"
      />
      <FloatingIcon
        icon={<Layers size={30} />}
        delay={2}
        x={-10}
        y={20}
        color="text-text-gray"
        className="bottom-1/3 left-[15%] opacity-50"
      />
      <FloatingIcon
        icon={<Zap size={28} />}
        delay={1.5}
        x={15}
        y={15}
        color="text-secondary"
        className="bottom-1/4 right-[15%] opacity-60"
      />

      {/* --- Content Layer --- */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-20 text-center px-4 max-w-5xl mx-auto"
      >
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium mb-8 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
          </span>
          Available for new projects
        </motion.div>

        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg md:text-xl text-accent font-medium mb-4 tracking-wide"
        >
          {greeting}, I&apos;m
        </motion.div>

        {/* Name Title */}
        <TextReveal
          text="Anand Patel"
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-text-light mb-6 justify-center tracking-tight"
        />

        {/* Role Glitch */}
        <div className="text-2xl md:text-4xl text-text-gray mb-8 font-light flex flex-col md:flex-row items-center justify-center gap-3">
          <span>I architect</span>
          <div className="font-semibold text-text-light">
            <GlitchText />
          </div>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-base md:text-lg text-text-gray mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Transforming ideas into high-performance{" "}
          <span className="text-secondary">iOS</span> &{" "}
          <span className="text-secondary">Android</span> applications. I
          specialize in building pixel-perfect, fluid mobile experiences using
          Flutter and React Native.
        </motion.p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticWrapper className="inline-block w-full sm:w-auto">
            <motion.button
              onClick={scrollToAbout}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-4 bg-secondary text-background-dark font-bold rounded-full text-lg hover:bg-secondary/90 transition-all shadow-[0_0_20px_rgba(100,255,218,0.3)] flex items-center justify-center gap-2 group"
            >
              View My Work
              <ArrowDown
                className="group-hover:translate-y-1 transition-transform"
                size={20}
              />
            </motion.button>
          </MagneticWrapper>

          <MagneticWrapper className="inline-block w-full sm:w-auto">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-text-gray/30 text-text-light font-medium rounded-full text-lg hover:border-text-light hover:bg-white/5 transition-all backdrop-blur-sm flex items-center justify-center gap-2"
            >
              Contact Me
              <MousePointer2 size={18} />
            </motion.button>
          </MagneticWrapper>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 1 },
          y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
        }}
      >
        <div className="w-[30px] h-[50px] rounded-full border-2 border-text-gray flex justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1 h-2 bg-secondary rounded-full"
          />
        </div>
      </motion.div>

      {/* Gradient Overlay at bottom to blend into next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background-dark to-transparent z-10 pointer-events-none" />
    </section>
  );
};

// --- Sub-component for Floating Icons ---
const FloatingIcon = ({
  icon,
  delay,
  x,
  y,
  color,
  className,
}: {
  icon: React.ReactNode;
  delay: number;
  x: number;
  y: number;
  color: string;
  className: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        y: [0, y, 0],
        x: [0, x, 0],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        opacity: { duration: 1, delay: delay },
        y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: delay },
        x: { repeat: Infinity, duration: 7, ease: "easeInOut", delay: delay },
        rotate: { repeat: Infinity, duration: 10, ease: "linear" },
      }}
      className={`absolute hidden md:block ${color} ${className}`}
    >
      <div className="bg-background-dark/50 backdrop-blur-sm p-4 rounded-2xl border border-white/5 shadow-xl">
        {icon}
      </div>
    </motion.div>
  );
};

export default Hero;
