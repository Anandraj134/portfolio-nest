import { useEffect } from "react";
import { analytics } from "../utils/analytics";

export const useAnalytics = () => {
  useEffect(() => {
    // Initialize on mount (singleton handles multiple calls)
    analytics.initialize();

    // Optional: Set debug mode based on env
    if (process.env.NODE_ENV === "development") {
      analytics.setDebugMode(true);
    }
  }, []);

  const trackEvent = (name: string, properties?: Record<string, unknown>) => {
    analytics.track(name, properties);
  };

  return {
    trackEvent,
  };
};
