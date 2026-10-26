import { NextRequest, NextResponse } from 'next/server';
import { addLocalEvent } from '@/lib/store';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { TrackingEvent } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

    // Almacenar en local / memoria
    addLocalEvent(event);

    // Almacenar también en Supabase en la nube
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('tracking_events').insert([{
          event: event.event,
          path: event.path || '/',
          label: event.label || '',
          device: event.device || 'desktop',
          session_id: event.session_id || null,
        }]);
      } catch (sbErr) {
        // Silencioso
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Error logging event' }, { status: 400 });
  }
}
