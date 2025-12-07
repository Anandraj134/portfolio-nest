"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { useSectionView } from "@/hooks/useSectionView";
import { trackClick } from "@/utils/analytics";
import {
  Github,
  ArrowUpRight,
  Layers,
  Smartphone, // Added missing import
  Users,
} from "lucide-react";
import dynamic from "next/dynamic";

const ProjectModal = dynamic(() => import("./ProjectModal"), { ssr: false });

type ProjectType = "professional" | "personal";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  theme: string;
  github: string | null;
  demo: string | null;
  playstore?: string;
  stats: { label: string; value: string };
  featured: boolean;
  type: ProjectType;
}

const projects: Project[] = [
  // ========== PROFESSIONAL PROJECTS ==========
  // {
  //   id: 1,
  //   title: "YankiAI: JewishLife Solutions",
  //   category: "Professional • AI Mobile App",
  //   description:
  //     "AI-powered Jewish lifestyle assistant with 598+ downloads, 10.6% conversion rate. Features marketplace, restaurants, community feed, real-time chat, and 15+ integrated modules.",
  //   image: "/images/yanki.jpg",
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
  //   title: "BharatLaw AI",
  //   category: "Professional • Legal Research",
  //   description:
  //     "AI-powered legal research platform for Indian law with comprehensive case law database. Optimized to 10MB Android/45MB iOS with custom HTML rendering and Auth0 integration.",
  //   image: "/images/bharatlaw.jpg",
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
  //   title: "Taras Crunch",
  //   category: "Professional • VAT Compliance",
  //   description:
  //     "Specialized UK VAT compliance platform with AI-powered error detection, real-time validation, and automated calculations. Built for accountants and businesses.",
  //   image: "/images/taras.jpg",
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
  //   title: "LogisticaForce",
  //   category: "Professional • eCommerce",
  //   description:
  //     "White-labeled ordering platform for foodservice distributors with advanced search, order guides, and inventory management for seamless B2B operations.",
  //   image: "/images/logistica.jpg",
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
    title: "Secure Wallet Pro",
    category: "Finance Management",
    description:
      "Production-ready financial management app with HMAC security, 2FA, AES-256 encryption. Tracks 11 investment types including FD, RD, stocks, crypto, PPF, NSC with real-time pricing.",
    image: "/images/secure-wallet-pro.png",
    tags: ["Flutter", "Riverpod", "Node.js", "PostgreSQL", "Redis"],
    theme: "#8b5cf6", // Violet - Personal
    github: "https://github.com/Anand-s-FlutterLab/secure-wallet-pro",
    demo: null,
    stats: { label: "Features", value: "11 Modules" },
    featured: true,
    type: "personal",
  },
  {
    id: 6,
    title: "Gossip Grove",
    category: "Real-Time Chat",
    description:
      "Real-time messaging platform with Socket.IO, one-on-one chats, profile management, and push notifications. Full-stack with Node.js backend and MongoDB.",
    image: "/images/gossip-grove.png",
    tags: ["Flutter", "Socket.IO", "Node.js", "MongoDB", "Firebase"],
    theme: "#ec4899", // Pink - Personal
    github: "https://github.com/Anand-s-FlutterLab/Gossip-Grove-Frontend",
    demo: null,
    stats: { label: "Type", value: "Full-Stack" },
    featured: false,
    type: "personal",
  },
  {
    id: 7,
    title: "Budget Buddy",
    category: "Finance Tracker",
    description:
      "Comprehensive expense tracking app with income/expense categorization, monthly summaries, graphical analytics (pie charts, bar graphs), and MongoDB sync.",
    image: "/images/budget-buddy.png",
    tags: ["Flutter", "Provider", "Node.js", "MongoDB", "Charts"],
    theme: "#10b981", // Emerald - Personal
    github: "https://github.com/Anand-s-FlutterLab/BudgetBuddyFrontend",
    demo: null,
    stats: { label: "Features", value: "Analytics" },
    featured: false,
    type: "personal",
  },
  {
    id: 8,
    title: "Shop Express",
    category: "eCommerce App",
    description:
      "Full-featured e-commerce app with product catalog, cart, checkout, wishlists, order history, and admin panel for product management.",
    image: "/images/shop-express.png",
    tags: ["Flutter", "GetX", "Firebase", "Firestore", "Firebase Auth"],
    theme: "#f97316", // Orange - Personal
    github: "https://github.com/Anand-s-FlutterLab/Shop-Express",
    demo: null,
    stats: { label: "Admin", value: "Included" },
    featured: false,
    type: "personal",
  },
  {
    id: 9,
    title: "Weather Snap",
    category: "Weather App",
    description:
      "Real-time weather forecasting app with 3-day forecasts, city search, unit conversion, and personalized weather reports using REST APIs.",
    image: "/images/weather-snap.png",
    tags: ["Flutter", "Provider", "REST API", "Geolocator", "Hive"],
    theme: "#06b6d4", // Cyan - Personal
    github: "https://github.com/Anand-s-FlutterLab/Weather-Snap",
    demo: null,
    stats: { label: "Forecast", value: "3 Days" },
    featured: false,
    type: "personal",
  },
];

