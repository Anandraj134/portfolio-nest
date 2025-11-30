"use client";

import React, { useState } from "react";
import { useSectionView } from "@/hooks/useSectionView";
import { trackEvent } from "@/utils/analytics";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Code2,
  Terminal,
  Zap,
  Cloud,
  Layers,
  PenTool,
  Globe,
  Settings,
  Database,
  Box,
  Wifi,
  Server,
  Layout,
  GitBranch,
  Shield,
} from "lucide-react";

// --- Types & Data ---

type CategoryType = "All" | "Mobile" | "Backend" | "Database" | "DevOps";

interface Skill {
  name: string;
  icon: React.ReactNode;
  category: CategoryType;
  desc: string;
  // Specific brand colors for icon/glow effects
  brandColor: string;
}

const categories: { id: CategoryType; label: string; icon: React.ReactNode }[] = [
  { id: "All", label: "All", icon: <Layers size={16} /> },
  { id: "Mobile", label: "Mobile", icon: <Smartphone size={16} /> },
  { id: "Backend", label: "Backend", icon: <Cloud size={16} /> },
  { id: "Database", label: "Data", icon: <Database size={16} /> },
  { id: "DevOps", label: "Tools", icon: <Settings size={16} /> },
];

const skillsData: Skill[] = [
  // Mobile & Frontend
  {
    name: "Flutter",
    icon: <Smartphone size={28} />,
    category: "Mobile",
    desc: "High-performance cross-platform apps.",
    brandColor: "#38bdf8",
  },
  {
    name: "React Native",
    icon: <Code2 size={28} />,
    category: "Mobile",
    desc: "Native experiences with JavaScript.",
    brandColor: "#61dafb",
  },
  {
    name: "Kotlin",
    icon: <Terminal size={28} />,
    category: "Mobile",
    desc: "Modern Android development.",
    brandColor: "#7f52ff",
  },
  {
    name: "Swift",
    icon: <Zap size={28} />,
    category: "Mobile",
    desc: "Native iOS development.",
    brandColor: "#F05138",
  },
  {
    name: "UI/UX Design",
    icon: <PenTool size={28} />,
    category: "Mobile",
    desc: "Intuitive and accessible interfaces.",
    brandColor: "#ec4899",
  },
  {
    name: "Motion",
    icon: <Zap size={28} />,
    category: "Mobile",
    desc: "Fluid animations & interactions.",
    brandColor: "#facc15",
  },

  // Backend & Cloud
  {
    name: "Node.js",
    icon: <Server size={28} />,
    category: "Backend",
    desc: "Scalable network applications.",
    brandColor: "#4ade80",
  },
  {
    name: "Firebase",
    icon: <Cloud size={28} />,
    category: "Backend",
    desc: "Serverless auth, functions & data.",
    brandColor: "#f59e0b",
  },
  {
    name: "GraphQL",
    icon: <Globe size={28} />,
    category: "Backend",
    desc: "Efficient data querying.",
    brandColor: "#e10098",
  },
  {
    name: "Push Notifs",
    icon: <Wifi size={28} />,
    category: "Backend",
    desc: "FCM & APNs integration.",
    brandColor: "#ef4444",
  },

  // Database
  {
    name: "SQL / Room",
    icon: <Database size={28} />,
    category: "Database",
    desc: "Structured local persistence.",
    brandColor: "#3b82f6",
  },
  {
    name: "Hive / NoSQL",
    icon: <Box size={28} />,
    category: "Database",
    desc: "Key-value lightweight storage.",
    brandColor: "#f97316",
  },

  // Tools
  {
    name: "Git / CI/CD",
    icon: <GitBranch size={28} />,
    category: "DevOps",
    desc: "Version control & automation.",
    brandColor: "#fca5a5",
  },
  {
    name: "Docker",
    icon: <Box size={28} />,
    category: "DevOps",
    desc: "Containerization basics.",
    brandColor: "#22d3ee",
  },
  {
    name: "Testing",
    icon: <Shield size={28} />,
    category: "DevOps",
    desc: "Unit, Widget & Integration tests.",
    brandColor: "#a8a29e",
  },
  {
    name: "Clean Arch",
    icon: <Layout size={28} />,
    category: "DevOps",
    desc: "Scalable code structure.",
    brandColor: "#818cf8",
  },
];

// --- Components ---

const Skills = () => {
  const { ref: sectionRef } = useSectionView({ sectionName: "skills" });
  const [activeCategory, setActiveCategory] = useState<CategoryType>("All");

  const filteredSkills =
    activeCategory === "All"
      ? skillsData
      : skillsData.filter((s) => s.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-24 bg-background-dark relative overflow-hidden w-full md:w-[90%] mx-auto"
    >
      {/* Background Decorative Glows */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4 text-text-light"
          >
            Tech <span className="text-secondary">Stack</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-text-gray max-w-xl mx-auto"
          >
            Tools and technologies I use to build high-performance mobile applications.
          </motion.p>
        </div>

        {/* Filter Chips / Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                trackEvent("filter_skills", { category: cat.id });
              }}
              className="relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-secondary/10 border border-secondary rounded-full"
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
              <span
                className={`relative z-10 flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? "text-secondary"
                    : "text-text-gray hover:text-text-light"
                }`}
              >
                {cat.icon}
                {cat.label}
              </span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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

const SkillCard = ({ skill }: { skill: Skill }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="relative group"
    >
      <div className="h-full p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden relative transition-all duration-300 group-hover:border-secondary/30 group-hover:bg-white/10">
        {/* Hover Glow Effect */}
        <div
          className="absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl pointer-events-none"
          style={{ backgroundColor: skill.brandColor }}
        />

        {/* Icon Container */}
        <div className="mb-6 inline-block">
          <div className="p-3 rounded-xl bg-background-dark border border-white/5 text-text-light group-hover:scale-110 transition-transform duration-300 group-hover:border-secondary/20">
            <span style={{ color: skill.brandColor }}>{skill.icon}</span>
          </div>
        </div>

        {/* Content */}
        <h3 className="text-lg font-bold text-text-light mb-2 group-hover:text-secondary transition-colors">
          {skill.name}
        </h3>

        <p className="text-sm text-text-gray line-clamp-2 group-hover:text-text-light/80 transition-colors">
          {skill.desc}
        </p>

        {/* Bottom Active Indicator */}
        <div className="absolute bottom-0 left-0 h-1 w-0 bg-secondary group-hover:w-full transition-all duration-500 ease-out" />
      </div>
    </motion.div>
  );
};

export default Skills;
