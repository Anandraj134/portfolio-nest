"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Smartphone, Zap } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const loadingMessages = [
  "Initializing environment...",
  "Loading modules...",
  "Compiling assets...",
  "Starting engine...",
  "Ready.",
];

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 10) + 2;

        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 100);

    // Cycle through messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 400);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Small delay at 100% before lifting the curtain
      const timer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background-dark text-text-light"
      initial={{ y: 0 }}
      exit={{
        y: "-100%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }, // "Curtain lift" easing
      }}
    >
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-sm px-6">
        {/* Brand Logo Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-3"
        >
          <div className="p-3 bg-secondary/10 rounded-xl text-secondary border border-secondary/20">
            <Code2 size={32} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Anand<span className="text-secondary">.dev</span>
          </h1>
        </motion.div>

        {/* Progress Bar Container */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-4 relative">
          {/* Moving Progress Bar */}
          <motion.div
            className="h-full bg-secondary shadow-[0_0_10px_rgba(100,255,218,0.5)]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "tween", ease: "linear", duration: 0.1 }}
          />
        </div>

        {/* Stats Row */}
        <div className="w-full flex justify-between items-center text-sm font-mono">
          {/* Current Status Message */}
          <span className="text-text-gray min-w-[150px]">
            {progress === 100
              ? "Launch Initialized"
              : loadingMessages[
                  Math.min(messageIndex, loadingMessages.length - 1)
                ]}
          </span>

          {/* Percentage */}
          <span className="text-secondary font-bold">{progress}%</span>
        </div>
      </div>

      {/* Decorative Background Icons (Faint) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 text-white/5"
        >
          <Smartphone size={300} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -left-20 text-white/5"
        >
          <Zap size={250} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
