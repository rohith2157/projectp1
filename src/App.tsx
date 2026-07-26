import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Navigation } from './components/Navigation';
import { HeroScene } from './components/HeroScene';
import { CrossScrollBelts } from './components/CrossScrollBelts';
import { Services } from './components/Services';
import { FeaturedWorks } from './components/FeaturedWorks';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Process } from './components/Process';
import { Pricing } from './components/Pricing';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ProjectModal } from './components/ProjectModal';
import { type Project } from './data/projects';
import { AnimatedGradient } from '@/components/ui/animated-gradient-with-svg';
import { WhatsAppFloat } from './components/WhatsAppFloat';

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Initialize Lenis Smooth Scroll on Mount
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Scrolling Helpers
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="bg-background min-h-screen text-foreground relative selection:bg-blue-500 selection:text-white overflow-x-hidden">
      {/* Global Colorful Animated Theme Overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-40 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen">
        <AnimatedGradient 
          colors={["#3B82F6", "#EC4899", "#A78BFA", "#34D399", "#F59E0B"]} 
          speed={0.02} 
          blur="heavy" 
        />
      </div>

      {/* Dynamic Cursor spotlight overlay */}
      <CustomCursor />

      {/* Header Navigation HUD */}
      <Navigation
        onAboutClick={() => scrollToSection('services')}
        onWorkClick={() => scrollToSection('work')}
        onSkillsClick={() => scrollToSection('why-choose-us')}
        onProcessClick={() => scrollToSection('process')}
        onPricingClick={() => scrollToSection('pricing')}
        onContactClick={() => scrollToSection('contact')}
      />

      <div className="relative z-10 w-full flex flex-col bg-transparent">
        {/* Hero Cinematic Landing */}
        <div className="bg-transparent relative overflow-hidden">
          <HeroScene onExploreClick={() => scrollToSection('services')} />
        </div>

        {/* Diagonal moving marquee bands intersecting transition */}
        <CrossScrollBelts className="-mt-1 -mb-1" />

        {/* About Section / Core Offerings */}
        <Services />

        {/* Featured Showcase / Helix Experience */}
        <FeaturedWorks onSelectProject={setSelectedProject} />

        {/* Skills Section / Capabilities & Assets */}
        <WhyChooseUs />

        {/* Process / Workflow Timeline */}
        <Process />

        {/* Interactive Pricing Scene */}
        <div id="pricing" className="bg-transparent relative z-10">
          <Pricing />
        </div>

        {/* Climax Contact page */}
        <div id="contact" className="bg-transparent relative z-10">
          <Contact />
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Contact Widget */}
      <WhatsAppFloat phoneNumber="918309337729" />

      {/* Fullscreen Shared Takeover Image Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default App;
