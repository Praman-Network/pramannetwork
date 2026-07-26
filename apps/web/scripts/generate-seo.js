import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const contentDir = path.join(rootDir, 'src', 'content');
const distDir = path.join(rootDir, 'dist');
const siteUrl = 'https://praman.network/blog';

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

function escapeXml(unsafe) {
  if (typeof unsafe !== 'string') return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function sanitizeSlug(slug) {
  if (typeof slug !== 'string') return '';
  return slug.replace(/[^a-z0-9-]/gi, '');
}

const mdxFiles = glob.sync('**/*.mdx', { cwd: contentDir });

const articles = mdxFiles.map(file => {
  const filePath = path.join(contentDir, file);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(fileContent);
  return data;
});

function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  xml += `  <url>\n`;
  xml += `    <loc>${escapeXml(siteUrl)}</loc>\n`;
  xml += `    <lastmod>${currentDate}</lastmod>\n`;
  xml += `    <changefreq>daily</changefreq>\n`;
  xml += `    <priority>1.0</priority>\n`;
  xml += `  </url>\n`;

  articles.forEach(article => {
    if (article && article.slug) {
      const cleanSlug = sanitizeSlug(article.slug);
      xml += `  <url>\n`;
      xml += `    <loc>${escapeXml(siteUrl)}/${cleanSlug}</loc>\n`;
      xml += `    <lastmod>${escapeXml(article.publishDate || currentDate)}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    }
  });

  xml += `</urlset>`;

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml);
  console.log('[SEO Generator] Generated sitemap.xml with', articles.length + 1, 'URLs');
}

function generateRss() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n`;
  xml += `  <channel>\n`;
  xml += `    <title>Praman Network — Engineering Journal</title>\n`;
  xml += `    <link>${escapeXml(siteUrl)}</link>\n`;
  xml += `    <description>Technical deep dives, protocol architecture, zero-knowledge research, and developer tutorials from Praman Network.</description>\n`;
  xml += `    <language>en-us</language>\n`;
  xml += `    <atom:link href="${escapeXml(siteUrl)}/rss.xml" rel="self" type="application/rss+xml" />\n`;

  articles.forEach(article => {
    if (article && article.slug) {
      const cleanSlug = sanitizeSlug(article.slug);
      const pubDate = new Date(article.publishDate || Date.now());
      const safePubDate = isNaN(pubDate.getTime()) ? new Date().toUTCString() : pubDate.toUTCString();

      xml += `    <item>\n`;
      xml += `      <title><![CDATA[${escapeXml(article.title || '')}]]></title>\n`;
      xml += `      <link>${escapeXml(siteUrl)}/${cleanSlug}</link>\n`;
      xml += `      <guid>${escapeXml(siteUrl)}/${cleanSlug}</guid>\n`;
      xml += `      <pubDate>${safePubDate}</pubDate>\n`;
      xml += `      <description><![CDATA[${escapeXml(article.subtitle || '')}]]></description>\n`;
      xml += `    </item>\n`;
    }
  });

  xml += `  </channel>\n`;
  xml += `</rss>`;

  fs.writeFileSync(path.join(distDir, 'rss.xml'), xml);
  console.log('[SEO Generator] Generated rss.xml');
}

function generateRobots() {
  const txt = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
  fs.writeFileSync(path.join(distDir, 'robots.txt'), txt);
  console.log('[SEO Generator] Generated robots.txt');
}

generateSitemap();
generateRss();
generateRobots();
