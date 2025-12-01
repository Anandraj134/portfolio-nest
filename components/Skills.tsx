// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { useSectionView } from "@/hooks/useSectionView";
// import { trackClick, trackEvent } from "@/utils/analytics";
// import { motion, useScroll, useTransform, useSpring } from "framer-motion";
// import {
//   Smartphone,
//   Code2,
//   Terminal,
//   Zap,
//   Cloud,
//   Layers,
//   PenTool,
//   Globe,
//   Settings,
//   Database,
//   Box,
//   Wifi,
//   Server,
//   Layout,
// } from "lucide-react";

// // Skill Data
// const skills = [
//   {
//     category: "Advanced",
//     items: [
//       {
//         name: "Flutter",
//         icon: <Smartphone size={32} />,
//         level: "Advanced",
//         desc: "Building high-performance cross-platform apps.",
//       },
//       {
//         name: "React Native",
//         icon: <Code2 size={32} />,
//         level: "Advanced",
//         desc: "Native-like experiences with JavaScript.",
//       },
//       {
//         name: "Kotlin",
//         icon: <Terminal size={32} />,
//         level: "Advanced",
//         desc: "Modern Android development.",
//       },
//       {
//         name: "Swift",
//         icon: <Zap size={32} />,
//         level: "Advanced",
//         desc: "Native iOS development.",
//       },
//       {
//         name: "Firebase",
//         icon: <Cloud size={32} />,
//         level: "Advanced",
//         desc: "Real-time databases and serverless backend.",
//       },
//       {
//         name: "Clean Arch",
//         icon: <Layers size={32} />,
//         level: "Advanced",
//         desc: "Scalable and maintainable code structure.",
//       },
//     ],
//   },
//   {
//     category: "Intermediate",
//     items: [
//       {
//         name: "UI/UX",
//         icon: <PenTool size={28} />,
//         level: "Intermediate",
//         desc: "Creating intuitive and beautiful interfaces.",
//       },
//       {
//         name: "GraphQL",
//         icon: <Globe size={28} />,
//         level: "Intermediate",
//         desc: "Efficient data querying.",
//       },
//       {
//         name: "State Mgmt",
//         icon: <Settings size={28} />,
//         level: "Intermediate",
//         desc: "Redux, Bloc, Provider, Riverpod.",
//       },
//       {
//         name: "Local DB",
//         icon: <Database size={28} />,
//         level: "Intermediate",
//         desc: "Room, Hive, SQLite for offline apps.",
//       },
//       {
//         name: "Testing",
//         icon: <Box size={28} />,
//         level: "Intermediate",
//         desc: "Unit, Widget, and Integration testing.",
//       },
//       {
//         name: "Push Notifs",
//         icon: <Wifi size={28} />,
//         level: "Intermediate",
//         desc: "Engaging users with timely updates.",
//       },
//     ],
//   },
//   {
//     category: "Beginner",
//     items: [
//       {
//         name: "Docker",
//         icon: <Box size={24} />,
//         level: "Beginner",
//         desc: "Containerization basics.",
//       },
//       {
//         name: "Backend",
//         icon: <Server size={24} />,
//         level: "Beginner",
//         desc: "Node.js and API fundamentals.",
//       },
//       {
//         name: "Design Systems",
//         icon: <Layout size={24} />,
//         level: "Beginner",
//         desc: "Consistent UI components.",
//       },
//       {
//         name: "Motion",
//         icon: <Zap size={24} />,
//         level: "Beginner",
//         desc: "Fluid app animations.",
//       },
//     ],
//   },
// ];

// const Skills = () => {
//   const { ref: sectionRef } = useSectionView({ sectionName: "skills" });
//   const [headerText, setHeaderText] = useState("Technologies I Build With");

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setHeaderText("Tools That Power My Mobile Apps");
//     }, 4000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <section
//       ref={sectionRef} // Added ref to section
//       id="skills"
//       className="py-24 bg-bg-light dark:bg-bg-dark transition-colors duration-300 overflow-hidden relative w-[90%]"
//     >
//       {/* Background Elements */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
//         <div className="absolute top-1/4 -left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
//         <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
//       </div>

