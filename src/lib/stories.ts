import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Story, StoryFrontmatter, StoryMeta } from '@/types/story';
import { generateSlug, calculateReadTime, extractExcerpt } from './utils';

const GOLPO_DIR = path.join(process.cwd(), 'golpo');

/** Get all story file paths from the golpo/ directory */
export function getAllStoryPaths(): { authorDir: string; filename: string; filepath: string }[] {
  const stories: { authorDir: string; filename: string; filepath: string }[] = [];

  if (!fs.existsSync(GOLPO_DIR)) return stories;

  const authorDirs = fs.readdirSync(GOLPO_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory());

  for (const dir of authorDirs) {
    const authorPath = path.join(GOLPO_DIR, dir.name);
    const files = fs.readdirSync(authorPath).filter((f) => f.endsWith('.md'));

    for (const file of files) {
      stories.push({
        authorDir: dir.name,
        filename: file,
        filepath: path.join(authorPath, file),
      });
    }
  }

  return stories;
}

/** Parse a single story file into a Story object */
export function parseStoryFile(filepath: string, filename: string, authorDir: string): Story {
  const raw = fs.readFileSync(filepath, 'utf-8');
  const { data, content } = matter(raw);
  const frontmatter = data as StoryFrontmatter;

  const slug = frontmatter.slug || generateSlug(filename.replace('.md', ''));
  const readTimeResult = calculateReadTime(content);
  const excerpt = frontmatter.সংক্ষেপ || extractExcerpt(content);

  return {
    slug,
    filename,
    frontmatter,
    content,
    excerpt,
    readTime: readTimeResult.minutes,
    readTimeText: frontmatter.পঠন_সময় || readTimeResult.text,
    wordCount: content.trim().split(/\s+/).length,
  };
}

/** Get all stories as Story objects */
export function getAllStories(): Story[] {
  const paths = getAllStoryPaths();
  return paths.map(({ filepath, filename, authorDir }) =>
    parseStoryFile(filepath, filename, authorDir)
  );
}

/** Get all stories as lightweight StoryMeta objects (for search index, cards) */
export function getAllStoryMetas(): StoryMeta[] {
  return getAllStories().map(storyToMeta);
}

/** Convert a full Story to a lightweight StoryMeta */
export function storyToMeta(story: Story): StoryMeta {
  return {
    slug: story.slug,
    filename: story.filename,
    title: story.frontmatter.শিরোনাম,
    author: story.frontmatter.লেখক,
    authorSlug: generateSlug(story.frontmatter.লেখক),
    category: story.frontmatter.বিষয়শ্রেণী,
    tags: story.frontmatter.ট্যাগ || [],
    excerpt: story.excerpt,
    readTimeText: story.readTimeText,
    readTimeMinutes: story.readTime,
    publicationYear: story.frontmatter.প্রকাশকাল,
    dateAdded: story.frontmatter.যোগ_করা_হয়েছে,
    coverImage: story.frontmatter.প্রচ্ছদ,
    isFeatured: story.frontmatter.বৈশিষ্ট্যমণ্ডিত || false,
    isAI: story.frontmatter.এআই_নির্মিত || false,
    viewCount: 0,
  };
}

/** Get a single story by slug */
export function getStoryBySlug(slug: string): Story | undefined {
  const normalizedSlug = decodeURIComponent(slug).normalize('NFC');
  const paths = getAllStoryPaths();
  for (const { filepath, filename, authorDir } of paths) {
    const storySlug = generateSlug(filename.replace('.md', '')).normalize('NFC');
    if (storySlug === normalizedSlug) {
      return parseStoryFile(filepath, filename, authorDir);
    }
  }
  return undefined;
}

/** Get all unique tags with counts */
export function getAllTags(): Map<string, number> {
  const tagCounts = new Map<string, number>();
  const stories = getAllStories();
  for (const story of stories) {
    for (const tag of story.frontmatter.ট্যাগ || []) {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    }
  }
  return tagCounts;
}

/** Get featured stories */
export function getFeaturedStories(limit = 3): StoryMeta[] {
  return getAllStoryMetas()
    .filter((s) => s.isFeatured)
    .slice(0, limit);
}

/** Get recent stories */
export function getRecentStories(limit = 12): StoryMeta[] {
  return getAllStoryMetas()
    .sort((a, b) => {
      if (!a.dateAdded || !b.dateAdded) return 0;
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    })
    .slice(0, limit);
}

/** Get stories by tag */
export function getStoriesByTag(tag: string): StoryMeta[] {
  return getAllStoryMetas().filter((s) => s.tags.includes(tag));
}

/** Get stories by author slug */
export function getStoriesByAuthor(authorSlug: string): StoryMeta[] {
  return getAllStoryMetas().filter((s) => s.authorSlug === authorSlug);
}

/** Get related stories (by tag overlap) */
export function getRelatedStories(story: StoryMeta, limit = 4): StoryMeta[] {
  const allMetas = getAllStoryMetas();
  const scored = allMetas
    .filter((s) => s.slug !== story.slug)
    .map((s) => {
      const overlap = s.tags.filter((t) => story.tags.includes(t)).length;
      const sameAuthor = s.author === story.author ? 1 : 0;
      const sameCategory = s.category === story.category ? 1 : 0;
      return { story: s, score: overlap * 3 + sameCategory * 2 + sameAuthor };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.story);
}
