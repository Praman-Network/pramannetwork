import React from 'react';
import { ArticleCard } from './ArticleCard.jsx';
import './ArticleGrid.css';

export function ArticleGrid({ articles = [] }) {
  if (articles.length === 0) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', background: 'rgba(10,18,25,0.4)', borderRadius: '18px', border: '1px solid var(--border-subtle)' }}>
        <h3 className="heading-md" style={{ marginBottom: '8px' }}>No Engineering Articles Found</h3>
        <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search query or topic filter.</p>
      </div>
    );
  }

  return (
    <div className="article-grid">
      {articles.map((art) => (
        <ArticleCard key={art.slug} article={art} />
      ))}
    </div>
  );
}
