import React, { useState } from 'react';
import { GitCommit, Tag, Code2, ArrowUpRight } from 'lucide-react';
import fallbackCommits from '../../data/fallback/commits.json';
import generatedCommits from '../../data/generated/commits.json';
import './HeroSection.css';

export function BlogHeroSection({ onTopicClick }) {
  const [activeTab, setActiveTab] = useState('Circom');
  const commits = generatedCommits.length > 0 ? generatedCommits : fallbackCommits;

  const topics = [
    'Zero Knowledge',
    'Authentication',
    'Blockchain',
    'APIs',
    'Security',
    'AI'
  ];

  return (
    <section className="hero-section py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hero-grid">
          {/* Left Column: Headline */}
          <div className="hero-content">
            <div className="hero-badge mb-4">
              <span className="badge badge-cyan">
                <Tag size={11} />
                ENGINEERING JOURNAL & RESEARCH
              </span>
            </div>

            <h1 className="hero-title">
              Engineering <br />
              <span className="gradient-cyan-text">Insights & Research</span>
            </h1>

            <p className="hero-subtitle">
              Deep technical analyses, Zero-Knowledge protocol architecture, circuit benchmarks, security audit reports, and developer implementation guides.
            </p>

            <div className="hero-ctas">
              <a href="#featured-article" className="btn-primary">
                READ LATEST <ArrowUpRight size={14} />
              </a>
              <a href="#topics-filter" className="btn-secondary">
                BROWSE TOPICS
              </a>
            </div>

          </div>

          {/* Right Column: Telemetry Dashboard Card */}
          <div className="hero-card-col">
            <div className="glass-card telemetry-card">
              <div className="telemetry-header flex items-center justify-between p-4 border-b border-white/10">
                <div style={{ display: 'flex', itemsCenter: 'center', gap: '8px' }}>
                  <Code2 size={16} color="var(--neon-cyan)" />
                  <span className="telemetry-title font-mono text-sm text-[#00E5FF] font-semibold">ENGINEERING_TELEMETRY</span>
                </div>
                <div className="status-badge flex items-center space-x-1.5 text-xs font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>LIVE FEED</span>
                </div>
              </div>

              {/* Metric Metrics Row */}
              <div className="telemetry-metrics grid grid-cols-3 gap-2 p-4 bg-white/[0.02]">
                <div className="metric-box text-center p-2 rounded-lg bg-white/[0.03] border border-white/5">
                  <div className="metric-val font-mono font-bold text-[15px] text-[#00E5FF]">142ms</div>
                  <div className="metric-label text-[11px] text-slate-400 uppercase mt-0.5">M2 PROVING</div>
                </div>
                <div className="metric-box text-center p-2 rounded-lg bg-white/[0.03] border border-white/5">
                  <div className="metric-val font-mono font-bold text-[15px] text-[#00E5FF]">24k TPS</div>
                  <div className="metric-label text-[11px] text-slate-400 uppercase mt-0.5">ROLLUP CAPACITY</div>
                </div>
                <div className="metric-box text-center p-2 rounded-lg bg-white/[0.03] border border-white/5">
                  <div className="metric-val font-mono font-bold text-[15px] text-[#00E5FF]">99.99%</div>
                  <div className="metric-label text-[11px] text-slate-400 uppercase mt-0.5">CIRCUIT UPTIME</div>
                </div>
              </div>

              {/* Recent GitHub Commit Activity */}
              <div className="commit-log-section p-4 border-t border-white/5">
                <div className="commit-log-title flex items-center space-x-2 text-xs font-mono text-slate-400 mb-3">
                  <GitCommit size={14} />
                  <span>RECENT COMMIT LOGS (GITHUB)</span>
                </div>

                <div className="commits-list space-y-2 font-mono text-[13px]">
                  {commits.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="commit-item flex items-center justify-between text-slate-300">
                      <span className="commit-sha text-purple-400">{item.sha ? item.sha.substring(0, 7) : '7d5e4a1'}</span>
                      <span className="commit-msg truncate max-w-[200px] text-slate-400">{item.commit?.message || 'feat(circuits): optimize Groth16 Prover WASM'}</span>
                      <span className="commit-date text-[11px] text-slate-500">
                        {item.commit?.author?.date ? new Date(item.commit.author.date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }) : 'Jul 2026'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Circuit Code Snippet View */}
              <div className="circuit-code-preview p-4 border-t border-white/5">
                <div className="preview-tabs flex space-x-2 border-b border-white/10 pb-2 mb-3">
                  <button className={`tab-btn text-[13px] font-mono px-2 py-1 rounded ${activeTab === 'Circom' ? 'text-[#00E5FF] bg-[#00E5FF]/10' : 'text-slate-400'}`} onClick={() => setActiveTab('Circom')}>Circom</button>
                  <button className={`tab-btn text-[13px] font-mono px-2 py-1 rounded ${activeTab === 'Rust' ? 'text-[#00E5FF] bg-[#00E5FF]/10' : 'text-slate-400'}`} onClick={() => setActiveTab('Rust')}>Rust</button>
                  <button className={`tab-btn text-[13px] font-mono px-2 py-1 rounded ${activeTab === 'TypeScript' ? 'text-[#00E5FF] bg-[#00E5FF]/10' : 'text-slate-400'}`} onClick={() => setActiveTab('TypeScript')}>TypeScript</button>
                </div>

                <pre className="code-snippet-box bg-black/60 p-3 rounded-lg border border-white/5 text-[13px] font-mono text-slate-300 overflow-x-auto">
                  <code>{`template BiometricVerify(n) {
    signal input features[n];
    signal input salt;
    signal output isValid;
    component hasher = Poseidon(n + 1);
    ...
}`}</code>
                </pre>
              </div>

              {/* Status Verification Footer */}
              <div className="telemetry-footer flex items-center justify-between p-3 bg-black/40 border-t border-white/5 text-xs font-mono text-slate-400">
                <span>[AUDIT] Groth16 Verifier — PASSED ✓</span>
                <button className="text-[#00E5FF] hover:underline">Copy Hash</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
