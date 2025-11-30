"use client";

import React, { useRef } from "react";
import { useSectionView } from "@/hooks/useSectionView";
import { trackEvent } from "@/utils/analytics";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import TextReveal from "./TextReveal";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    year: "2023 - Present",
    title: "Senior Mobile Developer",
    company: "Tech Innovations Inc.",
    description:
      "Leading the mobile development team in building cross-platform applications using Flutter and React Native. Architected scalable solutions and improved app performance by 40%.",
    techStack: ["Flutter", "React Native", "GraphQL", "CI/CD"],
  },
  {
    year: "2021 - 2023",
    title: "Mobile App Developer",
    company: "Creative Solutions Studio",
    description:
      "Developed and maintained multiple client applications. Collaborated with designers to implement pixel-perfect UIs and integrated complex RESTful APIs.",
    techStack: ["React Native", "TypeScript", "Redux", "Firebase"],
  },
  {
    year: "2019 - 2021",
    title: "Junior Software Engineer",
    company: "StartUp Hub",
    description:
      "Contributed to the development of a fintech mobile app. Assisted in backend integration and wrote unit tests to ensure code reliability.",
    techStack: ["JavaScript", "Node.js", "Express", "MongoDB"],
  },
  {
    year: "2018 - 2019",
    title: "Web Development Intern",
    company: "Digital Agency",
    description:
      "Assisted in building responsive websites and landing pages. Gained hands-on experience with modern frontend frameworks and version control.",
    techStack: ["HTML", "CSS", "JavaScript", "React"],
  },
];

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
    offset: ["start 80%", "center center"],
  });

  const scrollYProgressSpring = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const opacity = useTransform(scrollYProgressSpring, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgressSpring, [0, 1], [50, 0]);
  const scale = useTransform(scrollYProgressSpring, [0, 1], [0, 1]);
  const x = useTransform(
    scrollYProgressSpring,
    [0, 1],
    [index % 2 === 0 ? 50 : -50, 0]
  );

  return (
    <div
      ref={ref}
      className={`relative flex items-center justify-between mb-12 md:mb-24 ${
        index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      {/* Spacer for alternating layout */}
      <div className="hidden md:block w-5/12" />

      {/* Dot */}
      <motion.div
        style={{ scale, x: "-50%", y: "-50%" }}
        className="absolute left-4 md:left-1/2 top-1/2 w-4 h-4 rounded-full bg-secondary border-4 border-bg-light dark:border-bg-dark shadow-[0_0_10px_rgba(var(--secondary),0.5)] z-10"
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-secondary opacity-50"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Content Card */}
      <motion.div
        style={{ opacity, y, x }}
        whileHover={{ scale: 1.02 }}
        onHoverStart={() => {
          trackEvent("experience_card_hover", {
            company_name: exp.company,
            role: exp.title,
            index: index,
          });
        }}
        className="w-full md:w-5/12 pl-12 md:pl-0"
      >
        <div className="relative p-6 rounded-3xl bg-white/5 dark:bg-black/20 backdrop-blur-xl border border-white/10 dark:border-white/5 shadow-2xl overflow-hidden group hover:border-secondary/20 transition-all duration-300">
          {/* iOS-style Blur Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Header with App Icon style */}
          <div className="flex items-start justify-between mb-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary to-purple-600 flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                <Briefcase className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-foreground dark:text-text-light leading-tight">
                  {exp.title}
                </h3>
                <p className="text-sm text-secondary font-medium">
                  {exp.company}
                </p>
              </div>
            </div>
            <div className="px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 backdrop-blur-md">
              <span className="text-xs font-semibold text-secondary whitespace-nowrap">
                {exp.year}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 pl-1">
            <p className="text-text-gray mb-6 text-sm leading-relaxed">
              {exp.description}
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2">
              {exp.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 text-xs font-medium rounded-xl bg-white/10 dark:bg-white/5 text-text-gray border border-white/10 hover:bg-secondary/10 hover:text-secondary hover:border-secondary/20 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Timeline = () => {
  const { ref } = useSectionView({ sectionName: "experience" });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "end 50%"],
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
      className="py-20 bg-bg-light dark:bg-bg-dark transition-colors duration-300 overflow-hidden  w-[90%]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <TextReveal
            text="Experience"
            className="text-3xl md:text-5xl font-bold text-text-foreground dark:text-text-light mb-4 justify-center"
          />
          <motion.p className="text-text-gray text-lg max-w-2xl mx-auto">
            My journey through the tech industry, building impactful solutions
            along the way.
          </motion.p>
        </motion.div>

        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-transparent dark:bg-transparent -translate-x-1/2">
            <motion.div
              style={{ height }}
              className="relative w-full bg-gradient-to-b from-secondary via-purple-500 to-secondary"
            >
              {/* Glowing Tip */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-secondary rounded-full shadow-[0_0_15px_rgba(var(--secondary),1)] blur-[1px]" />
            </motion.div>
          </div>

          {experiences.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
