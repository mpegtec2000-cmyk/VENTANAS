export interface Lead {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  dimensions?: string;
  message?: string;
  address?: string;
  commune?: string;
  estimated_value?: number;
  status: 'nuevo' | 'contactado' | 'cotizado' | 'ganado' | 'perdido';
  notes?: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'ventanas' | 'puertas' | 'shower_door' | 'vitrinas' | 'balcones' | 'espejos' | 'bow_window' | 'celosias' | 'otros';
  description: string;
  material: 'Aluminio' | 'PVC' | 'Cristal Templado' | 'Termopanel' | 'Mixto';
  price_type: 'm2' | 'unit' | 'cotizar';
  price_clp?: number;
  is_active: boolean;
  featured: boolean;
  image?: string;
}

export interface TrackingEvent {
  id?: string;
  created_at?: string;
  event: 'page_view' | 'cta_click' | 'whatsapp_click' | 'lead_submit' | 'section_view';
  path?: string;
  label?: string;
  device?: string;
  session_id?: string;
}

export interface DashboardKPIs {
  totalVisitors: number;
  totalPageViews: number;
  totalCtaClicks: number;
  totalWhatsappClicks: number;
  totalLeads: number;
  conversionRate: number;
}
