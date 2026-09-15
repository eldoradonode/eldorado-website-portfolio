import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ChevronLeft, ChevronRight, Maximize2, CheckCircle2, 
  CalendarCheck, AlertTriangle, Workflow, Layers, ArrowRight
} from 'lucide-react';
import { Project } from '../types';
import { Lightbox } from './Lightbox';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const [activeImg, setActiveImg] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  React.useEffect(() => {
    setActiveImg(0);
  }, [project]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !lightboxOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, lightboxOpen]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/95 backdrop-blur-md" 
          onClick={onClose} 
        />
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          data-lenis-prevent
          className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto bg-bg/98 backdrop-blur-2xl p-0 shadow-2xl border border-gold/20 rounded-3xl text-text custom-scrollbar"
        >
          <button 
            onClick={onClose}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 text-text hover:text-gold transition-colors w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-bg/70 backdrop-blur-md border border-gold/20 z-[110] cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col">
            {/* Gallery Preview Header */}
            <div className="relative w-full bg-bg-alt/60 border-b border-gold/10 group">
              <div 
                className="w-full min-h-[40vh] md:min-h-[55vh] flex items-center justify-center p-4 md:p-8 cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
              >
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeImg}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    src={project.images[activeImg]} 
                    alt={`${project.title} screenshot ${activeImg + 1}`}
                    className="max-w-full max-h-[60vh] object-contain rounded-xl shadow-2xl" 
                  />
                </AnimatePresence>
              </div>

              {/* Navigation Arrows */}
              {project.images.length > 1 && (
                <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 sm:px-4 md:px-8 pointer-events-none">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setActiveImg((activeImg - 1 + project.images.length) % project.images.length); }}
                    className="w-11 h-11 md:w-12 md:h-12 min-w-[44px] min-h-[44px] glass flex items-center justify-center text-gold hover:bg-gold/20 transition-all rounded-full pointer-events-auto cursor-pointer"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setActiveImg((activeImg + 1) % project.images.length); }}
                    className="w-11 h-11 md:w-12 md:h-12 min-w-[44px] min-h-[44px] glass flex items-center justify-center text-gold hover:bg-gold/20 transition-all rounded-full pointer-events-auto cursor-pointer"
                    aria-label="Next slide"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              )}

              {/* Bottom controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 bg-bg/85 backdrop-blur-xl px-4 py-1.5 rounded-full border border-gold/20">
                <div className="flex items-center gap-1">
                  {project.images.map((_, i) => (
                    <button 
                      key={i} 
                      onClick={(e) => { e.stopPropagation(); setActiveImg(i); }}
                      className="min-w-[28px] min-h-[36px] flex items-center justify-center cursor-pointer"
                      aria-label={`Select image ${i + 1}`}
                    >
                      <span className={`h-2 rounded-full transition-all ${activeImg === i ? 'bg-gold w-6' : 'bg-gold/30 w-2 hover:bg-gold/60'}`} />
                    </button>
                  ))}
                </div>
                <div className="w-px h-4 bg-gold/20 mx-1" />
                <button 
                  onClick={(e) => { e.stopPropagation(); setLightboxOpen(true); }}
                  className="min-h-[36px] text-text text-xs font-tech uppercase tracking-widest flex items-center gap-1.5 hover:text-gold transition-colors cursor-pointer px-1"
                >
                  <Maximize2 size={14} /> Full Screen
                </button>
              </div>
            </div>

            {/* Case Study Structured Content */}
            <div className="p-5 sm:p-8 md:p-14 grid lg:grid-cols-3 gap-8 md:gap-12">
              <div className="lg:col-span-2 space-y-10">
                {/* Header */}
                <div>
                  <div className="text-xs font-tech font-bold text-gold uppercase tracking-[0.3em] mb-4">
                    Case Study • {project.industry}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-display font-bold text-text mb-6 leading-tight">
                    {project.title}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, i) => (
                      <span key={`${tool}-${i}`} className="text-xs px-3.5 py-1.5 bg-gold/10 border border-gold/20 rounded-full text-gold font-tech font-bold uppercase tracking-wider">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 1. The Business Problem */}
                <div className="glass p-8 border-red-500/20 bg-red-950/5 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-red-400 font-tech font-bold text-xs uppercase tracking-widest">
                    <AlertTriangle size={16} />
                    1. The Business Problem
                  </div>
                  <p className="text-muted text-base md:text-lg leading-relaxed font-light">
                    {project.businessProblem}
                  </p>
                </div>

                {/* 2. System Built & How It Works */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="text-xs font-tech font-bold text-gold uppercase tracking-widest flex items-center gap-2">
                      <Workflow size={16} />
                      2. System Built
                    </div>
                    <p className="text-text text-lg leading-relaxed font-medium">
                      {project.systemBuilt}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs font-tech font-bold text-gold uppercase tracking-widest flex items-center gap-2">
                      <Layers size={16} />
                      3. How the Workflow Operates
                    </div>
                    <p className="text-muted text-base leading-relaxed font-light">
                      {project.howItWorks}
                    </p>
                  </div>
                </div>

                {/* 4. Business Value */}
                <div className="space-y-4">
                  <div className="text-xs font-tech font-bold text-gold uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    4. Practical Business Outcomes
                  </div>
                  <ul className="grid sm:grid-cols-2 gap-4">
                    {project.businessValue.map((res, i) => (
                      <li key={i} className="glass p-5 flex items-start gap-3 text-muted text-sm font-light border-gold/15 rounded-xl">
                        <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Video Demo (If available) */}
                {project.videoUrl && (
                  <div className="space-y-4 pt-6 border-t border-gold/10">
                    <div className="text-xs font-tech font-bold text-gold uppercase tracking-widest">
                      Live Architecture & System Demonstration
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-gold/20 bg-black/60 aspect-video relative shadow-2xl">
                      <iframe 
                        src={project.videoUrl} 
                        title={`${project.title} Video Walkthrough`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar Action & Specs */}
              <div className="space-y-8">
                <div className="glass p-8 space-y-6 border-gold/20 rounded-2xl sticky top-8">
                  <div className="space-y-4">
                    <div className="text-center pb-4 border-b border-gold/10">
                      <div className="text-xs font-tech text-muted uppercase tracking-widest mb-1">Standard Delivery Timeline</div>
                      <div className="text-2xl font-display font-bold text-gold">{project.timeline || '7-14 Days'}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-tech text-muted uppercase tracking-widest mb-1">Core Operational Focus</div>
                      <div className="text-xl font-display font-bold text-text">{project.efficiency || 'Eliminate Manual Steps'}</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gold/10 space-y-3">
                    <a 
                      href="https://cal.com/eldoradoautomate/free-strategy-call" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full bg-gold text-black py-4 rounded-xl font-tech font-bold text-xs flex items-center justify-center gap-2.5 hover:bg-gold-light transition-all shadow-lg shadow-gold/20 uppercase tracking-widest"
                    >
                      <CalendarCheck className="w-5 h-5" /> Discuss a Similar System
                    </a>
                    <a 
                      href="https://wa.me/2348083693498" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full glass py-3.5 rounded-xl font-tech font-bold text-xs flex items-center justify-center gap-2.5 hover:border-gold text-gold transition-all uppercase tracking-widest border-gold/20"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>

                  {/* Architecture Gallery Thumbs */}
                  <div className="pt-4 border-t border-gold/10 space-y-3">
                    <div className="text-xs font-tech font-bold text-muted uppercase tracking-widest text-center">
                      Architecture & Flow Screens
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {project.images.map((img, i) => (
                        <button 
                          key={i} 
                          onClick={() => setActiveImg(i)}
                          className={`rounded-lg overflow-hidden border-2 transition-all aspect-video relative cursor-pointer ${
                            activeImg === i ? 'border-gold scale-105 shadow-md shadow-gold/20' : 'border-transparent opacity-50 hover:opacity-100'
                          }`}
                          aria-label={`View image ${i + 1}`}
                        >
                          <img src={img} alt="Architecture thumbnail" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Lightbox 
        images={project.images} 
        isOpen={lightboxOpen} 
        initialIndex={activeImg} 
        onClose={() => setLightboxOpen(false)} 
      />
    </AnimatePresence>
  );
};
