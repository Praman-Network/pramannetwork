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
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hero-grid">
          {/* Left Column: Headline */}
          <div className="hero-content">
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

        </div>
      </div>
    </section>
  );
}
