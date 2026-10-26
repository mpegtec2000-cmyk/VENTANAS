import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// En servidor se prioriza la clave service_role para bypass de RLS y permisos totales
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseKey &&
  supabaseUrl.startsWith('http') &&
  supabaseKey.length > 20
);

// Cliente de Supabase con configuración robusta para servidor y cliente
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseKey!, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      db: {
        schema: 'public',
      },
    })
  : null;

// Helper para verificar el estado de conexión con la base de datos
export async function checkSupabaseTableStatus(tableName: string = 'leads'): Promise<{
  configured: boolean;
  tableReady: boolean;
  error?: string;
}> {
  if (!isSupabaseConfigured || !supabase) {
    return { configured: false, tableReady: false, error: 'Credenciales de Supabase no configuradas en .env' };
  }

  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('id')
      .limit(1);

    if (error) {
      return {
        configured: true,
        tableReady: false,
        error: error.message || error.code || 'Error consultando tabla',
      };
    }

    return { configured: true, tableReady: true };
  } catch (err: any) {
    return {
      configured: true,
      tableReady: false,
      error: err?.message || 'Error de conexión con Supabase',
    };
  }
}
