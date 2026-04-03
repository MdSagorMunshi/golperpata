import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'গোপনীয়তা নীতি | গল্পের.পাতা',
  description: 'গল্পের.পাতার গোপনীয়তা নীতি — আমরা কোনো ব্যক্তিগত তথ্য সংগ্রহ করি না।',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1
        className="text-3xl md:text-4xl mb-6 text-center"
        style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)' }}
      >
        গোপনীয়তা নীতি
      </h1>
      <div className="alpona-divider mb-8" aria-hidden="true" />

      <div
        className="prose-content"
        style={{
          fontFamily: 'var(--ফন্ট-মূল)',
          lineHeight: '2.0',
          color: 'var(--রং-কালি)',
        }}
      >
        <p style={{ color: 'var(--রং-কালি-মাঝারি)', fontSize: '0.9rem', marginBottom: '2rem' }}>
          সর্বশেষ হালনাগাদ: {new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        {/* TL;DR */}
        <div
          style={{
            background: 'var(--রং-পুরনো-কাগজ)',
            border: '1px solid var(--সীমা-হালকা)',
            borderRadius: '8px',
            padding: '1.25rem',
            marginBottom: '2rem',
          }}
        >
          <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>🔒 সংক্ষেপে:</p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.25rem' }}>আমরা কোনো ব্যক্তিগত তথ্য সংগ্রহ করি না</li>
            <li style={{ marginBottom: '0.25rem' }}>আমরা কোনো কুকি ব্যবহার করি না</li>
            <li style={{ marginBottom: '0.25rem' }}>আমরা কোনো বিজ্ঞাপন দেখাই না</li>
            <li style={{ marginBottom: '0.25rem' }}>আমরা তৃতীয় পক্ষের সাথে কোনো তথ্য ভাগ করি না</li>
            <li>কোনো অ্যাকাউন্ট বা লগইন প্রয়োজন নেই</li>
          </ul>
        </div>

        <h2 style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', fontSize: '1.3rem', marginTop: '2rem', marginBottom: '0.75rem' }}>
          ১. তথ্য সংগ্রহ
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          গল্পের.পাতা ব্যবহারকারীদের কাছ থেকে কোনো ব্যক্তিগত তথ্য সংগ্রহ করে না। আমরা কোনো নিবন্ধন, লগইন, ইমেইল, বা অন্য কোনো ব্যক্তিগত তথ্য চাই না বা সংরক্ষণ করি না।
        </p>

        <h2 style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', fontSize: '1.3rem', marginTop: '2rem', marginBottom: '0.75rem' }}>
          ২. কুকি ও ট্র্যাকিং
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          আমরা কোনো কুকি, ট্র্যাকিং পিক্সেল, বা অনুরূপ প্রযুক্তি ব্যবহার করি না। আমরা Google Analytics, Facebook Pixel, বা কোনো তৃতীয় পক্ষের ট্র্যাকার ব্যবহার করি না।
        </p>

        <h2 style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', fontSize: '1.3rem', marginTop: '2rem', marginBottom: '0.75rem' }}>
          ৩. বিশ্লেষণ (Analytics)
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          আমরা শুধুমাত্র গল্পের পৃষ্ঠা দর্শন সংখ্যা (view count) গণনা করি। এটি সম্পূর্ণ বেনামী — কোনো IP ঠিকানা, ব্রাউজার তথ্য, বা ডিভাইস সনাক্তকারী সংরক্ষণ করা হয় না। এই তথ্য শুধুমাত্র জনপ্রিয়তার সূচক হিসেবে ব্যবহৃত হয়।
        </p>

        <h2 style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', fontSize: '1.3rem', marginTop: '2rem', marginBottom: '0.75rem' }}>
          ৪. তৃতীয় পক্ষের পরিষেবা
        </h2>
        <p style={{ marginBottom: '0.5rem' }}>আমরা নিম্নলিখিত পরিষেবা ব্যবহার করি:</p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>Vercel</strong> — ওয়েবসাইট হোস্টিং। Vercel-এর নিজস্ব গোপনীয়তা নীতি প্রযোজ্য।</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Supabase</strong> — বেনামী পৃষ্ঠা দর্শন সংখ্যা সংরক্ষণ।</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Cloudflare R2</strong> — স্ট্যাটিক ফাইল (ছবি) সংরক্ষণ।</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>GitHub</strong> — সোর্স কোড ও গল্প সংরক্ষণ।</li>
        </ul>
        <p style={{ marginBottom: '1rem' }}>
          এই পরিষেবাগুলো তাদের নিজ নিজ গোপনীয়তা নীতি অনুসারে পরিচালিত হয়।
        </p>

        <h2 style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', fontSize: '1.3rem', marginTop: '2rem', marginBottom: '0.75rem' }}>
          ৫. শিশুদের গোপনীয়তা
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          আমরা জেনেশুনে কোনো শিশুর তথ্য সংগ্রহ করি না। যেহেতু আমরা কারো কোনো তথ্য সংগ্রহ করি না, তাই শিশুদের ক্ষেত্রেও কোনো বিশেষ উদ্বেগ নেই।
        </p>

        <h2 style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', fontSize: '1.3rem', marginTop: '2rem', marginBottom: '0.75rem' }}>
          ৬. ওপেন সোর্স স্বচ্ছতা
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          গল্পের.পাতা সম্পূর্ণ ওপেন-সোর্স। আমাদের সম্পূর্ণ সোর্স কোড <a href="https://github.com/MdSagorMunshi/golperpata" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--রং-জাফরান)' }}>GitHub</a>-এ উপলব্ধ। যেকোনো ব্যক্তি যাচাই করতে পারেন যে আমরা কোনো গোপন ট্র্যাকিং বা তথ্য সংগ্রহ করছি না।
        </p>

        <h2 style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', fontSize: '1.3rem', marginTop: '2rem', marginBottom: '0.75rem' }}>
          ৭. যোগাযোগ
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          গোপনীয়তা সংক্রান্ত প্রশ্ন থাকলে <a href="mailto:sudoryan@icloud.com" style={{ color: 'var(--রং-জাফরান)' }}>sudoryan@icloud.com</a>-এ ইমেইল করুন।
        </p>
      </div>
    </div>
  );
}
