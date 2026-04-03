import type { Metadata } from 'next';
import { getAllStoryMetas } from '@/lib/stories';
import { SearchClient } from '@/components/search/SearchClient';

export const metadata: Metadata = {
  title: 'খুঁজুন',
  description: 'গল্পের.পাতায় গল্প খুঁজুন — শিরোনাম, লেখক, বিষয় দিয়ে।',
};

export default function SearchPage() {
  const stories = getAllStoryMetas();

  return (
    <div className="container mx-auto px-4 py-10">
      <h1
        className="text-center text-3xl md:text-4xl mb-2"
        style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)' }}
      >
        গল্প খুঁজুন
      </h1>
      <div className="alpona-divider mb-10" aria-hidden="true" />
      <SearchClient stories={stories} />
    </div>
  );
}
