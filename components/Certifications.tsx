"use client";

import React, { useState, useEffect } from "react";
import { useSectionView } from "@/hooks/useSectionView";
import { certifications } from "@/data/certifications";
import { BadgeCheck, ExternalLink, X, Loader2, Maximize2, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";

// Styles
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// --- KEY FIX: Use Local Worker ---
// Point to the file you just copied to the public folder.
// We use a root-relative path (starts with /).
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

interface Certification {
  id: string | number;
  title: string;
  image: string;
  date: string;
  issuer: string;
  verifyLink: string;
}

const Certifications = () => {
  const { ref } = useSectionView({ sectionName: "certifications" });
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (certifications.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      ref={ref}
      id="certifications"
      className="py-24 bg-background relative overflow-hidden w-full flex justify-center"
    >
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-[90%] max-w-[1200px] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/5 text-secondary mb-6 backdrop-blur-sm">
            <BadgeCheck size={14} />
            <span className="text-xs font-semibold uppercase tracking-widest">
              Verified Skills
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-text-light mb-6 tracking-tight">
            Certifications
          </h2>
          <p className="text-text-gray max-w-2xl text-lg leading-relaxed">
            Verified certifications showcasing proven technical skills and industry-recognized competence.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certifications.map((cert) => (
            <motion.div key={cert.id} variants={cardVariants} className="group relative h-full">
              <div className="h-full relative flex flex-col rounded-2xl bg-background-dark/50 border border-white/5 overflow-hidden transition-all duration-300 hover:border-secondary/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-secondary/5">
                
                <div 
                  className="relative w-full aspect-[4/3] bg-white/5 overflow-hidden flex items-center justify-center cursor-pointer group/pdf"
                  onClick={() => setSelectedCert(cert as Certification)}
                >
                  <div className="absolute inset-0 z-20 bg-black/20 group-hover/pdf:bg-black/0 transition-colors duration-300" />
                  
                  <div className="absolute z-30 opacity-0 group-hover/pdf:opacity-100 transition-opacity duration-300 bg-black/60 p-3 rounded-full backdrop-blur-sm border border-white/10">
                    <Maximize2 className="text-secondary w-6 h-6" />
                  </div>

                  <div className="w-full h-full relative pointer-events-none">
                    {isMounted && cert.image ? (
                       <PdfThumbnail url={cert.image} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Award size={40} className="text-secondary/50" strokeWidth={1} />
                      </div>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 z-20">
                    <span className="text-xs font-bold text-text-light/90 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-sm">
                      {cert.date}
                    </span>
                  </div>
                </div>

                <div className="relative z-10 flex flex-col flex-grow p-6">
                  <div className="mb-6 flex-grow">
                    <h3 
                      className="text-xl font-bold text-text-light mb-2 leading-tight cursor-pointer hover:text-secondary transition-colors"
                      onClick={() => setSelectedCert(cert as Certification)}
                    >
                      {cert.title}
                    </h3>
                    <p className="text-sm font-medium text-text-gray/80 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary/50" />
                      {cert.issuer}
                    </p>
                  </div>

                  <a
                    href={cert.verifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto block w-full"
                  >
                    <div className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/5 text-sm font-medium text-text-gray hover:bg-secondary hover:text-black transition-all duration-300 border border-white/5 hover:border-secondary/50 hover:font-bold">
                      <span>Verify Credential</span>
                      <ExternalLink size={14} />
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedCert && (
          <PdfModal 
            cert={selectedCert} 
            onClose={() => setSelectedCert(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

// --- HELPER COMPONENTS ---

interface PdfThumbnailProps {
  url: string;
}

const PdfThumbnail: React.FC<PdfThumbnailProps> = ({ url }) => {
  return (
    <div className="w-full h-full bg-gray-900 flex items-center justify-center overflow-hidden">
      <Document
        file={url}
        loading={
          <div className="flex items-center gap-2 text-secondary/50">
             <Loader2 className="animate-spin w-5 h-5" />
          </div>
        }
        onLoadError={(error) => console.error("Thumbnail Load Error:", error)}
        error={
          <div className="flex flex-col items-center justify-center p-2 text-center">
            <span className="text-xs text-red-400 font-mono">PDF Failed</span>
          </div>
        }
        className="flex justify-center w-full h-full"
      >
        <Page 
          pageNumber={1} 
          width={400} 
          renderTextLayer={false} 
          renderAnnotationLayer={false}
          className="opacity-90"
        />
      </Document>
    </div>
  );
};

interface PdfModalProps {
  cert: Certification;
  onClose: () => void;
}

const PdfModal: React.FC<PdfModalProps> = ({ cert, onClose }) => {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-lg"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        onContextMenu={handleContextMenu}
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#1a1a1a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#1a1a1a] z-10">
          <h3 className="text-lg font-semibold text-text-light truncate pr-4">
            {cert.title}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-text-gray hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center bg-[#0f0f0f]">
          <Document
            file={cert.image}
            loading={
              <div className="flex flex-col items-center gap-3 text-secondary mt-10">
                <Loader2 className="animate-spin w-8 h-8" />
                <span className="text-sm">Loading Certificate...</span>
              </div>
            }
            onLoadError={(error) => console.error("Modal PDF Load Error:", error)}
            error={<div className="text-red-400 mt-10">Failed to load PDF document.</div>}
            className="shadow-2xl"
          >
            <Page 
              pageNumber={1} 
              className="max-w-full h-auto" 
              width={800} 
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Certifications;
