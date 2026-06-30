import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scan, CheckCircle, Clipboard, Check, RotateCcw } from 'lucide-react';

export default function ZKIdentityCore() {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'hashing' | 'proving' | 'broadcasting' | 'verified'>('idle');
  const [copied, setCopied] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [dots, setDots] = useState<{ x: number; y: number; active: boolean }[]>([]);

  // Generate semi-random biometric facial landmarks inside a layout face shape
  useEffect(() => {
    const facePoints = [
      // Forehead
      { x: 35, y: 22, active: false }, { x: 50, y: 18, active: false }, { x: 65, y: 22, active: false },
      // Eyebrows
      { x: 28, y: 35, active: false }, { x: 40, y: 33, active: false }, { x: 60, y: 33, active: false }, { x: 72, y: 35, active: false },
      // Eyes
      { x: 32, y: 42, active: false }, { x: 38, y: 42, active: false }, { x: 62, y: 42, active: false }, { x: 68, y: 42, active: false },
      // Nose
      { x: 50, y: 40, active: false }, { x: 50, y: 52, active: false }, { x: 45, y: 58, active: false }, { x: 55, y: 58, active: false },
      // Cheeks
      { x: 20, y: 55, active: false }, { x: 80, y: 55, active: false }, { x: 24, y: 70, active: false }, { x: 76, y: 70, active: false },
      // Mouth
      { x: 40, y: 72, active: false }, { x: 50, y: 70, active: false }, { x: 60, y: 72, active: false }, { x: 50, y: 77, active: false },
      // Chin
      { x: 50, y: 88, active: false }
    ];
    setDots(facePoints);
  }, []);

  const simulateVerification = async () => {
    if (scanState !== 'idle') return;
    
    // Step 1: Scanning facial vector landmarks
    setScanState('scanning');
    setLogs(["[SYSTEM] Accessing biometric sensor data...", "[SYSTEM] Extracting 23 facial feature nodes..."]);
    
    // Gradually light up nodes
    for (let i = 0; i < 23; i += 2) {
      await new Promise(r => setTimeout(r, 120));
      setDots(prev => prev.map((d, index) => index <= i || index === i + 1 ? { ...d, active: true } : d));
    }
    
    // Step 2: Compute Poseidon hash
    setScanState('hashing');
    setLogs(prev => [...prev, "[CRYPT] Node vectors locked.", "[CRYPT] Computing Poseidon Biometric Hash..."]);
    await new Promise(r => setTimeout(r, 900));
    const randomHash = "0x7d5e..." + Math.floor(Math.random() * 900000 + 100000).toString(16);
    setLogs(prev => [...prev, `[CRYPT] Hash Result: ${randomHash}`]);

    // Step 3: Generating ZK SNARK
    setScanState('proving');
    setLogs(prev => [...prev, "[ZK-VM] Loading Groth16 verify keys...", "[ZK-VM] Proving state constraints (size: 48,201)...", "[ZK-VM] Generating zero-knowledge proof file..."]);
    await new Promise(r => setTimeout(r, 1400));
    setLogs(prev => [...prev, "[ZK-VM] ZK-Proof witness generated successfully (362 bytes)"]);

    // Step 4: Broadcasting
    setScanState('broadcasting');
    setLogs(prev => [...prev, "[CHAIN] Connecting to Smart Contract verifier...", "[CHAIN] Relaying proofs to Polygon Hermez VM..."]);
    await new Promise(r => setTimeout(r, 800));

    // Finished
    setScanState('verified');
    setLogs(prev => [...prev, "[SUCCESS] Verification matches credentials!", "[SUCCESS] Cryptographic login confirmed."]);
  };

  const resetScanner = () => {
    setScanState('idle');
    setLogs([]);
    setDots(prev => prev.map(d => ({ ...d, active: false })));
  };

  const mockProofJSON = JSON.stringify({
    scheme: "Groth16",
    curve: "bn254",
    proof: {
      pi_a: ["0x1e3f8...", "0x2a9b4..."],
      pi_b: [["0x0a11e...", "0x0ff8d..."], ["0x12c4f...", "0x098d3..."]],
      pi_c: ["0x27f8a...", "0x3012b..."]
    },
    publicInputs: ["0x7d5e492f1b8aefc"]
  }, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(mockProofJSON);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-md relative flex flex-col items-center">
      {/* Dynamic glow base shadow behind the scanner */}
      <div 
        className={`absolute inset-5 rounded-3xl blur-[60px] transition-all duration-700 pointer-events-none z-0 ${
          scanState === 'verified' ? 'bg-emerald-500/10' : scanState !== 'idle' ? 'bg-[#00F0FF]/15' : 'bg-purple-600/5'
        }`} 
      />

      <div className="w-full relative glass-panel rounded-3xl border border-white/5 overflow-hidden shadow-2xl z-10 flex flex-col">
        {/* Terminal Header */}
        <div className="bg-neutral-950/90 px-4 py-3.5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`w-2 h-2 rounded-full ${
              scanState === 'verified' ? 'bg-emerald-500 animate-pulse' : scanState !== 'idle' ? 'bg-[#00F0FF] animate-pulse' : 'bg-zinc-600'
            }`} />
            <span className="text-[10px] text-zinc-400 font-mono tracking-wider">SECURE_BIOMETRIC_VAULT</span>
          </div>
          <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
            {scanState}
          </div>
        </div>

        {/* Visual Scanner Area */}
        <div className="h-64 relative bg-[#06080F]/90 overflow-hidden flex items-center justify-center border-b border-white/5">
          {/* Laser Scanning line sweep */}
          {(scanState === 'scanning' || scanState === 'hashing') && (
            <motion.div
              initial={{ top: '0%' }}
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent shadow-[0_0_12px_#00F0FF] z-20"
            />
          )}

          {/* Holographic matrix circles */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
            <div className="w-56 h-56 rounded-full border border-dashed border-[#00F0FF]/40 animate-slow-rotate" />
            <div className="absolute w-44 h-44 rounded-full border border-dotted border-purple-500/30 animate-spin" style={{ animationDuration: '10s' }} />
          </div>

          {/* SVG Cyber Mesh Face Graph */}
          <svg className="w-48 h-48 relative z-10 opacity-80" viewBox="0 0 100 100">
            {/* Draw connection lines between nearby nodes */}
            {dots.length > 0 && dots.map((dot, index) => (
              dots.slice(index + 1, index + 4).map((otherDot, oIdx) => (
                <line
                  key={`${index}-${oIdx}`}
                  x1={dot.x}
                  y1={dot.y}
                  x2={otherDot.x}
                  y2={otherDot.y}
                  stroke={dot.active && otherDot.active ? 'rgba(0, 240, 255, 0.45)' : 'rgba(255, 255, 255, 0.05)'}
                  strokeWidth="0.4"
                />
              ))
            ))}

            {/* Draw face contour guide */}
            <path
              d="M30,20 Q50,12 70,20 Q82,50 78,70 Q70,92 50,92 Q30,92 22,70 Q18,50 30,20"
              fill="none"
              stroke={scanState === 'verified' ? '#10B981' : scanState !== 'idle' ? '#00F0FF' : 'rgba(255,255,255,0.08)'}
              strokeWidth="0.8"
              strokeDasharray={scanState === 'idle' ? "4 4" : "none"}
              className="transition-colors duration-500"
            />

            {/* Landmark nodes */}
            {dots.map((dot, idx) => (
              <circle
                key={idx}
                cx={dot.x}
                cy={dot.y}
                r={dot.active ? "1.4" : "1"}
                fill={scanState === 'verified' ? '#10B981' : dot.active ? '#00F0FF' : 'rgba(255,255,255,0.15)'}
                className="transition-all duration-300"
                style={{
                  filter: dot.active ? 'drop-shadow(0 0 4px #00F0FF)' : 'none'
                }}
              />
            ))}
          </svg>

          {/* Success overlay */}
          <AnimatePresence>
            {scanState === 'verified' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#06080F]/95 z-30 flex flex-col items-center justify-center p-6 text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <CheckCircle className="h-7 w-7 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-base font-display font-bold text-white uppercase tracking-wider">ZK-Proof Verified</h4>
                  <p className="text-zinc-400 text-xs mt-1">Biometric identity verified off-site securely.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Live log Console output terminal */}
        <div className="flex-1 bg-[#030408]/95 p-4 font-mono text-[10px] leading-relaxed min-h-[140px] max-h-[140px] overflow-y-auto border-b border-white/5">
          {logs.length === 0 ? (
            <div className="h-full flex items-center justify-center text-zinc-600 italic">
              Awaiting biometric authentication request...
            </div>
          ) : (
            <div className="space-y-1.5">
              {logs.map((log, idx) => (
                <div
                  key={idx}
                  className={`${
                    log.includes("SUCCESS") ? "text-emerald-400 font-semibold" :
                    log.includes("CRYPT") ? "text-[#00F0FF]" :
                    log.includes("ZK-VM") ? "text-purple-400" : "text-zinc-400"
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA Footer Actions */}
        <div className="p-3 bg-neutral-950/70 flex items-center justify-between">
          {scanState === 'idle' ? (
            <button
              onClick={simulateVerification}
              className="w-full bg-[#00F0FF] text-[#0B0E14] py-2 sm:py-3 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center space-x-2 text-[10px] sm:text-xs transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            >
              <Scan className="h-3.5 w-3.5" />
              <span>Simulate Biometric Auth</span>
            </button>
          ) : scanState === 'verified' ? (
            <div className="flex space-x-2 w-full">
              <button
                onClick={handleCopy}
                className="flex-1 border border-white/10 hover:border-[#00F0FF]/30 text-white py-2 sm:py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 text-[10px] sm:text-xs transition-all"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Clipboard className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied Certificate' : 'Copy ZK-Proof'}</span>
              </button>
              <button
                onClick={resetScanner}
                className="px-3 sm:px-4 py-2 sm:py-3 border border-white/10 hover:border-purple-500/30 text-zinc-400 hover:text-white rounded-xl transition-all flex items-center justify-center"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="w-full py-2 sm:py-3 rounded-xl bg-zinc-950/80 border border-white/5 flex items-center justify-center space-x-2 text-[10px] sm:text-xs font-mono text-zinc-500 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-ping" />
              <span>Computing zero knowledge...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
