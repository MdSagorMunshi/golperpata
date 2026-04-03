import type { MetadataRoute } from 'next';
import { getAllStoryMetas, getAllTags } from '@/lib/stories';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://golperpata.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const stories = getAllStoryMetas();
  const tags = getAllTags();
  const authors = new Set(stories.map((s) => s.authorSlug));

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/golpo`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/khojo`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/lekhok`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/rupantar`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/likhun`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/about`,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  // Story pages
  const storyPages: MetadataRoute.Sitemap = stories.map((story) => ({
    url: `${BASE_URL}/golpo/${encodeURIComponent(story.slug)}`,
    lastModified: story.dateAdded ? new Date(story.dateAdded) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Author pages
  const authorPages: MetadataRoute.Sitemap = Array.from(authors).map((slug) => ({
    url: `${BASE_URL}/lekhok/${encodeURIComponent(slug)}`,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Tag pages
  const tagPages: MetadataRoute.Sitemap = Array.from(tags.keys()).map((tag) => ({
    url: `${BASE_URL}/tag/${encodeURIComponent(tag)}`,
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...storyPages, ...authorPages, ...tagPages];
}
