import { motion } from 'framer-motion';
import Navbar from '../components/Navbar.tsx';
import Footer from '../components/Footer.tsx';

export default function PrivacyPolicy() {
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
            <h1 className="text-4xl font-display font-extrabold text-white tracking-tight">Privacy Policy</h1>
            <p className="text-zinc-550 text-xs font-mono">Last Updated: June 30, 2026</p>
          </div>

          <section className="space-y-4 text-zinc-350 text-sm leading-relaxed font-light font-sans">
            <p>
              At Praman Network, privacy is not a feature—it is our fundamental architecture. This policy details how our protocol operates, verifying biometric credentials without storing, exposing, or decrypting personal user identities.
            </p>

            <h2 className="text-lg font-display font-bold text-white pt-4">1. Raw Biometric Data Protection</h2>
            <p>
              Praman Network **does not** collect, store, or transmit raw biometric data (such as photos, videos, or raw coordinate maps). 
              Any biometric verification occurs purely client-side inside the user's browser runtime. The raw data is instantly processed into a mathematical hash via Poseidon hashing and converted into a Zero-Knowledge Proof (zk-SNARK). 
              Once generated, the raw input is immediately purged from memory.
            </p>

            <h2 className="text-lg font-display font-bold text-white pt-4">2. Decentralized & Encrypted Storage</h2>
            <p>
              The generated mathematical biometric commitments and proofs are encrypted and stored across a decentralized network (IPFS). 
              Praman Network core nodes do not hold access keys, meaning it is cryptographically impossible for our team or any central system to decrypt, read, or rebuild your original biometric features.
            </p>

            <h2 className="text-lg font-display font-bold text-white pt-4">3. Third-party Networks Integration</h2>
            <p>
              To verify assertions securely, the protocol interacts with decentralized storage relays (IPFS), encryption key management platforms (Lit Protocol), and EVM verification contracts (Polygon Hermez VM). 
              No third-party partner receives raw personal identifiers; they only process mathematical proofs and smart contract inputs.
            </p>

            <h2 className="text-lg font-display font-bold text-white pt-4">4. Cookies & Analytics</h2>
            <p>
              Our core website and client-side SDK run zero tracking cookies. 
              On our web developer console (dashboard.praman.network), we use minimal cookies solely to sustain encrypted session tokens.
            </p>

            <h2 className="text-lg font-display font-bold text-white pt-4">5. Account & Data Deletion Rights</h2>
            <p>
              If you wish to remove your biometric commitment, you can execute a registry revocation call via your connected Web3 wallet. 
              Once confirmed by consensus validators, the corresponding commitment is marked as revoked in the registry smart contracts.
            </p>
          </section>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
