"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image"; // Don't forget this import for real images!
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Github,
  ExternalLink,
  Code2,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Smartphone,
} from "lucide-react";

// Consistent Type Definition
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
  features?: string[];
  challenges?: string;
  // Optional: Include category/stats if available in your data
  category?: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus Trap & Scroll Lock Logic
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      
      const focusableElements = modalRef.current?.querySelectorAll(
        'a[href], button, textarea, input, select'
      );
      const firstElement = focusableElements?.[0] as HTMLElement;
      const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
        if (e.key === "Escape") onClose();
      };

      document.addEventListener("keydown", handleKeyDown);
      firstElement?.focus();

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          
          {/* Backdrop with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl max-h-[90vh] flex flex-col bg-background-dark rounded-3xl shadow-2xl border border-white/10 overflow-hidden"
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/20 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Hero Image Section */}
            <div className="relative h-64 md:h-96 w-full shrink-0">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent z-10" />
              
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
              
              {/* Floating Title Over Image */}
              <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                 <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                 >
                    <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 text-secondary text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                            {project.category || "Project"}
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                        {project.title}
                    </h2>
                 </motion.div>
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Description */}
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                <Code2 className="text-secondary" size={20} />
                                Overview
                            </h3>
                            <p className="text-text-gray text-lg leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        {/* Features List */}
                        {project.features && (
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                    <Layers className="text-accent" size={20} />
                                    Key Features
                                </h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {project.features.map((feature, idx) => (
                                        <motion.li 
                                            key={idx}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + (idx * 0.1) }}
                                            className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 text-text-gray text-sm"
                                        >
                                            <CheckCircle2 className="text-secondary shrink-0 mt-0.5" size={16} />
                                            {feature}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        
                        {/* Challenges Block */}
                        {project.challenges && (
                            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10">
                                <h3 className="text-lg font-semibold text-red-400 mb-2 flex items-center gap-2">
                                    <AlertTriangle size={18} />
                                    Technical Challenges
                                </h3>
                                <p className="text-text-gray/80 text-sm leading-relaxed">
                                    {project.challenges}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-8">
                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3">
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-secondary text-background-dark font-bold hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20"
                            >
                                <ExternalLink size={20} />
                                View Live Demo
                            </a>
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-white/5 text-white font-medium hover:bg-white/10 border border-white/10 transition-all"
                            >
                                <Github size={20} />
                                View Source Code
                            </a>
                        </div>

                        {/* Tech Stack Grid */}
                        <div>
                            <h4 className="text-sm font-bold text-text-gray uppercase tracking-wider mb-4">
                                Tech Stack
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <span 
                                        key={tag} 
                                        className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-text-light text-xs font-medium hover:border-white/20 transition-colors"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Meta Info */}
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                             <div className="flex items-center justify-between text-sm">
                                <span className="text-text-gray">Platform</span>
                                <span className="text-white font-medium flex items-center gap-1">
                                    <Smartphone size={14} className="text-secondary" /> 
                                    Mobile / Web
                                </span>
                             </div>
                             <div className="w-full h-px bg-white/5" />
                             <div className="flex items-center justify-between text-sm">
                                <span className="text-text-gray">Status</span>
                                <span className="text-green-400 font-medium flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                    Completed
                                </span>
                             </div>
                        </div>

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
