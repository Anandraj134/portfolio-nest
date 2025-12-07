"use client";

import React, { useState } from "react";
import { useSectionView } from "@/hooks/useSectionView";
import { trackClick, trackEvent } from "@/utils/analytics";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Code2,
  Zap,
  Cloud,
  Globe,
  Settings,
  Database,
  Wifi,
  Server,
  Cpu,
  CreditCard,
  GitBranch,
  Shield,
  Bell,
  Box,
  Layers,
  Layout,
  PieChart,
  Terminal,
} from "lucide-react";

// --- Types & Data ---

type SkillCategory = "All" | "Mobile" | "Backend" | "Database" | "State" | "Cloud" | "Tools";

interface Skill {
  name: string;
  icon: React.ReactNode;
  category: SkillCategory;
  desc: string;
}

// Color System for Categories
const categoryStyles: Record<
  string,
  { text: string; border: string; bg: string; glow: string; icon: string }
> = {
  Mobile: {
    text: "text-blue-400",
    border: "border-blue-500/20 group-hover:border-blue-500/50",
    bg: "bg-blue-500/10",
    glow: "shadow-[0_0_15px_rgba(96,165,250,0.3)]",
    icon: "text-blue-400",
  },
  Backend: {
    text: "text-emerald-400",
    border: "border-emerald-500/20 group-hover:border-emerald-500/50",
    bg: "bg-emerald-500/10",
    glow: "shadow-[0_0_15px_rgba(52,211,153,0.3)]",
    icon: "text-emerald-400",
  },
  Database: {
    text: "text-purple-400",
    border: "border-purple-500/20 group-hover:border-purple-500/50",
    bg: "bg-purple-500/10",
    glow: "shadow-[0_0_15px_rgba(192,132,252,0.3)]",
    icon: "text-purple-400",
  },
  State: {
    text: "text-amber-400",
    border: "border-amber-500/20 group-hover:border-amber-500/50",
    bg: "bg-amber-500/10",
    glow: "shadow-[0_0_15px_rgba(251,191,36,0.3)]",
    icon: "text-amber-400",
  },
  Cloud: {
    text: "text-cyan-400",
    border: "border-cyan-500/20 group-hover:border-cyan-500/50",
    bg: "bg-cyan-500/10",
    glow: "shadow-[0_0_15px_rgba(34,211,238,0.3)]",
    icon: "text-cyan-400",
  },
  Tools: {
    text: "text-violet-400",
    border: "border-violet-500/20 group-hover:border-violet-500/50",
    bg: "bg-violet-500/10",
    glow: "shadow-[0_0_15px_rgba(167,139,250,0.3)]",
    icon: "text-violet-400",
  },
  All: {
    text: "text-secondary",
    border: "border-secondary/20",
    bg: "bg-secondary/10",
    glow: "shadow-[0_0_15px_rgba(100,255,218,0.3)]",
    icon: "text-secondary",
  },
};

const skillsData: Skill[] = [
  // Mobile (Blue Theme)
  {
    name: "Flutter",
    icon: <Smartphone size={32} />,
    category: "Mobile",
    desc: "Cross-platform iOS & Android apps.",
  },
  {
    name: "React Native",
    icon: <Code2 size={32} />,
    category: "Mobile",
    desc: "Native experiences with JavaScript.",
  },
  {
    name: "Expo",
    icon: <Zap size={32} />,
    category: "Mobile",
    desc: "Rapid React Native development.",
  },
  {
    name: "Dart",
    icon: <Terminal size={32} />,
    category: "Mobile",
    desc: "Flutter programming language.",
  },

  // Backend (Emerald Theme)
  {
    name: "Node.js",
    icon: <Server size={32} />,
    category: "Backend",
    desc: "Scalable server-side JavaScript.",
  },
  {
    name: "Express.js",
    icon: <Globe size={32} />,
    category: "Backend",
    desc: "Fast web application framework.",
  },
  {
    name: "TypeScript",
    icon: <Code2 size={32} />,
    category: "Backend",
    desc: "Type-safe JavaScript development.",
  },
  {
    name: "C# & .NET",
    icon: <Cpu size={32} />,
    category: "Backend",
    desc: "Enterprise backend solutions.",
  },
  {
    name: "REST APIs",
    icon: <Globe size={28} />,
    category: "Backend",
    desc: "RESTful service architecture.",
  },
  {
    name: "GraphQL",
    icon: <Database size={28} />,
    category: "Backend",
    desc: "Efficient data query language.",
  },

  // Database (Purple Theme)
  {
    name: "MongoDB",
    icon: <Database size={32} />,
    category: "Database",
    desc: "NoSQL document database.",
  },
  {
    name: "PostgreSQL",
    icon: <Database size={32} />,
    category: "Database",
    desc: "Relational database system.",
  },
  {
    name: "SQLite",
    icon: <Database size={28} />,
    category: "Database",
    desc: "Lightweight local database.",
  },
  {
    name: "Firebase Firestore",
    icon: <Cloud size={28} />,
    category: "Database",
    desc: "Real-time cloud database.",
  },

  // State Management (Amber Theme)
  {
    name: "GetX",
    icon: <Settings size={32} />,
    category: "State",
    desc: "Flutter state & navigation.",
  },
  {
    name: "Provider",
    icon: <Layers size={32} />,
    category: "State",
    desc: "Flutter state management.",
  },
  {
    name: "Riverpod",
    icon: <Settings size={28} />,
    category: "State",
    desc: "Advanced Flutter state solution.",
  },
  {
    name: "Zustand",
    icon: <Zap size={28} />,
    category: "State",
    desc: "React Native state management.",
  },
  {
    name: "Redux",
    icon: <Layers size={28} />,
    category: "State",
    desc: "Predictable state container.",
  },

  // Cloud & Real-Time (Cyan Theme)
  {
    name: "Firebase",
    icon: <Cloud size={32} />,
    category: "Cloud",
    desc: "Backend-as-a-Service platform.",
  },
  {
    name: "Socket.IO",
    icon: <Wifi size={32} />,
    category: "Cloud",
    desc: "Real-time bidirectional events.",
  },
  {
    name: "SignalR",
    icon: <Wifi size={28} />,
    category: "Cloud",
    desc: "Real-time web functionality.",
  },
  {
    name: "Push Notifications",
    icon: <Bell size={28} />,
    category: "Cloud",
    desc: "Firebase & native notifications.",
  },

  // Tools (Violet Theme)
  {
    name: "Git & GitHub",
    icon: <GitBranch size={32} />,
    category: "Tools",
    desc: "Version control & collaboration.",
  },
  {
    name: "Postman",
    icon: <Box size={32} />,
    category: "Tools",
    desc: "API testing & development.",
  },
  {
    name: "Jira",
    icon: <Layout size={28} />,
    category: "Tools",
    desc: "Project & issue tracking.",
  },
  {
    name: "Posthog",
    icon: <PieChart size={28} />,
    category: "Tools",
    desc: "Product analytics platform.",
  },
  {
    name: "App Store",
    icon: <Smartphone size={28} />,
    category: "Tools",
    desc: "iOS app distribution.",
  },
  {
    name: "Play Store",
    icon: <Smartphone size={28} />,
    category: "Tools",
    desc: "Android app distribution.",
  },
  {
    name: "Auth0",
    icon: <Shield size={28} />,
    category: "Tools",
    desc: "Authentication & authorization.",
  },
  {
    name: "Razorpay",
    icon: <CreditCard size={28} />,
    category: "Tools",
    desc: "Payment gateway integration.",
  },
];

