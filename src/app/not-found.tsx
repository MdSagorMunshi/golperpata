import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center min-h-[60vh] flex flex-col items-center justify-center">
      <Image
        src="/images/bookshelf.png"
        alt="একটি খালি বইয়ের তাক — গল্পটি পাওয়া যায়নি"
        width={400}
        height={400}
        className="mx-auto mb-8 rounded opacity-80"
      />

      <h1
        className="text-4xl mb-3"
        style={{ fontFamily: 'var(--ফন্ট-শিরোনাম)', color: 'var(--রং-জাফরান)' }}
      >
        পাতাটি পাওয়া যায়নি
      </h1>

      <p
        className="text-lg mb-6"
        style={{ color: 'var(--রং-কালি-মাঝারি)' }}
      >
        এই বইয়ের তাকে কোনো গল্প রাখা হয়নি, বা এই পাতার ঠিকানা ভুল।
      </p>

      <div className="flex gap-4 justify-center">
        <Link href="/" className="btn btn--primary">
          মূল পাতায় ফিরুন
        </Link>
        <Link href="/golpo" className="btn">
          সব গল্প দেখুন
        </Link>
      </div>
    </div>
  );
}
