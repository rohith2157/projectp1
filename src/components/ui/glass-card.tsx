import * as React from "react";
import { Phone, Send, X, Check, ChevronDown } from "lucide-react";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  phoneNumber?: string;
  defaultMessage?: string;
  onClose?: () => void;
}

const QUICK_TEMPLATES = [
  { label: "🚀 Portfolio", text: "Hi! I'd like to get a custom portfolio built by Pixel's & Portfolio's." },
  { label: "🎨 UI/UX Design", text: "Hi! I need high-end UI/UX design & motion branding." },
  { label: "⚡ Web App", text: "Hello! I am looking for a modern interactive Web App developer." },
];

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      title = "Pixel's & Portfolio's",
      subtitle = "Create & build custom elements with high motion.",
      phoneNumber = "918309337729",
      defaultMessage = "Hello! I am interested in your design & website services.\nI would like to discuss a project with Pixel's & Portfolio's.",
      onClose,
      className = "",
      ...props
    },
    ref
  ) => {
    const [message, setMessage] = React.useState(defaultMessage);
    const [copied, setCopied] = React.useState(false);
    const [tilt, setTilt] = React.useState({ x: 0, y: 0 });

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Interactive 3D Mouse Parallax Tilt calculation matching reference 3D rotate
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setTilt({
        x: (-y / rect.height) * 25,
        y: (x / rect.width) * 25,
      });
    };

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 });
    };

    const handleCopyNumber = () => {
      navigator.clipboard.writeText('+918309337729');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`group h-[380px] w-[310px] sm:w-[340px] [perspective:1000px] select-none ${className}`}
        {...props}
      >
        <div
          style={{
            transform: `rotate3d(1, 1, 0, ${(Math.abs(tilt.x) + Math.abs(tilt.y)) / 2 || 0}deg) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          }}
          className="relative h-full rounded-[50px] bg-gradient-to-br from-zinc-900 to-black shadow-2xl transition-all duration-300 ease-out [transform-style:preserve-3d] border border-white/10 group-hover:[box-shadow:rgba(0,0,0,0.4)_30px_50px_25px_-40px,rgba(16,185,129,0.2)_0px_25px_30px_0px]"
        >
          {/* Glass Overlay Layer matching 21st.dev reference */}
          <div className="absolute inset-2 rounded-[45px] border-b border-l border-white/20 bg-gradient-to-b from-white/30 to-white/10 backdrop-blur-sm [transform-style:preserve-3d] [transform:translate3d(0,0,25px)] pointer-events-none" />

          {/* Concentric 3D Spheres in Top-Right Corner */}
          <div className="absolute top-0 right-0 pointer-events-none [transform-style:preserve-3d]">
            {[
              { size: "170px", pos: "8px", z: "20px", delay: "0s" },
              { size: "140px", pos: "10px", z: "40px", delay: "0.4s" },
              { size: "110px", pos: "17px", z: "60px", delay: "0.8s" },
              { size: "80px", pos: "23px", z: "80px", delay: "1.2s" },
            ].map((circle, index) => (
              <div
                key={index}
                className="absolute aspect-square rounded-full bg-white/10 shadow-[rgba(100,100,111,0.2)_-10px_10px_20px_0px] transition-all duration-500 ease-in-out border border-white/15"
                style={{
                  width: circle.size,
                  top: circle.pos,
                  right: circle.pos,
                  transform: `translate3d(0, 0, ${circle.z})`,
                  transitionDelay: circle.delay,
                }}
              />
            ))}

            {/* Floating Top-Right White Logo Badge at z:100px */}
            <div
              className="absolute grid aspect-square w-[50px] place-content-center rounded-full bg-white shadow-[rgba(100,100,111,0.3)_-10px_10px_20px_0px] transition-all duration-500 ease-in-out [transform:translate3d(0,0,100px)] group-hover:[transform:translate3d(0,0,120px)] cursor-pointer"
              style={{ top: "25px", right: "25px" }}
            >
              <img
                src="/whatsapp-logo.png"
                alt="WhatsApp Logo"
                className="w-6 h-6 object-contain"
              />
            </div>
          </div>

          {/* Close Button Top Left */}
          {onClose && (
            <div className="absolute top-5 left-5 z-30 [transform-style:preserve-3d] [transform:translate3d(0,0,35px)]">
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer"
                aria-label="Close card"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* Card Text Content Layer at z:26px */}
          <div className="absolute inset-0 p-6 flex flex-col justify-between [transform-style:preserve-3d] [transform:translate3d(0,0,26px)] z-20">
            {/* Title & Subtitle */}
            <div className="pt-10">
              <span className="block text-xl font-black text-white tracking-tight">
                {title}
              </span>
              <span className="mt-1 block text-xs text-zinc-300 font-sans leading-relaxed">
                {subtitle}
              </span>

              {/* Status Chip with copy action */}
              <button
                onClick={handleCopyNumber}
                className="mt-3 flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 hover:bg-emerald-500/30 transition-all cursor-pointer"
                title="Click to copy phone number"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] font-mono font-bold text-emerald-300">
                  Online • +91 83093 37729
                </span>
                {copied && <Check size={10} className="text-emerald-400" />}
              </button>
            </div>

            {/* Quick Presets */}
            <div className="my-1 [transform:translate3d(0,0,10px)]">
              <div className="flex flex-wrap gap-1">
                {QUICK_TEMPLATES.map((tmpl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMessage(tmpl.text)}
                    className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-zinc-200 transition-all cursor-pointer"
                  >
                    {tmpl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Editable Message Textarea */}
            <div className="[transform:translate3d(0,0,15px)]">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={2}
                className="w-full bg-black/60 border border-white/20 rounded-xl p-2.5 text-xs font-mono text-zinc-100 focus:outline-none focus:border-emerald-400 resize-none transition-all"
              />
            </div>

            {/* Bottom Actions Layer at z:50px matching 21st.dev screenshot */}
            <div className="flex items-center justify-between pt-2 [transform-style:preserve-3d] [transform:translate3d(0,0,50px)]">
              {/* Round Social / Direct Action Icon Buttons on Left */}
              <div className="flex items-center gap-2 [transform-style:preserve-3d]">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-[32px] w-[32px] place-content-center rounded-full bg-white shadow-[rgba(0,0,0,0.5)_0px_7px_5px_-5px] transition-all duration-200 ease-in-out hover:bg-emerald-500 hover:[transform:translate3d(0,0,15px)] cursor-pointer"
                  title="Direct WhatsApp"
                >
                  <Send className="h-3.5 w-3.5 stroke-black" />
                </a>

                <a
                  href="tel:+918309337729"
                  className="grid h-[32px] w-[32px] place-content-center rounded-full bg-white shadow-[rgba(0,0,0,0.5)_0px_7px_5px_-5px] transition-all duration-200 ease-in-out hover:bg-black hover:[transform:translate3d(0,0,15px)] group/btn cursor-pointer"
                  title="Call Studio"
                >
                  <Phone className="h-3.5 w-3.5 stroke-black group-hover/btn:stroke-white transition-colors" />
                </a>
              </div>

              {/* View More / Send Message Button with Chevron on Right */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 cursor-pointer transition-all duration-200 ease-in-out hover:[transform:translate3d(0,0,10px)]"
              >
                <span className="text-xs font-bold text-white">Chat on WhatsApp</span>
                <ChevronDown className="h-4 w-4 stroke-white -rotate-90" strokeWidth={3} />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export default GlassCard;

