export type ProjectType = "professional" | "personal";

export interface ProjectMedai {
  type: "image" | "video";
  url: string;
  caption?: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  image: string;
  media: ProjectMedai[];
  tags: string[];
  theme: string;
  github: string | null;
  demo: string | null;
  playstore?: string;
  stats: { label: string; value: string };
  featured: boolean;
  type: ProjectType;
  platform?: string;
  completedOn?: string;
}

export const projects: Project[] = [
  // ========== PROFESSIONAL PROJECTS ==========
  // {
  //   id: 1,
  //   slug: "yanki-ai",
  //   title: "YankiAI: JewishLife Solutions",
  //   category: "Professional • AI Mobile App",
  //   description:
  //     "AI-powered Jewish lifestyle assistant with 598+ downloads, 10.6% conversion rate. Features marketplace, restaurants, community feed, real-time chat, and 15+ integrated modules.",
  //   image: "/images/yanki.jpg",
  //   media: [],
  //   tags: ["React Native", "Expo", "SignalR", "Zustand", "Push Notifications"],
  //   theme: "#38bdf8", // Cyan - Professional
  //   github: null, // Client project - no public repo
  //   demo: "https://apps.apple.com/app/yankiai",
  //   playstore: "https://play.google.com/store/apps/yankiai",
  //   stats: { label: "Downloads", value: "598+" },
  //   featured: true,
  //   type: "professional",
  // },
  // {
  //   id: 2,
  //   slug: "bharatlaw-ai",
  //   title: "BharatLaw AI",
  //   category: "Professional • Legal Research",
  //   description:
  //     "AI-powered legal research platform for Indian law with comprehensive case law database. Optimized to 10MB Android/45MB iOS with custom HTML rendering and Auth0 integration.",
  //   image: "/images/bharatlaw.jpg",
  //   media: [],
  //   tags: ["Flutter", "Provider", "Auth0", "Razorpay", "In-App Purchase"],
  //   theme: "#818cf8", // Indigo - Professional
  //   github: null,
  //   demo: "https://apps.apple.com/app/bharatlaw-ai",
  //   playstore: "https://play.google.com/store/apps/bharatlaw",
  //   stats: { label: "App Size", value: "10MB" },
  //   featured: true,
  //   type: "professional",
  // },
  // {
  //   id: 3,
  //   slug: "taras-crunch",
  //   title: "Taras Crunch",
  //   category: "Professional • VAT Compliance",
  //   description:
  //     "Specialized UK VAT compliance platform with AI-powered error detection, real-time validation, and automated calculations. Built for accountants and businesses.",
  //   image: "/images/taras.jpg",
  //   media: [],
  //   tags: ["Flutter", "Riverpod", "SignalR", "SQLite", "Firebase"],
  //   theme: "#4ade80", // Green - Professional
  //   github: null,
  //   demo: "https://apps.apple.com/app/taras-crunch",
  //   playstore: "https://play.google.com/store/apps/taras",
  //   stats: { label: "Platform", value: "iOS & Android" },
  //   featured: true,
  //   type: "professional",
  // },
  // {
  //   id: 4,
  //   slug: "logisticaforce",
  //   title: "LogisticaForce",
  //   category: "Professional • eCommerce",
  //   description:
  //     "White-labeled ordering platform for foodservice distributors with advanced search, order guides, and inventory management for seamless B2B operations.",
  //   image: "/images/logistica.jpg",
  //   media: [],
  //   tags: ["Flutter", "GetX", "Dio", "REST APIs"],
  //   theme: "#f59e0b", // Amber - Professional
  //   github: null,
  //   demo: "https://apps.apple.com/app/logisticaforce",
  //   playstore: "https://play.google.com/store/apps/logisticaforce",
  //   stats: { label: "Type", value: "B2B Platform" },
  //   featured: false,
  //   type: "professional",
  // },

  // ========== PERSONAL PROJECTS ==========
  {
    id: 5,
    slug: "secure-wallet-pro",
    title: "Secure Wallet Pro",
    category: "Finance Management",
    summary:
      "Production-ready financial management app with HMAC security, 2FA, AES-256 encryption. Tracks 11 investment types including FD, RD, stocks, crypto, PPF, NSC with real-time pricing.",
    description:
      "A production-ready financial management platform I architected to handle complex investment tracking across 11 modules (FD, RD, Stocks, Crypto, PPF, etc.). I implemented enterprise-grade security using HMAC-SHA256 request signing, AES-256-GCM encryption for sensitive data, and TOTP-based 2FA. The backend uses Node.js with PostgreSQL and Redis for caching, while the Flutter frontend features a Clean Architecture structure with Riverpod state management. I also built real-time price tracking integrations with Yahoo Finance",
    image: "/images/secure-wallet-pro.png",
    media: [],
    tags: ["Flutter", "Riverpod", "Node.js", "PostgreSQL", "Redis"],
    theme: "#8b5cf6", // Violet - Personal
    github: "https://github.com/Anand-s-FlutterLab/secure-wallet-pro",
    demo: null,
    stats: { label: "Features", value: "11 Modules" },
    featured: true,
    type: "personal",
    platform: "Mobile (Android & iOS)",
    completedOn: "2025",
  },
  {
    id: 6,
    slug: "gossip-grove",
    title: "Gossip Grove",
    category: "Real-Time Chat",
    summary:
      "Real-time messaging platform with Socket.IO, one-on-one chats, profile management, and push notifications. Full-stack with Node.js backend and MongoDB.",
    description:
      "A full-stack real-time messaging application I built to master WebSocket communication. I developed the backend using Node.js and Socket.IO to handle instant bidirectional events, storing chat history in MongoDB. On the frontend, I implemented a responsive Flutter UI that supports one-on-one chats, live status updates, and profile management. I also integrated Firebase Cloud Messaging (FCM) to ensure reliable push notifications for offline users, creating a seamless communication experience.",
    image: "/images/gossip-grove.png",
    media: [
      {
        type: "image",
        url: "/images/gossip-grove/signup.png",
        caption: "Sign up",
      },
      {
        type: "image",
        url: "/images/gossip-grove/login.png",
        caption: "Login",
      },

      {
        type: "image",
        url: "/images/gossip-grove/home.png",
        caption: "Home",
      },

      {
        type: "image",
        url: "/images/gossip-grove/all_user_list.png",
        caption: "All User List",
      },
      {
        type: "image",
        url: "/images/gossip-grove/new_chat.png",
        caption: "New Chat",
      },
      {
        type: "image",
        url: "/images/gossip-grove/chat.png",
        caption: "Chat",
      },

      {
        type: "image",
        url: "/images/gossip-grove/user_details.png",
        caption: "User Details",
      },

      {
        type: "image",
        url: "/images/gossip-grove/setting.png",
        caption: "Settings",
      },
    ],
    tags: ["Flutter", "Socket.IO", "Node.js", "MongoDB", "Firebase"],
    theme: "#ec4899", // Pink - Personal
    github: "https://github.com/Anand-s-FlutterLab/Gossip-Grove-Frontend",
    demo: null,
    stats: { label: "Type", value: "Full-Stack" },
    featured: false,
    type: "personal",
    platform: "Mobile (Android & iOS)",
    completedOn: "2023",
  },
  {
    id: 7,
    slug: "budget-buddy",
    title: "Budget Buddy",
    category: "Finance Tracker",
    summary:
      "Comprehensive expense tracking app with income/expense categorization, monthly summaries, graphical analytics (pie charts, bar graphs), and MongoDB sync.",
    description:
      "A personal finance tracker I designed to help users visualize their spending habits. I built the backend with Node.js and MongoDB to synchronize data across devices. For the frontend, I utilized Flutter to create interactive graphical analytics, including pie charts and bar graphs for monthly expense breakdowns. I implemented secure user authentication and a robust transaction logging system that allows users to categorize income and expenses, providing actionable financial insights.",
    image: "/images/budget-buddy.png",
    media: [
      {
        type: "image",
        url: "/images/budget-buddy/signup.png",
        caption: "Signup",
      },
      {
        type: "image",
        url: "/images/budget-buddy/login.png",
        caption: "Login",
      },

      {
        type: "image",
        url: "/images/budget-buddy/home.png",
        caption: "Home",
      },

      {
        type: "image",
        url: "/images/budget-buddy/add_entry.png",
        caption: "Add Entry",
      },
      {
        type: "image",
        url: "/images/budget-buddy/transaction.png",
        caption: "Transaction",
      },

      {
        type: "image",
        url: "/images/budget-buddy/balance_wave.png",
        caption: "Balance Wave",
      },
      {
        type: "image",
        url: "/images/budget-buddy/EE.png",
        caption: "Earnings vs Expenses",
      },
      {
        type: "image",
        url: "/images/budget-buddy/monthly_e_w.png",
        caption: "Monthly Earnings/Withdrawal",
      },

      {
        type: "image",
        url: "/images/budget-buddy/profile.png",
        caption: "Profile",
      },
    ],
    tags: ["Flutter", "Provider", "Node.js", "MongoDB", "Charts"],
    theme: "#10b981", // Emerald - Personal
    github: "https://github.com/Anand-s-FlutterLab/BudgetBuddyFrontend",
    demo: null,
    stats: { label: "Features", value: "Analytics" },
    featured: false,
    type: "personal",
    platform: "Mobile (Android & iOS)",
    completedOn: "2023",
  },
  {
    id: 8,
    slug: "shop-express",
    title: "Shop Express",
    category: "eCommerce App",
    summary:
      "Full-featured e-commerce app with product catalog, cart, checkout, wishlists, order history, and admin panel for product management.",
    description:
      "A comprehensive e-commerce solution I developed to explore the Firebase ecosystem. I built a complete shopping experience with product catalogs, cart management, and secure checkout flows using Flutter and GetX for state management. I leveraged Firebase Firestore for real-time data storage and Firebase Auth for user management. Additionally, I built an admin panel within the app to manage inventory, update product details, and track orders, creating a full-cycle e-commerce platform.",
    image: "/images/shop-express.png",
    media: [
      {
        type: "image",
        url: "/images/shop-express/signup.jpg",
        caption: "Signup",
      },
      {
        type: "image",
        url: "/images/shop-express/login.jpg",
        caption: "Login",
      },
      {
        type: "image",
        url: "/images/shop-express/forgot_pass.jpg",
        caption: "Forgot Password",
      },

      {
        type: "image",
        url: "/images/shop-express/home.jpg",
        caption: "Home",
      },
      {
        type: "image",
        url: "/images/shop-express/search.jpg",
        caption: "Search",
      },
      {
        type: "image",
        url: "/images/shop-express/product_details.jpg",
        caption: "Product Details",
      },

      {
        type: "image",
        url: "/images/shop-express/favorites.jpg",
        caption: "Favorites",
      },
      {
        type: "image",
        url: "/images/shop-express/cart.jpg",
        caption: "Cart",
      },
      {
        type: "image",
        url: "/images/shop-express/checkout.jpg",
        caption: "Checkout",
      },

      {
        type: "image",
        url: "/images/shop-express/saved_addresses.jpg",
        caption: "Saved Addresses",
      },
      {
        type: "image",
        url: "/images/shop-express/saved_card.jpg",
        caption: "Saved Card",
      },

      {
        type: "image",
        url: "/images/shop-express/orders.jpg",
        caption: "Orders",
      },

      {
        type: "image",
        url: "/images/shop-express/profile.jpg",
        caption: "Profile",
      },

      {
        type: "image",
        url: "/images/shop-express/admin.jpg",
        caption: "Admin",
      },
      {
        type: "image",
        url: "/images/shop-express/product_management.jpg",
        caption: "Product Management",
      },
    ],
    tags: ["Flutter", "GetX", "Firebase", "Firestore", "Firebase Auth"],
    theme: "#f97316", // Orange - Personal
    github: "https://github.com/Anand-s-FlutterLab/Shop-Express",
    demo: null,
    stats: { label: "Admin", value: "Included" },
    featured: false,
    type: "personal",
    platform: "Mobile (Android & iOS)",
    completedOn: "2023",
  },
  {
    id: 9,
    slug: "weather-snap",
    title: "Weather Snap",
    category: "Weather App",
    summary:
      "Real-time weather forecasting app with 3-day forecasts, city search, unit conversion, and personalized weather reports using REST APIs.",
    description:
      "An elegant weather forecasting application I built to work with REST APIs and location services. I implemented the OpenWeatherMap API to fetch real-time weather data and 3-day forecasts. The app features dynamic background changes based on weather conditions, automatic location detection using the Geolocator package, and local data persistence with Hive for a seamless offline experience. I focused heavily on UI/UX to provide a clean, intuitive interface for checking weather updates.",
    image: "/images/weather-snap.png",
    media: [
      {
        type: "image",
        url: "/images/weather-snap/splash.jpg",
        caption: "Splash",
      },
      {
        type: "image",
        url: "/images/weather-snap/home.jpg",
        caption: "Home",
      },
      {
        type: "image",
        url: "/images/weather-snap/default_search.jpg",
        caption: "Default Search",
      },
      {
        type: "image",
        url: "/images/weather-snap/search.jpg",
        caption: "Search",
      },
      {
        type: "image",
        url: "/images/weather-snap/forecast.jpg",
        caption: "Forecast",
      },
      {
        type: "image",
        url: "/images/weather-snap/nav_bar.jpg",
        caption: "Nav Bar",
      },
      {
        type: "image",
        url: "/images/weather-snap/setting.jpg",
        caption: "Settings",
      },
      {
        type: "image",
        url: "/images/weather-snap/about.jpg",
        caption: "About",
      },
    ],
    tags: ["Flutter", "Provider", "REST API", "Geolocator", "Hive"],
    theme: "#06b6d4", // Cyan - Personal
    github: "https://github.com/Anand-s-FlutterLab/Weather-Snap",
    demo: null,
    stats: { label: "Forecast", value: "3 Days" },
    featured: false,
    type: "personal",
    platform: "Mobile (Android & iOS)",
    completedOn: "2023",
  },
];
