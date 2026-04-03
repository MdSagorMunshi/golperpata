import type { Metadata } from 'next';
import { EditorClient } from '@/components/tools/EditorClient';

export const metadata: Metadata = {
  title: 'এডিটর',
  description: 'গল্পের.পাতা এডিটর — রিয়েল-টাইম মার্কডাউন প্রিভিউ দিয়ে গল্প লেখুন।',
};

export default function EditorPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1
        className="text-center text-3xl md:text-4xl mb-2"
        style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)' }}
      >
        গল্প এডিটর
      </h1>
      <p
        className="text-center max-w-xl mx-auto mb-2 text-sm"
        style={{ color: 'var(--রং-কালি-মাঝারি)' }}
      >
        বাম পাশে লিখুন, ডান পাশে প্রিভিউ দেখুন
      </p>
      <div className="alpona-divider mb-10" aria-hidden="true" />
      <EditorClient />
    </div>
  );
}
