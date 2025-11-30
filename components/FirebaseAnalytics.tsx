"use client";

import { useAnalytics } from "@/hooks/useAnalytics";

const FirebaseAnalytics = () => {
  // This hook handles initialization on mount
  useAnalytics();

  return null;
};

export default FirebaseAnalytics;
