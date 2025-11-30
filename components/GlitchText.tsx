"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Code", "Innovations", "Developer"];

const GlitchText = () => {
  const [index, setIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setIsGlitching(false);
      }, 500); // Glitch duration
    }, 3000); // Word duration

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-block min-w-[200px] text-left z-20">
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-secondary font-bold inline-block"
          >
            {words[index]}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

const GlitchWord = ({ word, nextWord }: { word: string; nextWord: string }) => {
  return (
    <div className="relative">
      <span className="opacity-0">{nextWord}</span>
      <motion.span
        className="absolute inset-0 text-secondary font-bold"
        animate={{
          x: [-2, 2, -2, 0],
          y: [2, -2, 2, 0],
          opacity: [1, 0.8, 1],
        }}
        transition={{ duration: 0.2, repeat: 2 }}
      >
        {word}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-red-500 font-bold opacity-70"
        animate={{
          x: [2, -2, 2, 0],
          y: [-2, 2, -2, 0],
        }}
        transition={{ duration: 0.2, repeat: 2 }}
      >
        {nextWord}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-blue-500 font-bold opacity-70"
        animate={{
          x: [-2, 2, -2, 0],
          y: [2, -2, 2, 0],
        }}
        transition={{ duration: 0.2, repeat: 2 }}
      >
        {word}
      </motion.span>
    </div>
  );
};

export default GlitchText;
