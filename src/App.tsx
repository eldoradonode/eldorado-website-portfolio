import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'motion/react';
import Lenis from 'lenis';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { 
  Bolt, Globe, CalendarCheck, ChevronDown, 
  Mail, Twitter, Github, ShoppingCart, ShieldCheck, 
  Utensils, Search, Paintbrush, Bike, MessageSquare,
  LayoutGrid, Zap, Lock, PieChart, RefreshCw, 
  Layers, Rocket, Cpu, Play, ExternalLink,
  CheckCircle2, User, Bot, Sparkles, ArrowRight,
  Workflow, ArrowUpRight, AlertCircle
} from 'lucide-react';

import { Project } from './types';
import { projects } from './data/projects';
import { services, faqs, verifiedStats } from './data/content';
import { Chatbot } from './components/Chatbot';
import { StillManual } from './components/StillManual';
import { RealProof } from './components/RealProof';
import { ProjectModal } from './components/ProjectModal';

// --- Utils ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Custom Cursor ---
const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const cursorX = useSpring(mouseX, { damping: 20, stiffness: 300, mass: 0.5 });
  const cursorY = useSpring(mouseY, { damping: 20, stiffness: 300, mass: 0.5 });
  const dotX = useSpring(mouseX, { damping: 30, stiffness: 500, mass: 0.2 });
  const dotY = useSpring(mouseY, { damping: 30, stiffness: 500, mass: 0.2 });

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="hidden lg:block">
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-gold rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? 'rgba(241, 190, 21, 0.1)' : 'transparent',
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-gold rounded-full pointer-events-none z-[10000]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </div>
  );
};

// --- Ambient Glow ---
const BackgroundGlow = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-gold/5 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-gold/5 blur-[150px] rounded-full" />
    </div>
  );
};

