import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Clock, ArrowRight } from 'lucide-react';
import { formatFullDate } from '../../utils/formatDate.js';
import './FeaturedArticle.css';

export function FeaturedArticle({ article }) {
  if (!article) return null;

  return (
    <Link to={`/blog/${article.slug}`} className="glass-card featured-card" id="featured-article">
      <div className="featured-gradient-header">
        <div className="featured-circuit-pattern"></div>
        <div style={{ display: 'flex', gap: '12px', zIndex: 1 }}>
          <span className="badge badge-cyan">
            <Sparkles size={11} />
            FEATURED RESEARCH
          </span>
          <span className="badge badge-amber">{article.category}</span>
        </div>
      </div>
      
      <div className="featured-content">
        <h2 className="featured-title">
          {article.title}
        </h2>

        <p className="featured-subtitle">
          {article.subtitle}
        </p>

        <div className="featured-meta-row" style={{ marginTop: '16px' }}>
          <div className="featured-author">
            <div className="author-avatar">RC</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{article.author?.name}</span>
              <span style={{ fontSize: '11px' }}>{article.author?.role}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>{formatFullDate(article.publishDate)}</span>
            <span>•</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={12} />
              <span>{article.readingTime}</span>
            </div>
            <span className="badge badge-cyan" style={{ marginLeft: '8px' }}>{article.difficulty}</span>
          </div>
        </div>

        <div className="featured-read-link">
          <span>READ FULL RESEARCH PAPER</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
}
