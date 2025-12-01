"use client";

import React from "react";
import Image from "next/image";
import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";

const About = () => {
  const x = useMotionValue(0);
  const yTilt = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(yTilt);

  // Parallax strength adjustments
  const xBack = useTransform(mouseXSpring, [-0.5, 0.5], ["20px", "-20px"]);
  const yBack = useTransform(mouseYSpring, [-0.5, 0.5], ["20px", "-20px"]);
  const xMain = useTransform(mouseXSpring, [-0.5, 0.5], ["-10px", "10px"]);
  const yMain = useTransform(mouseYSpring, [-0.5, 0.5], ["-10px", "10px"]);
  const xFront = useTransform(mouseXSpring, [-0.5, 0.5], ["-30px", "30px"]);
  const yFront = useTransform(mouseYSpring, [-0.5, 0.5], ["-30px", "30px"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    yTilt.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    yTilt.set(0);
  };

  // Fresher-focused highlights
  // Fresher-focused highlights
  const highlights = [
    {
      label: "Experience",
      value: "2.5+",
      suffix: "Years",
      desc: "Continuous Learning",
    },
    {
      label: "Projects",
      value: "03",
      suffix: "Real-World",
      desc: "Delivered to Clients",
    },
    {
      label: "Clients",
      value: "02",
      suffix: "Happy",
      desc: "Collaborations",
    },
  ];

  const techStack = [
    "Flutter",
    "React Native",
    "Node.js",
    "Azure",
    "IoT",
    "Python",
  ];

  return (
    <section
      id="about"
      className="py-24 bg-background-dark overflow-hidden w-full relative"
    >
      {/* Grid Pattern Removed */}

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* LEFT COLUMN: Text Content */}
          <div className="space-y-8 relative z-10">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-7xl font-bold text-text-light mb-6 tracking-tight">
                About{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-purple-500">
                  Me
                </span>
              </h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100px" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="h-1 bg-secondary rounded-full"
              />
            </div>

            <div className="space-y-4 text-text-gray text-xl leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                I am a passionate{" "}
                <strong className="text-secondary">Full-Stack Developer</strong>{" "}
                eager to build meaningful solutions. While I am early in my
                journey, I bring a strong foundation in{" "}
                <strong className="text-secondary">Mobile Development</strong>{" "}
                and <strong className="text-secondary">IoT Systems</strong>.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Over the last{" "}
                <strong className="text-text-light">2.5+ years</strong>, I have
                successfully delivered{" "}
                <strong className="text-text-light">3 major projects</strong>{" "}
                for <strong className="text-text-light">2 clients</strong>,
                focusing on quality and performance. I am constantly learning
                and adapting to new technologies to solve real-world problems.
              </motion.p>
            </div>

            {/* Tech Stack Pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-2"
            >
              {techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm rounded-full border border-secondary/30 bg-secondary/5 text-secondary font-medium hover:bg-secondary/10 transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* Highlight Cards */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-4 rounded-xl bg-background-light border border-text-gray/10 hover:border-secondary/30 shadow-lg transition-all duration-300 group"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-secondary flex items-baseline gap-1">
                    {item.value}
                    <span className="text-sm font-medium text-text-gray">
                      {item.suffix}
                    </span>
                  </h3>
                  <p className="text-xs md:text-sm font-medium text-text-light mt-1 group-hover:text-secondary transition-colors">
                    {item.label}
                  </p>
                  <p className="text-[10px] md:text-xs text-text-gray mt-1 opacity-80">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Image Section */}
          <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center relative z-0">
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full h-full flex items-center justify-center cursor-pointer perspective-1000"
            >
              {/* Back Layer - Decorative Gradient Mesh */}
              <motion.div
                style={{ x: xBack, y: yBack }}
                className="absolute w-[85%] h-[85%] rounded-2xl bg-gradient-to-tr from-secondary/10 to-accent/10 border border-secondary/20 -z-10 rotate-6 opacity-60"
              />

              {/* Middle Layer - Main Image */}
              <motion.div
                style={{ x: xMain, y: yMain }}
                className="relative w-[75%] h-[85%] rounded-2xl overflow-hidden shadow-2xl border border-text-gray/10 group bg-background-light"
              >
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10" />{" "}
                {/* Tint overlay to match theme */}
                <Image
                  src="/images/1764432706702.jpg"
                  alt="Anand Patel Profile"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent z-20" />
              </motion.div>

              {/* Front Layer - Badge 1: Open to Work */}
              <motion.div
                style={{ x: xFront, y: yFront }}
                className="absolute bottom-12 -left-4 md:left-0 bg-background-light/95 backdrop-blur-xl p-3 pr-5 rounded-r-xl rounded-l-md border border-secondary/20 shadow-xl z-30 flex items-center gap-3"
              >
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-text-light">
                    I’d love to collaborate
                  </span>
                  {/* <span className="text-[10px] text-text-gray">
                    Available Immediately
                  </span> */}
                </div>
              </motion.div>

              {/* Front Layer - Badge 2: Role */}
              <motion.div
                style={{ x: xBack, y: yBack }}
                className="absolute top-12 -right-4 md:right-4 bg-secondary/10 backdrop-blur-md p-3 rounded-xl border border-secondary/20 shadow-lg z-30"
              >
                <span className="text-xs font-bold text-secondary tracking-wide">
                  Mobile Developer
                </span>
              </motion.div>

              {/* Decorative Glows */}
              <motion.div
                style={{ x: xFront, y: yFront }}
                className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/10 rounded-full blur-3xl z-0"
              />
              <motion.div
                style={{ x: xBack, y: yBack }}
                className="absolute -top-6 -left-6 w-32 h-32 bg-accent/10 rounded-full blur-3xl z-0"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
