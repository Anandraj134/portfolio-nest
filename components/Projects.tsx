"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useSectionView } from "@/hooks/useSectionView";
import { trackClick } from "@/utils/analytics";
import TextReveal from "./TextReveal";
import { Github, ExternalLink } from "lucide-react";
import dynamic from "next/dynamic";

const ProjectModal = dynamic(() => import("./ProjectModal"), { ssr: false });

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce application built with Next.js, Stripe, and Sanity CMS.",
    image: "/images/project1.jpg",
    tags: ["Next.js", "TypeScript", "Stripe", "Sanity"],
    github: "https://github.com",
    demo: "https://demo.com",
    features: [
      "Real-time inventory management",
      "Secure payment processing with Stripe",
      "User authentication and order history",
      "Responsive design for all devices",
    ],
    challenges:
      "Implementing complex state management for the shopping cart and ensuring secure payment transactions were key challenges.",
  },
  {
    id: 2,
    title: "Social Media Dashboard",
    description:
      "A real-time social media dashboard for tracking analytics and engagement.",
    image: "/images/project2.jpg",
    tags: ["React", "Redux", "Chart.js", "Firebase"],
    github: "https://github.com",
    demo: "https://demo.com",
    features: [
      "Real-time data visualization",
      "Customizable dashboard widgets",
      "Social media API integration",
      "Dark/Light mode support",
    ],
    challenges:
      "Handling large datasets and ensuring smooth chart animations required optimizing rendering performance.",
  },
  {
    id: 3,
    title: "Task Management App",
    description:
      "A collaborative task management tool with real-time updates and team features.",
    image: "/images/project3.jpg",
    tags: ["Vue.js", "Node.js", "Socket.io", "MongoDB"],
    github: "https://github.com",
    demo: "https://demo.com",
    features: [
      "Real-time collaboration",
      "Drag and drop task organization",
      "Team chat and notifications",
      "File attachment support",
    ],
    challenges:
      "Synchronizing state across multiple clients in real-time using WebSockets was a complex implementation detail.",
  },
  {
    id: 4,
    title: "AI Image Generator",
    description:
      "An application that uses OpenAI's DALL-E API to generate images from text prompts.",
    image: "/images/project4.jpg",
    tags: ["React", "OpenAI API", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://demo.com",
    features: [
      "Integration with DALL-E API",
      "Image gallery and history",
      "Download and share functionality",
      "Prompt optimization suggestions",
    ],
    challenges:
      "Managing API rate limits and handling asynchronous image generation requests efficiently.",
  },
];

const ProjectCard = ({
  project,
  index,
  setSelectedId,
}: {
  project: (typeof projects)[0];
  index: number;
  setSelectedId: (id: number | null) => void;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "start 30%"]
  });

  const scrollYProgressSpring = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const opacity = useTransform(scrollYProgressSpring, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgressSpring, [0, 1], [80, 0]);
  const scale = useTransform(scrollYProgressSpring, [0, 1], [0.85, 1]);
  const rotate = useTransform(
    scrollYProgressSpring,
    [0, 1],
    [index % 2 === 0 ? 3 : -3, 0]
  );

  return (
    <motion.div
      ref={ref}
      layoutId={`card-${project.id}`}
      onClick={() => {
        setSelectedId(project.id);
        trackClick("project_card_click", project.title, {
          project_id: project.id,
        });
      }}
      style={{ opacity, y, scale, rotate }}
      className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-secondary/50 transition-colors cursor-pointer shadow-lg hover:shadow-xl duration-300"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click from firing
              setSelectedId(project.id);
              trackClick("project_card_button_click", project.title, {
                project_id: project.id,
              });
            }}
            className="px-6 py-2 bg-secondary text-black font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 min-h-[44px]"
            aria-label={`View details for ${project.title}`}
          >
            View Details
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-text-foreground dark:text-text-light mb-2">
          {project.title}
        </h3>
        <p className="text-text-gray mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs rounded-full bg-secondary/10 text-secondary border border-secondary/20"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-secondary/10">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-text-gray hover:text-secondary transition-colors min-h-[44px]"
            aria-label={`View ${project.title} source code on GitHub`}
            onClick={(e) => {
              e.stopPropagation();
              trackClick("project_github_link", project.title, {
                project_id: project.id,
              });
            }}
          >
            <Github size={18} />
            <span className="text-sm">Code</span>
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-text-gray hover:text-secondary transition-colors min-h-[44px]"
            aria-label={`View live demo of ${project.title}`}
            onClick={(e) => {
              e.stopPropagation();
              trackClick("project_demo_link", project.title, {
                project_id: project.id,
              });
            }}
          >
            <ExternalLink size={18} />
            <span className="text-sm">Demo</span>
          </a>
        </div>
      </div>
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
      className="py-20 bg-bg-light dark:bg-bg-dark transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <TextReveal
            text="Featured Projects"
            className="text-3xl md:text-5xl font-bold text-text-foreground dark:text-text-light mb-4 justify-center"
          />
          <motion.p className="text-text-gray text-lg max-w-2xl mx-auto">
            A selection of my recent work, showcasing my expertise in mobile and
            web development.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              setSelectedId={setSelectedId}
            />
          ))}
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
