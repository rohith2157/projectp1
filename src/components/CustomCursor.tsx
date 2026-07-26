import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [hoverType, setHoverType] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // High precision mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Butter-smooth spring physics (ultra-responsive trailing effect)
  const springConfig = { damping: 28, stiffness: 450, mass: 0.15 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Velocity stretch calculation for dynamic liquid movement
  const [stretch, setStretch] = useState({ scaleX: 1, scaleY: 1, angle: 0 });

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastTime = performance.now();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      if (!isVisible) setIsVisible(true);

      // Compute velocity & stretch direction
      const now = performance.now();
      const dt = Math.max(now - lastTime, 1);
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const velocity = Math.hypot(dx, dy) / dt;

      const maxStretch = 0.3;
      const computedStretch = Math.min(velocity * 0.08, maxStretch);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      setStretch({
        scaleX: 1 + computedStretch,
        scaleY: Math.max(1 - computedStretch, 0.7),
        angle
      });

      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        // Check for specific data-cursor attributes
        const cursorDataEl = target.closest('[data-cursor]') as HTMLElement | null;
        if (cursorDataEl) {
          const type = cursorDataEl.getAttribute('data-cursor');
          setHoverType(type);
          return;
        }

        // Check for inputs/textareas
        const isInput = target.closest('input, textarea, [contenteditable="true"]') !== null;
        if (isInput) {
          setHoverType('text');
          return;
        }

        // Check for clickable/interactive elements
        const isInteractive = target.closest('a, button, [role="button"], select, .cursor-pointer, [onClick]') !== null;
        setHoverType(isInteractive ? 'interactive' : null);
      }
    };

    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  // Determine dynamic visual styles based on hover state
  const getCursorStyle = () => {
    switch (hoverType) {
      case 'view':
        return {
          width: 72,
          height: 72,
          text: 'VIEW',
          color: '#10B981',
          border: '1.5px solid #10B981',
          bg: 'rgba(16, 185, 129, 0.15)',
          glow: '0 0 25px rgba(16, 185, 129, 0.4)',
        };
      case 'copy':
        return {
          width: 72,
          height: 72,
          text: 'COPY',
          color: '#B89C65',
          border: '1.5px solid #B89C65',
          bg: 'rgba(184, 156, 101, 0.18)',
          glow: '0 0 25px rgba(184, 156, 101, 0.4)',
        };
      case 'text':
        return {
          width: 4,
          height: 24,
          text: '',
          color: '#10B981',
          border: 'none',
          bg: '#10B981',
          glow: '0 0 10px rgba(16, 185, 129, 0.8)',
        };
      case 'interactive':
        return {
          width: 46,
          height: 46,
          text: '',
          color: '#10B981',
          border: '1.5px solid rgba(16, 185, 129, 0.8)',
          bg: 'rgba(16, 185, 129, 0.12)',
          glow: '0 0 20px rgba(16, 185, 129, 0.3)',
        };
      default:
        return {
          width: 24,
          height: 24,
          text: '',
          color: '#B89C65',
          border: '1.5px solid rgba(184, 156, 101, 0.6)',
          bg: 'rgba(184, 156, 101, 0.05)',
          glow: '0 0 12px rgba(184, 156, 101, 0.2)',
        };
    }
  };

  const currentStyle = getCursorStyle();

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden select-none">
      {/* Outer Smooth Motion Aura Ring */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          rotate: stretch.angle,
          scaleX: stretch.scaleX,
          scaleY: stretch.scaleY,
        }}
        animate={{
          width: currentStyle.width,
          height: currentStyle.height,
          backgroundColor: currentStyle.bg,
          borderColor: currentStyle.color,
          boxShadow: currentStyle.glow,
          borderRadius: hoverType === 'text' ? '2px' : '9999px',
        }}
        transition={{
          type: 'spring',
          stiffness: 550,
          damping: 32,
          mass: 0.1,
        }}
        className="fixed top-0 left-0 border pointer-events-none flex items-center justify-center backdrop-blur-[1px]"
      >
        {/* Floating Label Text inside Cursor */}
        <AnimatePresence>
          {currentStyle.text && (
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              className="text-[10px] font-mono tracking-widest font-black"
              style={{ color: currentStyle.color, transform: `rotate(${-stretch.angle}deg)` }}
            >
              {currentStyle.text}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Inner Real-Time Instant Pointer Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: hoverType === 'text' ? 0 : hoverType === 'interactive' ? 0.6 : 1,
          backgroundColor: hoverType ? '#10B981' : '#B89C65',
        }}
        transition={{ duration: 0.1 }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none shadow-[0_0_8px_rgba(16,185,129,0.8)]"
      />
    </div>
  );
};
