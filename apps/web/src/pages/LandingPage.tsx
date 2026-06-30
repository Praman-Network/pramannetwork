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
  UserCheck,
  Zap,
  Globe,
  Database
} from 'lucide-react';
import Navbar from '../components/Navbar.tsx';
import Footer from '../components/Footer.tsx';
import ZKIdentityCore from '../components/ZKIdentityCore.tsx';
import BentoGrid from '../components/BentoGrid.tsx';
import DualGateway from '../components/DualGateway.tsx';

export default function LandingPage() {
  // Framer Motion spring and stagger configurations
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
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 16,
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
      description: "The plug-and-play ZK authentication SDK. Integrate biometric identity verification to your dApp in minutes.",
      icon: Cpu,
      badge: "SDK & Toolkit",
      badgeColor: "text-cyan-400 bg-cyan-950/40 border-cyan-800/40 hover:bg-cyan-950/60",
      repoUrl: "https://github.com/Praman-Network/AuthPramanNetwork"
    },
    {
      title: "Praman Talent",
      description: "A professional network built on Praman. A hiring ecosystem where talent credentials and certificates are cryptographically verified.",
      icon: Briefcase,
      badge: "Coming Soon",
      badgeColor: "text-purple-400 bg-purple-950/40 border-purple-800/40 hover:bg-purple-950/60",
      repoUrl: "/talent-coming-soon"
    }
  ];

  const stats = [
    { label: "Proving Speed", value: "< 362ms", icon: Zap, color: "text-[#00F0FF]" },
    { label: "Verified Claims", value: "432,901+", icon: UserCheck, color: "text-purple-400" },
    { label: "Consensus Latency", value: "~1.2s", icon: Globe, color: "text-emerald-400" },
    { label: "Central Databases", value: "Zero Saved", icon: Database, color: "text-amber-400" }
  ];

  return (
    <main className="relative min-h-screen bg-transparent text-white overflow-hidden">

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <section className="relative pt-36 pb-20 md:pt-48 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full">
            
            {/* Left Column Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-8"
            >
              {/* V1 Live Badge */}
              <motion.div variants={itemVariants} className="inline-flex">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-white/5 bg-[#0B0E14]/80 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.03)] hover:border-[#00F0FF]/20 transition-all duration-300">
                  <Sparkles className="h-3.5 w-3.5 text-[#00F0FF] animate-pulse" />
                  <span className="text-[10px] tracking-[0.15em] uppercase font-bold text-slate-300 font-mono">
                    Praman Protocol V1 is Live
                  </span>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h1 
                variants={itemVariants} 
                className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[1.05]"
              >
                Zero-Knowledge<br />
                <span className="text-[#00F0FF] text-glow-cyan-strong hover:scale-[1.01] transition-transform duration-300 inline-block cursor-default">
                  Biometric Identity
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p 
                variants={itemVariants}
                className="text-base sm:text-lg text-slate-400 max-w-xl font-light leading-relaxed"
              >
                Praman Network is a decentralized trust protocol providing Sybil resistance, anonymous biometric authentication, and verifiable credentials. Eliminate database vulnerabilities and secure web3 entryways instantly.
              </motion.p>

              {/* Action buttons */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/dashboard">
                  <motion.button
                    whileHover={{ 
                      scale: 1.02, 
                      boxShadow: '0 0 25px rgba(0, 240, 255, 0.4)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto bg-[#00F0FF] text-[#0B0E14] px-4 py-2.5 sm:px-8 sm:py-4 rounded-xl font-bold tracking-wider uppercase flex items-center justify-center space-x-2.5 text-[10px] sm:text-xs transition-all duration-300 font-mono shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                  >
                    <span>Build on Praman</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </Link>

                <a href="#dx-section">
                  <motion.button
                    whileHover={{ 
                      scale: 1.02,
                      borderColor: 'rgba(0, 240, 255, 0.3)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      boxShadow: '0 0 15px rgba(0, 240, 255, 0.05)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-4 py-2.5 sm:px-8 sm:py-4 rounded-xl border border-white/5 text-slate-300 font-bold tracking-wider uppercase flex items-center justify-center space-x-2 text-[10px] sm:text-xs bg-white/[0.01] backdrop-blur-md transition-all duration-300 font-mono"
                  >
                    <span>Explore SDK</span>
                  </motion.button>
                </a>
              </motion.div>
            </motion.div>

            {/* Right Column Interactive Biometric Scanner Widget */}
            <div className="lg:col-span-5 relative w-full flex justify-center">
              <ZKIdentityCore />
            </div>
          </div>
        </section>

        {/* Real-time stats section */}
        <section className="relative w-full border-t border-white/5 bg-[#05050a]/40 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => {
                const StatIcon = stat.icon;
                return (
                  <div key={idx} className="flex flex-col items-center md:items-start space-y-1.5">
                    <div className="flex items-center space-x-2 text-zinc-500">
                      <StatIcon className={`h-4 w-4 ${stat.color}`} />
                      <span className="text-[10px] uppercase font-mono tracking-wider font-semibold">{stat.label}</span>
                    </div>
                    <span className="text-2xl font-display font-extrabold text-white tracking-tight">{stat.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 1. Supported Ecosystem (Infinite Logo Ticker) */}
        <section className="relative w-full border-y border-white/5 bg-neutral-950/20 py-10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-[10px] uppercase tracking-[0.25em] font-bold text-zinc-500 mb-6 font-mono">
              Natively integrated with the EVM Ecosystem
            </p>
            
            {/* Ticker Container with faded edge gradients */}
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
                    duration: 18,
                    ease: "linear",
                  },
                }}
              >
                {EVMChains.map((chain, index) => {
                  const ChainIcon = chain.icon;
                  return (
                    <div 
                      key={index} 
                      className="flex items-center space-x-3 text-zinc-500 hover:text-[#00F0FF] transition-all duration-300 group cursor-pointer"
                    >
                      <ChainIcon className="h-4.5 w-4.5 opacity-60 group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_#00F0FF] transition-all" />
                      <span className="text-xs font-mono font-semibold tracking-wider">{chain.name}</span>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. Developer Experience Section (Terminal UI) */}
        <section id="dx-section" className="relative py-24 bg-[#05050a]/40 border-b border-gray-950">
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
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/5 bg-black/40 text-[9px] text-zinc-400 font-mono uppercase tracking-wider">
                  <Terminal className="h-3.5 w-3.5 text-[#00F0FF]" />
                  <span>Developer Experience</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
                  Integrate in minutes,<br />not months.
                </h2>
                
                <p className="text-zinc-400 text-sm font-light leading-relaxed">
                  Implement passwordless biometric validation via simple client-side APIs.
                </p>
                
                <ul className="space-y-4 text-xs text-zinc-300 font-light font-sans">
                  <li className="flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                    <span>Pure client-side cryptographic calculation.</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                    <span>Zero centralization of user biometrics.</span>
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
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00F0FF] to-purple-600 rounded-2xl blur opacity-10" />
                <div className="relative rounded-2xl border border-white/5 bg-[#050509] overflow-hidden shadow-2xl hover:border-white/10 transition-all duration-300 group">
                  {/* macOS header controls */}
                  <div className="bg-black/40 px-4 py-3.5 border-b border-white/5 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 hover:bg-red-500 cursor-pointer" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80 hover:bg-amber-500 cursor-pointer" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 hover:bg-green-500 cursor-pointer" />
                    </div>
                    <div className="text-[10px] text-zinc-500 font-mono">praman-auth-sample.ts</div>
                    <div className="w-12" />
                  </div>
                  
                  {/* Syntax highlighted container */}
                  <div className="p-6 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed bg-black/30 min-h-[220px]">
                    <pre className="text-zinc-300">
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
        <section className="relative py-24 bg-[#05050a]/40 border-b border-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100 }}
              className="text-center max-w-3xl mx-auto space-y-4 mb-20"
            >
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#00F0FF] font-mono">
                Verifiable Network
              </h2>
              <p className="text-4xl font-display font-extrabold text-white tracking-tight">
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
                const isInternal = app.repoUrl.startsWith('/');
                const CardContent = (
                  <motion.div
                    variants={itemVariants}
                    className="relative glass-panel rounded-2xl border border-white/5 p-8 glass-panel-hover flex flex-col justify-between md:h-[280px] overflow-hidden group hover:border-[#00F0FF]/30 transition-all duration-300 h-full text-left"
                  >
                    <div className="space-y-5">
                      <div className="flex items-center justify-between">
                        <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center group-hover:border-[#00F0FF]/30 transition-all">
                          <Icon className="h-6 w-6 text-[#00F0FF]" />
                        </div>
                        <span className={`text-[9px] tracking-wider uppercase font-semibold border px-2.5 py-1 rounded-full transition-colors duration-300 ${app.badgeColor}`}>
                          {app.badge}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-2xl font-display font-extrabold text-white group-hover:text-[#00F0FF] transition-colors">
                          {app.title}
                        </h3>
                        <p className="text-zinc-400 text-xs leading-relaxed font-light font-sans">
                          {app.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5 text-xs text-[#00F0FF] font-medium group cursor-pointer pt-4 font-mono">
                      <span>{isInternal ? 'Launch Application' : 'Explore Repository'}</span>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </motion.div>
                );

                if (isInternal) {
                  return (
                    <Link key={idx} to={app.repoUrl} className="block decoration-transparent">
                      {CardContent}
                    </Link>
                  );
                }

                return (
                  <a
                    key={idx}
                    href={app.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block decoration-transparent"
                  >
                    {CardContent}
                  </a>
                );
              })}
            </motion.div>
          </div>
        </section>


        {/* Dual Gateway Workspace Selection */}
        <DualGateway />

        <Footer />

      </div>
    </main>
  );
}
