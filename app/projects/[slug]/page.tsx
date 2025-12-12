"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { projects } from "@/data/projects";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Layers,
  Calendar,
  Code2,
  Cpu,
  Smartphone,
  Globe,
} from "lucide-react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

const ProjectPage = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.4]);

  if (!project) {
    return notFound();
  }

  // Animation variants (kept same idea, refined)
  const fadeInUp: Variants = {
    initial: { opacity: 0, y: 24 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  return (
    <main className="min-h-screen bg-[#050509] text-text-light font-sans selection:bg-secondary/30 overflow-x-hidden">
      {/* Immersive Hero Section */}
      <div ref={containerRef} className="relative min-h-[70vh] w-full">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 w-full h-full overflow-hidden"
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black" />
          )}
          <div className="absolute inset-0 bg-background-dark/60 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent" />
        </motion.div>

        {/* Top Back Button (structure preserved) */}
        <div className="absolute inset-x-0 top-0 z-50 p-6 md:p-8">
          <a
            href="/#projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/10 text-white transition-all hover:scale-105 group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="font-medium">Back to Projects</span>
          </a>
        </div>

        {/* Hero content block (same placement, modernized) */}
        <div className="relative flex flex-col justify-end max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-16 md:pb-24 z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-secondary to-accent text-black text-xs md:text-sm font-semibold tracking-wide shadow-lg shadow-secondary/30 uppercase">
                {project.category}
              </span>

              {project.featured && (
                <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 text-white text-xs md:text-sm font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" />
                  Featured Project
                </span>
              )}
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-4 md:mb-6 leading-[1.05]"
            >
              {project.title}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base md:text-lg text-gray-200/90 max-w-2xl mb-6 md:mb-8 leading-relaxed"
            >
              {project.description}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-3 pt-1"
            >
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-background-dark hover:bg-gray-100 transition-all font-semibold text-sm md:text-base shadow-xl shadow-black/20"
                >
                  <Github size={18} />
                  Source Code
                </motion.a>
              )}
              {project.demo && (
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/25 text-white transition-all font-medium text-sm md:text-base group"
                >
                  <ExternalLink
                    size={18}
                    className="group-hover:rotate-45 transition-transform duration-300"
                  />
                  Live Preview
                </motion.a>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-10 md:-mt-20 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Overview Column (Left - Top) */}
          <div className="lg:col-span-8 order-1">
            {/* Overview Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.5 }}
              className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-7 md:p-10 shadow-[0_18px_60px_rgba(0,0,0,0.6)]"
            >
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-tr from-secondary/20 via-transparent to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative">
                <h2 className="text-2xl font-bold mb-4 md:mb-6 flex items-center gap-3 text-white">
                  <div className="p-2 rounded-xl bg-secondary/10 border border-secondary/30">
                    <Layers className="text-secondary w-5 h-5" />
                  </div>
                  Project Overview
                </h2>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-prose">
                  {project.description}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Sidebar Column (Right - Spanning 2 Rows on Desktop) */}
          <div
            className={`lg:col-span-4 order-2 ${
              project.media && project.media.length > 0 ? "lg:row-span-2" : ""
            } space-y-7 md:space-y-8`}
          >
            <div className="lg:sticky lg:top-24 space-y-7 md:space-y-8">
              {/* Stats Card */}
              {project.stats && (
                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-[0_16px_50px_rgba(0,0,0,0.6)]"
                >
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3 px-1">
                    Key Metric
                  </h3>
                  <div className="bg-gradient-to-br from-secondary/15 via-secondary/5 to-transparent p-5 rounded-2xl border border-secondary/30">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-200 font-medium">
                        {project.stats.label}
                      </span>
                      <span className="text-3xl font-black text-white tracking-tight">
                        {project.stats.value}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Technologies Card */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-7"
              >
                <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                  <Code2 className="text-secondary w-5 h-5" />
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs md:text-sm font-medium text-gray-200 border border-white/10 hover:border-secondary/40 transition-all cursor-default"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Info Card */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-7"
              >
                <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                  <Cpu className="text-purple-400 w-5 h-5" />
                  Project Details
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 mt-1">
                      <Globe size={16} className="text-gray-300" />
                    </div>
                    <div>
                      <span className="block text-[11px] uppercase tracking-[0.18em] text-gray-500 font-semibold mb-0.5">
                        Platform
                      </span>
                      <span className="text-gray-100 text-sm">
                        Mobile (Android & iOS)
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 mt-1">
                      <Calendar size={16} className="text-gray-300" />
                    </div>
                    <div>
                      <span className="block text-[11px] uppercase tracking-[0.18em] text-gray-500 font-semibold mb-0.5">
                        Timeline
                      </span>
                      <span className="text-gray-100 text-sm">
                        2024 - Present
                      </span>
                    </div>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Visuals Column (Left - Bottom, Order 3) */}
          {project.media && project.media.length > 0 && (
            <div className="lg:col-span-8 order-3">
              <motion.section
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-6 md:mb-8">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/40">
                      <Smartphone className="text-blue-400 w-5 h-5" />
                    </div>
                    Visual Gallery
                  </h2>
                  <span className="text-xs md:text-sm text-gray-400">
                    {project.media.length} items
                  </span>
                </div>

                {/* Grid Layout for Row-First Ordering */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {project.media.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35 }}
                      whileHover={{
                        y: -6,
                        scale: 1.01,
                      }}
                      className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 group shadow-lg"
                    >
                      {item.type === "image" ? (
                        <div className="relative overflow-hidden">
                          <Image
                            src={item.url}
                            alt={item.caption || `Gallery Item ${index + 1}`}
                            width={0}
                            height={0}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {/* Gradient overlay on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      ) : (
                        <video
                          src={item.url}
                          controls
                          className="w-full h-auto rounded-2xl bg-black/70"
                        />
                      )}

                      {item.caption && (
                        <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/60 to-transparent pt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white text-xs md:text-sm font-medium">
                            {item.caption}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProjectPage;
