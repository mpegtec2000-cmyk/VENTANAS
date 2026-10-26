import { Product, Lead, DashboardKPIs, TrackingEvent } from './types';
import fs from 'fs';
import path from 'path';

// Datos iniciales de productos basados en la tarjeta de presentación
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Ventana Corredera Aluminio Línea Europea',
    category: 'ventanas',
    description: 'Ventana hermética con perfilería de aluminio reforzado, cierre perimetral y opción de termopanel acústico y térmico.',
    material: 'Aluminio',
    price_type: 'm2',
    price_clp: 85000,
    is_active: true,
    featured: true,
  },
  {
    id: 'prod-2',
    name: 'Ventana PVC Termopanel Aislante',
    category: 'ventanas',
    description: 'Máxima eficiencia térmica y acústica. Perfil PVC soldado por termofusión, ideal para clima de Viña del Mar y costa.',
    material: 'PVC',
    price_type: 'm2',
    price_clp: 110000,
    is_active: true,
    featured: true,
  },
  {
    id: 'prod-3',
    name: 'Shower Door Cristal Templado 8mm',
    category: 'shower_door',
    description: 'Puerta de ducha corredera o batiente en cristal templado de seguridad de 8mm con herrajes de acero inoxidable satinado.',
    material: 'Cristal Templado',
    price_type: 'unit',
    price_clp: 195000,
    is_active: true,
    featured: true,
  },
  {
    id: 'prod-4',
    name: 'Cierre de Balcón y Terrazas Vista Libre',
    category: 'balcones',
    description: 'Protege tu balcón del viento y la humedad costera. Sistema de hojas plegables de cristal o correderas en aluminio.',
    material: 'Cristal Templado',
    price_type: 'cotizar',
    price_clp: 0,
    is_active: true,
    featured: true,
  },
  {
    id: 'prod-5',
    name: 'Puerta Batiente / Corredera de Vidrio & Aluminio',
    category: 'puertas',
    description: 'Fabricación a medida para accesos principales, cocinas, logias o salidas al patio. Alta resistencia y durabilidad.',
    material: 'Aluminio',
    price_type: 'unit',
    price_clp: 240000,
    is_active: true,
    featured: false,
  },
  {
    id: 'prod-6',
    name: 'Bow Window Panorámico Arquitectónico',
    category: 'bow_window',
    description: 'Ventanal saliente que maximiza la entrada de luz natural y amplía la vista exterior. Estructura robusta y hermética.',
    material: 'Aluminio',
    price_type: 'cotizar',
    price_clp: 0,
    is_active: true,
    featured: true,
  },
  {
    id: 'prod-7',
    name: 'Espejos Biselados y Retroiluminados LED',
    category: 'espejos',
    description: 'Espejos de cristal belga o nacional de 4mm y 5mm con cantos pulidos o biselados. Para baños, gimnasios y salas de estar.',
    material: 'Cristal Templado',
    price_type: 'm2',
    price_clp: 48000,
    is_active: true,
    featured: false,
  },
  {
    id: 'prod-8',
    name: 'Vitrinas Comerciales y Exhibidores',
    category: 'vitrinas',
    description: 'Vitrinas de vidrio y aluminio para locales comerciales, mesones de atención y exhibición segura de mercadería.',
    material: 'Aluminio',
    price_type: 'cotizar',
    price_clp: 0,
    is_active: true,
    featured: false,
  },
  {
    id: 'prod-9',
    name: 'Celosías de Ventilación y Quiebrasoles',
    category: 'celosias',
    description: 'Sistemas de ventilación permanente o regulable en aluminio para logias, baños y sectores industriales.',
    material: 'Aluminio',
    price_type: 'unit',
    price_clp: 65000,
    is_active: true,
    featured: false,
  },
  {
    id: 'prod-10',
    name: 'Servicio de Reparación y Mantención General',
    category: 'otros',
    description: 'Cambio de cristales rotos, reemplazo de rodamientos de ventanas correderas, sellos de silicona y ajustes generales.',
    material: 'Mixto',
    price_type: 'cotizar',
    price_clp: 0,
    is_active: true,
    featured: true,
  },
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-101',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    name: 'Carlos Henríquez',
    phone: '+56 9 8765 4321',
    email: 'carlos.h@gmail.com',
    service: 'Ventanas',
    dimensions: '3 ventanas de 1.50 x 1.20 m',
    message: 'Necesito cotizar cambio a termopanel en PVC blanco para departamento en Viña del Mar.',
    commune: 'Viña del Mar (Reñaca)',
    estimated_value: 390000,
    status: 'nuevo',
  },
  {
    id: 'lead-102',
    created_at: new Date(Date.now() - 3600000 * 26).toISOString(),
    name: 'Marcela Valenzuela',
    phone: '+56 9 9123 9876',
    email: 'marcela.v@hotmail.com',
    service: 'Shower Door',
    dimensions: '1.20 x 1.90 m corredera',
    message: 'Busco shower door en cristal templado con perfiles negros o satinados para baño principal.',
    commune: 'Concón',
    estimated_value: 210000,
    status: 'contactado',
    notes: 'Se le envió catálogo de herrajes por WhatsApp.',
  },
  {
    id: 'lead-103',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    name: 'Inmobiliaria Costa Sol',
    phone: '+56 9 7455 1200',
    email: 'proyectos@costasol.cl',
    service: 'Cierre de Balcón',
    dimensions: 'Balcón curvo 6 metros lineales',
    message: 'Cotización para cierre de terraza en piso 12.',
    commune: 'Viña del Mar',
    estimated_value: 1250000,
    status: 'cotizado',
    notes: 'Visita técnica agendada para rectificar medidas.',
  },
];

