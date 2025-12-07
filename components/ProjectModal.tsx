"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Github,
  ExternalLink,
  Code2,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Smartphone,
  Globe,
  Zap,
  Briefcase,
  User,
  TrendingUp,
} from "lucide-react";

// --- Types ---
type ProjectType = "professional" | "personal";

interface Project {
  id: number;
  title: string;
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
  features?: string[];
  challenges?: string;
  category?: string;
  platform?: string;
  status?: "Completed" | "In Progress" | "Prototype";
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Reset image state
  useEffect(() => {
    if (isOpen) setImageLoaded(false);
  }, [isOpen, project]);

  // Scroll Lock & Focus Trap
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).lenis) (window as any).lenis.stop();
    }
    return () => {
      document.body.style.overflow = "";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).lenis) (window as any).lenis.start();
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!project) return null;

  const isMobilePlatform = project.platform?.toLowerCase().includes("mobile");

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl h-[90vh] md:h-[85vh] flex flex-col md:flex-row bg-zinc-950 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan-900/20"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white transition-all hover:rotate-90 hover:scale-110"
            >
              <X size={20} />
            </button>

            {/* LEFT COLUMN: Visuals */}
            <div className="relative w-full md:w-[45%] lg:w-[40%] h-64 md:h-full shrink-0 group">
              {/* Image Container */}
              <div className="relative w-full h-full overflow-hidden bg-zinc-900">
                {!imageLoaded && (
                  <div className="absolute inset-0 animate-pulse bg-zinc-800" />
                )}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={`object-cover transition-all duration-700 ${
                    imageLoaded
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-105"
                  } group-hover:scale-105`}
                  onLoad={() => setImageLoaded(true)}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-zinc-950/90" />
              </div>

              {/* Mobile Floating Title */}
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-zinc-950 to-transparent md:hidden">
                <span className="inline-block px-3 py-1 mb-2 text-xs font-mono font-bold text-cyan-400 bg-cyan-950/30 border border-cyan-500/30 rounded-full backdrop-blur-md uppercase tracking-wider">
                  {project.category || "Project"}
                </span>
                <h2 className="text-3xl font-bold text-white leading-tight">
                  {project.title}
                </h2>
              </div>
            </div>

            {/* RIGHT COLUMN: Content */}
            <div className="flex-1 w-full h-full bg-zinc-950 relative flex flex-col">
              {/* Scrollable Area */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 space-y-8">
                {/* Desktop Header */}
                <div className="hidden md:block space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 text-xs font-mono font-bold text-cyan-400 bg-cyan-950/30 border border-cyan-500/30 rounded-full uppercase tracking-wider">
                      {project.category || "Development"}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
                    {project.title}
                  </h2>
                </div>

                {/* 3-Column Data Grid (Replaces Status) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Type Box */}
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col justify-center group hover:bg-white/[0.05] transition-colors">
                    <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider mb-1">
                      Context
                    </span>
                    <div className="text-zinc-200 text-sm font-medium flex items-center gap-2">
                      {project.type === "professional" ? (
                        <Briefcase size={16} className="text-purple-400" />
                      ) : (
                        <User size={16} className="text-pink-400" />
                      )}
                      <span className="capitalize">{project.type}</span>
                    </div>
                  </div>

                  {/* Platform Box */}
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col justify-center group hover:bg-white/[0.05] transition-colors">
                    <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider mb-1">
                      Platform
                    </span>
                    <div className="text-zinc-200 text-sm font-medium flex items-center gap-2">
                      {isMobilePlatform ? (
                        <Smartphone size={16} className="text-cyan-400" />
                      ) : (
                        <Globe size={16} className="text-cyan-400" />
                      )}
                      {project.platform || "Web / Mobile"}
                    </div>
                  </div>

                  {/* Stats/Impact Box */}
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col justify-center group hover:bg-white/[0.05] transition-colors">
                    <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider mb-1">
                      {project.stats.label}
                    </span>
                    <div className="text-zinc-200 text-sm font-medium flex items-center gap-2">
                      <TrendingUp size={16} className="text-emerald-400" />
                      {project.stats.value}
                    </div>
                  </div>
                </div>

                {/* Overview */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white flex items-center gap-2">
                    <Code2 className="text-zinc-400" size={20} />
                    <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                      Project Brief
                    </span>
                  </h3>
                  <p className="text-zinc-400 text-base leading-relaxed whitespace-pre-line">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <Cpu size={14} /> Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-md bg-white/5 border border-white/5 text-zinc-300 text-xs font-mono hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-200 transition-colors cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features List */}
                {project.features && project.features.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white flex items-center gap-2">
                      <Zap className="text-yellow-500/80" size={20} />
                      Key Highlights
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {project.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + idx * 0.05 }}
                          className="flex gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors"
                        >
                          <CheckCircle2
                            className="text-cyan-500/70 shrink-0 mt-0.5"
                            size={18}
                          />
                          <span className="text-zinc-400 text-sm leading-snug">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Challenges */}
                {project.challenges && (
                  <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/10 backdrop-blur-sm">
                    <h3 className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-2">
                      <AlertTriangle size={16} />
                      Technical Challenges
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed">
                      {project.challenges}
                    </p>
                  </div>
                )}

                {/* Spacer for bottom actions */}
                <div className="h-20" />
              </div>

              {/* Sticky Bottom Actions */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-zinc-950/95 backdrop-blur-md z-10 border-t border-white/5">
                <div className="flex gap-4">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-all shadow-[0_0_20px_rgba(8,145,178,0.2)] hover:shadow-[0_0_30px_rgba(8,145,178,0.4)]"
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium transition-all ${
                        !project.demo ? "flex-1" : "w-auto px-6"
                      }`}
                    >
                      <Github size={18} />
                      {!project.demo ? "View Source Code" : ""}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
