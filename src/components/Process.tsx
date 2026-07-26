import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { CosmicSpectrum } from './ui/cosmos-spectrum';

interface ProcessStep {
  num: string;
  title: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    num: '01',
    title: 'Discovery',
    description: 'We align on your career goals, target audience, and professional story. We explore layout styles, typography references, and creative inspirations.'
  },
  {
    num: '02',
    title: 'Planning',
    description: 'We map out the content hierarchy, copy structures, and technical scope. We finalize choices for your tech stack, domain naming, and SEO keywords.'
  },
  {
    num: '03',
    title: 'Design',
    description: 'We design high-fidelity visual mockups of key viewports. We balance editorial whitespace, select harmony colors, and configure micro-interactions.'
  },
  {
    num: '04',
    title: 'Development',
    description: 'We write clean, modular React and TypeScript code using Vite. We build premium, hardware-accelerated scroll animations with Framer Motion.'
  },
  {
    num: '05',
    title: 'Refinement',
    description: 'We audit speeds, verify cross-device responsive flows, clean metadata tags, and fine-tune spring values to guarantee 60fps performance.'
  },
  {
    num: '06',
    title: 'Launch',
    description: 'We deploy to secure SSL hosting on Vercel, connect your custom domains, configure analytics, and publish your personal branding to the world.'
  }
];

export const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  const pathLength = useSpring(scrollYProgress, { damping: 30, stiffness: 150 });

  return (
    <section 
      ref={containerRef}
      id="process" 
      className="py-24 md:py-36 bg-studio-bg relative overflow-hidden"
    >
      {/* Full Section Background Cosmic Spectrum Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen">
        <CosmicSpectrum color="original" blur={true} />
      </div>

      <div className="max-w-4xl mx-auto px-6 w-full relative z-10">
        
        {/* Editorial Section Header */}
        <div className="text-center pb-16 border-b border-studio-border/20 mb-24 relative flex flex-col items-center justify-center">

          <span className="text-xs uppercase tracking-[0.25em] font-bold text-studio-muted font-mono mb-4">
            &#123; The Workflow &#125;
          </span>
          <h2 className="text-4xl md:text-7xl font-black tracking-tight text-studio-dark font-editorial uppercase mt-4 leading-none">
            Our Process
          </h2>
          <p className="text-sm md:text-base text-studio-muted font-sans mt-6 max-w-md mx-auto leading-relaxed font-medium text-pretty">
            We follow an engineering-guided design model to translate visual concepts into performance code.
          </p>
        </div>

        {/* Timeline with Scrolling SVG Drawing Line */}
        <div className="relative">
          
          {/* Scrolling SVG Line (Draws as user scrolls) */}
          <div className="absolute left-[30px] md:left-1/2 top-[30px] bottom-[30px] w-[2px] -translate-x-1/2 pointer-events-none">
            {/* Background trace line */}
            <div className="absolute inset-0 bg-studio-border/20" />
            
            {/* Active self-drawing SVG path */}
            <svg className="w-full h-full" preserveAspectRatio="none">
              <motion.line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="var(--color-studio-gold)"
                strokeWidth="2"
                style={{ pathLength }}
              />
            </svg>
          </div>

          <div className="space-y-20 md:space-y-28">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={step.num} 
                  className={`flex flex-col md:flex-row relative ${
                    isEven ? '' : 'md:flex-row-reverse'
                  }`}
                >
                  
                  {/* Timeline Node with scaling spring */}
                  <div className="absolute left-[30px] md:left-1/2 -translate-x-1/2 top-0 z-20">
                    <motion.div
                      initial={{ scale: 0.7, opacity: 0.3 }}
                      whileInView={{ scale: 1, opacity: 1, backgroundColor: 'var(--color-studio-bg)', borderColor: 'var(--color-studio-gold)' }}
                      viewport={{ once: false, margin: '-150px' }}
                      transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
                      className="w-[60px] h-[60px] rounded-full border-2 border-studio-border bg-studio-bg flex items-center justify-center font-mono font-bold text-sm text-studio-dark shadow-xl"
                    >
                      {step.num}
                    </motion.div>
                  </div>

                  {/* Content Container (Slides in with blur reveal) */}
                  <div className="w-full md:w-1/2 pl-16 md:pl-0">
                    <motion.div
                      initial={{ 
                        opacity: 0, 
                        x: isEven ? -50 : 50,
                        filter: 'blur(6px)' 
                      }}
                      whileInView={{ 
                        opacity: 1, 
                        x: 0,
                        filter: 'blur(0px)' 
                      }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className={`p-8 glass-card glass-card-hover border border-studio-border/20 shadow-2xl relative group hover:border-studio-gold transition-all duration-300 rounded-2xl ${
                        isEven ? 'md:mr-12 md:text-right' : 'md:ml-12'
                      }`}
                    >
                      <h3 className="text-2xl md:text-3xl font-black font-editorial text-studio-dark uppercase tracking-tight mb-4 group-hover:text-studio-gold transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-sm text-studio-muted leading-relaxed font-sans font-medium text-pretty group-hover:text-studio-dark transition-colors duration-300">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  <div className="hidden md:block w-1/2" />

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
