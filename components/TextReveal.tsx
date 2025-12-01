"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: React.ElementType; // Allow rendering as h1, h2, p, div, etc.
  gradient?: boolean; // Optional toggle for gradient text
}

const TextReveal = ({ 
  text, 
  className = "", 
  delay = 0,
  as: Component = "h2", // Default to h2
  gradient = false
}: TextRevealProps) => {
  // Split text into words to handle line breaks naturally
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.04, 
        delayChildren: delay * i 
      },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)", // Cinematic blur start
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  // Combine classes for optional gradient
  const finalClassName = `flex flex-wrap ${className} ${
    gradient ? "bg-clip-text text-transparent bg-gradient-to-r from-secondary to-purple-500" : ""
  }`;

  // Motion component wrapper for the dynamic tag
  const MotionComponent = motion(Component);

  return (
    <MotionComponent
      className={finalClassName}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      aria-label={text} // Accessibility: Read the full text
    >
      {/* Screen reader only text for correct pronunciation */}
      <span className="sr-only">{text}</span>

      {/* Visual animated characters */}
      {words.map((word, index) => (
        <span 
          key={index} 
          className="mr-[0.25em] whitespace-nowrap inline-block" 
          aria-hidden="true" // Hide split structure from screen readers
        >
          {Array.from(word).map((letter, i) => (
            <motion.span 
              key={i} 
              variants={child} 
              className="inline-block origin-bottom"
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </MotionComponent>
  );
};

export default TextReveal;
