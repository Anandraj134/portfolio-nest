import { getAnalytics, logEvent, Analytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

// --- Types ---

export type ThemeMode = "light" | "dark" | "system";
export type DeviceType = "mobile" | "tablet" | "desktop";

export interface CommonEventProps {
  path?: string;
  theme_mode?: ThemeMode;
  device_type?: DeviceType;
  viewport_width?: number;
  viewport_height?: number;
  [key: string]: any;
}

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
}

// --- Event Specific Interfaces ---

export interface SectionViewProps {
  section_name: "hero" | "skills" | "experience" | "projects" | "contact";
}

export interface NavClickProps {
  target_section: string;
  position_in_nav?: string;
  current_section?: string;
}

export interface SkillInteractionProps {
  skill_name: string;
  level?: "beginner" | "intermediate" | "advanced";
  section?: "skills";
  clicked_context?: "card" | "chip" | "tooltip";
}

export interface ExperienceInteractionProps {
  company_name: string;
  role: string;
  index_in_timeline?: number;
  expand_type?: "responsibilities" | "achievements" | "tech_stack";
}

export interface ProjectInteractionProps {
  project_name: string;
  index?: number;
  link_type?: "github" | "live_demo" | "store_link";
}

export interface ContactInteractionProps {
  platform?: "email" | "linkedin" | "github" | "twitter" | "phone";
  field_name?: "name" | "email" | "message";
  result?: "success" | "error";
  error_type?: string;
  cta_label?: string;
}

// --- Provider Interface ---

export interface AnalyticsProvider {
  initialize: () => void;
  trackEvent: (eventName: string, properties?: Record<string, any>) => void;
}

// --- Firebase Provider Implementation ---

class FirebaseAnalyticsProvider implements AnalyticsProvider {
  private analytics: Analytics | null = null;
  private initialized = false;

  initialize() {
    if (typeof window === "undefined") return;
    if (this.initialized) return;

    try {
      const firebaseConfig = {
        apiKey: "AIzaSyBfIQD9ACihHTav_j_P_8r9gXk1v5wfqu4",
        authDomain: "flutterfolio-acbad.firebaseapp.com",
        projectId: "flutterfolio-acbad",
        storageBucket: "flutterfolio-acbad.firebasestorage.app",
        messagingSenderId: "1053943827175",
        appId: "1:1053943827175:web:3bff699defd43ce958b042",
        measurementId: "G-GE9W7BQVK1",
      };

      const app = initializeApp(firebaseConfig);
      this.analytics = getAnalytics(app);
      this.initialized = true;
      console.log("Firebase Analytics Initialized");
    } catch (error) {
      console.error("Failed to initialize Firebase Analytics:", error);
    }
  }

  trackEvent(eventName: string, properties?: Record<string, any>) {
    if (!this.analytics) return;
    try {
      logEvent(this.analytics, eventName, properties);
    } catch (error) {
      console.warn(`Failed to log event ${eventName}:`, error);
    }
  }
}

// --- Debug Provider Implementation ---

class DebugAnalyticsProvider implements AnalyticsProvider {
  initialize() {
    console.log("[Analytics] Debug Provider Initialized");
  }

  trackEvent(eventName: string, properties?: Record<string, any>) {
    console.log(`[Analytics Event] ${eventName}`, properties);
  }
}

// --- Singleton Instance ---

const isDev = process.env.NODE_ENV === "development";
// Use Firebase in prod, or if explicitly requested. For now, we'll use Firebase even in dev if configured,
// but maybe fall back to Debug if firebase fails or for local testing without spamming prod data.
// For this implementation, I'll use Firebase but add a debug flag to log to console too.

class AnalyticsManager {
  private provider: AnalyticsProvider;
  private debugMode: boolean = false;

  constructor() {
    // Default to Firebase, could be swapped based on env vars
    this.provider = new FirebaseAnalyticsProvider();
    // this.provider = new DebugAnalyticsProvider(); // Uncomment for pure local debug
  }

  public initialize() {
    this.provider.initialize();
  }

  public setDebugMode(enabled: boolean) {
    this.debugMode = enabled;
  }

  public track(eventName: string, properties?: Record<string, any>) {
    // Enrich with common properties
    const enrichedProps = {
      ...properties,
      timestamp: new Date().toISOString(),
      path: typeof window !== "undefined" ? window.location.pathname : "",
      // Add other common props like viewport here if needed,
      // though accessing window on every track might be slightly expensive if not needed.
    };

    if (this.debugMode) {
      console.log(`[Analytics Debug] ${eventName}`, enrichedProps);
    }

    this.provider.trackEvent(eventName, enrichedProps);
  }
}

export const analytics = new AnalyticsManager();

// --- Helper Functions ---

export const trackSectionView = (
  sectionName: SectionViewProps["section_name"],
  extraProps?: Record<string, any>
) => {
  analytics.track("section_view", { section_name: sectionName, ...extraProps });
};

export const trackClick = (
  action: string,
  target: string,
  extraProps?: Record<string, any>
) => {
  analytics.track("click", { action, target, ...extraProps });
};

export const trackEvent = (
  eventName: string,
  properties?: Record<string, any>
) => {
  analytics.track(eventName, properties);
};
