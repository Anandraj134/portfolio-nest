"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu } from "lucide-react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

// Dynamic import to avoid hydration mismatch with mobile menu
const MobileMenu = dynamic(() => import("./MobileMenu"), { ssr: false });

import { trackClick } from "@/utils/analytics";

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = [
        "home",
        "about",
        "skills",
        "projects",
        "experience",
        "contact",
      ];

      // Get current scroll position with navbar offset
      const scrollPosition = window.scrollY + 100; // Navbar height offset

      // Find the current section
      let currentSection = "home"; // Default to home

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);

        if (element) {
          const { offsetTop } = element;
          // If we've scrolled past this section's top, it's the active one
          if (scrollPosition >= offsetTop) {
            currentSection = section;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    handleScrollSpy(); // Initial check
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  // Hide navbar on project detail pages
  if (pathname?.startsWith("/projects/")) {
    return null;
  }

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Certifications", href: "#certifications" },
    { name: "Experience", href: "#experience" }, // Correct href matching ID in Timeline.tsx
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background-dark/80 backdrop-blur-md shadow-lg border-b border-secondary/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex flex-col items-center text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-purple-600 min-w-[44px] min-h-[44px]"
            aria-label="Anand Patel Portfolio Home"
            whileHover={{ scale: 1.1, color: "var(--secondary)" }}
            whileTap={{ scale: 0.9 }}
          >
            Anand Patel
            <span className="text-xs font-medium text-text-gray tracking-wide">
              Mobile App Developer
            </span>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);

                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`relative block text-sm font-medium transition-colors hover:text-secondary py-2 ${
                        isActive ? "text-secondary" : "text-text-gray"
                      }`}
                      onClick={() => {
                        setActiveSection(link.href.substring(1));
                        trackClick("nav_click", link.name, {
                          target_section: link.href.substring(1),
                          current_section: activeSection,
                        });
                      }}
                    >
                      {link.name}
                      {isActive && (
                        <motion.span
                          layoutId="activeSectionDesktop"
                          className="absolute left-0 -bottom-1 w-full h-0.5 bg-secondary rounded-full"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => {
                setIsMobileMenuOpen(true);
                trackClick("mobile_menu_open", "navbar_hamburger");
              }}
              className="p-2 text-text-light min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
        activeSection={activeSection}
      />
    </>
  );
};

export default Navbar;
