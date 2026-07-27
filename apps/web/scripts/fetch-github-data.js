import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const generatedDir = path.join(rootDir, 'src', 'data', 'generated');
const fallbackDir = path.join(rootDir, 'src', 'data', 'fallback');

if (!fs.existsSync(generatedDir)) {
  fs.mkdirSync(generatedDir, { recursive: true });
}

function copyFallback() {
  console.log('[GitHub Fetch] Copying fallback data to generated directory...');
  const files = ['commits.json', 'releases.json'];
  files.forEach(file => {
    const src = path.join(fallbackDir, file);
    const dest = path.join(generatedDir, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  });
}

function sanitizeString(str, maxLength = 256) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[\x00-\x1F\x7F-\x9F]/g, '')
    .substring(0, maxLength)
    .trim();
}

function sanitizeCommits(rawCommits) {
  if (!Array.isArray(rawCommits)) return null;
  return rawCommits.slice(0, 5).map(c => ({
    sha: sanitizeString(c.sha, 40),
    commit: {
      message: sanitizeString(c.commit?.message, 120),
      author: {
        name: sanitizeString(c.commit?.author?.name, 64),
        date: sanitizeString(c.commit?.author?.date, 32)
      }
    }
  }));
}

function sanitizeReleases(rawReleases) {
  if (!Array.isArray(rawReleases)) return null;
  return rawReleases.slice(0, 5).map(r => ({
    tag_name: sanitizeString(r.tag_name, 32),
    name: sanitizeString(r.name || r.tag_name, 64),
    published_at: sanitizeString(r.published_at, 32),
    html_url: sanitizeString(r.html_url, 256).startsWith('https://github.com/') ? r.html_url : 'https://github.com/Praman-Network'
  }));
}

async function fetchFromGitHub() {
  try {
    console.log('[GitHub Fetch] Fetching live data from GitHub API...');
    const headers = {
      'User-Agent': 'Praman-Blog-Builder (Node.js)'
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const [commitsRes, releasesRes] = await Promise.all([
      fetch('https://api.github.com/repos/Praman-Network/sdk/commits?per_page=5', { headers, signal: controller.signal }),
      fetch('https://api.github.com/repos/Praman-Network/sdk/releases?per_page=5', { headers, signal: controller.signal })
    ]);

    clearTimeout(timeoutId);

    if (commitsRes.ok && releasesRes.ok) {
      const rawCommits = await commitsRes.json();
      const rawReleases = await releasesRes.json();

      const cleanCommits = sanitizeCommits(rawCommits);
      const cleanReleases = sanitizeReleases(rawReleases);

      if (cleanCommits && cleanReleases) {
        fs.writeFileSync(path.join(generatedDir, 'commits.json'), JSON.stringify(cleanCommits, null, 2));
        fs.writeFileSync(path.join(generatedDir, 'releases.json'), JSON.stringify(cleanReleases, null, 2));
        console.log('[GitHub Fetch] Successfully fetched, sanitized, and saved GitHub data!');
        return;
      }
    }

    console.warn('[GitHub Fetch] GitHub API returned status', commitsRes.status, releasesRes.status);
    copyFallback();
  } catch (err) {
    console.warn('[GitHub Fetch] Fetch failed or timed out:', err.message);
    copyFallback();
  }
}

fetchFromGitHub();
