import { motion } from 'framer-motion';
import Navbar from '../components/Navbar.tsx';
import Footer from '../components/Footer.tsx';

export default function TermsOfUse() {
  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-between">
      <Navbar />

      <main className="relative flex-1 bg-transparent text-white pt-32 pb-20 w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="space-y-2 border-b border-white/10 pb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#0DF2C9] font-bold">PRAMAN NETWORK</span>
            <h1 className="text-4xl font-display font-extrabold text-white tracking-tight">Terms of Use</h1>
            <p className="text-zinc-400 text-xs font-mono">Last Updated: June 30, 2026</p>
          </div>

          <section className="space-y-4 text-zinc-400 text-sm leading-relaxed font-light font-sans">
            <p>
              Welcome to Praman Network. By utilizing our protocol, console dashboard, or developers' SDK, you agree to follow the terms below.
            </p>

            <h2 className="text-lg font-display font-bold text-white pt-4">1. Acceptable Use Policy</h2>
            <p>
              You agree to use our network services solely for lawful verification purposes. 
              You must not perform Sybil attacks, attempt fake identity generation, or inject malicious payloads into biometric witness verification calculations.
            </p>

            <h2 className="text-lg font-display font-bold text-white pt-4">2. SDK Usage & Origin Whitelisting</h2>
            <p>
              Integrators utilizing the Praman Network SDK must declare verified origins (domain names). 
              SDK usage must align with our client specifications, and we reserve the right to restrict access to origins violating our acceptable use standard.
            </p>

            <h2 className="text-lg font-display font-bold text-white pt-4">3. Disclaimer of Liability ("AS-IS" Clause)</h2>
            <p className="italic text-zinc-400">
              The software, smart contracts, and proof circuits are provided "AS IS", without warranty of any kind, express or implied. 
              In no event shall Praman Network or the authors be liable for any claims, losses, or damages arising from contract failures, protocol bugs, or browser witness calculations.
            </p>

            <h2 className="text-lg font-display font-bold text-white pt-4">4. Intellectual Property</h2>
            <p>
              Praman Network core code, provers, witness generators, and verification libraries remain the property of Praman Network, licensed under the GNU GPL v3. 
              Integrators own all dApp-level application code, customized templates, and consumer-facing services that interface with the SDK.
            </p>

            <h2 className="text-lg font-display font-bold text-white pt-4">5. Governing Law</h2>
            <p>
              These terms and any disputes arising from your use of the protocol or services are governed by and construed under the laws of India, with jurisdiction in Delhi.
            </p>
          </section>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
