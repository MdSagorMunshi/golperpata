import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getStoryBySlug, getAllStories, storyToMeta, getRelatedStories } from '@/lib/stories';
import { StoryReader } from '@/components/story/StoryReader';
import { RelatedStories } from '@/components/story/RelatedStories';

interface StoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) return {};

  return {
    title: `${story.frontmatter.শিরোনাম} — ${story.frontmatter.লেখক}`,
    description: story.excerpt,
    openGraph: {
      type: 'article',
      title: story.frontmatter.শিরোনাম,
      description: story.excerpt,
      authors: [story.frontmatter.লেখক],
    },
  };
}

export async function generateStaticParams() {
  const stories = getAllStories();
  return stories.map((s) => ({ slug: s.slug }));
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) notFound();

  const meta = storyToMeta(story);
  const related = getRelatedStories(meta, 4);

  return (
    <>
      <StoryReader story={story} />
      {related.length > 0 && <RelatedStories stories={related} />}
    </>
  );
}
