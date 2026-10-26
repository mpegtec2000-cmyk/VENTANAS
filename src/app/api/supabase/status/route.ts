import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured, checkSupabaseTableStatus } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const leadsStatus = await checkSupabaseTableStatus('leads');
  const productsStatus = await checkSupabaseTableStatus('products');
  const trackingStatus = await checkSupabaseTableStatus('tracking_events');

  return NextResponse.json({
    ok: true,
    isConfigured: isSupabaseConfigured,
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || null,
    projectRef: 'pzxghlzlruggbughxdlo',
    sqlDashboardUrl: 'https://supabase.com/dashboard/project/pzxghlzlruggbughxdlo/sql',
    tables: {
      leads: leadsStatus,
      products: productsStatus,
      tracking_events: trackingStatus,
    },
    allReady: leadsStatus.tableReady && productsStatus.tableReady && trackingStatus.tableReady,
  });
}
