"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
// import LoadingScreen from "./LoadingScreen";
import ScrollProgress from "./ScrollProgress";
import EasterEggs from "./EasterEggs";
import CustomCursor from "./CustomCursor";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {/* {isLoading ? (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        ) : ( */}
          <>
            <ScrollProgress />
            <EasterEggs />
            {children}
          </>
        {/* ) */}
        {/* } */}
      </AnimatePresence>
    </>
  );
}
