import { NextRequest, NextResponse } from 'next/server';
import { incrementUsage, getUsageData } from '@/lib/usage';

export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json();
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });
    }
    const count = incrementUsage(slug);
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function GET() {
  const data = getUsageData();
  return NextResponse.json(data);
}