// Almacenamiento local en archivo JSON para desarrollo
const DATA_FILE = path.join(process.cwd(), '.local-data.json');

interface LocalStorageData {
  products: Product[];
  leads: Lead[];
  events: TrackingEvent[];
}

function getStoredData(): LocalStorageData {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading local data file:', err);
  }

  const defaultData: LocalStorageData = {
    products: INITIAL_PRODUCTS,
    leads: INITIAL_LEADS,
    events: [
      { event: 'page_view', path: '/', label: 'Inicio', device: 'mobile', created_at: new Date(Date.now() - 3600000 * 3).toISOString() },
      { event: 'cta_click', path: '/', label: 'Boton Cotizar Hero', device: 'mobile', created_at: new Date(Date.now() - 3600000 * 3).toISOString() },
      { event: 'whatsapp_click', path: '/', label: 'WhatsApp Flotante', device: 'mobile', created_at: new Date(Date.now() - 3600000 * 2).toISOString() },
      { event: 'page_view', path: '/', label: 'Inicio', device: 'desktop', created_at: new Date(Date.now() - 3600000 * 1).toISOString() },
      { event: 'lead_submit', path: '/', label: 'Formulario Cotizador', device: 'desktop', created_at: new Date(Date.now() - 3600000 * 1).toISOString() },
    ],
  };

  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
  } catch {}

  return defaultData;
}

function saveStoredData(data: LocalStorageData) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving local data file:', err);
  }
}

export function getLocalProducts(): Product[] {
  return getStoredData().products;
}

export function saveLocalProduct(product: Product): Product[] {
  const data = getStoredData();
  const index = data.products.findIndex((p) => p.id === product.id);
  if (index >= 0) {
    data.products[index] = product;
  } else {
    data.products.unshift(product);
  }
  saveStoredData(data);
  return data.products;
}

export function deleteLocalProduct(id: string): Product[] {
  const data = getStoredData();
  data.products = data.products.filter((p) => p.id !== id);
  saveStoredData(data);
  return data.products;
}

export function getLocalLeads(): Lead[] {
  return getStoredData().leads;
}

export function addLocalLead(lead: Omit<Lead, 'id' | 'created_at' | 'status'>): Lead {
  const data = getStoredData();
  const newLead: Lead = {
    ...lead,
    id: `lead-${Date.now()}`,
    created_at: new Date().toISOString(),
    status: 'nuevo',
  };
  data.leads.unshift(newLead);
  saveStoredData(data);
  return newLead;
}

export function updateLocalLead(id: string, updates: Partial<Lead>): Lead[] {
  const data = getStoredData();
  const lead = data.leads.find((l) => l.id === id);
  if (lead) {
    Object.assign(lead, updates);
    saveStoredData(data);
  }
  return data.leads;
}

export function addLocalEvent(event: TrackingEvent) {
  const data = getStoredData();
  data.events.push({
    ...event,
    id: `ev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    created_at: new Date().toISOString(),
  });
  saveStoredData(data);
}

export function getLocalKPIs(): DashboardKPIs & {
  recentEvents: TrackingEvent[];
  leadsByService: Record<string, number>;
  eventsByDevice: Record<string, number>;
} {
  const data = getStoredData();
  const events = data.events;

  const totalPageViews = events.filter((e) => e.event === 'page_view').length;
  const totalCtaClicks = events.filter((e) => e.event === 'cta_click').length;
  const totalWhatsappClicks = events.filter((e) => e.event === 'whatsapp_click').length;
  const totalLeads = data.leads.length;

  // Visitantes únicos aproximados por session_id o fallback
  const uniqueVisitors = new Set(events.map((e) => e.session_id || e.id)).size || Math.max(1, totalPageViews);

  const conversionRate = totalPageViews > 0 ? Number(((totalLeads + totalWhatsappClicks) / totalPageViews * 100).toFixed(1)) : 0;

  const leadsByService: Record<string, number> = {};
  data.leads.forEach((l) => {
    leadsByService[l.service] = (leadsByService[l.service] || 0) + 1;
  });

  const eventsByDevice: Record<string, number> = { mobile: 0, desktop: 0 };
  events.forEach((e) => {
    const dev = e.device === 'mobile' ? 'mobile' : 'desktop';
    eventsByDevice[dev] = (eventsByDevice[dev] || 0) + 1;
  });

  return {
    totalVisitors: uniqueVisitors,
    totalPageViews,
    totalCtaClicks,
    totalWhatsappClicks,
    totalLeads,
    conversionRate,
    recentEvents: events.slice(-30).reverse(),
    leadsByService,
    eventsByDevice,
  };
}
