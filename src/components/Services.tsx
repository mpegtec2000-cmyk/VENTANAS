'use client';

import { 
  AppWindow, 
  DoorClosed, 
  Bath, 
  Store, 
  Building2, 
  Sparkles, 
  Maximize, 
  Wind, 
  Wrench, 
  ArrowRight,
  Check
} from 'lucide-react';
import { trackEvent } from '@/lib/tracker';

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  icon: any;
  tag: string;
}

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'ventanas',
    name: 'Ventanas en Aluminio y PVC',
    category: 'Especialidad Principal',
    description: 'Fabricación a medida con perfiles reforzados en aluminio y PVC. Opciones de vidrio monolítico o termopanel con aislamiento térmico y acústico.',
    features: ['Línea Europea & PVC termofusionado', 'Correderas, proyectantes y fijas', 'Ahorro energético y reducción de ruidos'],
    icon: AppWindow,
    tag: 'Más Solicitado',
  },
  {
    id: 'puertas',
    name: 'Puertas de Vidrio & Aluminio',
    category: 'Estructuras',
    description: 'Puertas batientes y correderas para accesos principales, divisiones de oficinas, patios y logias. Gran resistencia estructural y finas terminaciones.',
    features: ['Marcos robustos anticorrosión', 'Cerraduras y bisagras de alta seguridad', 'Opciones en vidrio templado o satinado'],
    icon: DoorClosed,
    tag: 'Resistente',
  },
  {
    id: 'shower_door',
    name: 'Shower Door a Medida',
    category: 'Baño & Confort',
    description: 'Transforma tu baño con mamparas y puertas de ducha en cristal templado de seguridad de 8mm. Evita filtraciones y optimiza el espacio.',
    features: ['Cristal templado templado certificado', 'Herrajes en acero inoxidable satinado', 'Sistemas correderos o pivotantes'],
    icon: Bath,
    tag: 'Elegancia',
  },
  {
    id: 'cierre_balcon',
    name: 'Cierre de Balcón y Terrazas',
    category: 'Espacios Exteriores',
    description: 'Disfruta tu terraza todo el año protegiéndola del viento, el polvo y la humedad costera de Viña del Mar y la V Región.',
    features: ['Hojas corredizas de fácil deslizamiento', 'Máxima panorámica y luminosidad', 'Hermeticidad contra lluvia y frío'],
    icon: Building2,
    tag: 'Protección',
  },
  {
    id: 'espejos',
    name: 'Espejos Biselados y LED',
    category: 'Decoración & Amplitud',
    description: 'Corte y pulido de espejos de primera calidad. Desde espejos de baño hasta muros completos para gimnasios, locales y salones.',
    features: ['Biselados finos y bordes pulidos', 'Opción de luz LED perimetral', 'Fijación segura a muros'],
    icon: Sparkles,
    tag: 'Diseño',
  },
  {
    id: 'bow_window',
    name: 'Bow Window Panorámico',
    category: 'Arquitectura',
    description: 'Ventanas mirador salientes que aportan amplitud visual, confort y elegancia a fachadas de casas y departamentos.',
    features: ['Estructura angular reforzada', 'Mayor ingreso de luz natural', 'Diseño arquitectónico exclusivo'],
    icon: Maximize,
    tag: 'Exclusivo',
  },
  {
    id: 'vitrinas',
    name: 'Vitrinas Comerciales',
    category: 'Comercial',
    description: 'Vitrinas, mostradores y exhibidores de vidrio para negocios, botillerías, farmacias y locales comerciales.',
    features: ['Perfiles de alta durabilidad', 'Cerraduras para exhibición segura', 'Vidrios laminados de seguridad'],
    icon: Store,
    tag: 'Comercio',
  },
  {
    id: 'celosias',
    name: 'Celosías de Ventilación',
    category: 'Control de Aire',
    description: 'Celosías de aluminio fijas o regulables para logias, baños y sectores industriales que requieren circulación de aire constante.',
    features: ['Aluminio inalterable al óxido', 'Ventilación continua y segura', 'Control visual y solar'],
    icon: Wind,
    tag: 'Funcional',
  },
  {
    id: 'reparaciones',
    name: 'Reparación en General y Otros',
    category: 'Servicio Técnico',
    description: 'Atención rápida a vidrios quebrados, cambio de rodamientos atascados, ajuste de cierres y sellado perimetral con silicona neutra.',
    features: ['Reparación in situ en Viña del Mar', 'Repuestos de herrajes originales', 'Diagnóstico claro y honesto'],
    icon: Wrench,
    tag: 'Servicio Inmediato',
  },
];

