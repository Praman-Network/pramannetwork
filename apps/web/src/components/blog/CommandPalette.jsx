import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, FileText, X } from 'lucide-react';
import { searchArticles } from '../data/articleIndex.js';
import './CommandPalette.css';

export function CommandPalette({ onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const results = searchArticles(query);

  const handleSelect = (slug) => {
    navigate(`/${slug}`);
    onClose();
  };

  return (
    <div className="cmd-backdrop" onClick={onClose}>
      <div className="cmd-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-header">
          <Search size={18} color="var(--neon-cyan)" />
          <input
            type="text"
            className="cmd-input"
            placeholder="Type to search articles, circuits, documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button className="btn-icon" onClick={onClose} style={{ width: '28px', height: '28px' }}>
            <X size={16} />
          </button>
        </div>

        <div className="cmd-results no-scrollbar">
          {results.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
              No engineering articles match "{query}"
            </div>
          ) : (
            results.map((art) => (
              <div key={art.slug} className="cmd-item" onClick={() => handleSelect(art.slug)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FileText size={16} color="var(--neon-cyan)" />
                  <div>
                    <div className="cmd-item-title">{art.title}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {art.category} • {art.readingTime}
                    </div>
                  </div>
                </div>
                <ArrowRight size={14} />
              </div>
            ))
          )}
        </div>

        <div className="cmd-footer">
          <span>Navigation: <kbd>↑↓</kbd> Select, <kbd>↵</kbd> Open, <kbd>ESC</kbd> Close</span>
          <span style={{ color: 'var(--neon-cyan)' }}>Praman Journal</span>
        </div>
      </div>
    </div>
  );
}
