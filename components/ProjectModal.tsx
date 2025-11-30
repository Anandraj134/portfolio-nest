"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Github,
  ExternalLink,
  Code2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

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
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trap
  useEffect(() => {
    if (isOpen) {
      const focusableElements = modalRef.current?.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
      );
      const firstElement = focusableElements?.[0] as HTMLElement;
      const lastElement = focusableElements?.[
        focusableElements.length - 1
      ] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
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
        if (e.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleTabKey);
      firstElement?.focus();

      return () => {
        document.removeEventListener("keydown", handleTabKey);
      };
    }
  }, [isOpen, onClose]);

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-bg-light dark:bg-bg-dark rounded-2xl shadow-2xl border border-gray-200 dark:border-secondary/10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/10 dark:bg-secondary/10 hover:bg-black/20 dark:hover:bg-secondary/20 transition-colors z-50 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Image */}
            <div className="relative h-64 md:h-80 w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-bg-light dark:from-bg-dark to-transparent z-10" />
              {/* Replace with next/image in production */}
              <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
                Project Image Placeholder
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-10 -mt-20 relative z-20">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                <div>
                  <h2
                    id="modal-title"
                    className="text-3xl md:text-4xl font-bold text-text-foreground dark:text-text-light mb-4"
                  >
                    {project.title}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm rounded-full bg-secondary/10 text-secondary border border-secondary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 dark:bg-secondary/5 hover:bg-gray-200 dark:hover:bg-secondary/10 transition-colors font-medium min-h-[44px]"
                    aria-label={`View ${project.title} source code on GitHub`}
                  >
                    <Github size={20} />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-secondary text-black hover:bg-secondary/90 transition-colors font-bold min-h-[44px]"
                    aria-label={`View live demo of ${project.title}`}
                  >
                    <ExternalLink size={20} />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                <div className="md:col-span-2 space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-text-foreground dark:text-text-light mb-4 flex items-center gap-2">
                      <Code2 className="text-secondary" /> Project Overview
                    </h3>
                    <p className="text-text-gray leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {project.features && (
                    <div>
                      <h3 className="text-xl font-bold text-text-foreground dark:text-text-light mb-4 flex items-center gap-2">
                        <CheckCircle2 className="text-green-500" /> Key Features
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {project.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-text-gray"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="space-y-8">
                  {project.challenges && (
                    <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20">
                      <h3 className="text-lg font-bold text-text-foreground dark:text-text-light mb-4 flex items-center gap-2">
                        <AlertTriangle className="text-red-500" /> Challenges
                      </h3>
                      <p className="text-sm text-text-gray leading-relaxed">
                        {project.challenges}
                      </p>
                    </div>
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
