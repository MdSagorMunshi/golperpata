import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllStoryMetas, getAllTags } from '@/lib/stories';
import { toBengaliNumeral } from '@/lib/utils';

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `${decoded} — বিষয় অনুযায়ী গল্প`,
    description: `"${decoded}" বিষয়ের সকল গল্প পড়ুন গল্পের.পাতায়।`,
  };
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return Array.from(tags.keys()).map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag).normalize('NFC');
  const stories = getAllStoryMetas().filter((s) =>
    s.tags.some((t) => t.normalize('NFC') === decoded)
  );

  if (stories.length === 0) notFound();

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="ink-badge ink-badge--saffron text-lg mb-4 inline-block">
          {decoded}
        </span>

        <h1
          className="text-3xl md:text-4xl mt-4 mb-2"
          style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)' }}
        >
          &ldquo;{decoded}&rdquo; বিষয়ের গল্প
        </h1>

        <p className="text-sm" style={{ color: 'var(--রং-কালি-মাঝারি)' }}>
          মোট {toBengaliNumeral(stories.length)} টি গল্প
        </p>
      </div>

      <div className="alpona-divider mb-10" aria-hidden="true" />

      {/* Stories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {stories.map((story) => (
          <Link key={story.slug} href={`/golpo/${story.slug}`}>
            <div className="paper-card p-5 h-full flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <span className="ink-badge ink-badge--saffron text-xs">{story.category}</span>
                <span className="text-xs" style={{ color: 'var(--রং-কালি-হালকা)' }}>
                  {story.readTimeText}
                </span>
              </div>

              <h3
                className="text-lg mb-1 line-clamp-2"
                style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', color: 'var(--রং-কালি)' }}
              >
                {story.title}
              </h3>

              <p className="text-sm mb-2" style={{ color: 'var(--রং-জাফরান)' }}>
                {story.author}
                {story.publicationYear && ` · ${story.publicationYear}`}
              </p>

              <p className="text-sm line-clamp-3 mb-3" style={{ color: 'var(--রং-কালি-মাঝারি)' }}>
                {story.excerpt}
              </p>

              <div className="mt-auto flex flex-wrap gap-1.5">
                {story.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className={`ink-badge text-xs ${t.normalize('NFC') === decoded ? 'ink-badge--saffron' : ''}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Navigation */}
      <div className="text-center mt-10 flex gap-4 justify-center flex-wrap">
        <Link href="/golpo" className="btn">
          সব গল্প দেখুন
        </Link>
        <Link href="/khojo" className="btn btn--primary">
          আরও খুঁজুন
        </Link>
      </div>
    </div>
  );
}
