import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Shield, ArrowRight } from 'lucide-react';

export default function DualGateway() {
  const [hoveredCard, setHoveredCard] = useState<'left' | 'right' | null>(null);

  return (
    <section className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl font-display font-bold text-white">
            Choose Your <span className="text-[#00F0FF]">Workspace</span>
          </h2>
          <p className="text-zinc-400 text-sm font-light leading-relaxed">
            Select a pathway to deploy cryptographic identity systems or configure enterprise-level network parameters.
          </p>
        </div>

        {/* Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
          
          {/* Card A: Developer Sandbox (Cyan Theme) */}
          <Link
            to="/dashboard"
            onMouseEnter={() => setHoveredCard('left')}
            onMouseLeave={() => setHoveredCard(null)}
            className={`relative overflow-hidden rounded-3xl border h-[420px] flex flex-col justify-between p-8 bg-zinc-950/80 backdrop-blur-xl transition-all duration-500 cursor-pointer decoration-transparent
              ${hoveredCard === 'left' 
                ? 'border-[#00F0FF]/60 shadow-[0_0_50px_rgba(0,240,255,0.15)] scale-[1.02] z-20' 
                : 'border-white/10 z-10'
              }
              ${hoveredCard === 'right' ? 'opacity-25 scale-[0.96] blur-[1px]' : 'opacity-100'}
            `}
          >
            {/* Background cyan dot matrix pattern */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-500"
              style={{
                opacity: hoveredCard === 'left' ? 0.12 : 0.02,
                backgroundImage: 'radial-gradient(rgba(0, 240, 255, 0.4) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="space-y-6 relative z-10">
              <div className="p-3 w-fit rounded-xl bg-zinc-900 border border-white/5 shadow-inner">
                <Terminal className={`h-6 w-6 transition-colors duration-500 ${hoveredCard === 'left' ? 'text-[#00F0FF]' : 'text-zinc-400'}`} />
              </div>
              <div className="space-y-2">
                <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#00F0FF]">
                  Developers
                </div>
                <h3 className="text-3xl font-display font-bold text-white">
                  Developer Sandbox
                </h3>
                <p className="text-zinc-400 text-sm font-light leading-relaxed max-w-md">
                  Deploy biometric verification circuits, manage credentials databases in client side JS, and obtain API verification keys.
                </p>
              </div>
            </div>

            {/* Action button inside card */}
            <div className="relative z-10 w-fit">
              <span className="flex items-center space-x-3 bg-zinc-900/60 border border-white/10 hover:border-[#00F0FF]/40 rounded-full px-6 py-3.5 text-xs text-white uppercase tracking-wider font-semibold font-display transition-all duration-300 group">
                <span>Access Console</span>
                <ArrowRight className="h-4 w-4 text-[#00F0FF] group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
            </div>
          </Link>

          {/* Card B: Enterprise Hub (Gold/Amber Theme) */}
          <Link
            to="/dashboard"
            onMouseEnter={() => setHoveredCard('right')}
            onMouseLeave={() => setHoveredCard(null)}
            className={`relative overflow-hidden rounded-3xl border h-[420px] flex flex-col justify-between p-8 bg-zinc-950/80 backdrop-blur-xl transition-all duration-500 cursor-pointer decoration-transparent
              ${hoveredCard === 'right' 
                ? 'border-[#FBBF24]/60 shadow-[0_0_50px_rgba(251,191,36,0.12)] scale-[1.02] z-20' 
                : 'border-white/10 z-10'
              }
              ${hoveredCard === 'left' ? 'opacity-25 scale-[0.96] blur-[1px]' : 'opacity-100'}
            `}
          >
            {/* Background gold grid pattern */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-500"
              style={{
                opacity: hoveredCard === 'right' ? 0.08 : 0.02,
                backgroundImage: 'linear-gradient(to right, rgba(251, 191, 36, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(251, 191, 36, 0.2) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="space-y-6 relative z-10">
              <div className="p-3 w-fit rounded-xl bg-zinc-900 border border-white/5 shadow-inner">
                <Shield className={`h-6 w-6 transition-colors duration-500 ${hoveredCard === 'right' ? 'text-[#FBBF24]' : 'text-zinc-400'}`} />
              </div>
              <div className="space-y-2">
                <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#FBBF24]">
                  Enterprise
                </div>
                <h3 className="text-3xl font-display font-bold text-white">
                  Enterprise Hub
                </h3>
                <p className="text-zinc-400 text-sm font-light leading-relaxed max-w-md">
                  Establish consensus validation policies, review compliance metrics, and setup multi-sig credential nodes.
                </p>
              </div>
            </div>

            {/* Action button inside card */}
            <div className="relative z-10 w-fit">
              <span className="flex items-center space-x-3 bg-zinc-900/60 border border-white/10 hover:border-[#FBBF24]/40 rounded-full px-6 py-3.5 text-xs text-white uppercase tracking-wider font-semibold font-display transition-all duration-300 group">
                <span>View Dashboard</span>
                <ArrowRight className="h-4 w-4 text-[#FBBF24] group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
