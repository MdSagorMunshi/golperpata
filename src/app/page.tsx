import { HeroSection } from '@/components/home/HeroSection';
import { StatsBar } from '@/components/home/StatsBar';
import { FeaturedStories } from '@/components/home/FeaturedStories';
import { RecentStories } from '@/components/home/RecentStories';
import { TagCloud } from '@/components/home/TagCloud';
import { ContributeCallout } from '@/components/home/ContributeCallout';
import { getAllStoryMetas, getAllTags, getFeaturedStories, getRecentStories } from '@/lib/stories';

export default function HomePage() {
  const allStories = getAllStoryMetas();
  const featured = getFeaturedStories(3);
  const recent = getRecentStories(12);
  const tags = getAllTags();

  // Calculate stats
  const uniqueAuthors = new Set(allStories.map((s) => s.author));
  const uniqueCategories = new Set(allStories.map((s) => s.category));
  const stats = {
    totalStories: allStories.length,
    totalAuthors: uniqueAuthors.size,
    totalCategories: uniqueCategories.size,
  };

  return (
    <>
      <HeroSection />
      <StatsBar stats={stats} />
      <FeaturedStories stories={featured} />
      <RecentStories stories={recent} />
      <TagCloud tags={tags} />
      <ContributeCallout />
    </>
  );
}
