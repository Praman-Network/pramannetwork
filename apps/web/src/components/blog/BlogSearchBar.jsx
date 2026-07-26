import React from 'react';
import { Search, Command } from 'lucide-react';
import './SearchBar.css';

export function BlogSearchBar({ query, onQueryChange, categories = [], activeCategory, onCategoryChange, onOpenPalette }) {
  return (
    <div className="search-filter-section" id="topics-filter">
      {/* Search Bar Input */}
      <div className="search-bar-wrapper">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Search articles, Circom circuits, Groth16 proofs, APIs, tutorials..."
          value={query}
          onChange={(e) => onQueryChange && onQueryChange(e.target.value)}
          maxLength={100}
        />
        <button className="cmdk-trigger-btn" onClick={onOpenPalette} title="Open Command Palette (⌘K)">
          <Command size={12} />
          <span>K</span>
        </button>
      </div>

      {/* Popular Topic Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-4">
        <span className="text-[11px] font-mono tracking-[0.1em] text-slate-500 uppercase shrink-0">POPULAR TOPICS:</span>
        <div className="category-pills-row" style={{ marginTop: 0 }}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              className={`category-pill ${isActive ? 'active' : ''}`}
              onClick={() => onCategoryChange && onCategoryChange(cat.id)}
            >
              <span>{cat.name}</span>
              <span className="pill-count">({cat.count})</span>
            </button>
          );
        })}
        </div>
      </div>
    </div>
  );
}
