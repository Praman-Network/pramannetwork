import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Network, 
  ArrowRight, 
  Cpu, 
  Briefcase,
  ChevronRight,
  Sparkles,
  Layers,
  Terminal,
  Activity
} from 'lucide-react';
import Navbar from '../components/Navbar.tsx';
import ZKIdentityCore from '../components/ZKIdentityCore.tsx';
import BentoGrid from '../components/BentoGrid.tsx';
import DualGateway from '../components/DualGateway.tsx';
import ZKAIPlayground from '../components/ZKAIPlayground.tsx';

export default function LandingPage() {
  // Framer Motion Spring & Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1
      },
    },
  };

  // Duplicated log list for infinite ticker
  const EVMChains = [
    { name: "POLYGON", icon: Layers },
    { name: "MANTLE NETWORK", icon: Cpu },
    { name: "ALGORAND", icon: ShieldCheck },
    { name: "ARBITRUM", icon: Network },
    { name: "POLYGON", icon: Layers },
    { name: "MANTLE NETWORK", icon: Cpu },
    { name: "ALGORAND", icon: ShieldCheck },
    { name: "ARBITRUM", icon: Network },
  ];

  const ecosystemApps = [
    {
      title: "PramanAuth",
      description: "The plug-and-play ZK authentication SDK. Add military-grade identity verification to your dApp in minutes.",
      icon: Cpu,
      badge: "SDK & Toolkit",
      badgeColor: "text-cyan-400 bg-cyan-950/50 border-cyan-800/50 hover:bg-cyan-950/70",
      repoUrl: "https://github.com/praman-network"
    },
    {
      title: "Praman Talent",
      description: "The first flagship application built on the network. A hiring platform where skills are cryptographically proven, not just claimed.",
      icon: Briefcase,
      badge: "Flagship App",
      badgeColor: "text-purple-400 bg-purple-950/50 border-purple-800/50 hover:bg-purple-950/70",
      repoUrl: "https://github.com/praman-network"
    }
  ];

  return (
    <main className="relative min-h-screen bg-transparent text-white overflow-hidden">

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full">
            {/* Left Column Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-8"
            >
              {/* Live Badge */}
              <motion.div variants={itemVariants} className="inline-flex">
                <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-gray-800 bg-[#0B0E14]/90 backdrop-blur-sm shadow-[0_0_15px_rgba(0,240,255,0.05)] hover:border-[#00F0FF]/30 transition-all duration-300">
                  <Sparkles className="h-3.5 w-3.5 text-[#00F0FF] animate-pulse" />
                  <span className="text-xs tracking-wider uppercase font-semibold text-slate-300 font-display">
                    Praman Protocol V1 is Live
                  </span>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h1 
                variants={itemVariants} 
                className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[1.05]"
              >
                The{' '}
                <span className="text-[#00F0FF] text-glow-cyan-strong hover:scale-[1.01] transition-transform duration-300 inline-block cursor-default">
                  Identity Layer
                </span>{' '}
                of Web3
              </motion.h1>

              {/* Subheadline */}
              <motion.p 
                variants={itemVariants}
                className="text-lg sm:text-xl text-slate-400 max-w-xl font-light leading-relaxed"
              >
                Praman Network is the foundational infrastructure providing Sybil resistance, verifiable credentials, and biometric ZK-proofs. We build the trust engine, so you can build the future.
              </motion.p>

              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/dashboard">
                  <motion.button
                    whileHover={{ 
                      scale: 1.03, 
                      boxShadow: '0 0 30px rgba(0, 240, 255, 0.6)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto bg-[#00F0FF] text-[#0B0E14] px-8 py-4 rounded-xl font-bold tracking-wide uppercase flex items-center justify-center space-x-2 text-sm transition-all duration-300 font-display shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                  >
                    <span>Build on Praman</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </Link>

                <a href="#dx-section">
                  <motion.button
                    whileHover={{ 
                      scale: 1.03,
                      borderColor: 'rgba(0, 240, 255, 0.4)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      boxShadow: '0 0 15px rgba(0, 240, 255, 0.1)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl border border-gray-800 text-slate-300 font-bold tracking-wide uppercase flex items-center justify-center space-x-2 text-sm bg-white/[0.02] backdrop-blur-md transition-all duration-300 font-display"
                  >
                    <span>Explore SDK</span>
                  </motion.button>
                </a>
              </motion.div>
            </motion.div>

            {/* Right Column Visual / ZKIdentityCore */}
            <div className="lg:col-span-5 relative w-full flex justify-center">
              <ZKIdentityCore />
            </div>
          </div>
        </section>

        {/* 1. Supported Ecosystem (Infinite Logo Ticker) */}
        <section className="relative w-full border-y border-gray-900 bg-[#0B0E14]/50 py-12 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs uppercase tracking-[0.2em] font-semibold text-slate-500 mb-6 font-display">
              Natively integrated with the EVM Ecosystem
            </p>
            
            {/* Ticker Container with fade edges */}
            <div 
              className="relative w-full overflow-hidden"
              style={{ 
                maskImage: 'linear-gradient(to right, transparent, white 20%, white 80%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, white 20%, white 80%, transparent)'
              }}
            >
              <motion.div
                className="flex space-x-16 items-center w-max"
                animate={{ x: [0, -560] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 16,
                    ease: "linear",
                  },
                }}
              >
                {EVMChains.map((chain, index) => {
                  const ChainIcon = chain.icon;
                  return (
                    <div 
                      key={index} 
                      className="flex items-center space-x-3 text-slate-500 hover:text-[#00F0FF] transition-all duration-300 group cursor-pointer"
                    >
                      <ChainIcon className="h-5 w-5 opacity-60 group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_#00F0FF] transition-all" />
                      <span className="text-sm font-display font-semibold tracking-wider">{chain.name}</span>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. Developer Experience Section (Terminal UI) */}
        <section id="dx-section" className="relative py-24 bg-[#0B0E14]/30 border-b border-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column Description */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100 }}
                className="lg:col-span-5 space-y-6"
              >
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-gray-800 bg-[#0B0E14] text-xs text-slate-400 font-display">
                  <Terminal className="h-3.5 w-3.5 text-[#00F0FF]" />
                  <span>Developer Experience</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight leading-tight">
                  Integrate in minutes, not months.
                </h2>
                
                <p className="text-slate-400 text-base font-light leading-relaxed">
                  A few lines of code to replace passwords with biometric Zero-Knowledge proofs.
                </p>
                
                <ul className="space-y-3.5 text-sm text-slate-300 font-light">
                  <li className="flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                    <span>Pure client-side cryptographic computation.</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                    <span>Eliminate databases of sensitive user biometrics.</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                    <span>Compatible with standard OAuth and Web3 JWT payloads.</span>
                  </li>
                </ul>
              </motion.div>

              {/* Right Column Terminal Window */}
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 80, delay: 0.2 }}
                className="lg:col-span-7 w-full relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00F0FF] to-purple-600 rounded-xl blur opacity-15" />
                <div className="relative rounded-xl border border-gray-850 bg-[#0A0A0A] overflow-hidden shadow-2xl hover:border-gray-700 transition-all duration-300 group">
                  {/* macOS controls header */}
                  <div className="bg-neutral-900/60 px-4 py-3.5 border-b border-gray-900 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
                      <div className="w-3 h-3 rounded-full bg-[#FFBD2E] opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
                      <div className="w-3 h-3 rounded-full bg-[#27C93F] opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">praman-auth-sample.ts</div>
                    <div className="w-12" />
                  </div>
                  
                  {/* Syntax highlighted container */}
                  <div className="p-6 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed bg-[#0A0A0A] min-h-[220px]">
                    <pre className="text-slate-300">
                      <code>
                        <span className="text-purple-400">import</span> {'{'} <span className="text-[#00F0FF]">PramanAuth</span> {'}'} <span className="text-purple-400">from</span> <span className="text-emerald-400">'@praman/sdk'</span>;<br /><br />
                        <span className="text-purple-400">const</span> auth = <span className="text-purple-400">new</span> <span className="text-[#00F0FF]">PramanAuth</span>({'{'}<br />
                        {'  '}clientId: <span className="text-emerald-400">'your_api_key'</span>,<br />
                        {'  '}livenessMode: <span className="text-emerald-400">'strict'</span>,<br />
                        {'  '}network: <span className="text-emerald-400">'polygon'</span><br />
                        {'}'});<br /><br />
                        <span className="text-slate-500">// Triggers ZK-Proof generation in-browser</span><br />
                        <span className="text-purple-400">const</span> {'{'} jwt, userFaceHash {'}'} = <span className="text-purple-400">await</span> auth.<span className="text-blue-400">login</span>();
                      </code>
                    </pre>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 3. Bento Box Grid */}
        <BentoGrid />

        {/* Section 4: The Ecosystem */}
        <section className="relative py-24 bg-[#0B0E14] border-b border-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100 }}
              className="text-center max-w-3xl mx-auto space-y-4 mb-20"
            >
              <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#00F0FF] font-display">
                Verifiable Network
              </h2>
              <p className="text-4xl font-display font-bold text-white tracking-tight">
                Powered by Praman Network
              </p>
            </motion.div>

            {/* Ecosystem Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {ecosystemApps.map((app, idx) => {
                const Icon = app.icon;
                return (
                  <a
                    key={idx}
                    href={app.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                  >
                    <motion.div
                      variants={itemVariants}
                      className="relative glass-panel rounded-2xl border border-gray-800 p-8 glass-panel-hover flex flex-col justify-between md:h-[280px] overflow-hidden group hover:border-[#00F0FF]/30 transition-all duration-300 h-full"
                    >
                      <div className="space-y-5">
                        <div className="flex items-center justify-between">
                          <div className="p-3 rounded-xl bg-[#0B0E14] border border-gray-800/80 flex items-center justify-center group-hover:border-[#00F0FF]/30 transition-all">
                            <Icon className="h-6 w-6 text-[#00F0FF]" />
                          </div>
                          <span className={`text-[10px] tracking-wider uppercase font-semibold border px-2.5 py-1 rounded-full transition-colors duration-300 ${app.badgeColor}`}>
                            {app.badge}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-2xl font-display font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                            {app.title}
                          </h3>
                          <p className="text-slate-400 text-sm leading-relaxed font-light font-sans">
                            {app.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1.5 text-xs text-[#00F0FF] font-medium group cursor-pointer pt-4 font-display">
                        <span>Explore Repository</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                      </div>
                    </motion.div>
                  </a>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ZK-AI Playgound Section */}
        <ZKAIPlayground />

        {/* Dual Gateway Workspace Selection */}
        <DualGateway />

        {/* 4. Professional Fat Footer */}
        <footer className="border-t border-gray-850 bg-[#0B0E14] pt-20 pb-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-gray-900">
              
              {/* Column 1: Brand details */}
              <div className="lg:col-span-2 space-y-6">
                <Link to="/" className="flex items-center space-x-3 group">
                  <div className="p-1.5 bg-neutral-900 border border-gray-800 rounded-lg flex items-center justify-center group-hover:border-[#00F0FF]/30 transition-colors">
                    <img src="/logo.png" alt="Praman Network Logo" className="h-6 w-6 object-contain filter drop-shadow-[0_0_8px_rgba(0,240,255,0.3)] group-hover:rotate-6 transition-transform duration-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-base leading-tight tracking-wider text-white">
                      PRAMAN
                    </span>
                    <span className="text-[9px] tracking-[0.25em] text-[#00F0FF] font-medium uppercase font-display">
                      Network
                    </span>
                  </div>
                </Link>
                
                <p className="text-slate-400 text-sm max-w-sm font-light leading-relaxed">
                  Replacing Trust with Proof. Foundational Web3 infrastructure for biometric identity, Sybil resistance, and verifiable credentials.
                </p>
              </div>

              {/* Column 2: Developers */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-widest text-[#00F0FF] font-display font-semibold">
                  Developers
                </h4>
                <ul className="space-y-2.5 text-sm text-slate-400 font-light">
                  <li>
                    <a href="https://github.com" className="hover:text-[#00F0FF] hover:text-glow-cyan transition-all duration-300">Documentation</a>
                  </li>
                  <li>
                    <a href="https://github.com" className="hover:text-[#00F0FF] hover:text-glow-cyan transition-all duration-300">GitHub Org</a>
                  </li>
                  <li>
                    <Link to="/dashboard" className="hover:text-[#00F0FF] hover:text-glow-cyan transition-all duration-300">Console API</Link>
                  </li>
                </ul>
              </div>

              {/* Column 3: Ecosystem */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-widest text-[#00F0FF] font-display font-semibold">
                  Ecosystem
                </h4>
                <ul className="space-y-2.5 text-sm text-slate-400 font-light font-sans">
                  <li>
                    <span className="cursor-not-allowed text-slate-600 transition-colors">PramanAuth</span>
                  </li>
                  <li>
                    <span className="cursor-not-allowed text-slate-600 transition-colors">Praman Talent</span>
                  </li>
                  <li>
                    <span className="cursor-not-allowed text-slate-600 transition-colors">Network Explorer</span>
                  </li>
                </ul>
              </div>

              {/* Column 4: Legal */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-widest text-[#00F0FF] font-display font-semibold">
                  Legal
                </h4>
                <ul className="space-y-2.5 text-sm text-slate-400 font-light font-sans">
                  <li>
                    <span className="cursor-not-allowed text-slate-600">Privacy Policy</span>
                  </li>
                  <li>
                    <span className="cursor-not-allowed text-slate-600">Terms of Use</span>
                  </li>
                  <li>
                    <a href="https://github.com" className="hover:text-[#00F0FF] hover:text-glow-cyan transition-all duration-300">AGPL-3.0 License</a>
                  </li>
                </ul>
              </div>

            </div>

            {/* Bottom Copyright details */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
              <div>
                Praman Network &copy; {new Date().getFullYear()} All rights reserved.
              </div>
              <div className="flex items-center space-x-1.5">
                <Activity className="h-3.5 w-3.5 text-[#00F0FF] animate-pulse" />
                <span>Ecosystem Status: Normal Operation</span>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </main>
  );
}
