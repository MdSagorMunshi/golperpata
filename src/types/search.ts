import type { StoryMeta } from './story';

export interface SearchResult {
  item: StoryMeta;
  score: number;
  matches?: SearchMatch[];
  type: 'direct' | 'fuzzy' | 'fulltext';
}

export interface SearchMatch {
  key: string;
  value: string;
  indices: [number, number][];
}

export interface SearchIndex {
  stories: StoryMeta[];
  totalCount: number;
  lastUpdated: string;
}
