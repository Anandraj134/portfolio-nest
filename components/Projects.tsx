"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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
import { projects } from "@/data/projects";

const ProjectCard = ({
  project,
}: {
  project: (typeof projects)[0];
  index: number;
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
    <Link
      href={`/projects/${project.slug}`}
      onClick={() => {
        trackClick("project_card_click", project.title, {
          project_id: project.id,
        });
      }}
      className="block w-full h-full"
    >
      <motion.div
        ref={ref}
        style={{ opacity, y }}
        onMouseMove={handleMouseMove}
        className={`group relative h-full rounded-[2rem] bg-background-dark border border-white/10 hover:border-white/20 overflow-hidden cursor-pointer transition-all duration-500`}
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
        <div className="relative overflow-hidden w-full h-[280px]">
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
        <div className="relative z-10 p-8 flex flex-col justify-between bg-white/[0.02] backdrop-blur-sm h-[calc(100%-280px)]">
          {/* Top Part */}
          <div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl md:text-3xl font-bold text-text-light group-hover:text-secondary transition-colors">
                {project.title}
              </h3>
              <ArrowUpRight className="text-text-gray group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>

            <p className="text-text-gray leading-relaxed mb-6 line-clamp-3">
              {project.summary}
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
    </Link>
  );
};

const Projects = () => {
  const { ref } = useSectionView({ sectionName: "projects" });

  return (
    <section
      ref={ref}
      id="projects"
      className="scroll-mt-24 py-32 bg-background-dark relative overflow-hidden w-full flex justify-center"
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
            <ProjectCard key={project.id} project={project} index={index} />
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
    </section>
  );
};

export default Projects;
