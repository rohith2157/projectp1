import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Briefcase, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";

interface ServiceItem {
  id: string;
  num: string;
  category: string;
  title: string;
  focus: string;
  description: string;
  audience: string[];
  icon: React.ReactNode;
  colorClass: string;
  borderClass: string;
  bgGradient: string;
}

const services: ServiceItem[] = [
  {
    id: 'student-portfolio',
    num: '01',
    category: 'Academic & Entry',
    title: 'Student Portfolios',
    focus: 'Direct Career Gateway',
    description: 'We construct highly structured single-page layouts optimized for recruiter review. Ideal for showcasing academic projects, core capabilities, and internship logs with clarity and visual precision.',
    audience: ['Students', 'Freshers', 'Interns'],
    icon: <GraduationCap size={24} />,
    colorClass: 'text-blue-500',
    borderClass: 'border-blue-500/30',
    bgGradient: 'from-blue-500/10 via-blue-500/5 to-transparent'
  },
  {
    id: 'professional-portfolio',
    num: '02',
    category: 'Commercial Showcase',
    title: 'Professional Hubs',
    focus: 'Freelance & Corporate Authority',
    description: 'Custom multi-page web applications with interactive case studies, responsive resumes, and integrated SEO meta settings designed to capture client interest and command premium rates.',
    audience: ['Developers', 'Designers', 'Consultants'],
    icon: <Briefcase size={24} />,
    colorClass: 'text-purple-500',
    borderClass: 'border-purple-500/30',
    bgGradient: 'from-purple-500/10 via-purple-500/5 to-transparent'
  },
  {
    id: 'premium-brand',
    num: '03',
    category: 'Elite Identity',
    title: 'Premium Branding',
    focus: 'Enterprise Reputation Platform',
    description: 'Bespoke, cinematic digital experiences built around individual thought leaders. Features headless CMS integration, advanced micro-interactions, custom brand styling, and direct consultation.',
    audience: ['Founders', 'Creators', 'Executives'],
    icon: <Sparkles size={24} />,
    colorClass: 'text-amber-500',
    borderClass: 'border-amber-500/30',
    bgGradient: 'from-amber-500/10 via-amber-500/5 to-transparent'
  }
];

export const Services: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 md:py-36 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Header */}
        <div className="mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-widest font-bold text-studio-muted block mb-4 font-mono"
          >
            &#123; Core Offerings &#125;
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-foreground font-editorial uppercase leading-none drop-shadow-sm"
          >
            Core <br />Offerings
          </motion.h2>
        </div>

        {/* Premium Accordion Rows */}
        <div className="flex flex-col border-t border-foreground/10">
          {services.map((service, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={service.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setHoveredIndex(hoveredIndex === index ? null : index)}
                className="relative border-b border-foreground/10 cursor-pointer overflow-hidden group"
              >
                {/* Colorful Animated Background on Hover */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={cn("absolute inset-0 bg-gradient-to-r pointer-events-none z-0", service.bgGradient)}
                />

                <div className="relative z-10 py-8 md:py-12 px-4 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  {/* Left Side: Index & Title */}
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 w-full md:w-1/2">
                    <span className={cn(
                      "text-sm md:text-base font-mono font-bold transition-colors duration-300",
                      isHovered ? service.colorClass : "text-muted-foreground"
                    )}>
                      {service.num}
                    </span>
                    <h3 className={cn(
                      "text-3xl sm:text-4xl md:text-5xl font-black font-editorial uppercase tracking-tighter transition-all duration-500",
                      isHovered ? service.colorClass + " scale-[1.02] origin-left drop-shadow-xl" : "text-foreground"
                    )}>
                      {service.title}
                    </h3>
                  </div>

                  {/* Right Side: Category & Arrow */}
                  <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-1/2">
                    <div className="flex flex-col items-start md:items-end">
                      <span className="text-xs sm:text-sm uppercase font-mono tracking-widest font-bold text-foreground">
                        {service.category}
                      </span>
                      <span className="text-xs text-muted-foreground mt-1 flex items-center gap-2 font-sans">
                        <span className={cn("transition-colors duration-300", isHovered ? service.colorClass : "")}>
                          {service.icon}
                        </span>
                        {service.focus}
                      </span>
                    </div>
                    
                    <motion.div 
                      animate={{ 
                        rotate: isHovered ? -45 : 0,
                        backgroundColor: isHovered ? "var(--foreground)" : "transparent",
                        color: isHovered ? "var(--background)" : "var(--foreground)",
                      }}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-foreground/20 flex items-center justify-center shrink-0 transition-all duration-300 shadow-md"
                    >
                      <ArrowRight size={24} />
                    </motion.div>
                  </div>
                </div>

                {/* Expanding Description (Accordion) */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="relative z-10 px-4 md:px-8 pb-8 md:pl-[8.5rem]"
                    >
                      <div className="max-w-3xl">
                        <p className="text-sm md:text-base text-foreground/80 leading-relaxed font-sans font-medium text-pretty">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap gap-3 mt-6">
                          {service.audience.map((aud) => (
                            <span
                              key={aud}
                              className={cn(
                                "text-xs font-mono uppercase tracking-widest px-4 py-1.5 rounded-full border transition-all duration-300 shadow-sm backdrop-blur-md",
                                isHovered ? `${service.borderClass} bg-background/70 ${service.colorClass} shadow-md` : "border-foreground/20 text-muted-foreground"
                              )}
                            >
                              {aud}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
