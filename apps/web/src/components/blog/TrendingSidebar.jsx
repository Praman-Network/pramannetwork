import React from 'react';
import { ShieldCheck, Tag, ExternalLink, Activity, Milestone } from 'lucide-react';
import { sidebarData } from '../../data/sidebarData.js';
import releasesData from '../../data/generated/releases.json';
import './TrendingSidebar.css';

export function TrendingSidebar({ onTagSelect }) {
  const releases = releasesData.length > 0 ? releasesData : sidebarData.recentReleases;

  return (
    <aside className="trending-sidebar">
      {/* Protocol Releases */}
      <div className="glass-card sidebar-box">
        <div className="sidebar-title">
          <Activity size={14} />
          <span>PROTOCOL RELEASES (DYNAMIC)</span>
        </div>
        <div className="sidebar-releases-list">
          {releases.map((rel, idx) => (
            <div key={idx} className="release-item">
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-primary)' }}>
                {rel.name || rel.version}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {rel.published_at ? new Date(rel.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Jul 2026'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Security Advisories */}
      <div className="glass-card sidebar-box">
        <div className="sidebar-title">
          <ShieldCheck size={14} />
          <span>SECURITY ADVISORIES</span>
        </div>
        <div className="sidebar-advisories-list">
          {sidebarData.securityAdvisories.map((adv) => (
            <div key={adv.id} className="advisory-item">
              <span style={{ color: 'var(--text-muted)' }}>{adv.id}</span>
              <span className={`badge badge-${adv.statusVariant}`}>{adv.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Tags Cloud */}
      <div className="glass-card sidebar-box">
        <div className="sidebar-title">
          <Tag size={14} />
          <span>POPULAR TAGS</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {sidebarData.popularTags.map((tag) => (
            <button
              key={tag}
              className="chip"
              style={{ fontSize: '11px', padding: '4px 10px' }}
              onClick={() => onTagSelect && onTagSelect(tag)}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Developer Resources */}
      <div className="glass-card sidebar-box">
        <div className="sidebar-title">
          <ExternalLink size={14} />
          <span>DEVELOPER RESOURCES</span>
        </div>
        <div>
          {sidebarData.developerResources.map((res, i) => (
            <a key={i} href={res.url} target="_blank" rel="noopener noreferrer" className="sidebar-resource-link">
              <span>{res.title}</span>
              <ExternalLink size={12} color="var(--neon-cyan)" />
            </a>
          ))}
        </div>
      </div>

      {/* Upcoming Milestones */}
      <div className="glass-card sidebar-box">
        <div className="sidebar-title">
          <Milestone size={14} />
          <span>MILESTONES</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
          {sidebarData.upcomingMilestones.map((m, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: m.completed ? 'var(--green)' : 'var(--text-secondary)' }}>
                {m.completed ? '✓ ' : '• '}{m.version} — {m.name}
              </span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{m.target}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
