import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://golperpata.vercel.app';

export default function robots(): MetadataRoute.Robots {
  // Known AI crawlers, scrapers, and data mining bots to block
  const blockedBots = [
    // OpenAI
    'GPTBot',
    'ChatGPT-User',
    'OAI-SearchBot',
    // Anthropic
    'anthropic-ai',
    'Claude-Web',
    'ClaudeBot',
    // Google AI (not search)
    'Google-Extended',
    // Meta / Facebook AI
    'FacebookBot',
    'Meta-ExternalAgent',
    'meta-externalagent',
    // Apple
    'Applebot-Extended',
    // Common AI crawlers
    'CCBot',
    'cohere-ai',
    'Bytespider',
    'Diffbot',
    'ImagesiftBot',
    'Omgilibot',
    'Omgili',
    'PerplexityBot',
    'YouBot',
    // Scrapers & archivers
    'PetalBot',
    'Scrapy',
    'DataForSeoBot',
    'SemrushBot',
    'AhrefsBot',
    'MJ12bot',
    'DotBot',
    'BLEXBot',
    'MegaIndex',
    'SeznamBot',
    'Sogou',
    'BaiduSpider',
    'TurnitinBot',
    'ia_archiver',
    'Amazonbot',
    // AI training & research
    'AI2Bot',
    'Ai2Bot-Dolma',
    'Kangaroo Bot',
    'webz.io',
    'Timpibot',
    'VelenPublicWebCrawler',
    'ISSCyberRiskCrawler',
    'Sidetrade indexer bot',
  ];

  return {
    rules: [
      // Allow legitimate search engines
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: 'YandexBot',
        allow: '/',
        disallow: ['/api/'],
      },
      // Block all AI crawlers and scrapers
      ...blockedBots.map((bot) => ({
        userAgent: bot,
        disallow: ['/'],
      })),
      // Default: block everything else
      {
        userAgent: '*',
        disallow: ['/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
