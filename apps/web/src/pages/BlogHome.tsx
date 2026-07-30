import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import '../components/blog/blog-theme.css';
import Navbar from '../components/Navbar.tsx';
import Footer from '../components/Footer.tsx';
import { BlogHeroSection } from '../components/blog/BlogHeroSection.jsx';
import { BlogSearchBar } from '../components/blog/BlogSearchBar.jsx';
import { BlogCommandPalette } from '../components/blog/BlogCommandPalette.jsx';
import { FeaturedArticle } from '../components/blog/FeaturedArticle.jsx';
import { ArticleGrid } from '../components/blog/ArticleGrid.jsx';
import { TrendingSidebar } from '../components/blog/TrendingSidebar.jsx';
import { NewsletterSection } from '../components/blog/NewsletterSection.jsx';
import { ScrollReveal } from '../components/blog/ScrollReveal.jsx';
import { categories } from '../data/categories.js';
import { articles, getFeaturedArticle, searchArticles } from '../data/articleIndex.js';
import { useKeyboard } from '../hooks/useKeyboard.js';

export function BlogHome() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isPaletteOpen, setIsPaletteOpen] = useState<boolean>(false);

  useKeyboard('k', () => setIsPaletteOpen(prev => !prev), true);

  const featuredArticle = getFeaturedArticle();
  const filteredArticles = searchArticles(searchQuery, selectedCategory);

  const gridArticles = (!searchQuery && selectedCategory === 'All')
    ? filteredArticles.filter((art: any) => art.slug !== featuredArticle?.slug)
    : filteredArticles;

  // Dynamically calculate accurate counts based on the actual articles in the index
  const dynamicCategories = categories.map(cat => ({
    ...cat,
    count: cat.id === 'All' 
      ? articles.length 
      : articles.filter(art => art.category === cat.id).length
  }));

  const activeCategoryObj = dynamicCategories.find(c => c.id === selectedCategory);
  const activeCategoryName = activeCategoryObj ? activeCategoryObj.name : 'All Topics';

  return (
    <div className="min-h-screen bg-[#030508] text-slate-100 font-sans">
      <Helmet>
        <title>Engineering Insights & Protocol Research | Praman Network</title>
        <meta name="description" content="Technical deep dives, Zero-Knowledge protocol architecture, security audit reports, and developer implementation guides from Praman Network." />
        <link rel="canonical" href="https://praman.network/blog" />
        <meta property="og:title" content="Engineering Insights & Protocol Research | Praman Network" />
        <meta property="og:description" content="Replacing trust with proof. Deep technical research on zk-SNARKs, Groth16, WebAuthn passkeys, and recursive rollups." />
        <meta property="og:url" content="https://praman.network/blog" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Praman Network — Engineering Journal" />
      </Helmet>

      {/* Main Site Navbar — OUTSIDE .blog-page scope so it's not affected */}
      <Navbar />

      {/* Blog Content — scoped under .blog-page to isolate styles */}
      <div className="blog-page pt-24">
        <main id="main-content">
          {/* Hero & Telemetry Console */}
          <BlogHeroSection onTopicClick={(cat: string) => setSelectedCategory(cat)} />

          {/* Search & Topic Filters */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-8">
            <BlogSearchBar
              query={searchQuery}
              onQueryChange={setSearchQuery}
              categories={dynamicCategories}
              activeCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onOpenPalette={() => setIsPaletteOpen(true)}
            />
          </div>

          {/* Content Layout: Main Feed + Sidebar */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Featured Banner + Article Grid (full width) */}
              <div className="lg:col-span-12 space-y-8">
                {selectedCategory === 'All' && !searchQuery && featuredArticle && (
                  <ScrollReveal>
                    <FeaturedArticle article={featuredArticle} />
                  </ScrollReveal>
                )}

                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <h2 className="text-xl font-bold font-display tracking-wide flex items-center space-x-3 text-slate-100">
                    <span>{selectedCategory === 'All' ? 'ALL RESEARCH PAPERS' : `${activeCategoryName.toUpperCase()} ARTICLES`}</span>
                    <span className="text-xs font-mono text-[#0DF2C9] bg-[#0DF2C9]/10 px-2.5 py-0.5 rounded-full border border-[#0DF2C9]/20">
                      {filteredArticles.length}
                    </span>
                  </h2>
                </div>

                <ScrollReveal>
                  <ArticleGrid articles={gridArticles} />
                </ScrollReveal>
              </div>


            </div>
          </div>

          {/* Newsletter Subscription */}
          <ScrollReveal>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
              <NewsletterSection />
            </div>
          </ScrollReveal>
        </main>
      </div>

      {/* Main Site Footer — OUTSIDE .blog-page scope */}
      <Footer />

      {/* Keyboard Command Palette (⌘K) */}
      <BlogCommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        articles={filteredArticles}
      />
    </div>
  );
}

export default BlogHome;
