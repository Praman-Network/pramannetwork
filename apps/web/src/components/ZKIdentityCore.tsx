import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import { Lock, ScanFace } from 'lucide-react';

export default function ZKIdentityCore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [hexText, setHexText] = useState('0x3A5B');

  // Framer Motion values for Mouse Magnetic Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for rotation
  const springConfig = { damping: 25, stiffness: 120 };
  const rotateX = useSpring(useTransform(mouseY, [-180, 180], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-180, 180], [-15, 15]), springConfig);

  // Tracking Scroll state for scale down and dissolve mapping
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 450], [1, 0.65]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const translateY = useTransform(scrollY, [0, 500], [0, 100]);

  // Hexadecimal random cycle effect
  useEffect(() => {
    if (hovered) {
      setHexText('VERIFIED');
      return;
    }

    const interval = setInterval(() => {
      const chars = '0123456789ABCDEF';
      let result = '0x';
      for (let i = 0; i < 4; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
      setHexText(result);
    }, 150);

    return () => clearInterval(interval);
  }, [hovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Compute distance from center of the container
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="relative w-full max-w-md aspect-square flex items-center justify-center select-none">
      {/* Dynamic glow back-shadow */}
      <div 
        className={`absolute inset-10 rounded-full blur-[80px] transition-all duration-700 pointer-events-none z-0 ${
          hovered ? 'bg-[#00F0FF]/15' : 'bg-purple-900/10'
        }`} 
      />

      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ 
          scale, 
          opacity, 
          y: translateY,
          rotateX, 
          rotateY, 
          perspective: 1000,
          transformStyle: 'preserve-3d'
        }}
        className="relative w-80 h-80 flex items-center justify-center cursor-pointer z-10"
      >
        {/* Circle 1: Outer concentric Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="absolute inset-0 border border-dashed border-[#00F0FF]/30 rounded-full"
          style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}
        />

        {/* Circle 2: Mid concentric Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          className="absolute w-60 h-60 border border-dashed border-purple-500/20 rounded-full"
          style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}
        />

        {/* Circle 3: Inner dotted Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          className="absolute w-44 h-44 border border-dotted border-[#00F0FF]/15 rounded-full"
          style={{ transform: 'translateZ(60px)', transformStyle: 'preserve-3d' }}
        />

        {/* Center glowing identity sphere */}
        <motion.div
          className={`absolute w-28 h-28 rounded-full border flex items-center justify-center backdrop-blur-md transition-all duration-500 z-10 ${
            hovered 
              ? 'bg-[#00F0FF]/10 border-[#00F0FF]/50 shadow-[0_0_35px_#00F0FF] scale-105' 
              : 'bg-[#0B0E14]/70 border-gray-800 shadow-[0_0_20px_rgba(0,0,0,0.5)]'
          }`}
          style={{ transform: 'translateZ(80px)' }}
        >
          <AnimatePresence mode="wait">
            {hovered ? (
              <motion.div
                key="lock"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Lock className="h-10 w-10 text-[#00F0FF] filter drop-shadow-[0_0_8px_#00F0FF]" />
              </motion.div>
            ) : (
              <motion.div
                key="scan"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ScanFace className="h-10 w-10 text-[#00F0FF] opacity-80" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Glitch Proof status display box */}
        <motion.div
          className={`absolute -top-2 -right-2 px-3 py-1.5 rounded-lg border font-mono text-[10px] font-bold tracking-widest transition-all duration-300 ${
            hovered 
              ? 'bg-[#00F0FF]/15 border-[#00F0FF]/50 text-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.4)]' 
              : 'bg-black/90 border-gray-850 text-slate-500 shadow-md'
          }`}
          style={{ transform: 'translateZ(100px)' }}
        >
          {hexText}
        </motion.div>
      </motion.div>
    </div>
  );
}
