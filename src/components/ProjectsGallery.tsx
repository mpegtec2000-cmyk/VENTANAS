'use client';

import { useState } from 'react';
import { Camera, MapPin, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { trackEvent } from '@/lib/tracker';

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  location: string;
  material: string;
  highlight: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Ventanas Termopanel PVC Aislante',
    category: 'Ventanas',
    location: 'Reñaca, Viña del Mar',
    material: 'PVC Blanco Termofusionado + DVH 4-12-4',
    highlight: 'Aislación térmica total contra brisa marina',
  },
  {
    id: 'proj-2',
    title: 'Cierre de Balcón y Terraza Vista Libre',
    category: 'Balcones',
    location: 'Sector 5, Reñaca',
    material: 'Cristal Templado 8mm + Rieles Aluminio',
    highlight: 'Hojas correderas herméticas de fácil limpieza',
  },
  {
    id: 'proj-3',
    title: 'Shower Door Esmerilado a Medida',
    category: 'Shower Door',
    location: 'Concón',
    material: 'Cristal Templado 8mm + Acero Inox 316',
    highlight: 'Cierre magnético hermético sin filtraciones',
  },
  {
    id: 'proj-4',
    title: 'Espejo Mural de Gran Formato con LED',
    category: 'Espejos',
    location: 'Viña del Mar Centro',
    material: 'Cristal 5mm Biselado + Tira LED 3000K',
    highlight: 'Borde pulido con corte milimétrico en taller',
  },
  {
    id: 'proj-5',
    title: 'Bow Window Panorámico Residencial',
    category: 'Bow Window',
    location: 'Miraflores, Viña del Mar',
    material: 'Aluminio Línea Europea Titanio',
    highlight: 'Estructura angular reforzada de alta resistencia',
  },
  {
    id: 'proj-6',
    title: 'Puertas y Ventanales de Acceso',
    category: 'Puertas',
    location: 'Achupallas, Viña del Mar',
    material: 'Aluminio Negro Mate + Vidrio Laminado',
    highlight: 'Cerraduras de seguridad y bisagras de alto tráfico',
  },
];

export default function ProjectsGallery() {
  const [filter, setFilter] = useState('Todos');

  const categories = ['Todos', 'Ventanas', 'Balcones', 'Shower Door', 'Espejos'];

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
            Galería de Trabajos Realizados
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            Nuestros Trabajos en Viña del Mar y la V Región
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Cada instalación refleja nuestro compromiso con las terminaciones limpias, la durabilidad y la satisfacción de cada familia y empresa.
          </p>
        </div>

        {/* Filtros de la Galería */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === cat
                  ? 'bg-brand-blue text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grilla de Proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-glass-card-hover transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Tarjeta Visual Decorativa de Simulación Arquitectónica */}
              <div className="h-48 bg-gradient-to-br from-brand-navy via-brand-navy-card to-slate-900 p-6 flex flex-col justify-between relative overflow-hidden text-white">
                <div className="absolute inset-0 bg-blueprint-dark opacity-40 pointer-events-none" />
                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-brand-blue/20 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-brand-cyan">
                    {p.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-300 font-medium">
                    <MapPin className="w-3 h-3 text-brand-blue" />
                    {p.location}
                  </span>
                </div>

                <div className="z-10 space-y-1">
                  <div className="text-xs text-brand-ice font-semibold">Proyecto Entregado</div>
                  <h3 className="text-base font-bold text-white group-hover:text-brand-cyan transition-colors">
                    {p.title}
                  </h3>
                </div>
              </div>

              {/* Contenido Descriptivo */}
              <div className="p-5 sm:p-6 space-y-4">
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 font-bold block uppercase text-[10px]">Materiales Utilizados:</span>
                    <span className="font-semibold text-slate-800">{p.material}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-emerald-700 bg-emerald-50 p-2 rounded-xl border border-emerald-100 font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{p.highlight}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => handleQuoteSimilar(p.title)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-brand-blue text-slate-700 hover:text-white font-bold text-xs border border-slate-200 hover:border-transparent transition-all flex items-center justify-center gap-2 group-hover:bg-brand-blue group-hover:text-white"
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
