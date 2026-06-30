import { motion } from 'framer-motion';
import { Briefcase, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';
import Footer from '../components/Footer.tsx';

export default function ComingSoon() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="relative flex-1 bg-transparent text-white pt-36 pb-24 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        
        {/* Coming Soon Alert Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-[#0DF2C9]/20 bg-black/40 text-[9px] tracking-widest uppercase font-semibold text-[#0DF2C9] font-mono mb-8"
        >
          <Briefcase className="h-3.5 w-3.5" />
          <span>Flagship Application</span>
        </motion.div>

        {/* Content Box */}
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight leading-none"
          >
            Praman <span className="text-[#0DF2C9] text-glow-cyan">Talent</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed"
          >
            The world's first decentralized hiring platform where credentials, skills, and work histories are cryptographically proven using Zero-Knowledge proofs—not just claimed. Eliminating resume fraud and Sybil profiles instantly.
          </motion.p>
        </div>

        {/* Features Highlights Cards */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-12 mb-16"
        >
          <div className="p-6 rounded-2xl border border-white/5 bg-black/40 space-y-3">
            <div className="p-2.5 w-fit rounded-lg bg-[#0DF2C9]/10 text-[#0DF2C9]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">Sybil Resistance</h3>
            <p className="text-zinc-500 text-xs font-light">
              Biometric face auth ensures one identity per developer profile, completely blocking bot accounts.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/5 bg-black/40 space-y-3">
            <div className="p-2.5 w-fit rounded-lg bg-[#0DF2C9]/10 text-[#0DF2C9]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">ZK Credentials</h3>
            <p className="text-zinc-500 text-xs font-light">
              Prove work history and coding metrics mathematically without revealing underlying personal client contracts.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/5 bg-black/40 space-y-3">
            <div className="p-2.5 w-fit rounded-lg bg-[#0DF2C9]/10 text-[#0DF2C9]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">Direct Trust Pools</h3>
            <p className="text-zinc-500 text-xs font-light">
              Hire and payout instantly via smart contracts backed by cryptographic consensus parameters.
            </p>
          </div>
        </motion.div>

        {/* Action / Back Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full"
        >
          <Link to="/">
            <button className="flex items-center space-x-2 border border-white/10 hover:border-[#0DF2C9]/40 text-xs tracking-wider uppercase font-semibold font-mono px-6 py-3 rounded-xl transition-all">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </button>
          </Link>

          <div className="flex items-center space-x-2 bg-black/40 border border-white/5 rounded-xl px-4 py-2 text-xs font-mono text-zinc-500">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0DF2C9] animate-pulse" />
            <span>Launch Status: Alpha Coming Soon</span>
          </div>
        </motion.div>

      </main>

      <Footer />
    </div>
  );
}
