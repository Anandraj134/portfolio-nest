"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const words = [
  "Next-Gen Mobile Apps",
  "Intelligent Experiences",
  "Realtime Systems",
  "High-Performance Code",
];

const TypewriterText = () => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(150);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];
    
    const tick = () => {
      const updatedText = isDeleting
        ? currentWord.substring(0, text.length - 1)
        : currentWord.substring(0, text.length + 1);

      setText(updatedText);

      if (isDeleting) {
        setDelta(50);
      } else {
        setDelta(150);
      }

      if (!isDeleting && updatedText === currentWord) {
        setDelta(2000);
        setIsDeleting(true);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setWordIndex((prev) => prev + 1);
        setDelta(500);
      }
    };

    const timer = setTimeout(tick, delta);
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, delta]);

  return (
    <span className="inline-flex items-center text-secondary font-bold tracking-wide whitespace-nowrap">
      {/* 
         THE FIX: 
         Render a Zero Width Space (&#8203;) 
         This forces the browser to maintain the correct line-height 
         and baseline even when {text} is completely empty.
      */}
      <span>&#8203;</span>
      
      {text}
      
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[3px] h-[1.2em] bg-secondary ml-1"
      />
    </span>
  );
};

export default TypewriterText;
