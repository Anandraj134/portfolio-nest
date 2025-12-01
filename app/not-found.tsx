"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-dark px-6 pt-20">
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated 404 Text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <h1 className="text-[150px] md:text-[200px] font-bold leading-none select-none bg-clip-text text-transparent bg-gradient-to-r from-secondary to-purple-600 opacity-20 blur-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
            404
          </h1>
          <h1 className="text-[100px] md:text-[150px] font-bold leading-none bg-clip-text text-transparent bg-gradient-to-r from-secondary to-purple-600 relative z-10">
            404
          </h1>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 space-y-6"
        >
          <div className="flex items-center justify-center gap-3 text-secondary mb-4">
            <AlertTriangle size={24} />
            <span className="text-xl font-mono">
              System Error: Page Missing
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-text-light">
            Lost in Cyberspace?
          </h2>

          <p className="text-text-gray text-lg max-w-md mx-auto">
            The page you are looking for seems to have vanished into the digital
            void. It might have been moved, deleted, or never existed.
          </p>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="pt-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-secondary text-secondary rounded-md font-mono font-bold hover:bg-secondary/10 transition-all duration-300 group"
            >
              <Home
                size={20}
                className="group-hover:-translate-y-1 transition-transform"
              />
              <span>Return to Base</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
