import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function AmbientSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Matrix characters: Binary, Hex, ZK math, and Cryptography symbols
    const chars = "01λ𝔽πθpk-vkH(x)zk-SNARKPROVED1010".split("");
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize) + 1;
    
    // Y-coordinate tracks for each column
    const YPositions = Array(columns).fill(0).map(() => Math.random() * -canvas.height);
    // Speed tracks for each column (pixels per frame)
    const speeds = Array(columns).fill(0).map(() => 0.8 + Math.random() * 1.5);
    // Opacity tracks for each column
    const opacities = Array(columns).fill(0).map(() => 0.05 + Math.random() * 0.15);

    let animationId: number;

    const draw = () => {
      // Clear with slight trailing opacity to create a subtle glow effect
      ctx.fillStyle = "rgba(9, 9, 11, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `600 ${fontSize}px 'Space Grotesk', monospace`;

      for (let i = 0; i < YPositions.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = YPositions[i];

        // Cyan-teal / Purple gradient feel for Web3 + AI mix
        if (i % 3 === 0) {
          ctx.fillStyle = `rgba(0, 240, 255, ${opacities[i]})`; // Cyan
        } else if (i % 3 === 1) {
          ctx.fillStyle = `rgba(168, 85, 247, ${opacities[i]})`; // Purple
        } else {
          ctx.fillStyle = `rgba(14, 165, 233, ${opacities[i]})`; // Sky Blue
        }

        ctx.fillText(char, x, y);

        // Move down by column speed
        YPositions[i] += speeds[i];

        // Reset drop to top if it goes off screen (randomized threshold)
        if (YPositions[i] > canvas.height + 50) {
          YPositions[i] = -50 - Math.random() * 100;
          speeds[i] = 0.8 + Math.random() * 1.5;
          opacities[i] = 0.05 + Math.random() * 0.15;
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
    <div className="fixed inset-0 w-full h-full bg-[#09090b] pointer-events-none z-0 overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-web3-grid opacity-60" />

      {/* Interactive Canvas Drizzle */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-70"
      />

      {/* Fractal noise overlay - slightly enhanced opacity for professional textured look */}
      <div 
        className="absolute inset-0 bg-noise mix-blend-overlay opacity-[0.09]" 
        style={{ pointerEvents: 'none' }}
      />

      {/* Floating Cyan Neon Blob (top-left) */}
      <motion.div
        className="absolute top-[-10%] left-[-15%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-[#00F0FF]/6 blur-[120px]"
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Amber/Gold Cyber Blob (bottom-right) */}
      <motion.div
        className="absolute bottom-[-10%] right-[-15%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full bg-[#FBBF24]/4 blur-[150px]"
        animate={{
          scale: [1, 1.25, 1],
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