//       <div className="w-full px-4 md:px-12 relative z-10">
//         {/* Header */}
//         <div className="mb-20 text-center">
//           <motion.h2
//             key={headerText}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.8 }}
//             className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-purple-500 mb-4"
//           >
//             {headerText}
//           </motion.h2>
//           <motion.div
//             initial={{ width: 0 }}
//             whileInView={{ width: "100px" }}
//             className="h-1 bg-secondary mx-auto rounded-full"
//           />
//         </div>

//         {/* Skills Grid */}
//         <div className="space-y-16">
//           {skills.map((category, catIndex) => (
//             <div key={category.category}>
//               <motion.h3
//                 initial={{ opacity: 0, x: -20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: catIndex * 0.2 }}
//                 className={`text-2xl font-bold mb-8 pl-4 border-l-4 ${
//                   category.category === "Advanced"
//                     ? "border-green-500 text-green-400"
//                     : category.category === "Intermediate"
//                     ? "border-blue-500 text-blue-400"
//                     : "border-yellow-500 text-yellow-400"
//                 }`}
//               >
//                 {category.category} Skills
//               </motion.h3>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                 {category.items.map((skill, index) => (
//                   <motion.div // Added motion.div wrapper for skill card
//                     key={skill.name}
//                     layout
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.8 }}
//                     transition={{ duration: 0.3 }}
//                     onHoverStart={() => {
//                       trackEvent("skill_hover", {
//                         skill_name: skill.name,
//                         level: skill.level,
//                         section: "skills",
//                       });
//                     }}
//                     className="group relative"
//                   >
//                     <SkillCard key={skill.name} skill={skill} index={index} />
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// interface Skill {
//   name: string;
//   icon: React.ReactNode;
//   level: string;
//   desc: string;
// }

// const SkillCard = ({ skill }: { skill: Skill; index: number }) => {
//   const [isFlipped, setIsFlipped] = useState(false);
//   const ref = useRef(null);

//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start 90%", "end 60%"],
//   });

//   const scrollYProgressSpring = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001,
//   });

//   const opacity = useTransform(scrollYProgressSpring, [0, 1], [0, 1]);
//   const y = useTransform(scrollYProgressSpring, [0, 1], [100, 0]);
//   const scale = useTransform(scrollYProgressSpring, [0, 1], [0.8, 1]);
//   const rotate = useTransform(scrollYProgressSpring, [0, 1], [-5, 0]);

//   return (
//     <motion.div
//       ref={ref}
//       style={{ opacity, y, scale, rotate }}
//       className="h-[200px] w-full [perspective:1000px] cursor-pointer group"
//       onClick={() => {
//         setIsFlipped(!isFlipped);
//         trackClick("skill_card_click", skill.name, {
//           level: skill.level,
//           section: "skills",
//         });
//       }}
//       onMouseEnter={() => setIsFlipped(true)}
//       onMouseLeave={() => setIsFlipped(false)}
//     >
//       <motion.div
//         className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d]"
//         animate={{ rotateY: isFlipped ? 180 : 0 }}
//       >
//         {/* Front */}
//         <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl bg-secondary/5 backdrop-blur-md border border-secondary/10 p-6 flex flex-col items-center justify-center gap-4 shadow-lg group-hover:shadow-secondary/20 transition-shadow">
//           <div
//             className={`p-4 rounded-2xl ${
//               skill.level === "Advanced"
//                 ? "bg-green-500/10 text-green-400"
//                 : skill.level === "Intermediate"
//                 ? "bg-blue-500/10 text-blue-400"
//                 : "bg-yellow-500/10 text-yellow-400"
//             }`}
//           >
//             {skill.icon}
//           </div>
//           <h4 className="text-xl font-bold text-text-light">{skill.name}</h4>
//           <span className="text-xs text-gray-400 uppercase tracking-wider">
//             {skill.level}
//           </span>
//         </div>

