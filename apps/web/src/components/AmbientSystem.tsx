import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function AmbientSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const chars = "01λ𝔽πθpk-vkH(x)zk-SNARKPROVED1010[σ]e(g,g)αβγ".split("");
    const fontSize = 11;
    const columns = Math.floor(canvas.width / fontSize) + 1;
    
    const YPositions = Array(columns).fill(0).map(() => Math.random() * -canvas.height);
    const speeds = Array(columns).fill(0).map(() => 0.5 + Math.random() * 1.0);
    const opacities = Array(columns).fill(0).map(() => 0.02 + Math.random() * 0.08);

    let animationId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(5, 5, 10, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `600 ${fontSize}px 'Space Grotesk', monospace`;

      for (let i = 0; i < YPositions.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = YPositions[i];

        if (i % 4 === 0) {
          ctx.fillStyle = `rgba(13, 242, 201, ${opacities[i]})`; // Emerald-Teal
        } else if (i % 4 === 1) {
          ctx.fillStyle = `rgba(0, 240, 255, ${opacities[i]})`; // Cyan
        } else {
          ctx.fillStyle = `rgba(5, 150, 105, ${opacities[i] * 0.7})`; // Deep Mint Green
        }

        ctx.fillText(char, x, y);

        YPositions[i] += speeds[i];

        if (YPositions[i] > canvas.height + 50) {
          YPositions[i] = -50 - Math.random() * 100;
          speeds[i] = 0.5 + Math.random() * 1.0;
          opacities[i] = 0.02 + Math.random() * 0.08;
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#030508] pointer-events-none z-0 overflow-hidden">
      {/* 1. Matrix digital line grid */}
      <div className="absolute top-[-5rem] left-[-5rem] w-[calc(100%+5rem)] h-[calc(100%+5rem)] bg-web3-grid opacity-30 animate-grid-flow" />

      {/* 2. Cryptographic matrix rain */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-40"
      />

      {/* 3. Outer dark vignette overlay (dark middle, deep outer borders) */}
      <div className="absolute inset-0 bg-vignette z-10" />

      {/* 4. Textured heavy noise layer to replicate Bondex grain */}
      <div className="absolute inset-0 bg-noise z-20" />

      {/* 5. Drift glowing gradients mirroring Bondex (Teal / Cyan sides & corners) */}
      
      {/* Top Left Corner Glow (Teal-Green) */}
      <motion.div
        className="absolute top-[-25%] left-[-20%] w-[85vw] h-[85vw] max-w-[1000px] max-h-[1000px] rounded-full bg-gradient-to-br from-[#0DF2C9]/18 to-[#059669]/10 blur-[140px] z-0"
        animate={{
          scale: [1, 1.1, 0.95, 1],
          x: [0, 20, -10, 0],
          y: [0, -20, 10, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Top Right Corner Glow (Cyan-Teal) */}
      <motion.div
        className="absolute top-[-20%] right-[-15%] w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] rounded-full bg-gradient-to-bl from-[#00F0FF]/15 to-[#0DF2C9]/8 blur-[130px] z-0"
        animate={{
          scale: [0.95, 1.08, 1, 0.95],
          x: [0, -15, 20, 0],
          y: [0, 25, -15, 0],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Mid Left Edge Glow (Emerald Mint) */}
      <motion.div
        className="absolute top-[25%] left-[-25%] w-[60vw] h-[65vw] rounded-full bg-[#0DF2C9]/12 blur-[150px] z-0"
        animate={{
          scale: [1, 1.15, 1],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Mid Right Edge Glow (Vibrant Teal) */}
      <motion.div
        className="absolute top-[20%] right-[-25%] w-[65vw] h-[70vw] rounded-full bg-gradient-to-l from-[#0DF2C9]/15 to-[#00F0FF]/10 blur-[150px] z-0"
        animate={{
          scale: [1.1, 0.9, 1.1],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Bottom Left Corner Glow (Teal-Mint) */}
      <motion.div
        className="absolute bottom-[-20%] left-[-15%] w-[75vw] h-[75vw] rounded-full bg-[#059669]/10 blur-[140px] z-0"
        animate={{
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
        }}
      />

      {/* Bottom Right Corner Glow (Teal-Cyan mix) */}
      <motion.div
        className="absolute bottom-[-25%] right-[-20%] w-[90vw] h-[90vw] max-w-[1100px] max-h-[1100px] rounded-full bg-gradient-to-tr from-[#0DF2C9]/18 to-[#00F0FF]/12 blur-[150px] z-0"
        animate={{
          scale: [1, 1.12, 0.9, 1],
          x: [0, -30, 15, 0],
          y: [0, 30, -20, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
