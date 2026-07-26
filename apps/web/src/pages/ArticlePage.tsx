import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../components/blog/blog-theme.css';
import Navbar from '../components/Navbar.tsx';
import Footer from '../components/Footer.tsx';
import { ArticleView } from '../components/blog/ArticleView.jsx';
import { NewsletterSection } from '../components/blog/NewsletterSection.jsx';
import { ScrollReveal } from '../components/blog/ScrollReveal.jsx';
import { getArticleBySlug } from '../data/articleIndex.js';

export function ArticlePage() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#030508] text-slate-100 font-sans">
        <Navbar />
        <div className="blog-page pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
            <h1 className="text-4xl font-bold font-display text-white mb-4">404 — Article Not Found</h1>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              The research article you requested does not exist or may have been relocated.
            </p>
            <Link to="/blog" className="bg-[#0DF2C9] text-black px-6 py-3 rounded-xl font-bold font-display text-sm tracking-wider uppercase inline-flex items-center space-x-2">
              <span>RETURN TO JOURNAL HOME</span>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const articleUrl = `https://praman.network/blog/${article.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": article.title,
    "description": article.subtitle,
    "datePublished": article.publishDate,
    "author": {
      "@type": "Person",
      "name": article.author?.name || "Rahul Chaudhary"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Praman Network",
      "logo": {
        "@type": "ImageObject",
        "url": "https://praman.network/logo.png"
      }
    },
    "mainEntityOfPage": articleUrl
  };

  return (
    <div className="min-h-screen bg-[#030508] text-slate-100 font-sans">
      <Helmet>
        <title>{`${article.title} | Praman Engineering Journal`}</title>
        <meta name="description" content={article.subtitle} />
        <link rel="canonical" href={articleUrl} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.subtitle} />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.subtitle} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Main Site Navbar — OUTSIDE .blog-page scope */}
      <Navbar />

      {/* Blog Content — scoped under .blog-page */}
      <div className="blog-page pt-24">
        <main id="main-content" className="pt-6">
          <ArticleView article={article} />

          <ScrollReveal>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
              <NewsletterSection />
            </div>
          </ScrollReveal>
        </main>
      </div>

      {/* Main Site Footer — OUTSIDE .blog-page scope */}
      <Footer />
    </div>
  );
}

export default ArticlePage;