const filterCategories: SkillCategory[] = [
  "All",
  "Mobile",
  "Backend",
  "Database",
  "State",
  "Cloud",
  "Tools",
];


// --- Main Component ---

const Skills = () => {
  const { ref: sectionRef } = useSectionView({ sectionName: "skills" });
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("All");

  // Filter logic
  const filteredSkills = skillsData.filter(
    (skill) => activeCategory === "All" || skill.category === activeCategory
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-24 bg-bg-light dark:bg-bg-dark relative overflow-hidden w-full flex justify-center"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern Removed */}

        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="w-[90%] max-w-7xl px-4 md:px-6 relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-7xl font-bold text-text-light mb-6 tracking-tight"
          >
            Technical{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-purple-500">
              Arsenal
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-text-gray max-w-lg mx-auto"
          >
            Full-stack technologies I&apos;ve learned and implemented across
            mobile, backend, and cloud platforms.
          </motion.p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {filterCategories.map((category) => (
            <FilterChip
              key={category}
              label={category}
              isActive={activeCategory === category}
              onClick={() => {
                setActiveCategory(category);
                trackEvent("filter_skills", { category });
              }}
            />
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

// --- Sub Components ---

const FilterChip = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  // Get styles for this specific category label
  const styles = categoryStyles[label] || categoryStyles.All;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
        isActive
          ? `${styles.bg} ${styles.border} ${styles.text} ${styles.glow}`
          : "bg-transparent border-gray-700 text-text-gray hover:border-gray-500 hover:text-text-light"
      }`}
    >
      {label}
    </motion.button>
  );
};

const SkillCard = ({ skill }: { skill: Skill }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const styles = categoryStyles[skill.category] || categoryStyles.All;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="h-[180px] w-full [perspective:1000px] cursor-pointer group"
      onClick={() => {
        setIsFlipped(!isFlipped);
        trackClick("skill_card_click", skill.name);
      }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front Side */}
        <div
          className={`absolute inset-0 [backface-visibility:hidden] rounded-xl bg-bg-light/50 dark:bg-white/5 backdrop-blur-sm border flex flex-col items-center justify-center gap-4 shadow-md transition-all ${styles.border} group-hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]`}
        >
          <div
            className={`p-3 rounded-full ${styles.bg} ${styles.icon} group-hover:scale-110 transition-transform duration-300`}
          >
            {skill.icon}
          </div>
          <h4 className="text-lg font-semibold text-text-light tracking-wide">
            {skill.name}
          </h4>
          {/* Small Colored Indicator Line */}
          <div
            className={`h-1 w-8 rounded-full ${styles.bg}`}
          />
        </div>

        {/* Back Side */}
        <div
          className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl ${styles.bg} backdrop-blur-md border ${styles.border} p-5 flex flex-col items-center justify-center text-center shadow-xl`}
        >
          <h4 className={`text-base font-bold mb-2 ${styles.text}`}>
            {skill.name}
          </h4>
          <p className="text-xs leading-relaxed text-text-light/90 font-medium">
            {skill.desc}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Skills;
