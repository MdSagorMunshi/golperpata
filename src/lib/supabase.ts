/**
 * Supabase client for গল্পের.পাতা
 * 
 * Used for: view counting, analytics (future)
 * Falls back to mock data when not configured.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if Supabase is configured (not placeholder)
const isConfigured =
  SUPABASE_URL &&
  !SUPABASE_URL.includes('placeholder') &&
  SUPABASE_ANON_KEY &&
  !SUPABASE_ANON_KEY.includes('placeholder');

let supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isConfigured) return null;
  if (!supabase) {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return supabase;
}

// ─── View Counter ────────────────────────────────

/** Increment view count for a story (fire-and-forget) */
export async function incrementViewCount(slug: string): Promise<void> {
  const client = getSupabase();
  if (!client) return; // Mock mode — do nothing

  try {
    // Upsert: insert or increment
    const { error } = await client.rpc('increment_view', { story_slug: slug });
    if (error) {
      console.warn('[Supabase] View increment failed:', error.message);
    }
  } catch (e) {
    // Silently fail — views are non-critical
    console.warn('[Supabase] View increment error:', e);
  }
}

/** Get view count for a story */
export async function getViewCount(slug: string): Promise<number> {
  const client = getSupabase();
  if (!client) return 0; // Mock mode

  try {
    const { data, error } = await client
      .from('story_views')
      .select('view_count')
      .eq('slug', slug)
      .single();

    if (error || !data) return 0;
    return data.view_count || 0;
  } catch {
    return 0;
  }
}

/** Get view counts for multiple stories (batch) */
export async function getBatchViewCounts(slugs: string[]): Promise<Map<string, number>> {
  const client = getSupabase();
  const counts = new Map<string, number>();

  if (!client) {
    // Mock mode: return zeros
    slugs.forEach((s) => counts.set(s, 0));
    return counts;
  }

  try {
    const { data, error } = await client
      .from('story_views')
      .select('slug, view_count')
      .in('slug', slugs);

    if (error || !data) {
      slugs.forEach((s) => counts.set(s, 0));
      return counts;
    }

    for (const row of data) {
      counts.set(row.slug, row.view_count || 0);
    }

    // Fill in zeros for missing slugs
    slugs.forEach((s) => {
      if (!counts.has(s)) counts.set(s, 0);
    });

    return counts;
  } catch {
    slugs.forEach((s) => counts.set(s, 0));
    return counts;
  }
}

// ─── Supabase SQL for setup ──────────────────────
//
// Run this SQL in Supabase SQL Editor to create the views table:
//
// CREATE TABLE IF NOT EXISTS story_views (
//   slug TEXT PRIMARY KEY,
//   view_count INTEGER DEFAULT 0,
//   last_viewed_at TIMESTAMPTZ DEFAULT NOW()
// );
//
// CREATE OR REPLACE FUNCTION increment_view(story_slug TEXT)
// RETURNS void AS $$
// BEGIN
//   INSERT INTO story_views (slug, view_count, last_viewed_at)
//   VALUES (story_slug, 1, NOW())
//   ON CONFLICT (slug)
//   DO UPDATE SET
//     view_count = story_views.view_count + 1,
//     last_viewed_at = NOW();
// END;
// $$ LANGUAGE plpgsql;
