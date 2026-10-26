'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { trackEvent } from '@/lib/tracker';

export interface ProjectCard {
  id: string;
  title: string;
  category: 'todos' | 'residencial' | 'cristal' | 'comercial';
  categoryLabel: string;
  description: string;
  image: string;
  serviceCategory: string;
  badge?: string;
}

export const PROJECTS_LIST: ProjectCard[] = [
  {
    id: 'ventanas-aluminio',
    title: 'Ventanas de Aluminio',
    category: 'residencial',
    categoryLabel: 'Línea Residencial',
    description: 'Fabricación e instalación de ventanales en aluminio anodizado y electropintado.',
    image: '/images/user-6.jpg',
    serviceCategory: 'Ventanas en Aluminio y PVC',
    badge: 'Alta Demanda',
  },
  {
    id: 'trabajos-pvc',
    title: 'Trabajos en PVC & DVH',
    category: 'residencial',
    categoryLabel: 'Termopanel Alemán',
    description: 'Aislación térmica y acústica superior con perfilería de alta eficiencia.',
    image: '/images/user-2.jpg',
    serviceCategory: 'Ventanas en Aluminio y PVC',
    badge: 'Ahorro Térmico',
  },
  {
    id: 'cierres-comerciales',
    title: 'Cierres Comerciales',
    category: 'comercial',
    categoryLabel: 'Comercial & Retail',
    description: 'Vidrios de seguridad y perfilería de aluminio para vitrinas y locales.',
    image: '/images/user-7.jpg',
    serviceCategory: 'Vitrinas Comerciales',
    badge: 'Seguridad',
  },
  {
    id: 'shower-door',
    title: 'Shower Door a Medida',
    category: 'cristal',
    categoryLabel: 'Cristal Templado',
    description: 'Cristales templados de 8mm y 10mm con herrajes de acero inoxidable.',
    image: '/images/user-3.jpg',
    serviceCategory: 'Shower Door a Medida',
    badge: 'Elegancia',
  },
  {
    id: 'barandas-cristal',
    title: 'Barandas de Cristal & Inox',
    category: 'cristal',
    categoryLabel: 'Seguridad & Vista',
    description: 'Barandas de cristal templado y laminado con balaustres en acero inoxidable.',
    image: '/images/user-5.jpg',
    serviceCategory: 'Reparación en General y Otros',
    badge: 'Vanguardia',
  },
  {
    id: 'divisiones-oficina',
    title: 'Divisiones de Oficina',
    category: 'comercial',
    categoryLabel: 'Espacios Corporativos',
    description: 'Muros vidriados panorámicos para salas de reuniones y oficinas modernas.',
    image: '/images/user-4.jpg',
    serviceCategory: 'Vitrinas Comerciales',
    badge: 'Corporativo',
  },
  {
    id: 'cierres-terraza',
    title: 'Cierres de Terraza & Balcón',
    category: 'residencial',
    categoryLabel: 'Espacios Habitables',
    description: 'Aprovecha tu balcón todo el año, protegiendo del viento costero y la lluvia.',
    image: '/images/user-6.jpg',
    serviceCategory: 'Cierre de Balcón y Terrazas',
    badge: 'Costero',
  },
  {
    id: 'fachadas-arquitectonicas',
    title: 'Fachadas & Ventanales',
    category: 'cristal',
    categoryLabel: 'Arquitectura Mayor',
    description: 'Soluciones estructurales en vidrio para casas de alto estándar y edificios.',
    image: '/images/user-1.jpg',
    serviceCategory: 'Bow Window Panorámico',
    badge: 'Gran Escala',
  },
  {
    id: 'espejos-medida',
    title: 'Espejos a Medida & Biselados',
    category: 'residencial',
    categoryLabel: 'Decoración & Baños',
    description: 'Espejos de cristal flotado de alta pureza, bordes pulidos y biselados.',
    image: '/images/espejos-medida.jpg',
    serviceCategory: 'Espejos Biselados y LED',
  },
  {
    id: 'cierres-logias',
    title: 'Cierres de Logia & Celosías',
    category: 'residencial',
    categoryLabel: 'Ventilación & Protección',
    description: 'Control de ventilación y protección climática para zonas de lavado.',
    image: '/images/cierre-logia.jpg',
    serviceCategory: 'Celosías de Ventilación',
  },
  {
    id: 'puertas-acceso',
    title: 'Puertas de Vidrio Templado',
    category: 'cristal',
    categoryLabel: 'Accesos & Portería',
    description: 'Puertas batientes con quicio hidráulico para accesos principales de alto flujo.',
    image: '/images/user-4.jpg',
    serviceCategory: 'Puertas de Vidrio & Aluminio',
  },
  {
    id: 'vitrinas-locales',
    title: 'Vitrinas para Negocios',
    category: 'comercial',
    categoryLabel: 'Fachadas Retail',
    description: 'Instalaciones rápidas para renovación y apertura de puntos comerciales.',
    image: '/images/user-7.jpg',
    serviceCategory: 'Vitrinas Comerciales',
  },
];

