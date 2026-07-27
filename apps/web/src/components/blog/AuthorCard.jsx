import React from 'react';
import { Twitter, Linkedin, Github } from 'lucide-react';
import './AuthorCard.css';

function sanitizeHandle(handle) {
  if (typeof handle !== 'string') return '';
  return handle.replace(/[^a-zA-Z0-9_-]/g, '').substring(0, 50);
}

export function AuthorCard({ author }) {
  if (!author) return null;

  const safeTwitter = sanitizeHandle(author.twitter);
  const safeLinkedin = sanitizeHandle(author.linkedin);
  const safeGithub = sanitizeHandle(author.github);

  return (
    <div className="glass-card author-profile-card">
      <div className="author-large-avatar">RC</div>
      <div className="author-info">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 className="author-name">{String(author.name || 'Praman Author').substring(0, 80)}</h3>
            <div style={{ fontSize: '12px', color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)' }}>
              {String(author.role || 'Engineer').substring(0, 80)}
            </div>
          </div>
          <span className="badge badge-cyan">AUTHOR / RESEARCHER</span>
        </div>

        <p className="author-bio">{String(author.bio || '').substring(0, 300)}</p>

        <div className="author-links-row">
          {safeTwitter && (
            <a href={`https://twitter.com/${safeTwitter}`} target="_blank" rel="noopener noreferrer" className="btn-icon">
              <Twitter size={15} />
            </a>
          )}
          {safeLinkedin && (
            <a href={`https://linkedin.com/in/${safeLinkedin}`} target="_blank" rel="noopener noreferrer" className="btn-icon">
              <Linkedin size={15} />
            </a>
          )}
          {safeGithub && (
            <a href={`https://github.com/${safeGithub}`} target="_blank" rel="noopener noreferrer" className="btn-icon">
              <Github size={15} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
