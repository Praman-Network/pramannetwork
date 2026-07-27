import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, FileText } from 'lucide-react';
import './CommandPalette.css';

export function BlogCommandPalette({ isOpen, onClose, articles = [] }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filtered = articles.filter(a =>
    a.title.toLowerCase().includes(query.toLowerCase().trim().substring(0, 100)) ||
    a.category.toLowerCase().includes(query.toLowerCase().trim().substring(0, 100))
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < filtered.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : filtered.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          navigate(`/blog/${filtered[selectedIndex].slug}`);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, navigate, onClose]);

  if (!isOpen) return null;

  return (
    <div className="palette-backdrop" onClick={onClose}>
      <div className="palette-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="palette-header">
          <Search size={18} color="var(--neon-cyan)" />
          <input
            type="text"
            className="palette-input"
            placeholder="Type a command or search research papers..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            maxLength={100}
            autoFocus
          />
          <button className="btn-icon" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="palette-results">
          {filtered.length === 0 ? (
            <div className="no-palette-results">No research papers matching "{query}"</div>
          ) : (
            filtered.map((art, idx) => (
              <div
                key={art.slug}
                className={`palette-item ${idx === selectedIndex ? 'selected' : ''}`}
                onClick={() => {
                  navigate(`/blog/${art.slug}`);
                  onClose();
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FileText size={16} color="var(--neon-cyan)" />
                  <div>
                    <div className="item-title">{art.title}</div>
                    <div className="item-subtitle">{art.category} • {art.readingTime}</div>
                  </div>
                </div>
                <ArrowRight size={14} className="item-arrow" />
              </div>
            ))
          )}
        </div>

        <div className="palette-footer">
          <span>Navigate <kbd>↑</kbd> <kbd>↓</kbd></span>
          <span>Select <kbd>↵</kbd></span>
          <span>Close <kbd>ESC</kbd></span>
        </div>
      </div>
    </div>
  );
}
