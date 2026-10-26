import { NextRequest, NextResponse } from 'next/server';
import { getLocalLeads, addLocalLead, updateLocalLead } from '@/lib/store';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function GET() {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return NextResponse.json({ ok: true, leads: data });
      }
    }

    const leads = getLocalLeads();
    return NextResponse.json({ ok: true, leads });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Error fetching leads' }, { status: 500 });
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
      name: body.name,
      phone: body.phone,
      email: body.email || '',
      service: body.service,
      dimensions: body.dimensions || '',
      message: body.message || '',
      address: body.address || '',
      commune: body.commune || 'Viña del Mar',
      estimated_value: Number(body.estimated_value) || 0,
      notes: body.notes || '',
    };

    const newLead = addLocalLead(leadData);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('leads').insert([newLead]);
    }

    return NextResponse.json({ ok: true, lead: newLead });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Error creating lead' }, { status: 500 });
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
      await supabase.from('leads').update(updates).eq('id', id);
    }

    return NextResponse.json({ ok: true, leads: updatedList });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Error updating lead' }, { status: 500 });
  }
}
