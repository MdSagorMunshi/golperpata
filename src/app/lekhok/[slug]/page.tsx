import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getAllStoryMetas } from '@/lib/stories';
import { generateSlug, toBengaliNumeral } from '@/lib/utils';

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const stories = getAllStoryMetas();
  const decodedSlug = decodeURIComponent(slug).normalize('NFC');
  const authorStories = stories.filter(
    (s) => s.authorSlug.normalize('NFC') === decodedSlug
  );

  if (authorStories.length === 0) return {};

  const authorName = authorStories[0].author;
  return {
    title: `${authorName} — লেখকের গল্পসমূহ`,
    description: `${authorName}-এর ${toBengaliNumeral(authorStories.length)} টি গল্প পড়ুন গল্পের.পাতায়।`,
  };
}

export async function generateStaticParams() {
  const stories = getAllStoryMetas();
  const authorSlugs = new Set<string>();
  stories.forEach((s) => authorSlugs.add(s.authorSlug));
  return Array.from(authorSlugs).map((slug) => ({ slug }));
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const stories = getAllStoryMetas();
  const decodedSlug = decodeURIComponent(slug).normalize('NFC');
  const authorStories = stories.filter(
    (s) => s.authorSlug.normalize('NFC') === decodedSlug
  );

  if (authorStories.length === 0) notFound();

  const authorName = authorStories[0].author;
  const categories = new Set(authorStories.map((s) => s.category));
  const tags = new Set(authorStories.flatMap((s) => s.tags));

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Author Header */}
      <div className="text-center mb-10">
        {/* Avatar */}
        <div
          className="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-4xl mb-4"
          style={{
            background: 'var(--রং-পুরনো-কাগজ)',
            border: '3px solid var(--সীমা-মাঝারি)',
            fontFamily: 'var(--ফন্ট-শিরোনাম)',
            color: 'var(--রং-জাফরান)',
          }}
        >
          {authorName.charAt(0)}
        </div>

        <h1
          className="text-3xl md:text-4xl mb-2"
          style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)' }}
        >
          {authorName}
        </h1>

        <p className="text-sm mb-4" style={{ color: 'var(--রং-কালি-মাঝারি)' }}>
          {toBengaliNumeral(authorStories.length)} টি গল্প · {toBengaliNumeral(categories.size)} টি বিষয়শ্রেণী
        </p>

        {/* Category badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-2">
          {Array.from(categories).map((cat) => (
            <span key={cat} className="ink-badge ink-badge--saffron text-xs">{cat}</span>
          ))}
        </div>

        {/* Tag badges */}
        <div className="flex flex-wrap justify-center gap-2">
          {Array.from(tags).slice(0, 10).map((tag) => (
            <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`}>
              <span className="ink-badge text-xs">{tag}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="alpona-divider mb-10" aria-hidden="true" />

      {/* Stories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {authorStories.map((story) => (
          <Link key={story.slug} href={`/golpo/${story.slug}`}>
            <div className="paper-card p-5 h-full flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <span className="ink-badge ink-badge--saffron text-xs">{story.category}</span>
                <span className="text-xs" style={{ color: 'var(--রং-কালি-হালকা)' }}>
                  {story.readTimeText}
                </span>
              </div>

              <h3
                className="text-lg mb-2 line-clamp-2"
                style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', color: 'var(--রং-কালি)' }}
              >
                {story.title}
              </h3>

              {story.publicationYear && (
                <p className="text-xs mb-2" style={{ color: 'var(--রং-কালি-হালকা)' }}>
                  প্রকাশকাল: {story.publicationYear}
                </p>
              )}

              <p className="text-sm line-clamp-3 mb-3" style={{ color: 'var(--রং-কালি-মাঝারি)' }}>
                {story.excerpt}
              </p>

              <div className="mt-auto flex flex-wrap gap-1.5">
                {story.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="ink-badge text-xs">{tag}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Back link */}
      <div className="text-center mt-10">
        <Link href="/lekhok" className="btn">
          ← সব লেখক দেখুন
        </Link>
      </div>
    </div>
  );
}
