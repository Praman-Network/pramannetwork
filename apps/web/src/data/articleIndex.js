// Dynamic MDX Article Indexing Engine
const mdxModules = import.meta.glob('../content/*.mdx', { eager: true });

export const articles = Object.entries(mdxModules).map(([filePath, mod]) => {
  const filename = filePath.split('/').pop().replace('.mdx', '');
  const frontmatter = mod.frontmatter || {};
  
  return {
    slug: String(frontmatter.slug || filename).replace(/[^a-z0-9-]/gi, ''),
    title: String(frontmatter.title || 'Untitled Article').substring(0, 150),
    subtitle: String(frontmatter.subtitle || '').substring(0, 300),
    category: String(frontmatter.category || 'Zero Knowledge').substring(0, 50),
    difficulty: String(frontmatter.difficulty || 'Intermediate').substring(0, 20),
    readingTime: String(frontmatter.readingTime || '5 min read').substring(0, 20),
    publishDate: String(frontmatter.publishDate || '2026-07-18').substring(0, 20),
    featured: Boolean(frontmatter.featured),
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags.map(t => String(t).substring(0, 30)) : [],
    author: frontmatter.author || { name: 'Rahul Chaudhary', role: 'Founder & Founding Engineer' },
    relatedSlugs: Array.isArray(frontmatter.relatedSlugs) ? frontmatter.relatedSlugs : [],
    Component: mod.default
  };
}).sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

export function getArticleBySlug(slug) {
  if (!slug || typeof slug !== 'string') return null;
  const cleanSlug = slug.replace(/[^a-z0-9-]/gi, '');
  return articles.find(art => art.slug === cleanSlug);
}

export function getFeaturedArticle() {
  return articles.find(art => art.featured) || articles[0];
}

export function getArticlesByCategory(category) {
  if (!category || category === 'All') return articles;
  return articles.filter(art => art.category === category);
}

export function searchArticles(query, category = 'All') {
  let filtered = articles;

  if (category && category !== 'All') {
    filtered = filtered.filter(art => art.category === category);
  }

  if (!query || typeof query !== 'string' || !query.trim()) {
    return filtered;
  }

  // Bound query length to 100 chars to prevent ReDoS / CPU spike
  const q = query.substring(0, 100).toLowerCase().trim();

  return filtered.filter(art => {
    const titleMatch = art.title?.toLowerCase().includes(q);
    const subtitleMatch = art.subtitle?.toLowerCase().includes(q);
    const tagMatch = art.tags?.some(tag => tag.toLowerCase().includes(q));
    const authorMatch = art.author?.name?.toLowerCase().includes(q);
    const categoryMatch = art.category?.toLowerCase().includes(q);
    
    return titleMatch || subtitleMatch || tagMatch || authorMatch || categoryMatch;
  });
}
