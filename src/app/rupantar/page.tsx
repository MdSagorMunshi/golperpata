import type { Metadata } from 'next';
import { ConverterClient } from '@/components/tools/ConverterClient';

export const metadata: Metadata = {
  title: 'রূপান্তরক',
  description: 'প্লেইন টেক্সট থেকে গল্পের.পাতা-সামঞ্জস্য মার্কডাউন ফরম্যাটে রূপান্তর করুন।',
};

export default function ConverterPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1
        className="text-center text-3xl md:text-4xl mb-2"
        style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)' }}
      >
        রূপান্তরক
      </h1>
      <p
        className="text-center max-w-xl mx-auto mb-2 text-sm"
        style={{ color: 'var(--রং-কালি-মাঝারি)' }}
      >
        আপনার গল্পের টেক্সট পেস্ট করুন — আমরা সেটিকে গল্পের.পাতা-সামঞ্জস্য মার্কডাউন ফরম্যাটে
        রূপান্তর করে দেব
      </p>
      <div className="alpona-divider mb-10" aria-hidden="true" />
      <ConverterClient />
    </div>
  );
}
