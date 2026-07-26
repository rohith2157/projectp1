import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './ui/glass-card';

interface WhatsAppFloatProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export const WhatsAppFloat: React.FC<WhatsAppFloatProps> = ({
  phoneNumber = '918309337729',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex flex-col items-end gap-3 select-none">
      {/* 3D Layered GlassCard Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.85, rotateX: 15 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.85, rotateX: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mb-2"
          >
            <GlassCard
              phoneNumber={phoneNumber}
              onClose={() => setIsOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Bar */}
      <div className="flex items-center gap-3">
        {/* Sleek Pill Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-950/90 border border-emerald-500/50 text-emerald-400 hover:text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.25)] backdrop-blur-xl transition-all duration-300 cursor-pointer"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider">
            WhatsApp +91 83093 37729
          </span>
        </motion.button>

        {/* WhatsApp 3D Floating Circle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.12, rotate: 6 }}
          whileTap={{ scale: 0.92 }}
          className="relative group p-3.5 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white shadow-[0_0_35px_rgba(16,185,129,0.45)] cursor-pointer flex items-center justify-center transition-all duration-300"
          aria-label="Toggle 3D Glass WhatsApp Chat"
        >
          {/* Animated Outer Pulse */}
          <span className="absolute -inset-1.5 rounded-full bg-emerald-500/40 animate-pulse pointer-events-none blur-md" />
          
          {/* WhatsApp Logo */}
          <img
            src="/whatsapp-logo.png"
            alt="WhatsApp Logo"
            className="w-8 h-8 object-contain relative z-10 drop-shadow-lg"
          />

          {/* Hover Tooltip Label */}
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-slate-950 border border-emerald-500/40 text-emerald-400 text-[11px] font-mono font-bold uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-2xl">
            ⚡ 3D Glass WhatsApp Chat
          </span>
        </motion.button>
      </div>
    </div>
  );
};
