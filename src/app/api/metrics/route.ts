import { NextResponse } from 'next/server';
import { getLocalKPIs } from '@/lib/store';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { TrackingEvent, Lead } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Si Supabase está configurado, intentar obtener métricas de Supabase
    if (isSupabaseConfigured && supabase) {
      try {
        const [eventsRes, leadsRes] = await Promise.all([
          supabase
            .from('tracking_events')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(300),
          supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false }),
        ]);

        if (!eventsRes.error && !leadsRes.error && eventsRes.data && leadsRes.data) {
          const events: TrackingEvent[] = eventsRes.data;
          const leads: Lead[] = leadsRes.data;

          const totalPageViews = events.filter((e) => e.event === 'page_view').length;
          const totalCtaClicks = events.filter((e) => e.event === 'cta_click').length;
          const totalWhatsappClicks = events.filter((e) => e.event === 'whatsapp_click').length;
          const totalLeads = leads.length;

          const uniqueVisitors = new Set(events.map((e) => e.session_id || e.id)).size || totalPageViews;
          const conversionRate = totalPageViews > 0
            ? Number(((totalLeads + totalWhatsappClicks) / totalPageViews * 100).toFixed(1))
            : 0;

          const leadsByService: Record<string, number> = {};
          leads.forEach((l) => {
            leadsByService[l.service] = (leadsByService[l.service] || 0) + 1;
          });

          const eventsByDevice: Record<string, number> = { mobile: 0, desktop: 0 };
          events.forEach((e) => {
            const dev = e.device === 'mobile' ? 'mobile' : 'desktop';
            eventsByDevice[dev] = (eventsByDevice[dev] || 0) + 1;
          });

          return NextResponse.json({
            ok: true,
            data: {
              totalVisitors: uniqueVisitors,
              totalPageViews,
              totalCtaClicks,
              totalWhatsappClicks,
              totalLeads,
              conversionRate,
              recentEvents: events.slice(0, 30),
              leadsByService,
              eventsByDevice,
              source: 'supabase',
            },
          });
        }
      } catch (err) {
        // En caso de fallo con tablas no creadas, cae al fallback local
      }
    }

    // Fallback a almacenamiento local
    const kpis = getLocalKPIs();
    return NextResponse.json({ ok: true, data: { ...kpis, source: 'local' } });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Error fetching metrics' }, { status: 500 });
  }
}
