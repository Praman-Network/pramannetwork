import React from 'react';
import { Search, Command } from 'lucide-react';
import { categories } from '../data/categories.js';
import './SearchBar.css';

export function SearchBar({ query, onSearch, activeCategory, onCategoryChange, onOpenCmdK }) {
  return (
    <div className="search-section" id="articles">
      <div className="search-bar-wrapper">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          className="search-input-field"
          placeholder="Search articles, Circom circuits, Groth16 proofs, APIs, tutorials..."
          value={query}
          onChange={(e) => onSearch(e.target.value)}
        />
        <div className="kbd-badge" onClick={onOpenCmdK}>
          <Command size={11} />
          <span>K</span>
        </div>
      </div>

      <div className="filter-pills-row no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`chip ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat.id)}
          >
            {cat.name} ({cat.count})
          </button>
        ))}
      </div>
    </div>
  );
}
