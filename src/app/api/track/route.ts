import { NextRequest, NextResponse } from 'next/server';
import { addLocalEvent } from '@/lib/store';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { TrackingEvent } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const event: TrackingEvent = {
      event: body.event || 'page_view',
      path: body.path || '/',
      label: body.label || '',
      device: body.device || 'desktop',
      session_id: body.session_id,
    };

    // Almacenar en local
    addLocalEvent(event);

    // Si Supabase está conectado, almacenar también en Supabase
    if (isSupabaseConfigured && supabase) {
      supabase.from('tracking_events').insert([event]).then();
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Error logging event' }, { status: 400 });
  }
}