const ProjectCard = ({
  project,
  setSelectedId,
}: {
  project: (typeof projects)[0];
  index: number;
  setSelectedId: (id: number | null) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 60%"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Spotlight Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      onMouseMove={handleMouseMove}
      onClick={() => {
        setSelectedId(project.id);
        trackClick("project_card_click", project.title, {
          project_id: project.id,
        });
      }}
      className={`group relative rounded-[2rem] bg-background-dark border border-white/10 hover:border-white/20 overflow-hidden cursor-pointer transition-all duration-500 ${
        project.featured
          ? "md:col-span-2 md:flex md:flex-row"
          : "col-span-1 flex flex-col"
      }`}
    >
      {/* Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100 z-20"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.05),
              transparent 40%
            )
          `,
        }}
      />

      {/* Image Section */}
      <div
        className={`relative overflow-hidden ${
          project.featured
            ? "w-full md:w-[60%] h-[300px] md:h-auto md:min-h-[450px]" // CHANGED HERE
            : "w-full h-[280px]"
        }`}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

        {/* Stats Badge Floating */}
        <div className="absolute top-6 left-6 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2 text-sm font-medium text-white z-10">
          {project.category.includes("Mobile") ? (
            <Smartphone size={14} />
          ) : (
            <Layers size={14} />
          )}
          {project.category}
        </div>
      </div>
      {/* Content Section */}
      <div
        className={`relative z-10 p-8 flex flex-col justify-between bg-white/[0.02] backdrop-blur-sm ${
          project.featured ? "w-full md:w-[40%]" : "w-full flex-1"
        }`}
      >
        {/* Top Part */}
        <div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl md:text-3xl font-bold text-text-light group-hover:text-secondary transition-colors">
              {project.title}
            </h3>
            <ArrowUpRight className="text-text-gray group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </div>

          <p className="text-text-gray leading-relaxed mb-6 line-clamp-3">
            {project.description}
          </p>

          {/* Quick Stat Row */}
          <div className="flex items-center gap-4 mb-6 text-sm text-text-light/80">
            <div className="flex items-center gap-1.5">
              <Users size={16} className="text-secondary" />
              <span>
                {project.stats.value} {project.stats.label}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Part: Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 text-text-light/70 border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Colored Glow */}
      <div
        className="absolute bottom-0 right-0 w-64 h-64 opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: project.theme }}
      />
    </motion.div>
  );
};

const Projects = () => {
  const { ref } = useSectionView({ sectionName: "projects" });
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedProject = selectedId
    ? projects.find((project) => project.id === selectedId) || null
    : null;

  return (
    <section
      ref={ref}
      id="projects"
      className="py-32 bg-background-dark relative overflow-hidden w-full flex justify-center"
    >
      {/* Grid Pattern Background - Removed */}

      {/* Container constrained to 90% width */}
      <div className="w-[90%] max-w-[1600px] relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-7xl font-bold text-text-light mb-6 tracking-tight">
              Selected{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-purple-500">
                Works
              </span>
            </h2>
            <p className="text-xl text-text-gray max-w-2xl">
              Explorations in mobile architecture, immersive UI, and scalable
              backend systems.
            </p>
          </div>
          <a
            href="https://github.com/Anand-s-FlutterLab"
            className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-text-light hover:bg-white/5 transition-colors"
          >
            <Github size={20} />
            <span>View Full Archive</span>
          </a>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              setSelectedId={setSelectedId}
            />
          ))}
        </div>

        {/* Mobile Button */}
        <div className="mt-12 flex md:hidden justify-center">
          <a
            href="https://github.com"
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-text-light hover:bg-white/5 transition-colors"
          >
            <Github size={20} />
            <span>View Full Archive</span>
          </a>
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedId(null)}
      />
    </section>
  );
};

export default Projects;
