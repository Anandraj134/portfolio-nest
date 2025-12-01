"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticWrapperProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // Pull strength factor (0.1 to 1)
  activeArea?: number; // Percentage of padding around the element to trigger effect (e.g., 1.5 = 50% larger area)
}

const MagneticWrapper = ({
  children,
  className = "",
  strength = 0.4, // Slightly lower default for smoother feel

}: MagneticWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    // Center of the element
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Distance from center
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    // Calculate distance for falloff (optional realism: pull is stronger near center)
    // But for UI "magnetic" buttons, linear usually feels most predictable.
    // We simply apply the strength factor.
    
    // Check if mouse is roughly within the "active area" logic if we were using global listeners,
    // but since this is onMouseMove on the element itself, we just calculate the offset.
    
    setPosition({ x: deltaX * strength, y: deltaY * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      // Physics: Lower stiffness + higher damping = "heavier/liquid" feel
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20, 
        mass: 0.5 
      }}
      className={`${className} cursor-pointer`}
      // Hover scale adds "immediacy" to the interaction
      whileHover={{ scale: 1.05 }} 
    >
      {children}
    </motion.div>
  );
};

export default MagneticWrapper;
