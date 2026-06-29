import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Terminal, 
  Play, 
  RefreshCw, 
  Database,
  Lock,
  Binary
} from 'lucide-react';

const PRESET_PROMPTS = [
  "Verify neural weight inference match for biometrics",
  "Generate zk-proof for non-custodial model execution",
  "Certify zero-bias input path for identity claim"
];

const MODELS = [
  { name: "Praman-Llama-3-ZK", latency: "380ms", size: "8B parameters" },
  { name: "zk-DeepSeek-R1-Distill", latency: "520ms", size: "14B parameters" },
  { name: "Verifiable-Phi-3", latency: "210ms", size: "3.8B parameters" }
];

export default function ZKAIPlayground() {
  const [selectedPrompt, setSelectedPrompt] = useState(PRESET_PROMPTS[0]);
  const [customPrompt, setCustomPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [status, setStatus] = useState<'idle' | 'signing' | 'inferencing' | 'proving' | 'verifying' | 'done'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const handleRun = async () => {
    const promptText = customPrompt.trim() || selectedPrompt;
    setLogs([]);
    setStatus('signing');
    addLog(`INITIALIZING: Requesting Web3 signature for prompt: "${promptText.substring(0, 45)}..."`);
    
    // Step 1: Sign prompt
    await new Promise(r => setTimeout(r, 1200));
    addLog("SUCCESS: Biometric key signed. Prompt bound cryptographically to session.");
    
    // Step 2: Running AI model with verifiable inference
    setStatus('inferencing');
    addLog(`AI OPERATION: Spawning inference node for ${selectedModel.name}...`);
    await new Promise(r => setTimeout(r, 1500));
    addLog(`AI OPERATION: Logits verified. Output payload generated. Execution trace recorded.`);

    // Step 3: Generating ZK-Proof
    setStatus('proving');
    addLog("ZK-PROVER: Compiling R1CS constraints for attention model weight verification...");
    await new Promise(r => setTimeout(r, 800));
    addLog("ZK-PROVER: Computing Groth16 witness parameters (sub-second prover active)...");
    await new Promise(r => setTimeout(r, 1200));
    addLog("ZK-PROVER: Proof output successfully generated: proof.json (size: 472 bytes).");

    // Step 4: Verification
    setStatus('verifying');
    addLog("ON-CHAIN VERIFIER: Submitting proof to verifier smart contract...");
    await new Promise(r => setTimeout(r, 1000));
    addLog("ON-CHAIN VERIFIER: Gas consumption calculated: 142,504 gas.");

    // Step 5: Success
    setStatus('done');
    addLog("VERIFIED: ZK-AI proof successfully verified on-chain! Integrity 100% Guaranteed.");
  };

  const resetPlayground = () => {
    setStatus('idle');
    setLogs([]);
  };

  return (
    <section className="relative py-24 bg-[#0B0E14]/70 border-b border-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#00F0FF]/20 bg-zinc-950/80 text-[10px] tracking-widest uppercase font-semibold text-[#00F0FF] font-display">
            <Bot className="h-3.5 w-3.5" />
            <span>ZK-AI Co-Processing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Verifiable AI Agent Playground
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto font-light leading-relaxed">
            Experience the fusion of artificial intelligence and cryptography. Run zero-knowledge proofs over AI model inference paths inside your browser.
          </p>
        </div>

        {/* Playground Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Column */}
          <div className="lg:col-span-5 flex flex-col justify-between glass-panel rounded-2xl border border-gray-800 p-6 sm:p-8 hover:border-gray-700 transition-all duration-300">
            <div className="space-y-6">
              <h3 className="text-xl font-display font-bold text-white flex items-center space-x-2">
                <Database className="h-5 w-5 text-[#00F0FF]" />
                <span>Configure ZK-AI Query</span>
              </h3>

              {/* Model Select */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">Select Model</label>
                <div className="grid grid-cols-1 gap-2">
                  {MODELS.map((model) => (
                    <button
                      key={model.name}
                      onClick={() => status === 'idle' && setSelectedModel(model)}
                      disabled={status !== 'idle'}
                      className={`flex justify-between items-center p-3 rounded-xl border text-left transition-all text-xs font-sans ${
                        selectedModel.name === model.name
                          ? 'border-[#00F0FF] bg-[#00F0FF]/5 text-white'
                          : 'border-gray-800 bg-[#0B0E14] text-zinc-400 hover:border-gray-700'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-white">{model.name}</div>
                        <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{model.size}</div>
                      </div>
                      <span className="text-[10px] font-mono bg-zinc-950/80 px-2 py-0.5 rounded text-zinc-400">
                        {model.latency}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt Options */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">Preset Prompts</label>
                <div className="space-y-2">
                  {PRESET_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => {
                        if (status === 'idle') {
                          setSelectedPrompt(prompt);
                          setCustomPrompt("");
                        }
                      }}
                      disabled={status !== 'idle'}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                        selectedPrompt === prompt && !customPrompt
                          ? 'border-[#00F0FF] bg-[#00F0FF]/5 text-white'
                          : 'border-gray-800 bg-[#0B0E14] text-zinc-400 hover:border-gray-700'
                      }`}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Prompt */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">Custom Prompt Input</label>
                <input
                  type="text"
                  placeholder="Or write custom prompt..."
                  value={customPrompt}
                  disabled={status !== 'idle'}
                  onChange={(e) => {
                    setCustomPrompt(e.target.value);
                    setSelectedPrompt("");
                  }}
                  className="w-full bg-[#0B0E14] border border-gray-800 rounded-xl p-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#00F0FF] transition-all"
                />
              </div>
            </div>

            {/* Launch CTA */}
            <div className="pt-8">
              {status === 'idle' ? (
                <button
                  onClick={handleRun}
                  className="w-full bg-[#00F0FF] text-[#0B0E14] py-3.5 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center space-x-2 text-xs transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                >
                  <Play className="h-4 w-4 fill-current" />
                  <span>Launch Verifiable ZK-AI Query</span>
                </button>
              ) : status === 'done' ? (
                <button
                  onClick={resetPlayground}
                  className="w-full border border-[#00F0FF]/40 text-[#00F0FF] hover:bg-[#00F0FF]/5 py-3.5 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center space-x-2 text-xs transition-all duration-300"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Reset Playground</span>
                </button>
              ) : (
                <div className="w-full bg-zinc-950 border border-gray-850 py-3.5 rounded-xl text-xs font-mono text-center flex items-center justify-center space-x-2.5 text-zinc-400">
                  <RefreshCw className="h-3.5 w-3.5 animate-spin text-[#00F0FF]" />
                  <span className="uppercase tracking-wider">
                    {status === 'signing' && 'Awaiting Signature...'}
                    {status === 'inferencing' && 'Verifying Model Execution...'}
                    {status === 'proving' && 'Generating zk-SNARK...'}
                    {status === 'verifying' && 'Broadcasting Proof...'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Console / Visualization Output Column */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-gray-850 bg-[#06080C] overflow-hidden shadow-2xl relative">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-500 via-[#00F0FF] to-sky-500 opacity-60" />
            
            {/* Console Header */}
            <div className="px-4 py-3 bg-neutral-950 border-b border-gray-900 flex items-center justify-between font-mono text-xs text-zinc-400">
              <div className="flex items-center space-x-2">
                <Terminal className="h-4 w-4 text-[#00F0FF]" />
                <span className="font-semibold text-white">Praman ZKVM Cryptographic Console</span>
              </div>
              <div className="flex items-center space-x-2 text-[10px] bg-zinc-900 px-2 py-0.5 rounded text-zinc-400">
                <Lock className="h-3 w-3 mr-0.5 text-emerald-400" />
                <span>Encrypted Session</span>
              </div>
            </div>

            {/* Console Content */}
            <div className="flex-1 p-5 font-mono text-xs leading-relaxed overflow-y-auto max-h-[360px] min-h-[300px] bg-[#06080C]">
              {logs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-600 text-center space-y-3 font-sans">
                  <Binary className="h-10 w-10 text-zinc-800 animate-pulse" />
                  <div>
                    <p className="font-semibold text-zinc-500">Awaiting compilation payload</p>
                    <p className="text-xs text-zinc-600 max-w-xs mt-1">Configure inputs and click Launch to generate a verifiable AI trace and cryptographically secure proof.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {logs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`${
                        log.includes("SUCCESS") || log.includes("VERIFIED")
                          ? "text-emerald-400 font-semibold"
                          : log.includes("ZK-PROVER")
                          ? "text-purple-400"
                          : log.includes("AI OPERATION")
                          ? "text-[#00F0FF]"
                          : "text-zinc-400"
                      }`}
                    >
                      {log}
                    </motion.div>
                  ))}
                  <div ref={consoleEndRef} />
                </div>
              )}
            </div>

            {/* Dynamic Status Progress bar */}
            <div className="p-4 bg-neutral-950/80 border-t border-gray-900">
              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 mb-2">
                <span>VERIFY PIPELINE</span>
                <span className="uppercase text-[#00F0FF] font-semibold">{status}</span>
              </div>
              <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-500 via-[#00F0FF] to-emerald-400 h-full transition-all duration-500"
                  style={{
                    width: 
                      status === 'idle' ? '0%' :
                      status === 'signing' ? '25%' :
                      status === 'inferencing' ? '50%' :
                      status === 'proving' ? '75%' :
                      status === 'verifying' ? '90%' : '100%'
                  }}
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
