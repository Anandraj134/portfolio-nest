"use client";

import { useSectionView } from "@/hooks/useSectionView";
import { trackClick, trackEvent } from "@/utils/analytics";
import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import confetti from "canvas-confetti";
import MagneticWrapper from "./MagneticWrapper";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
  Linkedin,
  ArrowRight,
} from "lucide-react";

// --- Types ---
interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  content: string;
  href?: string;
}

interface SocialRowProps {
  icon: React.ReactNode;
  href: string;
  label: string;
  subLabel: string;
}

const Contact = () => {
  const { ref } = useSectionView({ sectionName: "contact" });
  const [state, handleSubmit] = useForm("xnnezrdv");
  const [showConfetti, setShowConfetti] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "center center"],
  });

  const springConfig = { stiffness: 50, damping: 20, restDelta: 0.001 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  const opacity = useTransform(smoothProgress, [0, 1], [0, 1]);
  const y = useTransform(smoothProgress, [0, 1], [50, 0]);

  if (state.succeeded && !showConfetti) {
    setShowConfetti(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  return (
    <section ref={ref} id="contact" className="py-24 relative overflow-hidden">
      <div className="w-full px-4 md:px-12 max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-7xl font-bold text-text-light mb-6 tracking-tight">
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-purple-500">
              Touch
            </span>
          </h2>
          <motion.p
            style={{ opacity }}
            className="text-text-gray text-lg max-w-2xl mx-auto"
          >
            Have a project in mind or just want to say hi? I&apos;d love to hear
            from you.
          </motion.p>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start"
        >
          {/* Contact Info Side */}
          <motion.div
            style={{ opacity, y }}
            className="space-y-8 lg:col-span-1 lg:sticky lg:top-24"
          >
            <div>
              <h3 className="text-2xl font-bold text-text-foreground dark:text-text-light mb-6">
                Contact Information
              </h3>
              <p className="text-text-gray mb-8 text-sm leading-relaxed">
                Fill out the form and I will get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                <InfoItem
                  icon={<Mail size={20} />}
                  label="Email"
                  content="anandrajpatel134@gmail.com"
                  href="mailto:anandrajpatel134@gmail.com"
                />
                <InfoItem
                  icon={<Phone size={20} />}
                  label="Phone"
                  content="+91 70691 44776"
                  href="tel:+917069144776"
                />
                <InfoItem
                  icon={<MapPin size={20} />}
                  label="Location"
                  content="Gujarat, India"
                />
              </div>
            </div>

            {/* --- MODIFIED SOCIALS SECTION --- */}
            <div className="pt-8 border-t border-gray-200 dark:border-secondary/10">
              <h4 className="font-bold text-text-foreground dark:text-text-light mb-4 text-sm uppercase tracking-wider">
                Connect with me
              </h4>
              
              {/* Stacked Vertical Layout */}
              <div className="flex flex-col gap-3">
                {[
                  { 
                    icon: <Github size={20} />, 
                    href: "https://github.com/Anand-s-FlutterLab", 
                    label: "GitHub",
                    subLabel: "Explore my code"
                  },
                  {
                    icon: <Linkedin size={20} />,
                    href: "https://www.linkedin.com/in/anand-r-patel-/",
                    label: "LinkedIn",
                    subLabel: "Let's connect"
                  },
                ].map((social, index) => (
                  <SocialRow key={index} {...social} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form (Unchanged) */}
          <motion.div
            style={{ opacity, y }}
            className="bg-secondary/5 p-8 md:p-10 rounded-3xl shadow-xl border border-secondary/10 lg:col-span-2 h-full"
          >
            {state.succeeded ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 min-h-[400px]">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 text-green-500 mb-6">
                  <Send size={40} />
                </div>
                <h3 className="text-3xl font-bold text-text-foreground dark:text-text-light mb-4">
                  Message Sent!
                </h3>
                <p className="text-text-gray text-lg max-w-md">
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-text-foreground dark:text-text-light">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-4 rounded-xl bg-black/20 border border-secondary/10 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all placeholder:text-gray-500"
                      placeholder="John Doe"
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-text-foreground dark:text-text-light">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-4 rounded-xl bg-black/20 border border-secondary/10 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all placeholder:text-gray-500"
                      placeholder="john@example.com"
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-text-foreground dark:text-text-light">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={8}
                    onFocus={() => trackEvent("contact_field_focus", { field_name: "message" })}
                    className="w-full px-4 py-4 rounded-xl bg-black/20 border border-secondary/10 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all resize-none placeholder:text-gray-500"
                    placeholder="Tell me about your project..."
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>

                <div className="pt-4 flex justify-start">
                  <div className="inline-block relative">
                    <MagneticWrapper>
                      <button
                        type="submit"
                        onClick={() => trackClick("contact_form_submit_attempt", "submit_button")}
                        disabled={state.submitting}
                        className="px-10 py-4 rounded-xl bg-secondary text-black font-bold hover:bg-secondary/90 transition-all transform active:scale-95 flex items-center justify-center gap-2 text-base whitespace-nowrap shadow-lg shadow-secondary/10"
                      >
                        {state.submitting ? (
                          "Sending..."
                        ) : (
                          <>
                            Send Message <Send size={18} />
                          </>
                        )}
                      </button>
                    </MagneticWrapper>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Helper components (InfoItem remains same)
const InfoItem: React.FC<InfoItemProps> = ({ icon, label, content, href }) => (
  <div className="flex items-start gap-4 group">
    <div className="p-3 rounded-xl bg-secondary/5 text-secondary group-hover:bg-secondary/20 transition-colors">
      {icon}
    </div>
    <div>
      <h4 className="text-sm font-bold text-text-foreground dark:text-text-light mb-1">
        {label}
      </h4>
      {href ? (
        <a
          href={href}
          className="text-text-gray hover:text-secondary transition-colors block"
        >
          {content}
        </a>
      ) : (
        <p className="text-text-gray">{content}</p>
      )}
    </div>
  </div>
);

// --- NEW LIST STYLE ROW COMPONENT ---
const SocialRow: React.FC<SocialRowProps> = ({ icon, href, label, subLabel }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() =>
      trackClick("contact_social_click", label, {
        platform: label.toLowerCase(),
      })
    }
    className="group flex items-center justify-between w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:border-secondary/30 hover:bg-secondary/5 transition-all duration-300"
  >
    <div className="flex items-center gap-4">
      {/* Icon Box */}
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 text-text-gray group-hover:bg-secondary group-hover:text-black transition-all duration-300">
        {icon}
      </div>
      
      {/* Text Labels */}
      <div className="text-left">
        <h5 className="font-bold text-text-light text-sm group-hover:text-secondary transition-colors">
          {label}
        </h5>
        <p className="text-xs text-text-gray group-hover:text-text-light/70 transition-colors">
          {subLabel}
        </p>
      </div>
    </div>

    {/* Arrow that slides on hover */}
    <div className="text-text-gray group-hover:text-secondary transform group-hover:translate-x-1 transition-all duration-300">
      <ArrowRight size={18} />
    </div>
  </a>
);

export default Contact;