// --- Command Palette ---
const CommandPalette = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const actions = [
    { icon: <AlertCircle size={18} />, label: 'Identify Business Bottlenecks', href: '#bottlenecks' },
    { icon: <Zap size={18} />, label: 'Automation Services', href: '#services' },
    { icon: <LayoutGrid size={18} />, label: 'Production Case Studies', href: '#portfolio' },
    { icon: <User size={18} />, label: 'About Eldorado', href: '#about' },
    { icon: <Workflow size={18} />, label: 'Automation Process', href: '#process' },
    { icon: <CalendarCheck size={18} />, label: 'Book a Strategy Call (Cal.com)', href: 'https://cal.com/eldoradoautomate/free-strategy-call' },
    { icon: <MessageSquare size={18} />, label: 'Chat on WhatsApp Direct', href: 'https://wa.me/2348083693498' },
    { icon: <Mail size={18} />, label: 'Email Eldorado', href: 'mailto:daniel@eldoradonode.work' },
  ];

  const filteredActions = actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filteredActions.length || 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredActions.length) % (filteredActions.length || 1));
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredActions[selectedIndex];
        if (selected) {
          if (selected.href.startsWith('mailto:')) {
            window.location.href = selected.href;
          } else if (selected.href.startsWith('http')) {
            window.open(selected.href, '_blank', 'noopener,noreferrer');
          } else {
            window.location.hash = selected.href;
          }
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, filteredActions, selectedIndex]);

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10001] bg-black/80 backdrop-blur-md flex items-start justify-center pt-[15vh] p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-2xl glass border-gold/20 overflow-hidden shadow-2xl rounded-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gold/10 flex items-center gap-4">
          <Search className="text-gold" size={20} />
          <input 
            autoFocus
            placeholder="Search systems, services, or actions..."
            className="bg-transparent border-none outline-none w-full text-lg font-tech placeholder:text-muted/50 text-text"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <div className="flex items-center gap-1 px-2 py-1 bg-gold/10 rounded border border-gold/20 text-[0.6rem] font-tech text-gold">
            <span className="opacity-50">ESC</span>
          </div>
        </div>
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          <div className="text-[0.6rem] font-tech text-muted uppercase tracking-widest mb-3 px-2">Navigation & Quick Actions</div>
          <div className="space-y-1.5">
            {filteredActions.map((action, i) => (
              <a 
                key={i}
                href={action.href}
                target={action.href.startsWith('http') ? '_blank' : undefined}
                rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                onClick={onClose}
                onMouseEnter={() => setSelectedIndex(i)}
                className={cn(
                  "flex items-center gap-4 p-3.5 rounded-xl transition-all group cursor-pointer",
                  selectedIndex === i ? "bg-gold/20 border-gold/30" : "hover:bg-gold/10 border-transparent"
                )}
              >
                <div className={cn(
                  "transition-colors",
                  selectedIndex === i ? "text-gold" : "text-muted group-hover:text-gold"
                )}>{action.icon}</div>
                <span className="font-tech text-sm font-bold text-text group-hover:text-gold transition-colors">{action.label}</span>
                <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 text-gold transition-opacity" />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Navigation ---
const Navbar = ({ onOpenCommand }: { onOpenCommand: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Bottlenecks', href: '#bottlenecks' },
    { label: 'Services', href: '#services' },
    { label: 'Case Studies', href: '#portfolio' },
    { label: 'About', href: '#about' },
    { label: 'Process', href: '#process' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3 sm:py-4 bg-bg/95 backdrop-blur-xl border-b border-gold/15 shadow-2xl' : 'py-4 sm:py-6 bg-transparent'
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        {/* Brand */}
        <a href="#home" className="flex items-center gap-2.5 sm:gap-3 group min-h-[44px]">
          <div className="h-10 sm:h-12 w-auto flex items-center">
            <img 
              src="https://i.ibb.co/gbMp0c6Q/Screenshot-20260228-204116-Samsung-Internet-removebg-preview.png" 
              alt="Eldorado Node" 
              className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col text-left">
            <div className="font-display font-bold text-sm sm:text-base tracking-tight text-text leading-tight group-hover:text-gold transition-colors">ELDORADO NODE</div>
            <div className="font-tech text-[0.6rem] sm:text-[0.65rem] text-gold tracking-widest uppercase font-bold">AI Automation & Systems</div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => (
            <a 
              key={link.label}
              href={link.href}
              className="text-xs font-tech font-bold uppercase tracking-wider text-muted hover:text-gold transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            onClick={onOpenCommand}
            className="hidden md:flex items-center gap-2 min-h-[44px] px-3 py-1.5 glass rounded-xl border-gold/20 text-xs font-tech text-muted hover:text-gold transition-colors cursor-pointer"
            aria-label="Quick Navigation"
          >
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 bg-gold/10 rounded border border-gold/20 text-[0.6rem] text-gold">⌘K</kbd>
          </button>

          <a 
            href="https://cal.com/eldoradoautomate/free-strategy-call" 
            target="_blank" 
            rel="noopener noreferrer"
            className="min-h-[44px] bg-gold text-black px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-tech font-bold text-xs uppercase tracking-widest hover:bg-gold-light transition-all shadow-md shadow-gold/20 flex items-center justify-center gap-1.5"
          >
            <CalendarCheck size={14} />
            <span className="hidden sm:inline">Book a Call</span>
            <span className="sm:hidden">Book</span>
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-gold glass rounded-xl border-gold/20 cursor-pointer"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`h-0.5 bg-gold transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`h-0.5 bg-gold transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 bg-gold transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-bg/98 border-b border-gold/20 px-4 sm:px-6 py-6 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[44px] flex items-center font-tech font-bold text-sm uppercase tracking-widest text-text hover:text-gold transition-colors py-2 px-1 border-b border-gold/10"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <a
                  href="https://cal.com/eldoradoautomate/free-strategy-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full min-h-[48px] bg-gold text-black py-3.5 rounded-xl font-tech font-bold text-xs uppercase tracking-widest flex items-center justify-center text-center shadow-lg shadow-gold/20"
                >
                  Book Free Strategy Call
                </a>
                <a
                  href="https://wa.me/2348083693498"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full min-h-[48px] glass py-3.5 rounded-xl font-tech font-bold text-xs uppercase tracking-widest flex items-center justify-center text-center text-gold border-gold/20"
                >
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// --- Hero Section ---
const Hero = () => {
  return (
    <section id="home" className="pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-16 md:pb-20 lg:min-h-screen flex items-center relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Hero Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 sm:space-y-8 text-left"
          >
            {/* Status pill */}
            <div className="inline-flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full glass border-gold/20 text-gold text-[0.7rem] sm:text-xs font-tech font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <span>Available for Q2 Automation Projects</span>
            </div>

            {/* Primary Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-text leading-[1.1] sm:leading-[1.05] tracking-tight">
              Your Business Has <span className="text-gold-gradient">Too Much Manual Work.</span>
            </h1>

            {/* Subhead */}
            <p className="text-muted text-base sm:text-xl md:text-2xl font-light leading-relaxed max-w-2xl">
              I build AI-powered automation systems that eliminate manual bottlenecks, integrate your business tools, and give your team back valuable hours every week.
            </p>

            {/* Supporting explanatory text */}
            <p className="text-muted/80 text-sm sm:text-base font-light leading-relaxed max-w-2xl border-l-2 border-gold/30 pl-3.5 sm:pl-4">
              Designed across lead qualification, customer support, order fulfillment, and multi-app data synchronization to run reliably in production.
            </p>

            {/* CTA Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6">
              <a 
                href="https://cal.com/eldoradoautomate/free-strategy-call" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[48px] bg-gold text-black px-6 sm:px-10 py-3.5 sm:py-5 rounded-2xl font-tech font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gold-light transition-all shadow-[0_20px_50px_rgba(241,190,21,0.25)] hover:shadow-[0_20px_50px_rgba(241,190,21,0.45)] hover:-translate-y-0.5 text-center"
              >
                <span>Find What to Automate</span>
                <ArrowRight size={16} />
              </a>

              <a 
                href="#portfolio" 
                className="w-full sm:w-auto min-h-[48px] glass px-6 sm:px-10 py-3.5 sm:py-5 rounded-2xl font-tech font-bold text-xs uppercase tracking-widest text-text hover:text-gold border-gold/20 hover:border-gold/60 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 text-center"
              >
                <span>See Case Studies</span>
                <ChevronDown size={16} />
              </a>
            </div>

            {/* Practical Metrics strip */}
            <div className="pt-6 sm:pt-8 border-t border-gold/10 grid grid-cols-3 gap-2 sm:gap-6 max-w-lg">
              <div>
                <div className="font-display font-bold text-xl sm:text-2xl text-gold">Up to 40h</div>
                <div className="text-[0.65rem] sm:text-[0.7rem] font-tech text-muted uppercase tracking-wider mt-1">Work Saved / Wk</div>
              </div>
              <div>
                <div className="font-display font-bold text-xl sm:text-2xl text-gold">40+</div>
                <div className="text-[0.65rem] sm:text-[0.7rem] font-tech text-muted uppercase tracking-wider mt-1">Processes Automated</div>
              </div>
              <div>
                <div className="font-display font-bold text-xl sm:text-2xl text-gold">7-14 Days</div>
                <div className="text-[0.65rem] sm:text-[0.7rem] font-tech text-muted uppercase tracking-wider mt-1">Typical Turnaround</div>
              </div>
            </div>
          </motion.div>

          {/* Hero Right Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative mt-4 lg:mt-0"
          >
            <div className="relative mx-auto max-w-[280px] sm:max-w-sm lg:max-w-none">
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-3xl border border-gold/20 -rotate-2 scale-102 pointer-events-none" />
              
              {/* Portrait Container */}
              <div className="relative glass rounded-3xl p-2.5 sm:p-3 border-gold/30 shadow-2xl overflow-hidden group">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-bg-alt/80 relative">
                  <img 
                    src="https://i.ibb.co/DHLqSB6V/j-Rm7uq-I.jpg" 
                    alt="Eldorado Daniel - AI Automation Specialist" 
                    className="w-full h-full object-cover object-center filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Bottom title overlay */}
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                    <div className="font-display font-bold text-xl sm:text-2xl text-text">Eldorado Daniel</div>
                    <div className="text-[0.7rem] sm:text-xs font-tech text-gold uppercase tracking-widest font-bold">
                      AI Automation Specialist • Systems Engineer
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating verified badge 1 - hidden on mobile to prevent overflow */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -top-6 -left-6 glass p-4 rounded-2xl border-gold/30 shadow-xl hidden md:flex items-center gap-3 backdrop-blur-xl"
              >
                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <div className="text-[0.65rem] font-tech text-muted uppercase tracking-wider">Engineering Focus</div>
                  <div className="text-xs font-tech font-bold text-gold uppercase tracking-widest">Connect Your Tools</div>
                </div>
              </motion.div>

              {/* Floating verified badge 2 - hidden on mobile to prevent overflow */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -right-6 glass p-4 rounded-2xl border-gold/30 shadow-xl hidden md:flex items-center gap-3 backdrop-blur-xl"
              >
                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                  <Workflow size={20} />
                </div>
                <div>
                  <div className="text-[0.65rem] font-tech text-muted uppercase tracking-wider">Reliability Standard</div>
                  <div className="text-xs font-tech font-bold text-gold uppercase tracking-widest">Zero-Downtime Logic</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

// --- About Section ---
const About = () => {
  return (
    <section id="about" className="py-20 sm:py-28 md:py-36 bg-bg relative overflow-hidden border-b border-gold/10">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* About Image / Visual */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="glass p-6 sm:p-8 border-gold/20 rounded-3xl space-y-6">
              <div className="aspect-square rounded-2xl overflow-hidden bg-black/40 relative">
                <img 
                  src="https://i.ibb.co/spHTf5Rq/Screen-Shot-2026-02-22-at-18-14-36.png" 
                  alt="Production n8n workflow architecture" 
                  className="w-full h-full object-cover grayscale contrast-125 opacity-75 hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-linear-to-t from-bg via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-xs font-tech text-gold font-bold uppercase tracking-wider">
                  Production Workflow Architecture • Error-Protected
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
                <div className="glass p-3.5 sm:p-4 rounded-xl border-gold/10 text-center">
                  <div className="font-display font-bold text-lg sm:text-xl text-gold">n8n & Make</div>
                  <div className="text-[0.65rem] font-tech text-muted uppercase tracking-wider mt-1">Core Workflow Engines</div>
                </div>
                <div className="glass p-3.5 sm:p-4 rounded-xl border-gold/10 text-center">
                  <div className="font-display font-bold text-lg sm:text-xl text-gold">REST & Webhooks</div>
                  <div className="text-[0.65rem] font-tech text-muted uppercase tracking-wider mt-1">Direct API Connections</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* About Narrative */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-6 sm:space-y-8"
          >
            <span className="section-label">Engineering Philosophy</span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-text">
              Building Reliable Systems, <span className="text-gold-gradient">Not Gimmicks.</span>
            </h2>

            {/* Exactly formatted approved about text */}
            <div className="space-y-4 sm:space-y-6 text-muted text-base sm:text-lg md:text-xl font-light leading-relaxed">
              <p>
                I am <span className="text-text font-medium">Eldorado Daniel</span>, founder of <span className="text-gold font-medium">Eldorado Node</span>. I engineer resilient digital infrastructure that connects disparate tools into unified, autonomous workflows.
              </p>
              <p>
                Rather than deploying fragile point-to-point scripts, I build production-grade architectures with built-in error handling, webhook verifications, and real-time logging.
              </p>
              <p className="border-l-2 border-gold/40 pl-4 sm:pl-6 text-text/90 italic text-sm sm:text-base">
                Every build begins with operational logic, not software brand names. We identify where team handoffs break down, determine what requires human oversight, and deploy systems that run without unexpected failures.
              </p>
            </div>

            {/* Verified Performance Metric Cards */}
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 pt-2 sm:pt-4">
              {verifiedStats.map((stat, i) => (
                <div key={i} className="glass p-5 sm:p-6 rounded-2xl border-gold/15">
                  <div className="font-display font-bold text-2xl md:text-3xl text-gold mb-1">{stat.number}</div>
                  <div className="text-xs font-tech font-bold text-text uppercase tracking-wider mb-1">{stat.label}</div>
                  <div className="text-xs font-light text-muted">{stat.desc}</div>
                </div>
              ))}
            </div>

            <div className="pt-2 sm:pt-4">
              <a 
                href="https://cal.com/eldoradoautomate/free-strategy-call" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-3 bg-gold text-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-tech font-bold text-xs uppercase tracking-widest hover:bg-gold-light transition-all shadow-md shadow-gold/20 text-center"
              >
                <span>Book a Discovery Call</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

// --- Services Section ---
const Services = () => {
  return (
    <section id="services" className="py-20 sm:py-28 md:py-36 bg-bg-alt/40 relative border-b border-gold/10">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mb-12 sm:mb-20"
        >
          <span className="section-label">Problem-Centric Solutions</span>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold mb-4 sm:mb-6 tracking-tight">
            How I Can <span className="text-gold-gradient">Help Your Business</span>
          </h2>
          <p className="text-muted text-base sm:text-lg md:text-xl font-light leading-relaxed">
            I categorize services around the operational friction you face every day, not around software brand names.
          </p>
        </motion.div>

        <div className="grid grid-cols-12 gap-6 sm:gap-8">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`${service.span} glass p-6 sm:p-8 md:p-10 flex flex-col justify-between group hover:border-gold/50 transition-all duration-500 rounded-3xl`}
            >
              <div>
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-6 sm:mb-8 group-hover:scale-110 transition-transform">
                  {React.cloneElement(service.icon as React.ReactElement, { size: 28 } as any)}
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl mb-3 sm:mb-4 text-text group-hover:text-gold transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted text-sm sm:text-base font-light mb-6 leading-relaxed">
                  {service.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-gold/10 space-y-4">
                <div className="text-xs font-tech text-gold font-bold uppercase tracking-wider">
                  Target Outcome:
                </div>
                <p className="text-sm font-light text-muted/90 leading-relaxed">
                  {service.businessOutcome}
                </p>
                <div className="pt-2">
                  <a
                    href="https://cal.com/eldoradoautomate/free-strategy-call"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] inline-flex items-center gap-2 text-xs font-tech text-gold font-bold uppercase tracking-widest hover:translate-x-1 transition-transform cursor-pointer"
                  >
                    <span>Discuss This Solution</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Process Section ---
const ProcessTimeline = () => {
  const steps = [
    {
      num: '01',
      title: 'Bottleneck Discovery',
      subtitle: 'Mapping What Needs to Change',
      desc: 'We get on a 30-minute call to dissect your team\'s daily tasks. We identify which repetitive steps consume the most hours, where human error occurs, and whether automation is genuinely cost-effective.'
    },
    {
      num: '02',
      title: 'Architecture & Workflow Design',
      subtitle: 'Blueprint Before Building',
      desc: 'I map out the entire data flow: triggers, condition branches, API handshakes, and fallback routes. You get a clear diagram showing exactly how data travels between your software before implementation.'
    },
    {
      num: '03',
      title: 'Development & Fail-Safe Testing',
      subtitle: 'Built for Production',
      desc: 'I build the workflows in n8n or Make.com, establish secure webhooks, integrate AI prompts, and test with live edge cases. I configure real-time error watchdog alerts in Slack so you always have 100% visibility.'
    },
    {
      num: '04',
      title: 'Deployment & Team Handover',
      subtitle: 'Hands-off Peace of Mind',
      desc: 'We launch into production with zero disruption to your active operations. I provide concise Loom walkthroughs for your team, handle initial calibration, and include post-launch support windows.'
    }
  ];

  return (
    <section id="process" className="py-20 sm:py-28 md:py-36 bg-bg relative border-b border-gold/10">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mb-14 sm:mb-24"
        >
          <span className="section-label">Implementation Methodology</span>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold mb-4 sm:mb-6 tracking-tight">
            How an Automation <span className="text-gold-gradient">Gets Built</span>
          </h2>
          <p className="text-muted text-base sm:text-lg md:text-xl font-light leading-relaxed">
            A clear, 4-step engineering framework designed to remove ambiguity, protect your data, and deliver reliable business outcomes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-6 sm:p-8 rounded-3xl border-gold/15 relative group hover:border-gold/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gold/30 group-hover:text-gold transition-colors mb-4 sm:mb-6">
                  {step.num}
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-text mb-2">
                  {step.title}
                </h3>
                <div className="text-xs font-tech text-gold font-bold uppercase tracking-wider mb-4">
                  {step.subtitle}
                </div>
                <p className="text-muted text-sm font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gold/10 flex items-center justify-between text-xs font-tech text-muted group-hover:text-gold transition-colors">
                <span>Phase {step.num}</span>
                <CheckCircle2 size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Tools Section ---
const ToolsMarquee = () => {
  const toolsRow1 = [
    'n8n', 'Make.com', 'Zapier', 'Claude Code', 'MCP', 'OpenAI', 
    'Claude', 'Gemini', 'DeepSeek', 'Perplexity', 'HubSpot CRM', 
    'Salesforce', 'Airtable', 'Google Workspace', 'Shopify API', 'Slack'
  ];

  const toolsRow2 = [
    'WhatsApp Business', 'Stripe', 'Paystack', 'Twilio', 'ClickUp', 'Cal.com', 
    'Apollo.io', 'Hunter.io', 'Notion', 'Monday.com', 'Pipedrive', 'Typeform', 
    'Tally.so', 'Cloudinary', 'PostgreSQL', 'Webhooks', 'REST APIs'
  ];

  return (
    <section id="tools" className="py-16 sm:py-24 md:py-28 border-y border-gold/10 overflow-hidden bg-bg relative space-y-8 sm:space-y-10">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <span className="section-label mx-auto">Technology Compatibility</span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold mb-3 sm:mb-4 tracking-tight">
          I Work With the Tools <span className="text-gold-gradient">Your Business Already Uses</span>
        </h2>
        <p className="text-muted text-sm sm:text-base md:text-lg font-light max-w-2xl mx-auto">
          No need to replace your existing software. I connect your CRMs, messaging platforms, spreadsheets, and databases into one unified system.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6 overflow-hidden">
        {/* Row 1 */}
        <div className="flex animate-marquee whitespace-nowrap will-change-transform">
          {[...toolsRow1, ...toolsRow1].map((tool, idx) => (
            <div key={`r1-${idx}`} className="flex items-center gap-3 sm:gap-4 px-4 sm:px-8 md:px-12 text-muted hover:text-gold transition-all duration-300 font-tech font-bold text-xs md:text-sm uppercase tracking-[0.2em] group">
              <div className="w-1.5 h-1.5 rounded-full bg-gold/20 group-hover:bg-gold transition-colors" />
              {tool}
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex animate-marquee-reverse whitespace-nowrap will-change-transform">
          {[...toolsRow2, ...toolsRow2].map((tool, idx) => (
            <div key={`r2-${idx}`} className="flex items-center gap-3 sm:gap-4 px-4 sm:px-8 md:px-12 text-muted hover:text-gold transition-all duration-300 font-tech font-bold text-xs md:text-sm uppercase tracking-[0.2em] group">
              <div className="w-1.5 h-1.5 rounded-full bg-gold/20 group-hover:bg-gold transition-colors" />
              {tool}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Case Studies / Portfolio Section ---
const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="portfolio" className="py-20 sm:py-28 md:py-36 bg-bg relative border-b border-gold/10">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mb-12 sm:mb-20"
        >
          <span className="section-label">Case Studies</span>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold mb-4 sm:mb-6 tracking-tight">
            Production <span className="text-gold-gradient">Systems</span>
          </h2>
          <p className="text-muted text-base sm:text-lg md:text-xl font-light leading-relaxed">
            Click any system to see the business problem, automated solution architecture, realistic impact, and video demonstration.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedProject(project)}
              className="glass group cursor-pointer overflow-hidden border-gold/10 hover:border-gold/50 transition-all duration-500 rounded-3xl shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="aspect-video overflow-hidden relative bg-black/40">
                  <img 
                    src={project.images[0]} 
                    alt={project.title} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 filter grayscale contrast-110 group-hover:grayscale-0" 
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-gold text-black min-h-[44px] px-6 py-2.5 rounded-xl font-tech font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-2xl">
                      <Play size={16} fill="black" /> VIEW CASE STUDY
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="text-[0.7rem] text-gold font-tech font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span>{project.industry}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl mb-3 sm:mb-4 text-text group-hover:text-gold transition-colors leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-muted text-sm font-light leading-relaxed mb-6 line-clamp-3">
                    {project.desc}
                  </p>
                </div>
              </div>

              <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0">
                <div className="flex flex-wrap gap-2 pt-4 border-t border-gold/10">
                  {project.tools.slice(0, 3).map((tool, i) => (
                    <span key={`${tool}-${i}`} className="text-[0.65rem] px-3 py-1 bg-gold/5 border border-gold/20 rounded-full text-gold font-tech font-bold uppercase tracking-wider">
                      {tool}
                    </span>
                  ))}
                  {project.tools.length > 3 && (
                    <span className="text-[0.65rem] px-2 py-1 text-muted/60 font-tech">
                      +{project.tools.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        project={selectedProject} 
      />
    </section>
  );
};

// --- Why Work With Me ---
const WhyMe = () => {
  const reasons = [
    { 
      icon: <Bolt />, 
      title: 'Fast, Methodical Turnaround', 
      desc: 'Most standard automations delivered in 7 to 14 days. Complex multi-flow pipelines in 2 to 4 weeks, with clear milestone checkpoints.' 
    },
    { 
      icon: <Lock />, 
      title: 'Strict Confidentiality', 
      desc: 'Your customer data, proprietary business logic, and API credentials remain 100% private. I sign non-disclosure agreements whenever required.' 
    },
    { 
      icon: <PieChart />, 
      title: 'Tied to Real Outcomes', 
      desc: 'Every system is built to eliminate a tangible bottleneck: manual hours wasted, slow response times, or dropped customer leads. No vanity software.' 
    },
    { 
      icon: <RefreshCw />, 
      title: 'Post-Launch Support & Warranty', 
      desc: 'I include post-launch warranty windows on every build to handle live edge cases and ensure zero hiccups during day-to-day operations.' 
    },
    { 
      icon: <Globe />, 
      title: 'Global Platform Standards', 
      desc: 'Systems engineered on standard international stacks including Shopify, HubSpot, n8n, Stripe, and Cloud APIs, backed by fluent English communication across global time zones.' 
    },
    { 
      icon: <Layers />, 
      title: 'Process-First Mindset', 
      desc: 'I don\'t force tools on your team. I study how you currently work, simplify the process, and only then implement the technical connections.' 
    },
  ];

  return (
    <section className="py-20 sm:py-28 md:py-36 bg-bg-alt/30 relative border-b border-gold/10">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mb-12 sm:mb-20"
        >
          <span className="section-label">Partnership Standards</span>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold mb-4 sm:mb-6 tracking-tight">
            Why Work <span className="text-gold-gradient">With Eldorado?</span>
          </h2>
          <p className="text-muted text-base sm:text-lg md:text-xl font-light leading-relaxed">
            Straightforward technical execution, clear communication, and systems built to last.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((reason, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="glass p-6 sm:p-8 rounded-3xl border-gold/15 flex flex-col justify-between hover:border-gold/40 transition-all"
            >
              <div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gold/10 border border-gold/20 rounded-2xl flex items-center justify-center text-gold mb-5 sm:mb-6 flex-shrink-0">
                  {React.cloneElement(reason.icon as React.ReactElement, { size: 24 } as any)}
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl mb-2 sm:mb-3 text-text">{reason.title}</h3>
                <p className="text-muted text-sm sm:text-base leading-relaxed font-light">{reason.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- FAQ Section ---
const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28 md:py-36 bg-bg relative border-b border-gold/10">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-20"
        >
          <span className="section-label mx-auto">Frequently Asked Questions</span>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold mb-4 sm:mb-6 tracking-tight">
            Common <span className="text-gold-gradient">Questions</span>
          </h2>
          <p className="text-muted text-base sm:text-lg font-light">
            Everything you need to know about working together and automating your workflows.
          </p>
        </motion.div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass overflow-hidden border-gold/10 rounded-2xl"
            >
              <button 
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full min-h-[52px] px-5 sm:px-8 py-4 sm:py-6 flex justify-between items-center text-left font-display font-bold text-lg sm:text-xl hover:bg-gold/5 transition-colors text-text cursor-pointer"
                aria-expanded={activeIndex === idx}
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 sm:w-6 sm:h-6 text-gold transition-transform duration-300 flex-shrink-0 ml-4 ${activeIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 sm:px-8 pb-5 sm:pb-6 text-muted text-sm sm:text-base leading-relaxed font-light"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Contact / Conversion CTA Section ---
const Contact = () => {
  return (
    <section id="contact" className="py-20 sm:py-28 md:py-36 bg-bg-alt/60 relative overflow-hidden">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6 sm:space-y-8"
        >
          <span className="section-label mx-auto">Get Started</span>

          {/* Headline mandated by Section 15 */}
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold tracking-tight text-text leading-[1.1]">
            What's the Most <span className="text-gold-gradient">Repetitive Process</span> in Your Business?
          </h2>

          {/* Supporting copy mandated by Section 15 */}
          <p className="text-muted text-base sm:text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
            Share what your team handles manually today, and we will evaluate whether an automated system will yield positive ROI.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-4 sm:gap-6 pt-4 sm:pt-6">
            <a 
              href="https://cal.com/eldoradoautomate/free-strategy-call" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-h-[48px] bg-gold text-black px-6 sm:px-10 py-4 sm:py-5 rounded-2xl font-tech font-bold text-xs flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(241,190,21,0.3)] hover:shadow-[0_20px_50px_rgba(241,190,21,0.5)] transition-all hover:-translate-y-1 uppercase tracking-widest text-center"
            >
              <CalendarCheck className="w-5 h-5" /> Book a Free Strategy Call
            </a>

            <a 
              href="https://wa.me/2348083693498" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-h-[48px] glass px-6 sm:px-10 py-4 sm:py-5 rounded-2xl font-tech font-bold text-xs flex items-center justify-center gap-3 transition-all hover:-translate-y-1 uppercase tracking-widest border-gold/40 hover:border-gold text-gold text-center"
            >
              <MessageSquare className="w-5 h-5" /> Message Me on WhatsApp
            </a>
          </div>

          <div className="pt-8 sm:pt-10 flex justify-center items-center gap-6 sm:gap-8 text-sm font-tech text-muted">
            <a 
              href="mailto:daniel@eldoradonode.work" 
              className="hover:text-gold transition-colors flex items-center gap-2 min-h-[44px]"
            >
              <Mail size={16} /> daniel@eldoradonode.work
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Footer ---
const Footer = () => {
  return (
    <footer className="py-14 sm:py-20 border-t border-gold/10 text-center bg-bg">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center justify-center mb-6 sm:mb-8">
          <img 
            src="https://i.ibb.co/gbMp0c6Q/Screenshot-20260228-204116-Samsung-Internet-removebg-preview.png" 
            alt="Eldorado Node" 
            className="h-16 sm:h-20 w-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] mb-3"
            referrerPolicy="no-referrer"
          />
          <div className="font-display font-bold text-xl sm:text-2xl text-text tracking-tight">ELDORADO NODE</div>
          <div className="text-gold text-xs font-tech font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] mt-1">
            AI Automation & Systems
          </div>
        </div>
        
        <div className="flex justify-center gap-3 sm:gap-6 mb-8 sm:mb-10">
          {[
            { icon: <Twitter size={20} />, href: 'https://x.com/PathToAutomate', label: 'Twitter/X' },
            { icon: <Github size={20} />, href: 'https://github.com/eldoradonode', label: 'GitHub' },
            { icon: <Mail size={20} />, href: 'mailto:daniel@eldoradonode.work', label: 'Email' },
            { icon: <MessageSquare size={20} />, href: 'https://wa.me/2348083693498', label: 'WhatsApp' },
          ].map((social, idx) => (
            <a 
              key={idx} 
              href={social.href} 
              target={social.href.startsWith('mailto:') ? undefined : '_blank'} 
              rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'} 
              aria-label={social.label}
              className="w-11 h-11 sm:w-12 sm:h-12 min-w-[44px] min-h-[44px] rounded-xl glass border-gold/15 flex items-center justify-center text-muted hover:text-gold hover:border-gold transition-all"
            >
              {social.icon}
            </a>
          ))}
        </div>
        
        <p className="text-[0.7rem] sm:text-[0.75rem] text-muted/50 font-tech font-bold tracking-wider sm:tracking-widest">
          © 2026 ELDORADO NODE. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};

// --- Main App Entry ---
export default function App() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      lenis.destroy();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative selection:bg-gold selection:text-black">
      <CustomCursor />
      <BackgroundGlow />
      <Navbar onOpenCommand={() => setIsCommandPaletteOpen(true)} />
      
      <main>
        <Hero />
        <StillManual />
        <Services />
        <ProcessTimeline />
        <ToolsMarquee />
        <Portfolio />
        <RealProof />
        <About />
        <WhyMe />
        <FAQ />
        <Contact />
      </main>

      <Chatbot />
      <Footer />

      <AnimatePresence>
        {isCommandPaletteOpen && (
          <CommandPalette 
            isOpen={isCommandPaletteOpen} 
            onClose={() => setIsCommandPaletteOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
