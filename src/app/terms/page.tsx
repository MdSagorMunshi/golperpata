import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'শর্তাবলি | গল্পের.পাতা',
  description: 'গল্পের.পাতা ব্যবহারের শর্তাবলি ও নিয়মাবলি।',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1
        className="text-3xl md:text-4xl mb-6 text-center"
        style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)' }}
      >
        শর্তাবলি
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

        <h2 style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', fontSize: '1.3rem', marginTop: '2rem', marginBottom: '0.75rem' }}>
          ১. সংজ্ঞা
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          &ldquo;গল্পের.পাতা&rdquo; (এরপর &ldquo;প্ল্যাটফর্ম&rdquo;) হলো একটি ওপেন-সোর্স, সম্প্রদায়চালিত বাংলা সাহিত্য পাঠাগার যা <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--রং-জাফরান)' }}>MIT লাইসেন্স</a>-এর অধীনে পরিচালিত। &ldquo;ব্যবহারকারী&rdquo; বলতে যেকোনো ব্যক্তি বোঝায় যিনি এই প্ল্যাটফর্ম ব্যবহার করেন বা এতে অবদান রাখেন।
        </p>

        <h2 style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', fontSize: '1.3rem', marginTop: '2rem', marginBottom: '0.75rem' }}>
          ২. ব্যবহারের শর্ত
        </h2>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>প্ল্যাটফর্মটি সম্পূর্ণ বিনামূল্যে ব্যবহারযোগ্য।</li>
          <li style={{ marginBottom: '0.5rem' }}>কোনো অ্যাকাউন্ট বা নিবন্ধনের প্রয়োজন নেই।</li>
          <li style={{ marginBottom: '0.5rem' }}>ব্যবহারকারীরা কোনো ক্ষতিকর, আপত্তিকর, বা অবৈধ কাজে এই প্ল্যাটফর্ম ব্যবহার করতে পারবেন না।</li>
          <li style={{ marginBottom: '0.5rem' }}>প্ল্যাটফর্মের যেকোনো অতিরিক্ত চাপ সৃষ্টিকারী স্বয়ংক্রিয় ব্যবহার (বট, স্ক্র্যাপার) নিষিদ্ধ।</li>
        </ul>

        <h2 style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', fontSize: '1.3rem', marginTop: '2rem', marginBottom: '0.75rem' }}>
          ৩. বিষয়বস্তু ও কপিরাইট
        </h2>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>প্ল্যাটফর্মে প্রকাশিত সকল গল্প কপিরাইটমুক্ত অথবা লেখকের অনুমতিসাপেক্ষে প্রকাশিত।</li>
          <li style={{ marginBottom: '0.5rem' }}>অবদানকারীরা নিশ্চিত করবেন যে তাদের জমা দেওয়া গল্প কোনো কপিরাইট লঙ্ঘন করে না।</li>
          <li style={{ marginBottom: '0.5rem' }}>কপিরাইট লঙ্ঘনের দাবি থাকলে <a href="mailto:sudoryan@icloud.com" style={{ color: 'var(--রং-জাফরান)' }}>sudoryan@icloud.com</a>-এ যোগাযোগ করুন।</li>
        </ul>

        <h2 style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', fontSize: '1.3rem', marginTop: '2rem', marginBottom: '0.75rem' }}>
          ৪. অবদান
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          GitHub Pull Request-এর মাধ্যমে জমা দেওয়া যেকোনো গল্প MIT লাইসেন্সের অধীনে প্রকাশিত হবে। অবদানকারী সম্মত হন যে তাদের অবদান ওপেন-সোর্স থাকবে।
        </p>

        <h2 style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', fontSize: '1.3rem', marginTop: '2rem', marginBottom: '0.75rem' }}>
          ৫. দায়মুক্তি
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          গল্পের.পাতা &ldquo;যেমন আছে&rdquo; তেমন প্রদান করা হয়। আমরা প্ল্যাটফর্মের নিরবচ্ছিন্ন পরিষেবা, তথ্যের নির্ভুলতা, বা উদ্দেশ্যপূরণের কোনো নিশ্চয়তা দিই না।
        </p>

        <h2 style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', fontSize: '1.3rem', marginTop: '2rem', marginBottom: '0.75rem' }}>
          ৬. পরিবর্তন
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          আমরা যেকোনো সময় এই শর্তাবলি পরিবর্তন করতে পারি। পরিবর্তনগুলো এই পৃষ্ঠায় প্রকাশ করা হবে।
        </p>

        <h2 style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', fontSize: '1.3rem', marginTop: '2rem', marginBottom: '0.75rem' }}>
          ৭. যোগাযোগ
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          প্রশ্ন বা উদ্বেগ থাকলে <a href="mailto:sudoryan@icloud.com" style={{ color: 'var(--রং-জাফরান)' }}>sudoryan@icloud.com</a>-এ ইমেইল করুন।
        </p>
      </div>
    </div>
  );
}