const FILTER_TABS = [
  { key: 'todos', label: 'Todos los Proyectos (12)' },
  { key: 'residencial', label: 'Hogar & Balcones (5)' },
  { key: 'cristal', label: 'Cristal Templado (4)' },
  { key: 'comercial', label: 'Comercial & Oficinas (3)' },
] as const;

export default function ProjectsGallery() {
  const [activeTab, setActiveTab] = useState<'todos' | 'residencial' | 'cristal' | 'comercial'>('todos');

  const filteredProjects = activeTab === 'todos' 
    ? PROJECTS_LIST 
    : PROJECTS_LIST.filter(p => p.category === activeTab);

  const handleSelectService = (serviceName: string, projectTitle: string) => {
    trackEvent('cta_click', `Galeria Card: ${projectTitle} (${serviceName})`);
    const cotizarEl = document.getElementById('cotizar');
    if (cotizarEl) {
      cotizarEl.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('orellana_select_service', { detail: serviceName }));
    }
  };

  return (
    <section id="galeria" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Fondo Fotográfico 1aa.jpg */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/1aa.jpg"
          alt="Galería de Proyectos Vidriería Orellana"
          fill
          className="object-cover object-center"
          quality={95}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Encabezado Principal */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-md border border-blue-100 text-[#0052CC] text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#0052CC]" />
            Catálogo Fotográfico de Obras Reales
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Nuestros Proyectos & Especialidades
          </h2>
          <p className="text-sm sm:text-base text-white font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Fotografías directas de nuestras soluciones en aluminio, PVC y cristales de seguridad instaladas en Viña del Mar y la V Región.
          </p>
        </div>

        {/* Filtros de Categorías */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {FILTER_TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  trackEvent('filter_click', `Galeria Tab: ${tab.label}`);
                }}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 shadow-sm ${
                  isActive
                    ? 'bg-[#0052CC] text-white shadow-blue-500/20'
                    : 'bg-white/95 text-slate-800 hover:bg-white border border-white/60 shadow-sm'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Grilla de 12 Tarjetas Fotográficas (4 Columnas x 3 Filas) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredProjects.map((item) => (
            <div
              key={item.id}
              className="relative h-[390px] sm:h-[410px] rounded-3xl overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-end bg-slate-900 border border-white/30"
            >
              {/* Imagen Fotográfica Real */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              {/* Sombra Degradada Arquitectónica */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent pointer-events-none" />

              {/* Badge superior si existe */}
              {item.badge && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-white/20 backdrop-blur-md border border-white/30 text-white px-2.5 py-1 rounded-full shadow-sm">
                    {item.badge}
                  </span>
                </div>
              )}

              {/* Categoría superior */}
              <div className="absolute top-4 left-4 z-10">
                <span className="text-[10px] font-bold tracking-wider text-blue-200 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  {item.categoryLabel}
                </span>
              </div>

              {/* Contenido de la Tarjeta */}
              <div className="relative z-10 p-5 sm:p-6 space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  {item.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                  {item.description}
                </p>

                {/* Botón Ver Servicio con Flecha */}
                <div className="pt-2">
                  <button
                    onClick={() => handleSelectService(item.serviceCategory, item.title)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/20 hover:bg-[#0052CC] backdrop-blur-md border border-white/30 hover:border-[#0052CC] text-white text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm group/btn"
                  >
                    <span>Cotizar este servicio</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Footer de la Galería con Llamado a Taller */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <h4 className="text-base font-bold text-brand-navy flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0052CC]" />
              ¿Tienes un diseño o plano arquitectónico personalizado?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Fabricamos estructuras especiales en cristal laminado, templado, termopanel y perfilería de aluminio a medida.
            </p>
          </div>
          <a
            href="https://wa.me/56992409397?text=Hola,%20tengo%20un%20proyecto%20especial%20y%20deseo%20asesor%C3%ADa%20técnica."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-[#0052CC] hover:bg-[#0040A8] text-white text-xs sm:text-sm font-bold shadow-md transition-all whitespace-nowrap flex items-center gap-2"
          >
            <span>Enviar Planos por WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
