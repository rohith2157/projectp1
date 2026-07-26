import React from 'react';
import { Mail, Globe, Share2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-studio-bg border-t border-studio-border/30 py-12 md:py-16 relative overflow-hidden">
      <div className="noise-overlay" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        
        {/* Brand details */}
        <div className="text-center md:text-left flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-studio-gold animate-pulse" />
            <h4 className="text-lg font-editorial font-bold text-studio-dark tracking-tight">
              Pixel's <span className="text-studio-gold font-light">&amp;</span> Portfolio's
            </h4>
          </div>
          <p className="text-xs text-studio-muted font-sans italic">
            "Turning Pixels Into Opportunities."
          </p>
        </div>

        {/* Quick Social & Direct Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-studio-border/30 text-studio-dark hover:text-studio-gold hover:border-studio-gold transition-all duration-300 glass-card"
            aria-label="GitHub"
          >
            <Globe size={16} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-studio-border/30 text-studio-dark hover:text-studio-gold hover:border-studio-gold transition-all duration-300 glass-card"
            aria-label="LinkedIn"
          >
            <Share2 size={16} />
          </a>
          <a
            href="mailto:pixelsandportfolios@gmail.com"
            className="p-2.5 rounded-full border border-studio-border/30 text-studio-dark hover:text-studio-gold hover:border-studio-gold transition-all duration-300 glass-card"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
        </div>

        {/* Legal & copyright info */}
        <div className="text-center md:text-right text-xs font-mono text-studio-muted">
          <p>© {currentYear} Pixel's &amp; Portfolio's. All rights reserved.</p>
          <p className="mt-1 text-[11px] text-studio-gold font-semibold tracking-widest uppercase">
            Crafted with Design Excellence
          </p>
        </div>

      </div>
    </footer>
  );
};
