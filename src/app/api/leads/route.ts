import { NextRequest, NextResponse } from 'next/server';
import { getLocalLeads, addLocalLead, updateLocalLead } from '@/lib/store';
import { supabase, isSupabaseConfigured, checkSupabaseTableStatus } from '@/lib/supabase';
import { Lead } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    let supabaseTableReady = false;
    let leadsFromSupabase: Lead[] | null = null;

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          supabaseTableReady = true;
          leadsFromSupabase = data.map((item: any) => ({
            id: String(item.id),
            created_at: item.created_at || new Date().toISOString(),
            name: item.name || '',
            phone: item.phone || '',
            email: item.email || '',
            service: item.service || '',
            dimensions: item.dimensions || '',
            message: item.message || '',
            address: item.address || '',
            commune: item.commune || 'Viña del Mar',
            estimated_value: Number(item.estimated_value) || 0,
            status: item.status || 'nuevo',
            notes: item.notes || '',
          }));
        } else if (error) {
          console.warn('[Leads API] Supabase leads query warning:', error.message);
        }
      } catch (sbErr) {
        console.warn('[Leads API] Supabase connection error:', sbErr);
      }
    }

    // Obtener leads locales de respaldo
    const localLeads = getLocalLeads();

    // Si Supabase está listo, sincronizar cualquier lead local pendiente y devolver desde Supabase
    if (supabaseTableReady && leadsFromSupabase && supabase) {
      if (localLeads.length > 0) {
        const missingLeads = localLeads.filter(
          (ll) => !leadsFromSupabase!.some((sl) => sl.phone === ll.phone && sl.service === ll.service)
        );
        if (missingLeads.length > 0) {
          try {
            await supabase.from('leads').insert(
              missingLeads.map((m) => ({
                name: m.name,
                phone: m.phone,
                email: m.email || '',
                service: m.service,
                dimensions: m.dimensions || '',
                message: m.message || '',
                address: m.address || '',
                commune: m.commune || 'Viña del Mar',
                estimated_value: m.estimated_value || 0,
                status: m.status || 'nuevo',
                notes: m.notes || '',
              }))
            );
          } catch (syncErr) {
            console.warn('[Auto-sync to Supabase] warning:', syncErr);
          }
        }
      }

      return NextResponse.json({
        ok: true,
        leads: leadsFromSupabase,
        source: 'supabase',
        supabaseConfigured: true,
        supabaseTableReady: true,
      });
    }

    // Fallback con almacenamiento local garantizado
    return NextResponse.json({
      ok: true,
      leads: localLeads,
      source: 'local',
      supabaseConfigured: isSupabaseConfigured,
      supabaseTableReady: false,
    });
  } catch (error: any) {
    console.error('[Leads API GET] Error:', error);
    return NextResponse.json(
      { ok: false, error: error?.message || 'Error al obtener cotizaciones' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.phone || !body.service) {
      return NextResponse.json(
        { ok: false, error: 'Nombre, teléfono y servicio son requeridos' },
        { status: 400 }
      );
    }

    const leadData = {
      name: String(body.name).trim(),
      phone: String(body.phone).trim(),
      email: body.email ? String(body.email).trim() : '',
      service: String(body.service).trim(),
      dimensions: body.dimensions ? String(body.dimensions).trim() : '',
      message: body.message ? String(body.message).trim() : '',
      address: body.address ? String(body.address).trim() : '',
      commune: body.commune ? String(body.commune).trim() : 'Viña del Mar',
      estimated_value: Number(body.estimated_value) || 0,
      notes: body.notes ? String(body.notes).trim() : '',
    };

    // 1. Guardar siempre en almacenamiento local / memoria (garantiza persistencia inmediata)
    const newLead = addLocalLead(leadData);

    let supabaseSynced = false;
    let supabaseErrorDetails: string | null = null;

    // 2. Intentar guardar en Supabase (si está configurado)
    if (isSupabaseConfigured && supabase) {
      try {
        const payloadToSupabase: any = {
          name: leadData.name,
          phone: leadData.phone,
          email: leadData.email,
          service: leadData.service,
          dimensions: leadData.dimensions,
          message: leadData.message,
          address: leadData.address,
          commune: leadData.commune,
          estimated_value: leadData.estimated_value,
          status: 'nuevo',
          notes: leadData.notes,
        };

        const { data, error } = await supabase
          .from('leads')
          .insert([payloadToSupabase])
          .select();

        if (!error && data && data.length > 0) {
          supabaseSynced = true;
          if (data[0].id) {
            newLead.id = String(data[0].id);
          }
        } else if (error) {
          console.warn('[Leads API POST] Supabase insert warning:', error.message);
          supabaseErrorDetails = error.message;
        }
      } catch (err: any) {
        console.warn('[Leads API POST] Supabase insert exception:', err?.message);
        supabaseErrorDetails = err?.message;
      }
    }

    return NextResponse.json({
      ok: true,
      lead: newLead,
      supabaseSynced,
      supabaseError: supabaseErrorDetails,
    });
  } catch (error: any) {
    console.error('[Leads API POST] Exception:', error);
    return NextResponse.json(
      { ok: false, error: error?.message || 'Error al procesar la cotización' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ ok: false, error: 'ID es requerido' }, { status: 400 });
    }

    const updatedList = updateLocalLead(id, updates);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('leads').update(updates).eq('id', id);
      } catch (err) {
        console.warn('[Leads API PATCH] Supabase update warning:', err);
      }
    }

    return NextResponse.json({ ok: true, leads: updatedList });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error?.message || 'Error updating lead' }, { status: 500 });
  }
}
