import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllStoryMetas } from '@/lib/stories';
import { toBengaliNumeral, generateSlug } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'লেখক',
  description: 'গল্পের.পাতায় সংরক্ষিত সকল লেখকের তালিকা।',
};

export default function AuthorsPage() {
  const stories = getAllStoryMetas();

  // Group stories by author
  const authorMap = new Map<string, { count: number; slug: string; categories: Set<string> }>();
  for (const story of stories) {
    const existing = authorMap.get(story.author);
    if (existing) {
      existing.count++;
      existing.categories.add(story.category);
    } else {
      authorMap.set(story.author, {
        count: 1,
        slug: story.authorSlug,
        categories: new Set([story.category]),
      });
    }
  }

  const authors = Array.from(authorMap.entries())
    .sort((a, b) => b[1].count - a[1].count);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1
        className="text-center text-3xl md:text-4xl mb-2"
        style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)' }}
      >
        লেখকবৃন্দ
      </h1>
      <div className="alpona-divider mb-10" aria-hidden="true" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {authors.map(([name, info]) => (
          <Link key={name} href={`/lekhok/${encodeURIComponent(info.slug)}`}>
            <div className="paper-card p-6 h-full flex flex-col items-center text-center">
              {/* Avatar placeholder */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4"
                style={{
                  background: 'var(--রং-পুরনো-কাগজ)',
                  border: '2px solid var(--সীমা-হালকা)',
                  fontFamily: 'var(--ফন্ট-শিরোনাম)',
                  color: 'var(--রং-জাফরান)',
                }}
              >
                {name.charAt(0)}
              </div>
              <h3
                className="text-lg mb-1"
                style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', color: 'var(--রং-কালি)' }}
              >
                {name}
              </h3>
              <p className="text-sm" style={{ color: 'var(--রং-কালি-হালকা)' }}>
                {toBengaliNumeral(info.count)} টি গল্প
              </p>
              <div className="mt-3 flex flex-wrap gap-1 justify-center">
                {Array.from(info.categories).slice(0, 3).map((cat) => (
                  <span key={cat} className="ink-badge text-xs">{cat}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {authors.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg" style={{ color: 'var(--রং-কালি-মাঝারি)', fontFamily: 'var(--ফন্ট-শিরোনাম)' }}>
            এখনো কোনো লেখক যোগ হননি
          </p>
        </div>
      )}
    </div>
  );
}
