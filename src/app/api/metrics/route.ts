import { NextResponse } from 'next/server';
import { getLocalKPIs } from '@/lib/store';

export async function GET() {
  try {
    const kpis = getLocalKPIs();
    return NextResponse.json({ ok: true, data: kpis });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Error fetching metrics' }, { status: 500 });
  }
}
