import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Copy, Check, ArrowUp } from 'lucide-react';

const CONTACT_NUMBERS = ['8309337729', '9346915965', '9849894706'];
const CONTACT_EMAIL = 'pixelsandportfolios@gmail.com';

// Magnetic Element wrapper
const MagneticWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

    if (distance < 100) {
      // Pull element towards cursor
      setPosition({
        x: (e.clientX - centerX) * 0.35,
        y: (e.clientY - centerY) * 0.35
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const Contact: React.FC = () => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Headline words for animation
  const titleWords = "LET'S BUILD YOUR DIGITAL PRESENCE.".split(' ');

  return (
    <section id="contact" className="py-12 md:py-16 bg-studio-bg relative overflow-hidden flex flex-col justify-between w-full">
      
      {/* Abstract structural grid layout */}
      <div className="absolute inset-0 grid-mesh pointer-events-none opacity-40 z-0" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-studio-gold/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Copy notification popup */}
      <AnimatePresence>
        {copiedText && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-studio-dark text-studio-white border border-studio-gold px-6 py-3 rounded-none text-xs font-bold tracking-widest uppercase flex items-center gap-3 shadow-premium"
          >
            <Check size={14} className="text-studio-gold" />
            <span>Copied {copiedText} to clipboard</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 flex flex-col gap-16 justify-between h-full">
        
        {/* 1. CLIMAX HEADLINE: Split-Word Mask Reveal */}
        <div className="w-full text-center md:text-left select-none">
          <span className="text-xs font-mono uppercase tracking-widest text-studio-muted font-bold block mb-4">
            &#123; The Climax Journey &#125;
          </span>
          <h2 className="text-[7.5vw] md:text-[6.5vw] font-black font-editorial tracking-tighter leading-[0.85] text-studio-dark uppercase flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2">
            {titleWords.map((word, idx) => (
              <span key={idx} className="char-mask relative">
                <motion.span
                  initial={{ y: '100%', rotate: 2 }}
                  whileInView={{ y: 0, rotate: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    type: 'spring',
                    damping: 20,
                    stiffness: 100,
                    delay: idx * 0.08
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>
        </div>

        {/* 2. INTERACTIVE CONTACT DETAILED GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
          
          {/* Left: Contact Numbers Stagger Reveal */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-sm font-mono tracking-widest text-studio-muted uppercase block border-b border-studio-stone/40 pb-2 mb-6">
              // TELEPHONE CHANNELS
            </span>

            {CONTACT_NUMBERS.map((number, idx) => (
              <motion.div
                key={number}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                data-cursor="copy"
                className="flex items-center justify-between p-5 border border-studio-stone/60 bg-studio-white/80 backdrop-blur-md rounded-2xl shadow-soft group hover:border-studio-gold hover:shadow-lg transition-all duration-400"
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm font-mono text-studio-gold font-bold">
                    0{idx + 1}.
                  </span>
                  <a
                    href={`tel:${number}`}
                    className="text-lg md:text-xl font-bold font-editorial text-studio-dark group-hover:text-studio-gold transition-colors duration-300"
                  >
                    +91 {number.slice(0, 5)} {number.slice(5)}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  {/* WhatsApp Direct Chat Redirect */}
                  <a
                    href={`https://wa.me/91${number}?text=${encodeURIComponent("Hi Pixel's & Portfolio's, I want to discuss a project!")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500 hover:text-white transition-all duration-300 rounded-xl cursor-pointer flex items-center gap-1.5"
                    title="Chat on WhatsApp"
                  >
                    <img src="/whatsapp-logo.png" alt="WhatsApp" className="w-4 h-4 object-contain" />
                    <span className="text-[11px] font-mono font-bold uppercase hidden sm:inline text-emerald-700 dark:text-emerald-300 group-hover/wa:text-white">
                      WhatsApp
                    </span>
                  </a>
                  {/* Click to copy action icon */}
                  <button
                    onClick={() => handleCopy(`+91${number}`, 'phone number')}
                    className="p-2.5 border border-studio-stone/40 hover:bg-studio-dark hover:text-studio-white transition-colors duration-300 rounded-xl cursor-pointer"
                    title="Copy Number"
                  >
                    <Copy size={14} />
                  </button>
                  <a
                    href={`tel:${number}`}
                    className="p-2.5 bg-studio-dark text-studio-white group-hover:bg-studio-gold transition-colors duration-300 rounded-xl cursor-pointer"
                    title="Call directly"
                  >
                    <Phone size={14} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Email card and magnetic CTA */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-8">
            <div className="w-full">
              <span className="text-sm font-mono tracking-widest text-studio-muted uppercase block border-b border-studio-stone/40 pb-2 mb-6">
                // CORRESPONDENCE LAYER
              </span>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                onClick={() => handleCopy(CONTACT_EMAIL, 'email')}
                data-cursor="copy"
                className="p-8 border border-studio-navy/90 bg-studio-navy text-studio-white rounded-3xl shadow-premium relative group overflow-hidden cursor-pointer hover:border-studio-gold transition-all duration-400"
              >
                <div className="noise-overlay" />
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-studio-gold font-bold">
                      Direct Messaging
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black font-editorial uppercase mt-2 group-hover:text-studio-gold transition-colors duration-300">
                      Write to the Studio
                    </h3>
                    <p className="text-xs text-studio-stone/60 font-sans mt-2 max-w-sm">
                      Click anywhere on this panel to copy our primary inbox link directly.
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-studio-stone/20 flex items-center justify-between">
                    <span className="text-sm sm:text-base font-mono tracking-tight font-semibold text-studio-white truncate group-hover:text-studio-gold transition-colors duration-300">
                      {CONTACT_EMAIL}
                    </span>
                    <div className="w-10 h-10 rounded-full border border-studio-stone/30 flex items-center justify-center bg-studio-dark group-hover:bg-studio-gold transition-colors duration-500">
                      <Mail size={14} className="text-studio-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

        </div>

        {/* 3. CLIMAX FINAL TRANSITION: Rotating 3D Emblem Card */}
        <div className="w-full pt-16 border-t border-studio-stone/30 flex flex-col md:flex-row items-center justify-between gap-8 mt-12 pb-8">
          <div className="text-xs font-mono tracking-widest text-studio-muted uppercase">
            © 2026 PIXEL'S & PORTFOLIO'S // ALL MOVEMENT SIGNED
          </div>

          <MagneticWrapper>
            <motion.div
              style={{ perspective: 600 }}
              whileHover={{ rotateY: 18, rotateX: -10, scale: 1.05 }}
              className="px-6 py-4 bg-studio-white border border-studio-gold shadow-premium flex items-center gap-4 cursor-pointer select-none origin-center"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <ArrowUp size={16} className="text-studio-gold shrink-0" />
              <div className="flex flex-col">
                <span className="text-xs font-mono tracking-widest text-studio-gold font-bold uppercase leading-none">
                  Return to Apex
                </span>
                <span className="text-sm font-bold text-studio-dark uppercase font-editorial tracking-tight mt-1">
                  Pixel's & Portfolio's
                </span>
              </div>
            </motion.div>
          </MagneticWrapper>
        </div>

      </div>
    </section>
  );
};
