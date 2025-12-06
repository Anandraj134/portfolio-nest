"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = [
  "Next-Gen Mobile Apps",
  "Intelligent User Experiences",
  "Realtime Experiences",
  "High-Performance Solutions",
];

const GlitchText = () => {
  const [index, setIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setIsGlitching(false);
      }, 600); 
    }, 3500); 

    return () => clearInterval(interval);
  }, []);

  return (
    // Added whitespace-nowrap to prevent any line breaking
    <div className="relative inline-block min-w-[320px] text-left z-20 whitespace-nowrap">
      <AnimatePresence mode="wait">
        {isGlitching ? (
          <GlitchWord
            key="glitch"
            word={words[index]}
            nextWord={words[(index + 1) % words.length]}
          />
        ) : (
          <motion.span
            key={words[index]}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(5px)" }}
            className="text-secondary font-bold inline-block tracking-wide"
          >
            {words[index]}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

const GlitchWord = ({ word, nextWord }: { word: string; nextWord: string }) => {
  // Determine which word is longer to set the container width safely
  const longerWord = word.length > nextWord.length ? word : nextWord;

  return (
    <div className="relative tracking-wide">
      {/* Invisible spacer using the LONGER word to prevent width collapse */}
      <span className="opacity-0 select-none">{longerWord}</span>
      
      {/* Old Word Layers (Glitching Out) */}
      <motion.span
        className="absolute inset-0 text-secondary font-bold"
        initial={{ opacity: 1 }}
        animate={{
          x: [-2, 3, -1, 0],
          y: [1, -2, 1, 0],
          opacity: [1, 0, 0], // Fades out at the end
          filter: ["blur(0px)", "blur(2px)", "blur(4px)"],
        }}
        transition={{ duration: 0.3, times: [0, 0.5, 1] }}
      >
        {word}
      </motion.span>
      
      {/* New Word Layers (Glitching In) */}
      <motion.span
        className="absolute inset-0 text-secondary font-bold"
        initial={{ opacity: 0 }}
        animate={{
          x: [2, -3, 2, 0],
          y: [-2, 2, -1, 0],
          opacity: [0, 1, 1], // Fades in
          filter: ["blur(4px)", "blur(2px)", "blur(0px)"],
        }}
        transition={{ duration: 0.3, times: [0, 0.5, 1] }}
      >
        {nextWord}
      </motion.span>

      {/* Chromatic Aberration Effects (Red/Blue Ghosts) */}
      <motion.span
        className="absolute inset-0 text-accent font-bold opacity-70 mix-blend-screen"
        animate={{
          x: [2, -3, 2, 0],
          y: [-2, 2, -1, 0],
          opacity: [0, 0.8, 0], // Flash effect
        }}
        transition={{ duration: 0.3 }}
      >
        {nextWord}
      </motion.span>
      
      <motion.span
        className="absolute inset-0 text-blue-500 font-bold opacity-70 mix-blend-screen"
        animate={{
          x: [-2, 2, -2, 0],
          y: [1, -1, 2, 0],
          opacity: [0, 0.8, 0], // Flash effect
        }}
        transition={{ duration: 0.3 }}
      >
        {word}
      </motion.span>
    </div>
  );
};

export default GlitchText;
