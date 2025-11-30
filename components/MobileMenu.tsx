"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { name: string; href: string }[];
  activeSection: string;
}

const MobileMenu = ({
  isOpen,
  onClose,
  navLinks,
  activeSection,
}: MobileMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Focus trap
  useEffect(() => {
    if (isOpen) {
      const focusableElements = menuRef.current?.querySelectorAll(
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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const menuVariants: Variants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            aria-hidden="true"
          />

          {/* Menu */}
          <motion.div
            ref={menuRef}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 bottom-0 w-[300px] bg-bg-light dark:bg-bg-dark border-l border-gray-200 dark:border-secondary/10 z-[70] p-6 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            id="mobile-menu"
          >
            <div className="flex justify-end mb-8">
              <button
                onClick={onClose}
                className="p-2 text-text-foreground dark:text-text-light hover:text-secondary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav>
              <ul className="space-y-6">
                {navLinks.map((link) => (
                  <motion.li key={link.name} variants={itemVariants}>
                    <a
                      href={link.href}
                      onClick={onClose}
                      className={`block text-2xl font-bold transition-colors min-h-[44px] flex items-center ${
                        activeSection === link.href.substring(1)
                          ? "text-secondary"
                          : "text-text-foreground dark:text-text-light hover:text-secondary"
                      }`}
                      aria-current={
                        activeSection === link.href.substring(1)
                          ? "page"
                          : undefined
                      }
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
