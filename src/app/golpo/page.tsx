import type { Metadata } from 'next';
import { getAllStoryMetas, getAllTags } from '@/lib/stories';
import { BrowseClient } from '@/components/browse/BrowseClient';

export const metadata: Metadata = {
  title: 'সব গল্প',
  description: 'গল্পের.পাতায় সংরক্ষিত সকল বাংলা গল্পের তালিকা।',
};

export default function BrowsePage() {
  const stories = getAllStoryMetas();
  const tags = getAllTags();

  return (
    <div className="container mx-auto px-4 py-10">
      <h1
        className="text-center text-3xl md:text-4xl mb-2"
        style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)' }}
      >
        সব গল্প
      </h1>
      <div className="alpona-divider mb-10" aria-hidden="true" />
      <BrowseClient stories={stories} tags={tags} />
    </div>
  );
}
