/**
 * Cloudflare R2 integration for author photos
 *
 * Stores and retrieves author profile images from R2 bucket.
 * Falls back to initial-based avatar when no photo exists.
 */

const R2_BUCKET_URL = process.env.NEXT_PUBLIC_R2_BUCKET_URL || '';
const R2_PUBLIC_DOMAIN = process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN || '';

// Check if R2 is configured
const isConfigured = R2_BUCKET_URL && !R2_BUCKET_URL.includes('placeholder');

/**
 * Get the author photo URL from R2
 * Photos are stored as: authors/{authorSlug}.jpg
 *
 * @param authorSlug - URL-friendly author name slug
 * @returns URL string or null if R2 is not configured
 */
export function getAuthorPhotoUrl(authorSlug: string): string | null {
  if (!isConfigured) return null;

  const base = R2_PUBLIC_DOMAIN || R2_BUCKET_URL;
  return `${base}/authors/${encodeURIComponent(authorSlug)}.jpg`;
}

/**
 * Get the author photo URL with fallback
 * Returns either the R2 URL or null (caller should render avatar)
 */
export function getAuthorPhoto(authorSlug: string): {
  type: 'url' | 'initials';
  value: string;
} {
  const url = getAuthorPhotoUrl(authorSlug);
  if (url) {
    return { type: 'url', value: url };
  }
  // Will render initial-based avatar
  return { type: 'initials', value: authorSlug.charAt(0).toUpperCase() };
}

/**
 * Upload instructions for R2 (manual or via admin):
 *
 * 1. Go to Cloudflare Dashboard > R2
 * 2. Create bucket: "golperpata-assets"
 * 3. Enable public access or configure custom domain
 * 4. Upload photos to: authors/{slug}.jpg
 *    Example: authors/রবীন্দ্রনাথ-ঠাকুর.jpg
 * 5. Set NEXT_PUBLIC_R2_PUBLIC_DOMAIN in .env.local
 *
 * Recommended image specs:
 * - Size: 400x400px
 * - Format: JPEG (optimized)
 * - Max file size: 100KB
 */