//         {/* Back */}
//         <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl bg-secondary/10 backdrop-blur-md border border-secondary/20 p-6 flex flex-col items-center justify-center text-center shadow-lg">
//           <h4 className="text-lg font-bold text-secondary mb-2">
//             {skill.name}
//           </h4>
//           <p className="text-sm text-gray-200">{skill.desc}</p>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default Skills;

"use client";

import React, { useState } from "react";
import { useSectionView } from "@/hooks/useSectionView";
import { trackClick, trackEvent } from "@/utils/analytics";
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
  Cpu,
} from "lucide-react";

// --- Types & Data ---

type SkillCategory = "All" | "Mobile" | "Backend" | "Design" | "Tools" | "Core";

interface Skill {
  name: string;
  icon: React.ReactNode;
  category: SkillCategory;
  desc: string;
}

// Color System for Categories
const categoryStyles: Record<
  string,
  { text: string; border: string; bg: string; glow: string; icon: string }
> = {
  Mobile: {
    text: "text-blue-400",
    border: "border-blue-500/20 group-hover:border-blue-500/50",
    bg: "bg-blue-500/10",
    glow: "shadow-[0_0_15px_rgba(96,165,250,0.3)]",
    icon: "text-blue-400",
  },
  Backend: {
    text: "text-emerald-400",
    border: "border-emerald-500/20 group-hover:border-emerald-500/50",
    bg: "bg-emerald-500/10",
    glow: "shadow-[0_0_15px_rgba(52,211,153,0.3)]",
    icon: "text-emerald-400",
  },
  Design: {
    text: "text-pink-400",
    border: "border-pink-500/20 group-hover:border-pink-500/50",
    bg: "bg-pink-500/10",
    glow: "shadow-[0_0_15px_rgba(244,114,182,0.3)]",
    icon: "text-pink-400",
  },
  Core: {
    text: "text-amber-400",
    border: "border-amber-500/20 group-hover:border-amber-500/50",
    bg: "bg-amber-500/10",
    glow: "shadow-[0_0_15px_rgba(251,191,36,0.3)]",
    icon: "text-amber-400",
  },
  Tools: {
    text: "text-violet-400",
    border: "border-violet-500/20 group-hover:border-violet-500/50",
    bg: "bg-violet-500/10",
    glow: "shadow-[0_0_15px_rgba(167,139,250,0.3)]",
    icon: "text-violet-400",
  },
  All: {
    text: "text-secondary",
    border: "border-secondary/20",
    bg: "bg-secondary/10",
    glow: "shadow-[0_0_15px_rgba(100,255,218,0.3)]",
    icon: "text-secondary",
  },
};

const skillsData: Skill[] = [
  // Mobile (Blue Theme)
  { name: "Flutter", icon: <Smartphone size={32} />, category: "Mobile", desc: "High-performance cross-platform apps." },
  { name: "React Native", icon: <Code2 size={32} />, category: "Mobile", desc: "Native-like experiences with JavaScript." },
  { name: "Kotlin", icon: <Terminal size={32} />, category: "Mobile", desc: "Modern Android development." },
  { name: "Swift", icon: <Zap size={32} />, category: "Mobile", desc: "Native iOS development." },

  // Backend (Emerald Theme)
  { name: "Firebase", icon: <Cloud size={32} />, category: "Backend", desc: "Real-time DB & serverless backend." },
  { name: "GraphQL", icon: <Globe size={28} />, category: "Backend", desc: "Efficient data querying APIs." },
  { name: "Node.js", icon: <Server size={24} />, category: "Backend", desc: "Scalable server-side applications." },
  { name: "Local DB", icon: <Database size={28} />, category: "Backend", desc: "Room, Hive, & SQLite solutions." },

  // Core (Amber Theme)
  { name: "Clean Arch", icon: <Layers size={32} />, category: "Core", desc: "Scalable & testable code structure." },
  { name: "State Mgmt", icon: <Settings size={28} />, category: "Core", desc: "Redux, Bloc, Riverpod patterns." },

  // Design (Pink Theme)
  { name: "UI/UX", icon: <PenTool size={28} />, category: "Design", desc: "Intuitive & accessible interfaces." },
  { name: "Design Systems", icon: <Layout size={24} />, category: "Design", desc: "Consistent component libraries." },
  { name: "Motion", icon: <Zap size={24} />, category: "Design", desc: "Fluid & engaging interactions." },

  // Tools (Violet Theme)
  { name: "Docker", icon: <Box size={24} />, category: "Tools", desc: "Containerization & deployment." },
  { name: "Testing", icon: <Cpu size={28} />, category: "Tools", desc: "Unit, Widget & Integration tests." },
  { name: "Push Notifs", icon: <Wifi size={28} />, category: "Tools", desc: "User engagement & updates." },
];

