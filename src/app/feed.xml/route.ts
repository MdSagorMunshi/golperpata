import { getAllStoryMetas } from '@/lib/stories';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://golperpata.vercel.app';

export async function GET() {
  const stories = getAllStoryMetas();

  const items = stories
    .sort((a, b) => {
      if (!a.dateAdded || !b.dateAdded) return 0;
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    })
    .slice(0, 50)
    .map(
      (story) => `    <item>
      <title>${escapeXml(story.title)}</title>
      <link>${BASE_URL}/golpo/${encodeURIComponent(story.slug)}</link>
      <description>${escapeXml(story.excerpt)}</description>
      <author>${escapeXml(story.author)}</author>
      <category>${escapeXml(story.category)}</category>
      ${story.dateAdded ? `<pubDate>${new Date(story.dateAdded).toUTCString()}</pubDate>` : ''}
      <guid isPermaLink="true">${BASE_URL}/golpo/${encodeURIComponent(story.slug)}</guid>
    </item>`
    )
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>গল্পের.পাতা — বাংলা সাহিত্যের উন্মুক্ত ভান্ডার</title>
    <link>${BASE_URL}</link>
    <description>সম্প্রদায়চালিত, ওপেন-সোর্স বাংলা গল্প পাঠাগার। সম্পূর্ণ বিনামূল্যে, কোনো বিজ্ঞাপন নেই।</description>
    <language>bn</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
