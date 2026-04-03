-- ═══════════════════════════════════════════════════════
-- গল্পের.পাতা — Supabase Database Setup
-- Run this SQL in Supabase SQL Editor (Dashboard > SQL)
-- ═══════════════════════════════════════════════════════

-- ┌───────────────────────────────────────────────────────┐
-- │  1. Story Views Table                                 │
-- └───────────────────────────────────────────────────────┘

CREATE TABLE IF NOT EXISTS story_views (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug         TEXT NOT NULL UNIQUE,
  view_count   INTEGER DEFAULT 0 NOT NULL,
  last_viewed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_story_views_slug ON story_views (slug);

-- ┌───────────────────────────────────────────────────────┐
-- │  2. Increment View Function (Upsert)                  │
-- └───────────────────────────────────────────────────────┘

CREATE OR REPLACE FUNCTION increment_view(story_slug TEXT)
RETURNS void AS $$
BEGIN
  INSERT INTO story_views (slug, view_count, last_viewed_at)
  VALUES (story_slug, 1, NOW())
  ON CONFLICT (slug)
  DO UPDATE SET
    view_count = story_views.view_count + 1,
    last_viewed_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ┌───────────────────────────────────────────────────────┐
-- │  3. Row Level Security (RLS)                          │
-- └───────────────────────────────────────────────────────┘

ALTER TABLE story_views ENABLE ROW LEVEL SECURITY;

-- Public can read view counts
CREATE POLICY "Public can read view counts"
  ON story_views FOR SELECT
  USING (true);

-- Only service role can insert/update (via RPC function)
CREATE POLICY "Service role can manage views"
  ON story_views FOR ALL
  USING (auth.role() = 'service_role');

-- Grant execute on the function to anon (for API calls)
GRANT EXECUTE ON FUNCTION increment_view(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION increment_view(TEXT) TO authenticated;

-- ┌───────────────────────────────────────────────────────┐
-- │  4. Analytics Table (optional — for future)           │
-- └───────────────────────────────────────────────────────┘

CREATE TABLE IF NOT EXISTS analytics_events (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  event_type   TEXT NOT NULL, -- 'page_view', 'search', 'download', etc.
  slug         TEXT,
  metadata     JSONB DEFAULT '{}'::jsonb,
  user_agent   TEXT,
  country      TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_created ON analytics_events (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_slug ON analytics_events (slug);

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages analytics"
  ON analytics_events FOR ALL
  USING (auth.role() = 'service_role');

-- ┌───────────────────────────────────────────────────────┐
-- │  5. Useful Views                                      │
-- └───────────────────────────────────────────────────────┘

-- Top stories by views
CREATE OR REPLACE VIEW top_stories AS
SELECT slug, view_count, last_viewed_at
FROM story_views
ORDER BY view_count DESC
LIMIT 50;

-- Daily view stats
CREATE OR REPLACE VIEW daily_stats AS
SELECT
  DATE(created_at) AS day,
  COUNT(*) AS total_events,
  COUNT(DISTINCT slug) AS unique_stories
FROM analytics_events
WHERE event_type = 'page_view'
GROUP BY DATE(created_at)
ORDER BY day DESC
LIMIT 30;
