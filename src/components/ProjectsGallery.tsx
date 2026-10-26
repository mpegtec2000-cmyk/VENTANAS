'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Camera, MapPin, CheckCircle, ArrowRight, Sparkles, ZoomIn } from 'lucide-react';
import { trackEvent } from '@/lib/tracker';

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  location: string;
  material: string;
  highlight: string;
  image: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Ventanas Termopanel PVC Aislante',
    category: 'Ventanas',
    location: 'Reñaca, Viña del Mar',
    material: 'PVC Termofusionado + DVH 4-12-4 Hermético',
    highlight: 'Aislación térmica total contra el viento y frío marino',
    image: '/images/ventanas-pvc.jpg',
  },
  {
    id: 'proj-2',
    title: 'Cierre de Balcón y Terraza Vista Libre',
    category: 'Balcones',
    location: 'Sector 5, Reñaca',
    material: 'Cristal Templado 8mm + Rieles de Aluminio Anodizado',
    highlight: 'Hojas correderas panorámicas sin perfiles que corten la vista',
    image: '/images/cierre-balcon.jpg',
  },
  {
    id: 'proj-3',
    title: 'Shower Door en Cristal Templado',
    category: 'Shower Door',
    location: 'Concón',
    material: 'Cristal Templado 8mm + Herrajes Acero Inoxidable 316',
    highlight: 'Cierre magnético hermético con sellos de silicona neutra',
    image: '/images/shower-door.jpg',
  },
  {
    id: 'proj-4',
    title: 'Fachadas Vidriadas y Bow Windows',
    category: 'Ventanas',
    location: 'Costa de Viña del Mar',
    material: 'Línea Europea 42 + Cristales de Control Solar',
    highlight: 'Máximo ingreso de luz natural con resistencia al salitre',
    image: '/images/hero-web.jpg',
  },
  {
    id: 'proj-5',
    title: 'Muros Cortina y Barandas de Cristal',
    category: 'Balcones',
    location: 'Miraflores, Viña del Mar',
    material: 'Cristal Laminado de Seguridad 10mm + Botones de Acero',
    highlight: 'Seguridad perimetral certificada para altura',
    image: '/images/hero-mobile.jpg',
  },
];

export default function ProjectsGallery() {
  const [filter, setFilter] = useState('Todos');

  const categories = ['Todos', 'Ventanas', 'Balcones', 'Shower Door'];

  const filteredProjects = filter === 'Todos'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter);

  const handleQuoteSimilar = (projectTitle: string) => {
    trackEvent('cta_click', `Galeria Proyecto: ${projectTitle}`);
    const cotizarEl = document.getElementById('cotizar');
    if (cotizarEl) {
      cotizarEl.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('orellana_select_service', { detail: projectTitle }));
    }
  };

  return (
    <section id="galeria" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-brand-blue text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            Galería Fotográfica de Trabajos Realizados
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            Nuestros Trabajos en Viña del Mar y la V Región
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Fotografías reales de obras fabricadas e instaladas por nuestros maestros en departamentos, residencias y locales comerciales.
          </p>
        </div>

        {/* Filtros de la Galería */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                filter === cat
                  ? 'bg-brand-navy text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grilla de Proyectos Fotográficos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-card hover:shadow-glass-card-hover transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Contenedor Fotográfico */}
              <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-slate-900">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-white z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20 text-brand-cyan">
                    {p.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-md text-white font-medium border border-white/10">
                    <MapPin className="w-3 h-3 text-brand-cyan" />
                    {p.location}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 z-10">
                  <h3 className="text-base font-bold text-white group-hover:text-brand-cyan transition-colors">
                    {p.title}
                  </h3>
                </div>
              </div>

              {/* Contenido Descriptivo */}
              <div className="p-5 sm:p-6 space-y-4">
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 font-bold block uppercase text-[10px] tracking-wider">
                      Materiales Utilizados:
                    </span>
                    <span className="font-bold text-slate-800">{p.material}</span>
                  </div>
                  
                  <div className="flex items-start gap-1.5 text-emerald-800 bg-emerald-50 p-2.5 rounded-2xl border border-emerald-100 font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{p.highlight}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => handleQuoteSimilar(p.title)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-brand-blue text-brand-navy hover:text-white font-bold text-xs border border-slate-200 hover:border-transparent transition-all flex items-center justify-center gap-2 group-hover:bg-brand-blue group-hover:text-white shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-brand-blue group-hover:text-white transition-colors" />
                    <span>Cotizar un proyecto similar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
