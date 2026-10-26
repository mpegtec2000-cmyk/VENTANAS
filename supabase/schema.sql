-- =====================================================================
-- ORELLANA - VIDRIOS & ALUMINIOS · DATABASE SCHEMA PARA SUPABASE
-- Ejecutar en Supabase -> SQL Editor para inicializar la base de datos
-- Enlace directo: https://supabase.com/dashboard/project/pzxghlzlruggbughxdlo/sql
-- =====================================================================

-- 1. TABLA DE LEADS / COTIZACIONES
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT DEFAULT '',
  service TEXT NOT NULL,
  dimensions TEXT DEFAULT '',
  message TEXT DEFAULT '',
  address TEXT DEFAULT '',
  commune TEXT DEFAULT 'Viña del Mar',
  estimated_value NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'nuevo', -- nuevo | contactado | cotizado | ganado | perdido
  notes TEXT DEFAULT ''
);

-- Habilitar RLS y Políticas de Acceso
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can insert leads" ON leads;
CREATE POLICY "Public can insert leads" ON leads FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow select for all" ON leads;
CREATE POLICY "Allow select for all" ON leads FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow update for all" ON leads;
CREATE POLICY "Allow update for all" ON leads FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Allow delete for all" ON leads;
CREATE POLICY "Allow delete for all" ON leads FOR DELETE USING (true);

-- 2. TABLA DE PRODUCTOS Y SERVICIOS
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  material TEXT NOT NULL,
  price_type TEXT NOT NULL, -- m2 | unit | cotizar
  price_clp NUMERIC DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  image TEXT
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read products" ON products;
CREATE POLICY "Public can read products" ON products FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow all for products" ON products;
CREATE POLICY "Allow all for products" ON products FOR ALL USING (true) WITH CHECK (true);

-- 3. TABLA DE EVENTOS DE ANALÍTICA (MÉTRICAS)
CREATE TABLE IF NOT EXISTS tracking_events (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  event TEXT NOT NULL, -- page_view | cta_click | whatsapp_click | lead_submit | section_view
  path TEXT,
  label TEXT,
  device TEXT,
  session_id TEXT
);

ALTER TABLE tracking_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can insert tracking" ON tracking_events;
CREATE POLICY "Public can insert tracking" ON tracking_events FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public can read tracking" ON tracking_events;
CREATE POLICY "Public can read tracking" ON tracking_events FOR SELECT USING (true);

-- Índices de alto rendimiento
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
CREATE INDEX IF NOT EXISTS idx_tracking_event ON tracking_events (event, created_at DESC);
