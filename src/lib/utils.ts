/**
 * Core utility functions for গল্পের.পাতা
 */

const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

/** Convert any number to Bengali numeral string */
export function toBengaliNumeral(n: number): string {
  return String(n)
    .split('')
    .map((ch) => {
      const digit = parseInt(ch, 10);
      return isNaN(digit) ? ch : BENGALI_DIGITS[digit];
    })
    .join('');
}

/** Generate a URL-safe slug from Bengali text */
export function generateSlug(bengaliText: string): string {
  return bengaliText
    .normalize('NFC')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[।,.!?;:'"(){}[\]]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Normalize Bengali text (NFC form) */
export function normalizeBengali(text: string): string {
  return text.normalize('NFC');
}

/** Format a date in Bengali */
export function formatBengaliDate(dateStr: string): string {
  const months = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল',
    'মে', 'জুন', 'জুলাই', 'আগস্ট',
    'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর',
  ];
  const date = new Date(dateStr);
  const day = toBengaliNumeral(date.getDate());
  const month = months[date.getMonth()];
  const year = toBengaliNumeral(date.getFullYear());
  return `${day} ${month}, ${year}`;
}

/**
 * Seeded pseudo-random number (deterministic based on input string).
 * Used for consistent badge tilt angles based on tag names.
 */
export function seededRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  // Map to 0-1 range
  return Math.abs(hash % 1000) / 1000;
}

/** Calculate badge tilt angle (-1 to +1 degrees) based on tag name */
export function badgeTilt(tagName: string): number {
  return (seededRandom(tagName) * 2 - 1);
}

/** Calculate Bengali reading time (150 wpm for Bengali text) */
export function calculateReadTime(text: string): { minutes: number; text: string } {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 150));
  return {
    minutes,
    text: `${toBengaliNumeral(minutes)} মিনিট পড়ার সময়`,
  };
}

/** Extract a plain-text excerpt from story body */
export function extractExcerpt(body: string, maxLength = 200): string {
  // Remove markdown syntax
  const plain = body
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/>\s*/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/---/g, '')
    .replace(/\n+/g, ' ')
    .trim();

  if (plain.length <= maxLength) return plain;
  return plain.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

/** Format view count with Bengali numerals */
export function formatViewCount(count: number): string {
  if (count >= 100000) {
    return `${toBengaliNumeral(Math.floor(count / 1000))}হা+`;
  }
  if (count >= 1000) {
    return `${toBengaliNumeral(Math.round(count / 100) / 10)}হা`;
  }
  return toBengaliNumeral(count);
}

/** Convert English numerals to Bengali in a string */
export function convertNumerals(text: string): string {
  return text.replace(/[0-9]/g, (d) => BENGALI_DIGITS[parseInt(d, 10)]);
}

/** cn() - Simple class name merge utility */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
