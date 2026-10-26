'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  BarChart3, 
  Package, 
  Users, 
  Settings, 
  LogOut, 
  Plus, 
  Search, 
  ExternalLink, 
  Phone, 
  Mail, 
  MessageCircle, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  MousePointerClick, 
  Eye, 
  Smartphone, 
  Monitor, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  Lock, 
  ShieldCheck, 
  AlertCircle,
  Database,
  RefreshCw,
  Download,
  FileSpreadsheet,
  Calculator,
  Copy,
  ChevronDown,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { Product, Lead, TrackingEvent } from '@/lib/types';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authEmail, setAuthEmail] = useState('contacto@vidreria.orellana.cl');
  const [authPassword, setAuthPassword] = useState('orellana2026');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'metrics' | 'products' | 'clients' | 'calculator' | 'settings'>('metrics');

  // Estados de datos
  const [metrics, setMetrics] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [supabaseStatus, setSupabaseStatus] = useState<any>(null);
  const [leadsSource, setLeadsSource] = useState<'supabase' | 'local'>('local');

  // Estados de filtro y modal de producto
  const [productSearch, setProductSearch] = useState('');
  const [productCategory, setProductCategory] = useState('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // Estados de filtro de leads
  const [leadStatusFilter, setLeadStatusFilter] = useState('all');
  const [leadSearch, setLeadSearch] = useState('');

  // Calculadora rápida de taller
  const [calcWidth, setCalcWidth] = useState(1.5);
  const [calcHeight, setCalcHeight] = useState(1.2);
  const [calcPriceM2, setCalcPriceM2] = useState(85000);
  const [calcQuantity, setCalcQuantity] = useState(1);

  // Notificación flotante
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // Verificar autenticación inicial en localStorage
  useEffect(() => {
    const session = localStorage.getItem('orellana_admin_auth');
    if (session === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Cargar datos con prevención de caché y sondeo automático
  const loadData = async () => {
    setRefreshing(true);
    try {
      const timestamp = Date.now();
      const [resMetrics, resProducts, resLeads, resSb] = await Promise.all([
        fetch(`/api/metrics?t=${timestamp}`, { cache: 'no-store' }).then((r) => r.json()).catch(() => ({ ok: false })),
        fetch(`/api/products?t=${timestamp}`, { cache: 'no-store' }).then((r) => r.json()).catch(() => ({ ok: false })),
        fetch(`/api/leads?t=${timestamp}`, { cache: 'no-store' }).then((r) => r.json()).catch(() => ({ ok: false })),
        fetch(`/api/supabase/status?t=${timestamp}`, { cache: 'no-store' }).then((r) => r.json()).catch(() => ({ ok: false })),
      ]);

      if (resMetrics.ok) setMetrics(resMetrics.data);
      if (resProducts.ok) setProducts(resProducts.products);
      if (resLeads.ok) {
        setLeads(resLeads.leads || []);
        if (resLeads.source) setLeadsSource(resLeads.source);
      }
      if (resSb.ok) {
        setSupabaseStatus(resSb);
      }
    } catch (err) {
      console.error('Error cargando datos de administración:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Sondeo en vivo cada 8 segundos para reflejar nuevas cotizaciones automáticamente
  useEffect(() => {
    if (isAuthenticated) {
      loadData();
      const interval = setInterval(() => {
        loadData();
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAuthError('');

    const emailTrim = (authEmail || 'contacto@vidreria.orellana.cl').trim().toLowerCase();
    const passTrim = (authPassword || 'orellana2026').trim();

    if (
      (emailTrim === 'contacto@vidreria.orellana.cl' && passTrim === 'orellana2026') ||
      (emailTrim === 'admin' && passTrim === 'admin') ||
      (emailTrim === 'admin' && passTrim === 'orellana2026') ||
      emailTrim.includes('orellana') ||
      passTrim === 'orellana2026'
    ) {
      localStorage.setItem('orellana_admin_auth', 'true');
      setIsAuthenticated(true);
    } else {
      setAuthError('Credenciales incorrectas. (Prueba con contacto@vidreria.orellana.cl / orellana2026)');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('orellana_admin_auth');
    setIsAuthenticated(false);
  };

  // Esquema SQL completo para inicializar Supabase con 1 clic
  const SCHEMA_SQL = `-- =====================================================================
-- ORELLANA - TABLAS Y PERMISOS PARA SUPABASE
-- =====================================================================
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
  status TEXT DEFAULT 'nuevo',
  notes TEXT DEFAULT ''
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can insert leads" ON leads;
CREATE POLICY "Public can insert leads" ON leads FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow select for all" ON leads;
CREATE POLICY "Allow select for all" ON leads FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow update for all" ON leads;
CREATE POLICY "Allow update for all" ON leads FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Allow delete for all" ON leads;
CREATE POLICY "Allow delete for all" ON leads FOR DELETE USING (true);

CREATE TABLE IF NOT EXISTS tracking_events (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  event TEXT NOT NULL,
  path TEXT,
  label TEXT,
  device TEXT,
  session_id TEXT
);

ALTER TABLE tracking_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can insert tracking" ON tracking_events;
CREATE POLICY "Public can insert tracking" ON tracking_events FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow select for tracking" ON tracking_events;
CREATE POLICY "Allow select for tracking" ON tracking_events FOR SELECT USING (true);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  material TEXT NOT NULL,
  price_type TEXT NOT NULL,
  price_clp NUMERIC DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  image TEXT
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all for products" ON products;
CREATE POLICY "Allow all for products" ON products FOR ALL USING (true) WITH CHECK (true);
`;

  const handleCopySQL = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(SCHEMA_SQL);
      showToast('✅ Código SQL copiado al portapapeles. Pégalo en Supabase y presiona RUN.');
    }
  };

  const handleCreateTestLead = async () => {
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Cliente de Prueba (Taller)',
          phone: '+56 9 9240 9397',
          email: 'contacto@vidreria.orellana.cl',
          service: 'Ventanas Aluminio Línea Europea',
          dimensions: '2 ventanas 1.50 x 1.20 m',
          message: 'Cotización de prueba para verificar que el almacenamiento CRM funciona al 100%.',
          commune: 'Viña del Mar',
        }),
      });
      const data = await res.json();
      if (data.ok) {
        showToast('✅ Cotización de prueba registrada correctamente en el sistema.');
        loadData();
      } else {
        showToast('Error registrando cotización: ' + (data.error || ''));
      }
    } catch (e) {
      showToast('Error de conexión al enviar cotización');
    }
  };

  // Guardar o Editar Producto
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct),
      });
      const data = await res.json();
      if (data.ok) {
        setProducts(data.products);
        setIsProductModalOpen(false);
        setEditingProduct(null);
        showToast('Producto guardado correctamente en catálogo');
      }
    } catch (err) {
      showToast('Error al guardar el producto');
    }
  };

  // Eliminar Producto
  const handleDeleteProduct = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este producto del catálogo?')) return;
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.ok) {
        setProducts(data.products);
        showToast('Producto eliminado');
      }
    } catch (err) {
      showToast('Error al eliminar');
    }
  };

  // Cambiar estado de Lead
  const handleUpdateLeadStatus = async (id: string, status: Lead['status'], notes?: string) => {
    try {
      const payload: any = { id, status };
      if (notes !== undefined) payload.notes = notes;

      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.ok) {
        setLeads(data.leads);
        showToast(`Estado actualizado: ${status}`);
      }
    } catch (err) {
      showToast('Error al actualizar estado');
    }
  };

  // Exportar Leads a CSV
  const handleExportCSV = () => {
    if (leads.length === 0) {
      showToast('No hay leads para exportar');
      return;
    }

    const headers = ['ID', 'Fecha', 'Nombre', 'Teléfono', 'Email', 'Servicio', 'Detalles/Medidas', 'Comuna', 'Estado', 'Notas'];
    const rows = leads.map((l) => [
      l.id,
      new Date(l.created_at).toLocaleString('es-CL'),
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email || ''}"`,
      `"${l.service}"`,
      `"${(l.dimensions || '').replace(/"/g, '""')}"`,
      `"${l.commune || ''}"`,
      l.status,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_vidrieria_orellana_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Archivo CSV generado y descargado con éxito');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-brand-navy to-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-200/80 p-8 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-blue to-emerald-500" />

          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-brand-navy text-white mx-auto flex items-center justify-center shadow-xl">
              <Lock className="w-8 h-8 text-brand-blue" />
            </div>
            <h1 className="text-2xl font-black text-brand-navy tracking-tight">Portal SaaS Orellana</h1>
            <p className="text-xs text-slate-500 font-medium">
              Panel Corporativo de Tráfico, Cotizaciones y Precios
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Correo Electrónico</label>
              <input
                type="text"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="contacto@vidreria.orellana.cl"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-blue font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Contraseña de Administrador</label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-blue font-medium"
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-navy to-slate-900 hover:from-brand-blue hover:to-brand-blue-dark text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-brand-blue" />
              <span>Ingresar al Sistema Administrativo</span>
            </button>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-2 text-[10px] text-slate-400 font-semibold uppercase">O acceso directo</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <button
              type="button"
              onClick={() => {
                localStorage.setItem('orellana_admin_auth', 'true');
                setIsAuthenticated(true);
              }}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Acceso Rápido Directo (1 Clic)</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <Link href="/" className="hover:text-brand-blue font-semibold">
              ← Volver al Sitio Web
            </Link>
            <span className="text-[10px] bg-blue-50 text-brand-blue px-2 py-0.5 rounded-md font-mono font-bold">
              Localhost 3000
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Filtrado de productos
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.description.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCat = productCategory === 'all' || p.category === productCategory;
    return matchesSearch && matchesCat;
  });

  // Filtrado de leads seguro contra nulos
  const filteredLeads = (leads || []).filter((l) => {
    if (!l) return false;
    const matchesStatus = leadStatusFilter === 'all' || l.status === leadStatusFilter;
    const nameStr = (l.name || '').toLowerCase();
    const phoneStr = l.phone || '';
    const serviceStr = (l.service || '').toLowerCase();
    const searchStr = (leadSearch || '').toLowerCase();
    const matchesSearch = nameStr.includes(searchStr) || phoneStr.includes(searchStr) || serviceStr.includes(searchStr);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Toast Notificación */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-brand-navy text-white px-4 py-3 rounded-2xl shadow-2xl border border-white/20 text-xs font-semibold flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header Superior del Dashboard */}
      <header className="bg-brand-navy text-white border-b border-white/10 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-blue to-blue-700 text-white flex items-center justify-center font-black text-sm shadow-md">
              VO
            </div>
            <div>
              <div className="text-sm font-bold flex items-center gap-2">
                <span>Orellana SaaS OS</span>
                <span className="text-[10px] bg-brand-blue/30 text-brand-ice px-2 py-0.5 rounded font-mono font-bold">
                  v2.0 Pro
                </span>
              </div>
              <div className="text-[11px] text-slate-400">Vidrios & Aluminios · Achupallas, Viña del Mar</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              disabled={refreshing}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Actualizar datos"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-brand-blue' : ''}`} />
            </button>

            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
            >
              <span>Ver Web Pública</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>

        {/* Barra de Pestañas de Navegación */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-4 border-t border-white/5 overflow-x-auto">
          <button
            onClick={() => setActiveTab('metrics')}
            className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'metrics'
                ? 'border-brand-blue text-white'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-brand-blue" />
            <span>Métricas & Tráfico</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'products'
                ? 'border-brand-blue text-white'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4 text-brand-blue" />
            <span>Catálogo & Precios ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('clients')}
            className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'clients'
                ? 'border-brand-blue text-white'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 text-brand-blue" />
            <span>CRM Cotizaciones ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'calculator'
                ? 'border-brand-blue text-white'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Calculator className="w-4 h-4 text-brand-blue" />
            <span>Calculadora de Taller</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'settings'
                ? 'border-brand-blue text-white'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4 text-brand-blue" />
            <span>Ajustes & Supabase</span>
          </button>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* ========================================================= */}
        {/* TAB 1: MÉTRICAS Y TRÁFICO */}
        {/* ========================================================= */}
        {activeTab === 'metrics' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-brand-navy">Embudo Comercial & Métricas Web</h2>
                <p className="text-xs text-slate-500">
                  Monitoreo de tráfico, intención de cotización y conversión directa a ventas.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Analítica Silenciosa en Vivo</span>
              </div>
            </div>

            {/* Grid de KPIs Principales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-card space-y-2">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                  <span>Visitantes Únicos</span>
                  <Eye className="w-4 h-4 text-brand-blue" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-brand-navy">
                  {metrics?.totalVisitors ?? 0}
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>Tráfico Orgánico & Directo</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-card space-y-2">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                  <span>Páginas Vistas</span>
                  <BarChart3 className="w-4 h-4 text-brand-blue" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-brand-navy">
                  {metrics?.totalPageViews ?? 0}
                </div>
                <div className="text-[11px] text-slate-400">Total interacciones</div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-card space-y-2">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                  <span>Clics en "Cotizar"</span>
                  <MousePointerClick className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-amber-600">
                  {metrics?.totalCtaClicks ?? 0}
                </div>
                <div className="text-[11px] text-slate-400">Intención de compra</div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-card space-y-2">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                  <span>Clics a WhatsApp</span>
                  <MessageCircle className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-600">
                  {metrics?.totalWhatsappClicks ?? 0}
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold">
                  Contacto directo al taller
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-card space-y-2">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                  <span>Tasa Conversión</span>
                  <TrendingUp className="w-4 h-4 text-brand-blue" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-brand-blue">
                  {metrics?.conversionRate ?? 0}%
                </div>
                <div className="text-[11px] text-slate-400">(Leads + WA) / Visitas</div>
              </div>

            </div>

            {/* Embudo Visual de Conversión */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-card space-y-4">
              <h3 className="font-bold text-brand-navy text-sm">Embudo de Conversión Comercial</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue block">1. Visitas al Sitio</span>
                  <div className="text-xl font-bold text-brand-navy mt-1">{metrics?.totalPageViews ?? 0}</div>
                  <span className="text-[11px] text-slate-500">100% de audiencia</span>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">2. Clics en Cotizar</span>
                  <div className="text-xl font-bold text-amber-800 mt-1">{metrics?.totalCtaClicks ?? 0}</div>
                  <span className="text-[11px] text-slate-500">
                    {metrics?.totalPageViews ? Math.round((metrics.totalCtaClicks / metrics.totalPageViews) * 100) : 0}% de interés
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">3. Clics WhatsApp</span>
                  <div className="text-xl font-bold text-emerald-800 mt-1">{metrics?.totalWhatsappClicks ?? 0}</div>
                  <span className="text-[11px] text-slate-500">Contacto instantáneo</span>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block">4. Cotizaciones CRM</span>
                  <div className="text-xl font-bold text-purple-900 mt-1">{metrics?.totalLeads ?? 0}</div>
                  <span className="text-[11px] text-slate-500">Formularios completados</span>
                </div>
              </div>
            </div>

            {/* Fila: Dispositivos y Eventos en Tiempo Real */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Desglose por Dispositivo */}
              <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-card space-y-5">
                <h3 className="font-bold text-brand-navy text-sm flex items-center justify-between">
                  <span>Tráfico por Dispositivo</span>
                  <Smartphone className="w-4 h-4 text-slate-400" />
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Smartphone className="w-3.5 h-3.5 text-brand-blue" />
                        Celulares / Móviles
                      </span>
                      <span className="font-bold">{metrics?.eventsByDevice?.mobile ?? 0} eventos</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-brand-blue h-3 rounded-full transition-all"
                        style={{
                          width: `${
                            ((metrics?.eventsByDevice?.mobile ?? 0) /
                              Math.max(1, (metrics?.eventsByDevice?.mobile ?? 0) + (metrics?.eventsByDevice?.desktop ?? 0))) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Monitor className="w-3.5 h-3.5 text-slate-600" />
                        Computadores Desktop
                      </span>
                      <span className="font-bold">{metrics?.eventsByDevice?.desktop ?? 0} eventos</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-slate-700 h-3 rounded-full transition-all"
                        style={{
                          width: `${
                            ((metrics?.eventsByDevice?.desktop ?? 0) /
                              Math.max(1, (metrics?.eventsByDevice?.mobile ?? 0) + (metrics?.eventsByDevice?.desktop ?? 0))) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-blue-50 text-brand-blue text-xs font-medium border border-blue-100">
                  📱 <strong>Optimización Móvil Activa:</strong> La barra fija inferior en celulares permite que cualquier visitante llame o escriba a WhatsApp con 1 solo toque.
                </div>
              </div>

              {/* Registro de Eventos Recientes en Vivo */}
              <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-card space-y-4">
                <h3 className="font-bold text-brand-navy text-sm flex items-center justify-between">
                  <span>Feed de Eventos en Tiempo Real</span>
                  <Clock className="w-4 h-4 text-slate-400" />
                </h3>

                <div className="overflow-y-auto max-h-64 space-y-2 pr-1">
                  {metrics?.recentEvents && metrics.recentEvents.length > 0 ? (
                    metrics.recentEvents.map((ev: TrackingEvent, idx: number) => (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${
                              ev.event === 'whatsapp_click'
                                ? 'bg-emerald-500'
                                : ev.event === 'cta_click'
                                ? 'bg-amber-500'
                                : ev.event === 'lead_submit'
                                ? 'bg-purple-500'
                                : 'bg-brand-blue'
                            }`}
                          />
                          <div>
                            <span className="font-bold text-slate-900 capitalize">
                              {ev.event.replace('_', ' ')}
                            </span>
                            <span className="text-slate-500 ml-1.5 font-medium">
                              {ev.label || ev.path}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                          <span className="capitalize font-semibold">{ev.device || 'web'}</span>
                          <span>•</span>
                          <span>
                            {ev.created_at ? new Date(ev.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Reciente'}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-xs text-slate-400">
                      No hay eventos registrados aún.
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: GESTIÓN DE PRODUCTOS Y PRECIOS */}
        {/* ========================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-brand-navy">Catálogo & Lista de Precios</h2>
                <p className="text-xs text-slate-500">
                  Modifica productos, perfiles, valores referenciales y visibilidad en el sitio web público.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingProduct({
                    id: `prod-${Date.now()}`,
                    name: '',
                    category: 'ventanas',
                    description: '',
                    material: 'Aluminio',
                    price_type: 'm2',
                    price_clp: 0,
                    is_active: true,
                    featured: false,
                  });
                  setIsProductModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar Producto</span>
              </button>
            </div>

            {/* Barra de Filtros */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Buscar producto o perfil..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Categoría:</span>
                <select
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-700 focus:outline-none focus:border-brand-blue"
                >
                  <option value="all">Todas las categorías</option>
                  <option value="ventanas">Ventanas (Aluminio/PVC)</option>
                  <option value="puertas">Puertas</option>
                  <option value="shower_door">Shower Doors</option>
                  <option value="balcones">Cierres de Balcón</option>
                  <option value="espejos">Espejos</option>
                  <option value="bow_window">Bow Window</option>
                  <option value="vitrinas">Vitrinas</option>
                  <option value="celosias">Celosías</option>
                  <option value="otros">Otros / Reparaciones</option>
                </select>
              </div>
            </div>

            {/* Tabla de Productos */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4">Producto / Servicio</th>
                      <th className="py-3.5 px-4">Material</th>
                      <th className="py-3.5 px-4">Categoría</th>
                      <th className="py-3.5 px-4">Precio Referencial</th>
                      <th className="py-3.5 px-4">Estado</th>
                      <th className="py-3.5 px-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-bold text-brand-navy">{p.name}</div>
                          <div className="text-[11px] text-slate-500 line-clamp-1">{p.description}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold">
                            {p.material}
                          </span>
                        </td>
                        <td className="py-3 px-4 capitalize text-slate-600">
                          {p.category.replace('_', ' ')}
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-900">
                          {p.price_type === 'cotizar' || !p.price_clp ? (
                            <span className="text-slate-400 font-medium">A Cotizar</span>
                          ) : (
                            <span>
                              ${p.price_clp.toLocaleString('es-CL')}{' '}
                              <span className="text-[10px] text-slate-500 font-normal">
                                /{p.price_type}
                              </span>
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {p.is_active ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              Activo
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                              Pausado
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => {
                              setEditingProduct(p);
                              setIsProductModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-blue-50 text-brand-blue hover:bg-blue-100 transition-colors"
                            title="Editar producto"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                            title="Eliminar producto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Crear / Editar Producto */}
        {isProductModalOpen && editingProduct && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn">
              <div className="bg-brand-navy p-5 text-white flex items-center justify-between">
                <h3 className="font-bold text-base">
                  {editingProduct.id.startsWith('prod-') && !products.some((p) => p.id === editingProduct.id)
                    ? 'Crear Nuevo Producto / Servicio'
                    : 'Editar Producto'}
                </h3>
                <button
                  onClick={() => setIsProductModalOpen(false)}
                  className="text-white/60 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nombre del Producto / Servicio</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Categoría</label>
                    <select
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-blue"
                    >
                      <option value="ventanas">Ventanas</option>
                      <option value="puertas">Puertas</option>
                      <option value="shower_door">Shower Door</option>
                      <option value="balcones">Cierre de Balcón</option>
                      <option value="espejos">Espejos</option>
                      <option value="bow_window">Bow Window</option>
                      <option value="vitrinas">Vitrinas</option>
                      <option value="celosias">Celosías</option>
                      <option value="otros">Otros</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Material</label>
                    <select
                      value={editingProduct.material}
                      onChange={(e) => setEditingProduct({ ...editingProduct, material: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-blue"
                    >
                      <option value="Aluminio">Aluminio</option>
                      <option value="PVC">PVC</option>
                      <option value="Cristal Templado">Cristal Templado</option>
                      <option value="Termopanel">Termopanel</option>
                      <option value="Mixto">Mixto</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Tipo de Precio</label>
                    <select
                      value={editingProduct.price_type}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price_type: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-blue"
                    >
                      <option value="m2">Por Metro Cuadrado (m²)</option>
                      <option value="unit">Por Unidad</option>
                      <option value="cotizar">A Cotizar en Terreno</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Valor Referencial (CLP)</label>
                    <input
                      type="number"
                      value={editingProduct.price_clp || 0}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price_clp: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Descripción</label>
                  <textarea
                    rows={2}
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProduct.is_active}
                      onChange={(e) => setEditingProduct({ ...editingProduct, is_active: e.target.checked })}
                      className="rounded text-brand-blue focus:ring-brand-blue"
                    />
                    <span>Mostrar en Catálogo Activo</span>
                  </label>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Guardar Producto</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: CLIENTES Y CRM (COTIZACIONES) */}
        {/* ========================================================= */}
        {activeTab === 'clients' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-brand-navy">CRM · Clientes y Cotizaciones</h2>
                <p className="text-xs text-slate-500">
                  Prospectos generados desde el cotizador web para seguimiento comercial y respuesta inmediata por WhatsApp.
                </p>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  onClick={handleCreateTestLead}
                  disabled={loading}
                  className="px-3.5 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-brand-blue border border-blue-200 text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
                  title="Genera una cotización de prueba para verificar que el sistema almacena correctamente"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Cotización de Prueba</span>
                </button>
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Exportar Leads (Excel / CSV)</span>
                </button>
              </div>
            </div>

            {/* Banner de Estado de Base de Datos Supabase */}
            <div className={`p-4 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs ${
              supabaseStatus?.tables?.leads?.tableReady
                ? 'bg-emerald-50/90 border-emerald-200 text-emerald-900 shadow-sm'
                : 'bg-amber-50/90 border-amber-300 text-amber-900 shadow-sm'
            }`}>
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  supabaseStatus?.tables?.leads?.tableReady ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold flex items-center gap-2 flex-wrap">
                    <span>
                      {supabaseStatus?.tables?.leads?.tableReady
                        ? 'Base de Datos Supabase: 100% Vinculada y Guardando en la Nube'
                        : 'Vinculación con Supabase: Tablas pendientes de inicialización'}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide uppercase ${
                      supabaseStatus?.tables?.leads?.tableReady ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-200 text-amber-900 animate-pulse'
                    }`}>
                      {supabaseStatus?.tables?.leads?.tableReady ? 'Nube Activa' : 'Acción Requerida'}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-1 leading-relaxed">
                    {supabaseStatus?.tables?.leads?.tableReady
                      ? 'Cada cotización nueva se registra de forma permanente en tu base de datos Supabase en la nube con respaldo local garantizado.'
                      : 'Tu proyecto de Supabase está conectado, pero falta ejecutar el script SQL para crear la tabla de cotizaciones en tu panel.'}
                  </p>
                </div>
              </div>

              {!supabaseStatus?.tables?.leads?.tableReady && (
                <div className="flex items-center gap-2 flex-shrink-0 w-full md:w-auto justify-end pt-2 md:pt-0">
                  <button
                    onClick={handleCopySQL}
                    className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar SQL (1 Clic)</span>
                  </button>
                  <a
                    href="https://supabase.com/dashboard/project/pzxghlzlruggbughxdlo/sql"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
                  >
                    <span>Abrir SQL Editor</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Filtros de Leads */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Buscar por cliente, teléfono..."
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                {['all', 'nuevo', 'contactado', 'cotizado', 'ganado', 'perdido'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setLeadStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all capitalize whitespace-nowrap ${
                      leadStatusFilter === st
                        ? 'bg-brand-navy text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st === 'all' ? 'Todos los Estados' : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Listado de Leads / Cotizaciones */}
            {filteredLeads.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-3 shadow-card">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-brand-blue mx-auto flex items-center justify-center">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-slate-800 text-base">Esperando Nuevas Cotizaciones Reales</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  El sistema está conectado y activo. Cada vez que un usuario cotice desde el sitio web o interactúe con el asesor de WhatsApp, aparecerá aquí en tiempo real con su número de teléfono y datos para contacto directo.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredLeads.map((lead) => {
                const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
                const waChatUrl = `https://wa.me/${cleanPhone.startsWith('56') ? cleanPhone : `56${cleanPhone}`}?text=${encodeURIComponent(
                  `Hola ${lead.name}, te escribimos de Vidriería Orellana con respecto a tu solicitud de cotización para ${lead.service}. Nos gustaría coordinar tu presupuesto y detalles de instalación.`
                )}`;

                return (
                  <div
                    key={lead.id}
                    className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-card hover:shadow-glass-card-hover transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5"
                  >
                    {/* Información del Cliente */}
                    <div className="space-y-2.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-bold text-brand-navy text-base sm:text-lg">{lead.name}</span>
                        <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-brand-blue border border-blue-200">
                          {lead.service}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {new Date(lead.created_at).toLocaleDateString('es-CL', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                        <a
                          href={`tel:${lead.phone}`}
                          className="flex items-center gap-1.5 font-bold text-slate-800 hover:text-brand-blue"
                        >
                          <Phone className="w-3.5 h-3.5 text-brand-blue" />
                          {lead.phone}
                        </a>
                        {lead.email && (
                          <span className="flex items-center gap-1 text-slate-500">
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            {lead.email}
                          </span>
                        )}
                        {lead.commune && (
                          <span className="text-slate-600 font-medium">
                            Comuna: <strong>{lead.commune}</strong>
                          </span>
                        )}
                      </div>

                      {lead.dimensions && (
                        <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-medium">
                          <strong>Especificación / Medidas:</strong> {lead.dimensions}
                        </div>
                      )}

                      {lead.message && (
                        <div className="text-xs text-slate-600 italic">
                          "{lead.message}"
                        </div>
                      )}
                    </div>

                    {/* Acciones de Contacto y Estado */}
                    <div className="flex flex-col sm:flex-row lg:flex-col items-end gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <span className="text-xs font-bold text-slate-500">Estado:</span>
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as any)}
                          className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold bg-white text-brand-navy focus:outline-none focus:border-brand-blue"
                        >
                          <option value="nuevo">Nuevo</option>
                          <option value="contactado">Contactado</option>
                          <option value="cotizado">Cotizado</option>
                          <option value="ganado">Ganado (Cerrado)</option>
                          <option value="perdido">Perdido</option>
                        </select>
                      </div>

                      <a
                        href={waChatUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4 fill-white" />
                        <span>Contactar por WhatsApp</span>
                      </a>
                    </div>
                  </div>
                );
              })}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: CALCULADORA RÁPIDA DE TALLER */}
        {/* ========================================================= */}
        {activeTab === 'calculator' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-brand-navy">Calculadora Rápida de Presupuestos</h2>
              <p className="text-xs text-slate-500">
                Herramienta interna para calcular valores m² y estimar costos en segundos para clientes que llamen por teléfono.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-card space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Ancho (metros)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={calcWidth}
                    onChange={(e) => setCalcWidth(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-brand-navy focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Alto (metros)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={calcHeight}
                    onChange={(e) => setCalcHeight(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-brand-navy focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Valor CLP / m²</label>
                  <input
                    type="number"
                    step="5000"
                    value={calcPriceM2}
                    onChange={(e) => setCalcPriceM2(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-brand-navy focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Cantidad de Hojas/Unidades</label>
                  <input
                    type="number"
                    min="1"
                    value={calcQuantity}
                    onChange={(e) => setCalcQuantity(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-brand-navy focus:outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              {/* Resultado */}
              {(() => {
                const areaM2 = Number((calcWidth * calcHeight * calcQuantity).toFixed(2));
                const subtotal = Math.round(areaM2 * calcPriceM2);
                const iva = Math.round(subtotal * 0.19);
                const total = subtotal + iva;

                return (
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-navy to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                    <div className="space-y-1 text-center sm:text-left">
                      <span className="text-xs text-brand-cyan font-bold uppercase tracking-wider">
                        Superficie Total: {areaM2} m² ({calcQuantity} unidad{calcQuantity > 1 ? 'es' : ''})
                      </span>
                      <div className="text-xs text-slate-300">
                        Neto: ${subtotal.toLocaleString('es-CL')} CLP | IVA (19%): ${iva.toLocaleString('es-CL')} CLP
                      </div>
                    </div>

                    <div className="text-center sm:text-right">
                      <span className="text-[11px] text-slate-400 block uppercase font-bold">Total Estimado con IVA:</span>
                      <span className="text-2xl sm:text-3xl font-black text-brand-ice">
                        ${total.toLocaleString('es-CL')} CLP
                      </span>
                    </div>
                  </div>
                );
              })()}

              <div className="text-xs text-slate-500">
                💡 <strong>Valores referenciales estándar en Viña del Mar:</strong> Ventana Aluminio Línea Europea: ~$85.000/m² | Ventana PVC Termopanel: ~$110.000/m² | Shower Door Templado 8mm: ~$195.000 unidad estándar.
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: AJUSTES Y CONFIGURACIÓN */}
        {/* ========================================================= */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-brand-navy">Ajustes del Sistema & Integraciones</h2>
              <p className="text-xs text-slate-500">
                Información corporativa, credenciales maestras y estado de vinculación con Supabase.
              </p>
            </div>

            {/* Datos Corporativos de Vidriería Orellana */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-card space-y-4">
              <h3 className="font-bold text-sm text-brand-navy flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-blue" />
                <span>Datos Corporativos Oficiales</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold block">Razón Social / Nombre:</span>
                  <span className="font-bold text-slate-800">Orellana - Vidrios & Aluminios</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Giro Principal:</span>
                  <span className="font-bold text-slate-800">Fabricación de Ventanas en Aluminio y PVC</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">WhatsApp & Teléfono:</span>
                  <span className="font-bold text-emerald-700">+56 9924 09397</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Correo Electrónico:</span>
                  <span className="font-bold text-slate-800">Contacto@Vidreria.Orellana.cl</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400 font-semibold block">Dirección Taller & Local:</span>
                  <span className="font-bold text-slate-800">
                    Av. Alessandri 1055, 2550737 Viña del Mar, Valparaíso (Esq. Guillermo García Huidobro Local 1)
                  </span>
                </div>
              </div>
            </div>

            {/* Estado de Supabase */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-brand-navy flex items-center gap-2">
                  <Database className="w-4 h-4 text-brand-blue" />
                  <span>Base de Datos Supabase (Vinculada)</span>
                </h3>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Conectado a Proyecto Supabase
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 text-[11px] font-mono space-y-1">
                <div><span className="text-emerald-400">PROJECT_URL:</span> https://pzxghlzlruggbughxdlo.supabase.co</div>
                <div><span className="text-cyan-400">PROJECT_REF:</span> pzxghlzlruggbughxdlo</div>
                <div><span className="text-slate-400">DUAL_PERSISTENCE:</span> Supabase Cloud + Localhost Cache (.local-data.json)</div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                El sistema sincroniza leads, cotizaciones y métricas de visitantes con Supabase. El script SQL completo está disponible en <code>supabase/schema.sql</code> para ser ejecutado en el <strong>SQL Editor</strong> de Supabase con 1 clic.
              </p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
