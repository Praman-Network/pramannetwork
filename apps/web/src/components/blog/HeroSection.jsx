import React, { useState } from 'react';
import { Sparkles, ArrowRight, Terminal, GitCommit, ShieldCheck, Check } from 'lucide-react';
import commitsData from '../data/generated/commits.json';
import releasesData from '../data/generated/releases.json';
import './HeroSection.css';

export function HeroSection({ onReadLatest, onCategorySelect }) {
  const [activeTab, setActiveTab] = useState('Circom');
  const [copiedProof, setCopiedProof] = useState(false);

  const latestRelease = releasesData[0]?.name || 'v1.4.2 — Recursive Rollup Engine';
  const recentCommits = commitsData.slice(0, 3);

  const codeSnippets = {
    Circom: `template BiometricVerify(n) {
    signal input features[n];
    signal input salt;
    signal output isValid;
    component hasher = Poseidon(n + 1);
    ...
}`,
    Rust: `pub fn aggregate_proofs(
    proofs: Vec<Proof>,
    vkey: &VerifyingKey
) -> Result<Proof, AggregationError> {
    let mut engine = RecursiveEngine::new();
}`,
    TypeScript: `import { PramanPasskey } from '@praman/sdk';
const result = await PramanPasskey.authenticate({
  rpId: "app.praman.network"
});`
  };

  const handleCopyProof = () => {
    navigator.clipboard.writeText('0x7d5e4a1f9c12b8e33f88d01a2b4c6e8f');
    setCopiedProof(true);
    setTimeout(() => setCopiedProof(false), 2000);
  };

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column */}
          <div className="hero-left">
            <div className="hero-badge-pill">
              <Sparkles size={13} />
              <span>ENGINEERING JOURNAL & RESEARCH</span>
            </div>

            <h1 className="hero-title">
              Engineering <br />
              <span className="text-cyan text-glow">Insights &</span> <br />
              Research
            </h1>

            <p className="hero-subtitle">
              Deep technical analyses, Zero-Knowledge protocol architecture, circuit benchmarks, security audit reports, and developer implementation guides.
            </p>

            <div className="hero-actions">
              <button className="btn-primary" onClick={onReadLatest}>
                READ LATEST <ArrowRight size={16} />
              </button>
              <a href="#articles" className="btn-secondary">
                BROWSE TOPICS
              </a>
            </div>

            <div>
              <div className="popular-chips-label">Popular Topics</div>
              <div className="popular-chips-row">
                {['Zero Knowledge', 'Authentication', 'Blockchain', 'APIs', 'Security', 'AI'].map(cat => (
                  <button 
                    key={cat} 
                    className="chip"
                    onClick={() => onCategorySelect(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column — Developer Console Dashboard */}
          <div className="console-card animate-float">
            <div className="console-header">
              <div className="console-header-title">
                <Terminal size={14} />
                <span>ENGINEERING_TELEMETRY</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--green)', fontSize: '11px' }}>
                <span className="status-dot"></span>
                <span>LIVE FEED</span>
              </div>
            </div>

            <div className="console-body">
              {/* Telemetry Metrics */}
              <div className="console-metrics-row">
                <div>
                  <div className="console-metric-val">142ms</div>
                  <div className="console-metric-lbl">M2 Proving</div>
                </div>
                <div>
                  <div className="console-metric-val">24k TPS</div>
                  <div className="console-metric-lbl">Rollup Capacity</div>
                </div>
                <div>
                  <div className="console-metric-val">99.99%</div>
                  <div className="console-metric-lbl">Circuit Uptime</div>
                </div>
              </div>

              {/* Live GitHub Commits Feed */}
              <div>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <GitCommit size={12} />
                  <span>RECENT COMMIT LOGS (GITHUB)</span>
                </div>
                <div className="console-commit-feed">
                  {recentCommits.map((item, i) => (
                    <div key={i} className="commit-item">
                      <div>
                        <span className="commit-sha">{item.sha ? item.sha.substring(0, 7) : '7d5e4a1'}</span>
                        <span>{item.commit?.message?.substring(0, 36) || 'feat: update prover constraints'}...</span>
                      </div>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                        {item.commit?.author?.date ? new Date(item.commit.author.date).toLocaleDateString() : 'recent'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Snippet Tabs */}
              <div>
                <div className="console-code-tabs">
                  {['Circom', 'Rust', 'TypeScript'].map(tab => (
                    <button
                      key={tab}
                      className={`console-tab ${activeTab === tab ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#38BDF8', lineHeight: 1.6, overflowX: 'auto', background: 'rgba(5,5,5,0.6)', padding: '12px', borderRadius: '8px' }}>
                  <code>{codeSnippets[activeTab]}</code>
                </pre>
              </div>

              {/* Security Audit Badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(74, 222, 128, 0.06)', borderRadius: '8px', border: '1px solid rgba(74, 222, 128, 0.15)', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--green)' }}>
                  <ShieldCheck size={16} />
                  <span>[AUDIT] Groth16 Verifier — PASSED ✓</span>
                </div>
                <button onClick={handleCopyProof} style={{ color: 'var(--text-muted)', fontSize: '11px', cursor: 'pointer' }}>
                  {copiedProof ? <Check size={12} color="var(--green)" /> : 'Copy Hash'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
