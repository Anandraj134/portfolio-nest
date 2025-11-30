"use client";

import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newInput = [...input, e.key];
      if (newInput.length > KONAMI_CODE.length) {
        newInput.shift();
      }
      setInput(newInput);

      if (JSON.stringify(newInput) === JSON.stringify(KONAMI_CODE)) {
        triggerKonamiParty();
        setInput([]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input]);

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
    });
  };

  return (
    <>
      {/* Hidden Clickable Element in Footer Area */}
      <div
        onClick={handleHiddenClick}
        className="fixed bottom-0 right-0 w-4 h-4 z-[9999] cursor-none opacity-0 hover:opacity-100 transition-opacity"
        title="You found me!"
        role="button"
        aria-label="Hidden Easter Egg"
      >
        👾
      </div>
    </>
  );
};

export default EasterEggs;