export default function Services() {
  const handleSelectService = (serviceName: string) => {
    trackEvent('cta_click', `Servicio: ${serviceName}`);
    const cotizarEl = document.getElementById('cotizar');
    if (cotizarEl) {
      cotizarEl.scrollIntoView({ behavior: 'smooth' });
      // Disparar evento personalizado para preseleccionar servicio
      window.dispatchEvent(new CustomEvent('orellana_select_service', { detail: serviceName }));
    }
  };

  return (
    <section id="servicios" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de la Sección */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold tracking-wide uppercase">
            Catálogo Integral de Servicios
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Nuestros Servicios & Fabricación a Medida
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Cada pieza se fabrica bajo estrictos estándares de precisión. Selecciona el servicio que requieres para cotizar directamente con nuestro taller.
          </p>
        </div>

        {/* Grilla de 9 Servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_LIST.map((srv) => {
            const IconComponent = srv.icon;
            return (
              <div
                key={srv.id}
                className="group rounded-2xl p-6 sm:p-7 bg-slate-50 hover:bg-white border border-slate-200/90 hover:border-brand-blue/40 shadow-sm hover:shadow-glass-card transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top: Icono y Tag */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-brand-blue text-brand-blue group-hover:text-white border border-slate-200 group-hover:border-brand-blue flex items-center justify-center transition-all duration-300 shadow-sm">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-brand-blue border border-blue-100">
                      {srv.tag}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                      {srv.category}
                    </span>
                    <h3 className="text-xl font-bold text-brand-navy group-hover:text-brand-blue transition-colors mt-0.5">
                      {srv.name}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {srv.description}
                  </p>

                  {/* Lista de características */}
                  <ul className="space-y-2 pt-2 border-t border-slate-200/60">
                    {srv.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-brand-blue flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Botón de Cotizar este servicio */}
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    onClick={() => handleSelectService(srv.name)}
                    data-track={`Cotizar Card ${srv.name}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-white group-hover:bg-brand-blue text-slate-800 group-hover:text-white text-xs sm:text-sm font-semibold border border-slate-200 group-hover:border-transparent transition-all flex items-center justify-center gap-2"
                  >
                    <span>Cotizar este Servicio</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner Inferior de Asesoría */}
        <div className="mt-14 rounded-2xl bg-gradient-to-r from-brand-navy via-slate-900 to-brand-navy p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase tracking-wider text-brand-blue font-bold">¿Tienes un requerimiento especial?</span>
            <h4 className="text-xl sm:text-2xl font-bold">¿No encuentras lo que buscas o necesitas una medida no estándar?</h4>
            <p className="text-sm text-slate-300 max-w-xl">
              Fabricamos estructuras especiales en aluminio, barandas de cristal y corte a medida según plano o visita en terreno.
            </p>
          </div>
          <a
            href="https://wa.me/56992409397?text=Hola%20Vidrier%C3%ADa%20Orellana,%20tengo%20un%20proyecto%20especial%20y%20me%20gustar%C3%ADa%20asesor%C3%ADa."
            target="_blank"
            rel="noopener noreferrer"
            data-track="WhatsApp Especial Banner"
            className="px-6 py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-sm whitespace-nowrap transition-all shadow-md flex items-center gap-2"
          >
            <span>Consultar con un Maestro</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
