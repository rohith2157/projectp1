import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

interface NavigationProps {
  onAboutClick: () => void;
  onWorkClick: () => void;
  onSkillsClick: () => void;
  onProcessClick: () => void;
  onPricingClick: () => void;
  onContactClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onAboutClick,
  onWorkClick,
  onSkillsClick,
  onProcessClick,
  onPricingClick,
  onContactClick
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 select-none ${
        scrolled || isOpen
          ? 'bg-studio-bg/80 backdrop-blur-xl border-b border-studio-border/30 py-3.5 shadow-premium'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Name on the Left */}
        <div className="flex items-center gap-2 group cursor-pointer" onClick={onAboutClick}>
          <div className="w-2 h-2 rounded-full bg-studio-gold animate-pulse" />
          <span className="text-sm font-sans font-bold text-studio-dark uppercase tracking-widest transition-colors duration-300 group-hover:text-studio-gold">
            Pixel's <span className="text-studio-gold font-light">&amp;</span> Portfolio's
          </span>
        </div>

        {/* Desktop Nav HUD Links (Hidden on mobile) */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8 px-6 py-2 rounded-full glass-card border border-studio-border/20 shadow-soft">
          <button
            onClick={onAboutClick}
            className="text-xs font-bold uppercase tracking-widest text-studio-muted hover:text-studio-dark transition-colors duration-300 relative group py-1 cursor-pointer"
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-studio-gold transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={onWorkClick}
            className="text-xs font-bold uppercase tracking-widest text-studio-muted hover:text-studio-dark transition-colors duration-300 relative group py-1 cursor-pointer"
          >
            Showcase
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-studio-gold transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={onSkillsClick}
            className="text-xs font-bold uppercase tracking-widest text-studio-muted hover:text-studio-dark transition-colors duration-300 relative group py-1 cursor-pointer"
          >
            Skills
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-studio-gold transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={onProcessClick}
            className="text-xs font-bold uppercase tracking-widest text-studio-muted hover:text-studio-dark transition-colors duration-300 relative group py-1 cursor-pointer"
          >
            Process
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-studio-gold transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={onPricingClick}
            className="text-xs font-bold uppercase tracking-widest text-studio-muted hover:text-studio-dark transition-colors duration-300 relative group py-1 cursor-pointer"
          >
            Pricing
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-studio-gold transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={onContactClick}
            className="text-xs font-bold uppercase tracking-widest text-studio-muted hover:text-studio-dark transition-colors duration-300 relative group py-1 cursor-pointer"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-studio-gold transition-all duration-300 group-hover:w-full" />
          </button>
        </div>

        {/* Right CTA + Mobile Trigger */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <div className="hidden sm:block">
            <button
              onClick={onContactClick}
              className="text-xs font-bold tracking-widest uppercase px-6 py-2.5 rounded-full border border-studio-dark/80 text-studio-dark bg-transparent hover:bg-studio-dark hover:text-studio-bg transition-all duration-400 shadow-soft hover:shadow-lg cursor-pointer"
            >
              Acquire Design
            </button>
          </div>

          {/* Hamburger Menu button on Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-studio-dark hover:text-studio-gold transition-colors duration-300 cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full bg-studio-bg/95 backdrop-blur-md border-b border-studio-stone/30 shadow-premium z-30 py-6 px-6 md:hidden flex flex-col gap-4 overflow-hidden"
          >
            <button
              onClick={() => {
                onAboutClick();
                setIsOpen(false);
              }}
              className="text-xs font-bold uppercase tracking-[0.25em] text-studio-muted hover:text-studio-dark text-left py-2 border-b border-studio-stone/20 cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => {
                onWorkClick();
                setIsOpen(false);
              }}
              className="text-xs font-bold uppercase tracking-[0.25em] text-studio-muted hover:text-studio-dark text-left py-2 border-b border-studio-stone/20 cursor-pointer"
            >
              Showcase
            </button>
            <button
              onClick={() => {
                onSkillsClick();
                setIsOpen(false);
              }}
              className="text-xs font-bold uppercase tracking-[0.25em] text-studio-muted hover:text-studio-dark text-left py-2 border-b border-studio-stone/20 cursor-pointer"
            >
              Skills
            </button>
            <button
              onClick={() => {
                onProcessClick();
                setIsOpen(false);
              }}
              className="text-xs font-bold uppercase tracking-[0.25em] text-studio-muted hover:text-studio-dark text-left py-2 border-b border-studio-stone/20 cursor-pointer"
            >
              Process
            </button>
            <button
              onClick={() => {
                onPricingClick();
                setIsOpen(false);
              }}
              className="text-xs font-bold uppercase tracking-[0.25em] text-studio-muted hover:text-studio-dark text-left py-2 border-b border-studio-stone/20 cursor-pointer"
            >
              Pricing
            </button>
            <button
              onClick={() => {
                onContactClick();
                setIsOpen(false);
              }}
              className="text-sm font-bold uppercase tracking-widest text-studio-muted hover:text-studio-dark text-left py-2 cursor-pointer"
            >
              Contact
            </button>

            <button
              onClick={() => {
                onContactClick();
                setIsOpen(false);
              }}
              className="w-full text-center text-xs font-bold tracking-widest uppercase py-4 border border-studio-dark text-studio-dark bg-transparent hover:bg-studio-dark hover:text-studio-bg transition-colors duration-500 shadow-soft cursor-pointer mt-4 rounded-buttons"
            >
              Acquire Design
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
