'use client';

import { useState } from 'react';
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
  Check,
  ShieldCheck,
  SlidersHorizontal
} from 'lucide-react';
import { trackEvent } from '@/lib/tracker';

export interface ServiceItem {
  id: string;
  name: string;
  category: 'ventanas_puertas' | 'templados_balcones' | 'espejos_vitrinas' | 'reparacion_otros';
  categoryLabel: string;
  description: string;
  specs: string[];
  icon: any;
  material: string;
  badge: string;
}

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'ventanas',
    name: 'Ventanas en Aluminio y PVC',
    category: 'ventanas_puertas',
    categoryLabel: 'Especialidad Principal',
    description: 'Fabricación de ventanas correderas, proyectantes, oscilobatientes y de paño fijo. Perfilería reforzada con opción de termopanel (DVH) aislante térmico y acústico.',
    specs: ['Línea Europea 25, 42 y PVC soldado', 'Aislación termoacústica para zona costera', 'Cierres herméticos multipunto de seguridad'],
    icon: AppWindow,
    material: 'Aluminio & PVC',
    badge: 'Alta Demanda',
  },
  {
    id: 'puertas',
    name: 'Puertas de Vidrio & Aluminio',
    category: 'ventanas_puertas',
    categoryLabel: 'Accesos & Estructuras',
    description: 'Puertas batientes y correderas para accesos principales, cocinas, logias y salidas a terrazas. Gran resistencia mecánica y finas terminaciones en perfiles.',
    specs: ['Marcos anticorrosivos de alta durabilidad', 'Cerraduras embutidas y bisagras de alto tráfico', 'Vidrios laminados de seguridad o templados'],
    icon: DoorClosed,
    material: 'Aluminio Anodizado',
    badge: 'Resistente',
  },
  {
    id: 'shower_door',
    name: 'Shower Door en Cristal Templado',
    category: 'templados_balcones',
    categoryLabel: 'Baños & Confort',
    description: 'Mamparas y puertas de ducha a medida en cristal templado de seguridad de 8mm. Evita filtraciones de agua y aporta máxima amplitud visual a tu baño.',
    specs: ['Cristal templado de seguridad certificado', 'Herrajes en acero inoxidable satinado o negro', 'Sistemas correderos suspendidos o abatibles'],
    icon: Bath,
    material: 'Cristal 8-10mm',
    badge: 'Elegancia',
  },
  {
    id: 'cierre_balcon',
    name: 'Cierre de Balcón y Terrazas',
    category: 'templados_balcones',
    categoryLabel: 'Espacios Exteriores',
    description: 'Cerramientos panorámicos que protegen tu balcón del viento, la brisa marina y el frío, convirtiendo tu terraza en un espacio utilizable los 365 días del año.',
    specs: ['Hojas corredizas de suave deslizamiento', 'Máxima visibilidad panorámica sin marcos gruesos', 'Sellado perimetral contra lluvia y humedad'],
    icon: Building2,
    material: 'Cristal & Aluminio',
    badge: 'Protección',
  },
  {
    id: 'espejos',
    name: 'Espejos Biselados y Retroiluminados',
    category: 'espejos_vitrinas',
    categoryLabel: 'Decoración & Amplitud',
    description: 'Corte y pulido de espejos de primera calidad con cantos pulidos, biselados finos y tecnología de retroiluminación LED cálida o fría para baños y salones.',
    specs: ['Espejos de 4mm y 5mm sin distorsión', 'Biselados de precisión y cantos pulidos', 'Muros completos para gimnasios y dormitorios'],
    icon: Sparkles,
    material: 'Cristal Belga / Nacional',
    badge: 'Diseño',
  },
  {
    id: 'bow_window',
    name: 'Bow Window Panorámico',
    category: 'ventanas_puertas',
    categoryLabel: 'Arquitectura Residencial',
    description: 'Ventanas mirador salientes en arco o ángulo que maximizan la entrada de luz natural y amplían la sensación espacial de tu living o dormitorio.',
    specs: ['Estructura angular reforzada milimétrica', 'Termopanel acústico de alta eficiencia', 'Acabados limpios que realzan la fachada'],
    icon: Maximize,
    material: 'Aluminio & PVC',
    badge: 'Arquitectónico',
  },
  {
    id: 'vitrinas',
    name: 'Vitrinas Comerciales y Exhibidores',
    category: 'espejos_vitrinas',
    categoryLabel: 'Comercial & Locales',
    description: 'Vitrinas de exhibición segura para locales comerciales, farmacias, joyerías y centros de atención en Viña del Mar y Valparaíso.',
    specs: ['Estructuras de aluminio de alta resistencia', 'Cerraduras de seguridad y puertas correderas', 'Repisas de cristal pulido de alto grosor'],
    icon: Store,
    material: 'Aluminio & Vidrio',
    badge: 'Comercial',
  },
  {
    id: 'celosias',
    name: 'Celosías de Ventilación',
    category: 'ventanas_puertas',
    categoryLabel: 'Control de Ventilación',
    description: 'Sistemas de celosías de aluminio fijas o regulables para logias, baños y sectores que requieren renovación constante de aire sin ingreso de lluvia.',
    specs: ['Aluminio inalterable a la oxidación marina', 'Flujo de aire continuo y controlado', 'Opciones con mosquitero o malla protectora'],
    icon: Wind,
    material: 'Aluminio 100%',
    badge: 'Funcional',
  },
  {
    id: 'reparaciones',
    name: 'Reparación y Mantención en General',
    category: 'reparacion_otros',
    categoryLabel: 'Servicio Técnico en Terreno',
    description: 'Atención rápida para cambio de vidrios rotos, reposición de felpas gastadas, cambio de rodamientos de correderas y sellado con silicona neutra.',
    specs: ['Visita técnica rápida en Viña del Mar', 'Repuestos de quincallería y herrajes originales', 'Alineación y calibración de hojas descolgadas'],
    icon: Wrench,
    material: 'Servicio en Terreno',
    badge: 'Respuesta Rápida',
  },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredServices = activeCategory === 'all'
    ? SERVICES_LIST
    : SERVICES_LIST.filter((s) => s.category === activeCategory);

  const handleSelectService = (serviceName: string) => {
    trackEvent('cta_click', `Servicio: ${serviceName}`);
    const cotizarEl = document.getElementById('cotizar');
    if (cotizarEl) {
      cotizarEl.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('orellana_select_service', { detail: serviceName }));
    }
  };

  return (
    <section id="servicios" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado Principal */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-brand-blue text-xs font-bold uppercase tracking-wider">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Catálogo Integral de Fabricación
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            Nuestros Servicios Especializados
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Fabricamos e instalamos cada estructura con perfiles y cristales de primera calidad bajo estrictas normas de seguridad.
          </p>
        </div>

        {/* Pestañas de Filtro Interactivo */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {[
            { id: 'all', label: 'Todos los Servicios (9)' },
            { id: 'ventanas_puertas', label: 'Ventanas & Puertas' },
            { id: 'templados_balcones', label: 'Templados & Balcones' },
            { id: 'espejos_vitrinas', label: 'Espejos & Vitrinas' },
            { id: 'reparacion_otros', label: 'Reparaciones & Otros' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-brand-navy text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grilla de Servicios Mejorada */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredServices.map((srv) => {
            const IconComponent = srv.icon;
            return (
              <div
                key={srv.id}
                className="group rounded-3xl p-6 sm:p-7 bg-card-gradient hover:bg-white border border-slate-200/90 hover:border-brand-blue/40 shadow-card hover:shadow-glass-card-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Bar de la Tarjeta */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50/80 group-hover:bg-brand-blue text-brand-blue group-hover:text-white border border-blue-100 group-hover:border-brand-blue flex items-center justify-center transition-all duration-300 shadow-sm">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-brand-blue border border-blue-100">
                      {srv.badge}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      {srv.categoryLabel}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-brand-navy group-hover:text-brand-blue transition-colors mt-0.5">
                      {srv.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {srv.description}
                  </p>

                  {/* Especificaciones Técnicas */}
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    {srv.specs.map((spec, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-brand-blue flex-shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer de la Tarjeta */}
                <div className="pt-5 mt-5 border-t border-slate-100/90 flex items-center justify-between gap-3">
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                    {srv.material}
                  </span>

                  <button
                    onClick={() => handleSelectService(srv.name)}
                    data-track={`Cotizar Card ${srv.name}`}
                    className="py-2 px-3.5 rounded-xl bg-white group-hover:bg-brand-blue text-brand-navy group-hover:text-white text-xs font-bold border border-slate-200 group-hover:border-transparent transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Cotizar</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner Inferior de Asesoría Especial */}
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-brand-navy via-slate-900 to-brand-navy p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left z-10">
            <span className="text-xs uppercase tracking-wider text-brand-cyan font-bold flex items-center justify-center md:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Asesoría Técnica Especializada
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">¿Tienes un proyecto arquitectónico a medida?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Fabricamos cerramientos especiales, barandas de cristal templado, bow windows personalizados y corte a medida según plano técnico.
            </p>
          </div>
          <a
            href="https://wa.me/56992409397?text=Hola%20Vidrier%C3%ADa%20Orellana,%20tengo%20un%20proyecto%20especial%20y%20necesito%20asesor%C3%ADa."
            target="_blank"
            rel="noopener noreferrer"
            data-track="WhatsApp Especial Banner"
            className="px-6 py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold text-sm whitespace-nowrap transition-all shadow-md flex items-center gap-2 z-10"
          >
            <span>Consultar con un Maestro</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
