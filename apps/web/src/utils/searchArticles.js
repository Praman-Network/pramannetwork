import { searchArticles as searchHelper } from '../data/articleIndex.js';

export function searchArticles(query, category) {
  return searchHelper(query, category);
}
