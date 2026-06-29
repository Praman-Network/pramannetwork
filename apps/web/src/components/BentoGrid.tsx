import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Bot, Network, ShieldCheck, Activity, Terminal } from 'lucide-react';

interface BentoCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
  glowColor?: string;
  children?: React.ReactNode;
}

function BentoCard({ title, description, icon: Icon, className = "", glowColor = "rgba(0, 240, 255, 0.15)", children }: BentoCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden group hover:border-[#00F0FF]/40 hover:shadow-[0_0_50px_rgba(0,240,255,0.08)] transition-all duration-500 flex flex-col justify-between h-full ${className}`}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <div
        className="absolute pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 80%)`,
          inset: 0,
        }}
      />

      <div className="space-y-6 relative z-10">
        {/* High-tech Icon Frame */}
        <div className="p-3 w-fit rounded-xl bg-zinc-950 border border-white/10 group-hover:border-[#00F0FF]/40 shadow-[0_0_15px_rgba(0,240,255,0.05)] group-hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-500">
          <Icon className="h-6 w-6 text-[#00F0FF] group-hover:scale-110 transition-transform duration-300" />
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl font-display font-bold text-white group-hover:text-[#00F0FF] transition-colors duration-300">
            {title}
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed font-light font-sans max-w-xl">
            {description}
          </p>
        </div>
      </div>

      {children && (
        <div className="relative z-10 w-full mt-6">
          {children}
        </div>
      )}
    </div>
  );
}

export default function BentoGrid() {
  return (
    <section id="features" className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title / Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-20"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/10 bg-zinc-950/80 text-[10px] tracking-widest uppercase font-semibold text-[#00F0FF] font-display">
            Protocol Capabilities
          </div>
          <h2 className="text-4xl font-display font-bold text-white tracking-tight">
            The Trust Engine of <span className="text-[#00F0FF] text-glow-cyan font-bold">Decentralized Logic</span>
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto font-light leading-relaxed">
            The Praman Network protocol guarantees cryptographically verifiable execution, combining advanced zero-knowledge primitives with low-latency consensus.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[420px]">
          
          {/* Card 1: Proof Engines (Double Width) */}
          <div className="md:col-span-2">
            <BentoCard
              title="Proof Engines"
              description="High-performance zk-SNARK provers executing in-browser. Capable of processing complex biometric vector datasets and identity commitments in sub-second times."
              icon={Cpu}
            >
              {/* Graphic element for Proof Pipeline */}
              <div className="w-full h-32 rounded-xl bg-zinc-950/50 border border-white/5 overflow-hidden p-4 relative flex items-center justify-between font-mono text-[10px] text-zinc-500">
                <div className="flex flex-col justify-between h-full py-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-zinc-300">PROVER_NODE_01</span>
                  </div>
                  <div className="text-[#00F0FF] font-bold">GEN_GROTH16_PROOF</div>
                  <div>TIME: 342ms</div>
                </div>
                <div className="flex items-center space-x-2 flex-grow mx-8 justify-center relative">
                  <div className="w-full h-[1px] bg-gradient-to-r from-[#00F0FF] via-purple-500 to-transparent relative">
                    <motion.div
                      animate={{ x: ['0%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="absolute top-[-2px] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#00F0FF]"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-between h-full py-1 text-right">
                  <div className="text-purple-400">VERIFIER_CONTRACT</div>
                  <div className="text-emerald-400">STATUS: VERIFIED</div>
                  <div className="text-zinc-600">GAS: 231k</div>
                </div>
              </div>
            </BentoCard>
          </div>

          {/* Card 2: AI Analysis (Single Width) */}
          <div className="md:col-span-1">
            <BentoCard
              title="AI Analysis"
              description="Automated telemetry and vulnerability scanning. Analyzes smart contract compiler outputs before proofs are generated."
              icon={Bot}
            >
              <div className="flex flex-col space-y-2 mt-2">
                <div className="flex justify-between text-xs text-zinc-500 font-mono">
                  <span>AST SCANNER</span>
                  <span className="text-emerald-400">100% SECURE</span>
                </div>
                <div className="w-full bg-zinc-950/60 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="bg-gradient-to-r from-purple-500 to-[#00F0FF] h-full"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-zinc-600 font-mono pt-1">
                  <span>CRITICALS: 0</span>
                  <span>WARNINGS: 0</span>
                </div>
              </div>
            </BentoCard>
          </div>

          {/* Card 3: Decentralized Consensus (Single Width) */}
          <div className="md:col-span-1">
            <BentoCard
              title="Decentralized Consensus"
              description="A multi-node validation matrix ensuring biometric integrity without compromising user credentials or wallet keys."
              icon={Network}
            >
              <div className="relative h-24 flex items-center justify-center">
                <div className="absolute w-16 h-16 rounded-full border border-dashed border-[#00F0FF]/30 animate-spin" style={{ animationDuration: '12s' }} />
                <div className="absolute w-8 h-8 rounded-full border border-dotted border-purple-500/50 animate-spin" style={{ animationDuration: '6s' }} />
                <Activity className="h-6 w-6 text-[#00F0FF] animate-pulse" />
              </div>
            </BentoCard>
          </div>

          {/* Card 4: Zero-Knowledge Auditing (Double Width) */}
          <div className="md:col-span-2">
            <BentoCard
              title="Zero-Knowledge Auditing"
              description="Compile and verify compliance math without exposing underlying database schemas, logic trees, or developer profiles. Keeps auditing processes cryptographically private."
              icon={ShieldCheck}
            >
              <div className="w-full h-32 rounded-xl bg-zinc-950/50 border border-white/5 overflow-hidden p-4 relative font-mono text-xs text-zinc-400 flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="flex items-center space-x-2 text-[10px] text-zinc-500">
                    <Terminal className="h-3 w-3 text-[#00F0FF]" />
                    <span>audit_engine.sh</span>
                  </div>
                  <span className="text-[9px] bg-purple-950/60 border border-purple-800/50 text-purple-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    COMPLIANT
                  </span>
                </div>
                <div className="space-y-1 py-2 text-[10px] text-zinc-500 leading-normal">
                  <div>$ praman-audit --input ./circuits/biometric.circom</div>
                  <div className="text-zinc-300">&gt; Computing R1CS constraint matrix...</div>
                  <div className="text-[#00F0FF]">&gt; Verification Key generated (vk.json) - Success</div>
                </div>
              </div>
            </BentoCard>
          </div>

        </div>
      </div>
    </section>
  );
}
