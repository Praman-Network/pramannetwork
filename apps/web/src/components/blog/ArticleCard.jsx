import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { formatFullDate } from '../../utils/formatDate.js';
import './ArticleCard.css';

export function ArticleCard({ article }) {
  if (!article) return null;

  return (
    <div className="glass-card article-card">
      <div className="article-card-header"></div>
      <div className="article-card-body">
        <div className="article-card-top">
          <span className="badge badge-cyan">{article.category}</span>
          <span className="badge badge-amber">{article.difficulty}</span>
        </div>

        <h3 className="article-card-title">
          <Link to={`/blog/${article.slug}`}>
            {article.title}
          </Link>
        </h3>

        <p className="article-card-excerpt">
          {article.subtitle}
        </p>

        <div className="article-card-footer">
          <div className="meta-left">
            <span>{formatFullDate(article.publishDate)}</span>
            <span>•</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={12} />
              <span>{article.readingTime}</span>
            </div>
          </div>

          <Link to={`/blog/${article.slug}`} className="read-more-link">
            <span>Read</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
