import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { ArrowLeft, Clock, Share2, Twitter, Linkedin, Check } from 'lucide-react';
import { useScrollProgress } from '../../hooks/useScrollProgress.js';
import { useScrollSpy } from '../../hooks/useScrollSpy.js';
import { mdxComponents } from './mdx/MdxComponents.jsx';
import { AuthorCard } from './AuthorCard.jsx';
import { ArticleGrid } from './ArticleGrid.jsx';
import { formatFullDate } from '../../utils/formatDate.js';
import { articles } from '../../data/articleIndex.js';
import './ArticleView.css';

export function ArticleView({ article }) {
  const [copiedShare, setCopiedShare] = useState(false);
  const [headings, setHeadings] = useState([]);
  const scrollProgress = useScrollProgress();
  const activeHeadingId = useScrollSpy('h2', 120);

  if (!article) return null;

  const MdxContent = article.Component;
  const related = articles
    .filter(a => article.relatedSlugs?.includes(a.slug) || (a.category === article.category && a.slug !== article.slug))
    .slice(0, 2);

  // Dynamically extract h2 headings for Table of Contents
  useEffect(() => {
    const timer = setTimeout(() => {
      const headingElements = Array.from(document.querySelectorAll('.article-body-content h2'));
      const parsed = headingElements.map((el, index) => {
        if (!el.id) {
          el.id = el.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        }
        return {
          id: el.id,
          title: el.textContent,
          index: index + 1
        };
      });
      setHeadings(parsed);
    }, 100);

    return () => clearTimeout(timer);
  }, [article.slug]);

  const handleShareCopy = () => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div>
      {/* Top Reading Progress Bar */}
      <div className="progress-bar-fixed" style={{ width: `${scrollProgress}%` }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Article Header */}
        <div className="article-header-section">
          <Link to="/blog" className="back-link">
            <ArrowLeft size={16} />
            BACK TO ENGINEERING JOURNAL
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span className="badge badge-cyan">
              {article.category}
            </span>
            <span className="badge badge-amber">
              {article.difficulty}
            </span>
          </div>

          <h1 className="article-page-title">
            {article.title}
          </h1>
          <p className="article-page-subtitle">
            {article.subtitle}
          </p>

          <div className="article-author-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="author-avatar" style={{ width: 40, height: 40, fontSize: 14 }}>
                RC
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{article.author?.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{article.author?.role}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '13px', color: 'var(--text-muted)' }}>
              <span>{formatFullDate(article.publishDate)}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={14} />
                <span>{article.readingTime}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }} onClick={handleShareCopy} title="Copy link">
                  {copiedShare ? <Check size={16} color="var(--neon-cyan)" /> : <Share2 size={16} />}
                </button>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                  <Twitter size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout: Dynamic TOC + Article Body */}
        <div className="article-detail-layout">
          {/* Dynamic Sticky Table of Contents */}
          <aside className="sticky-toc">
            <div className="toc-title">
              ON THIS PAGE
            </div>
            {headings.length === 0 ? (
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Loading sections...</span>
            ) : (
              <nav style={{ display: 'flex', flexDirection: 'column' }}>
                {headings.map((h) => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    className={`toc-link ${activeHeadingId === h.id ? 'active' : ''}`}
                  >
                    {h.index}. {h.title}
                  </a>
                ))}
              </nav>
            )}
          </aside>

          {/* Rendered MDX Content */}
          <main className="article-body-content">
            <MDXProvider components={mdxComponents}>
              {MdxContent ? <MdxContent /> : <div>Loading article content...</div>}
            </MDXProvider>

            {/* Author Profile Card */}
            <div className="mt-12">
              <AuthorCard author={article.author} />
            </div>

            {/* Related Research Articles */}
            {related.length > 0 && (
              <div className="mt-16 pt-8 border-t border-white/10">
                <h3 className="text-xl font-bold font-display text-white mb-6">Related Research Papers</h3>
                <ArticleGrid articles={related} />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
