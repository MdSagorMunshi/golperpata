import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'সম্পর্কে',
  description: 'গল্পের.পাতা — বাংলা সাহিত্যের উন্মুক্ত, বিনামূল্য, বিজ্ঞাপনমুক্ত ডিজিটাল ভান্ডার।',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-10" style={{ maxWidth: 'var(--max-width-reading)' }}>
      <h1
        className="text-center text-3xl md:text-4xl mb-2"
        style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)' }}
      >
        গল্পের.পাতা সম্পর্কে
      </h1>
      <div className="alpona-divider mb-10" aria-hidden="true" />

      <div
        className="prose-custom"
        style={{ fontFamily: 'var(--ফন্ট-মূল)', lineHeight: '2.0', color: 'var(--রং-কালি)' }}
      >
        <h2
          className="text-xl mt-8 mb-4"
          style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', color: 'var(--রং-জাফরান)' }}
        >
          এটি কী?
        </h2>
        <p className="mb-4">
          গল্পের.পাতা (Golper Pata, অর্থ &quot;গল্পের পাতা&quot;) হলো একটি সম্প্রদায়চালিত,
          ওপেন-সোর্স বাংলা গল্প পাঠাগার। পৃথিবীর যেকোনো প্রান্ত থেকে যে কেউ এখানে
          বিনামূল্যে বাংলা গল্প পড়তে পারেন, এবং যে কেউ GitHub-এ Pull Request পাঠিয়ে
          নতুন গল্প যোগ করতে পারেন।
        </p>

        <h2
          className="text-xl mt-8 mb-4"
          style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', color: 'var(--রং-জাফরান)' }}
        >
          আমাদের নীতি
        </h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>চিরকাল বিনামূল্যে</strong> — কোনো সাবস্ক্রিপশন নেই, কোনো পেওয়াল নেই</li>
          <li><strong>কোনো বিজ্ঞাপন নেই</strong> — বিজ্ঞাপনের ব্যাঘাত ছাড়া পড়ুন</li>
          <li><strong>কোনো অ্যাকাউন্ট নেই</strong> — নিবন্ধন ছাড়াই পড়ুন</li>
          <li><strong>কোনো ট্র্যাকিং নেই</strong> — কোনো কুকি নেই, কোনো ব্যক্তিগত তথ্য সংগ্রহ নেই</li>
          <li><strong>ওপেন সোর্স</strong> — MIT লাইসেন্সের অধীনে, সম্পূর্ণ কোড উন্মুক্ত</li>
        </ul>

        <h2
          className="text-xl mt-8 mb-4"
          style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', color: 'var(--রং-জাফরান)' }}
        >
          গল্প জমা দিতে চান?
        </h2>
        <p className="mb-4">
          গল্পের.পাতায় নতুন গল্প জমা দেওয়া সহজ! আমাদের{' '}
          <a
            href="/rupantar"
            style={{ color: 'var(--রং-জাফরান)', textDecoration: 'underline' }}
          >
            রূপান্তরক
          </a>{' '}
          ব্যবহার করে আপনার গল্পটি সঠিক ফরম্যাটে রূপান্তর করুন, তারপর GitHub-এ
          একটি Pull Request পাঠান।
        </p>

        <h2
          className="text-xl mt-8 mb-4"
          style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', color: 'var(--রং-জাফরান)' }}
        >
          কারিগরি তথ্য
        </h2>
        <p className="mb-4">
          গল্পের.পাতা তৈরি হয়েছে Next.js, Tailwind CSS, ও Vercel ব্যবহার করে।
          গল্পগুলো GitHub-এ মার্কডাউন ফাইল হিসেবে সংরক্ষিত, এবং প্রতিটি মার্জে
          সাইটটি স্বয়ংক্রিয়ভাবে আপডেট হয়।
        </p>

        <div
          className="mt-10 p-6 rounded text-center"
          style={{
            background: 'var(--রং-পুরনো-কাগজ)',
            border: '1px solid var(--সীমা-হালকা)',
          }}
        >
          <p className="text-sm" style={{ color: 'var(--রং-কালি-মাঝারি)' }}>
            তৈরি করেছেন{' '}
            <a
              href="https://github.com/MdSagorMunshi"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--রং-জাফরান)' }}
            >
              Ryan Shelby
            </a>
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--রং-কালি-হালকা)' }}>
            MIT লাইসেন্স · সম্পূর্ণ ওপেন সোর্স
          </p>
        </div>
      </div>
    </div>
  );
}