const filterCategories: SkillCategory[] = ["All", "Mobile", "Backend", "Core", "Design", "Tools"];

// --- Main Component ---

const Skills = () => {
  const { ref: sectionRef } = useSectionView({ sectionName: "skills" });
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("All");

  // Filter logic
  const filteredSkills = skillsData.filter(
    (skill) => activeCategory === "All" || skill.category === activeCategory
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-24 bg-bg-light dark:bg-bg-dark relative overflow-hidden w-full flex justify-center"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="w-[90%] max-w-7xl px-4 md:px-6 relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-purple-500 mb-4"
          >
            Technical Arsenal
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-text-gray max-w-lg mx-auto"
          >
            A curated list of technologies I use to build scalable, high-performance mobile solutions.
          </motion.p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {filterCategories.map((category) => (
            <FilterChip
              key={category}
              label={category}
              isActive={activeCategory === category}
              onClick={() => {
                setActiveCategory(category);
                trackEvent("filter_skills", { category });
              }}
            />
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full"
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

// --- Sub Components ---

const FilterChip = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  // Get styles for this specific category label
  const styles = categoryStyles[label] || categoryStyles.All;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
        isActive
          ? `${styles.bg} ${styles.border} ${styles.text} ${styles.glow}`
          : "bg-transparent border-gray-700 text-text-gray hover:border-gray-500 hover:text-text-light"
      }`}
    >
      {label}
    </motion.button>
  );
};

const SkillCard = ({ skill }: { skill: Skill }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const styles = categoryStyles[skill.category] || categoryStyles.All;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="h-[180px] w-full [perspective:1000px] cursor-pointer group"
      onClick={() => {
        setIsFlipped(!isFlipped);
        trackClick("skill_card_click", skill.name);
      }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front Side */}
        <div
          className={`absolute inset-0 [backface-visibility:hidden] rounded-xl bg-bg-light/50 dark:bg-white/5 backdrop-blur-sm border flex flex-col items-center justify-center gap-4 shadow-md transition-all ${styles.border} group-hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]`}
        >
          <div
            className={`p-3 rounded-full ${styles.bg} ${styles.icon} group-hover:scale-110 transition-transform duration-300`}
          >
            {skill.icon}
          </div>
          <h4 className="text-lg font-semibold text-text-light tracking-wide">
            {skill.name}
          </h4>
          {/* Small Colored Indicator Line */}
          <div className={`h-1 w-8 rounded-full ${styles.bg.replace("/10", "")}`} />
        </div>

        {/* Back Side */}
        <div
          className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl ${styles.bg} backdrop-blur-md border ${styles.border} p-5 flex flex-col items-center justify-center text-center shadow-xl`}
        >
          <h4 className={`text-base font-bold mb-2 ${styles.text}`}>
            {skill.name}
          </h4>
          <p className="text-xs leading-relaxed text-text-light/90 font-medium">
            {skill.desc}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Skills;
