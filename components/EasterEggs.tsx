"use client";

import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

// Extend Window interface for custom console commands
declare global {
  interface Window {
    help?: () => string;
    party?: () => string;
    activeMatrix?: () => string;
  }
}

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const EasterEggs = () => {
  const [input, setInput] = useState<string[]>([]);
  const [notification, setNotification] = useState<{
    show: boolean;
    title: string;
    message: string;
  }>({ show: false, title: "", message: "" });

  // Custom Toast Helper
  const showToast = (title: string, message: string) => {
    setNotification({ show: true, title, message });
    setTimeout(() => setNotification((prev) => ({ ...prev, show: false })), 3000);
  };

  useEffect(() => {
    // 1. Console Greeting
    console.log(
      "%c👋 Hey Developer! Looking for something?",
      "color: #64FFDA; font-size: 16px; font-weight: bold; background: #0a192f; padding: 8px; border-radius: 4px;"
    );
    console.log(
      "%cTry typing `help()` in the console.",
      "color: #8892b0; font-size: 12px;"
    );

    // 2. Define Global Commands
    window.help = () => {
      console.group("Available Commands:");
      console.log("🚀 activeMatrix() - Enter the matrix");
      console.log("🎉 party() - Celebrate!");
      console.groupEnd();
      return "Happy Hacking!";
    };

    window.party = () => {
      triggerKonamiParty();
      return "Let's party!";
    };

    window.activeMatrix = () => {
      document.documentElement.classList.add("matrix-mode");
      showToast("Matrix Mode", "Follow the white rabbit...");
      return "Welcome to the real world.";
    };

    // 3. Konami Code Listener
    const handleKeyDown = (e: KeyboardEvent) => {
      const newInput = [...input, e.key];
      
      // Keep input buffer same length as code
      if (newInput.length > KONAMI_CODE.length) {
        newInput.shift();
      }
      setInput(newInput);

      // Check pattern
      // We join arrays to string to compare simple values
      if (newInput.join(",") === KONAMI_CODE.join(",")) {
        triggerKonamiParty();
        showToast("Cheat Code Activated!", "Unlimited lives granted.");
        setInput([]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // Safely delete globals
      delete window.help;
      delete window.party;
      delete window.activeMatrix;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]); // Dependency on input is required for the closure to capture latest state

  const triggerKonamiParty = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#64FFDA", "#C77DFF", "#ffffff"],
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#64FFDA", "#C77DFF", "#ffffff"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  const handleHiddenClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#F05138", "#38bdf8", "#7f52ff"],
    });
    showToast("You found a bug! 🐛", "Just kidding, it's a feature.");
  };

  return (
    <>
      {/* Hidden Pixel in Footer */}
      <div
        onClick={handleHiddenClick}
        className="fixed bottom-0 right-0 w-4 h-4 z-[90] cursor-none opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"
        role="button"
        aria-label="Hidden feature"
      >
        <span className="text-[10px] select-none">👾</span>
      </div>

      {/* In-App Notification (Toast) */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-4 bg-[#0a192f] border border-[#64FFDA]/20 rounded-xl shadow-2xl shadow-[#64FFDA]/10"
          >
            <div className="p-2 bg-[#64FFDA]/10 rounded-lg text-[#64FFDA]">
              <Terminal size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {notification.title}
              </h4>
              <p className="text-xs text-gray-400">
                {notification.message}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Matrix Mode Styles */}
      <style jsx global>{`
        .matrix-mode {
          filter: contrast(1.2) brightness(0.8) sepia(1) hue-rotate(50deg) saturate(3);
          font-family: 'Courier New', Courier, monospace !important;
        }
      `}</style>
    </>
  );
};

export default EasterEggs;
