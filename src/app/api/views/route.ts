import { NextRequest, NextResponse } from 'next/server';
import { incrementViewCount, getViewCount } from '@/lib/supabase';

/** POST /api/views — Increment view count */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug } = body;

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json({ error: 'slug is required' }, { status: 400 });
    }

    await incrementViewCount(slug);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

/** GET /api/views?slug=xxx — Get view count */
export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'slug parameter required' }, { status: 400 });
  }

  const count = await getViewCount(slug);
  return NextResponse.json({ slug, viewCount: count });
}
