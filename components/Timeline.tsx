"use client";

import React, { useRef } from "react";
import { useSectionView } from "@/hooks/useSectionView";
import { trackEvent } from "@/utils/analytics";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Briefcase, Building2 } from "lucide-react";

// --- Data ---
const experiences = [
  {
    year: "2023 - Present",
    title: "Senior Mobile Architect",
    company: "Tech Innovations Inc.",
    description:
      "Leading the mobile engineering team. Architected a modular Flutter super-app that reduced build times by 40% and increased user retention by 25%.",
    techStack: ["Flutter", "Dart", "Firebase", "Codemagic"],
    color: "#38bdf8", // Cyan
  },
  {
    year: "2021 - 2023",
    title: "Full Stack Developer",
    company: "Creative Solutions",
    description:
      "Developed scalable backend services using Node.js and integrated them with high-performance React Native frontends for fintech clients.",
    techStack: ["React Native", "Node.js", "GraphQL", "AWS"],
    color: "#818cf8", // Indigo
  },
  {
    year: "2019 - 2021",
    title: "IoT Systems Engineer",
    company: "Smart Connect",
    description:
      "Built real-time monitoring dashboards for industrial IoT sensors. Optimized data pipelines processing 1M+ events daily.",
    techStack: ["Python", "MQTT", "React", "InfluxDB"],
    color: "#4ade80", // Green
  },
];

// --- Individual Card ---
const ExperienceCard = ({
  exp,
  index,
}: {
  exp: (typeof experiences)[0];
  index: number;
}) => {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
  
  // Slide in from left or right based on index
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? 50 : -50, 0]
  );

  return (
    <div
      ref={ref}
      className={`relative flex items-center justify-between mb-20 md:mb-32 ${
        index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      {/* Empty Spacer for alignment */}
      <div className="hidden md:block w-[45%]" />

      {/* Timeline Dot (Center) */}
      <div className="absolute left-[22px] md:left-1/2 top-0 transform -translate-x-1/2 flex flex-col items-center z-20">
        <motion.div
            style={{ scale: opacity }}
            className="w-4 h-4 rounded-full bg-background-dark border-[3px] border-secondary shadow-[0_0_10px_rgba(100,255,218,0.8)] z-20"
        />
      </div>

      {/* Content Card */}
      <motion.div
        style={{ opacity, y, x }}
        className="w-full md:w-[45%] pl-16 md:pl-0"
      >
        <div 
            className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-secondary/30 transition-all duration-300 group hover:shadow-[0_0_30px_rgba(0,0,0,0.2)]"
            onClick={() => trackEvent("experience_click", { company: exp.company })}
        >
            {/* Glow Effect */}
            <div 
                className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md -z-10"
                style={{ background: `linear-gradient(to bottom right, ${exp.color}20, transparent)` }}
            />

            {/* Header */}
            <div className="flex flex-col gap-2 mb-6">
                <div className="flex items-center justify-between">
                    <span 
                        className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/5 text-secondary"
                    >
                        {exp.year}
                    </span>
                    <Briefcase size={18} className="text-text-gray" />
                </div>
                
                <h3 className="text-2xl font-bold text-text-light group-hover:text-secondary transition-colors">
                    {exp.title}
                </h3>
                
                <div className="flex items-center gap-2 text-text-gray font-medium">
                    <Building2 size={16} />
                    {exp.company}
                </div>
            </div>

            {/* Description */}
            <p className="text-text-gray/80 leading-relaxed mb-6">
                {exp.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
                {exp.techStack.map((tech, i) => (
                    <span 
                        key={i} 
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-background-dark border border-white/10 text-text-light/70 group-hover:border-secondary/20 group-hover:text-secondary transition-colors"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main Component ---
const Timeline = () => {
  const { ref } = useSectionView({ sectionName: "experience" });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"],
  });

  const scrollYProgressSpring = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const height = useTransform(scrollYProgressSpring, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      id="experience"
      className="py-32 bg-background-dark relative overflow-hidden w-full flex justify-center"
    >
       {/* Background Grid */}
       <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="w-[90%] max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-text-light mb-6">
            Professional <span className="text-secondary">Journey</span>
          </h2>
          <p className="text-lg text-text-gray max-w-2xl mx-auto">
            Building scalable systems and mobile experiences at the intersection of design and engineering.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          
          {/* Central Progress Line */}
          <div className="absolute left-[22px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2">
            <motion.div
              style={{ height }}
              className="relative w-full bg-gradient-to-b from-secondary via-purple-500 to-secondary origin-top"
            >
               {/* Glowing Tip that follows scroll */}
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-secondary rounded-full shadow-[0_0_20px_rgba(100,255,218,0.8)] blur-[2px]" />
            </motion.div>
          </div>

          {/* Experience Items */}
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
