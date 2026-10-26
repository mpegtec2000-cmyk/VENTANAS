'use client';

import Image from 'next/image';
import { ShieldCheck, Award, Building2, MapPin, CheckCircle2, Sparkles } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Award,
      tag: 'Trayectoria',
      title: 'Más de 30 años de experiencia',
      description: 'Diseñamos, fabricamos e instalamos cierres y estructuras en vidrio, aluminio y PVC, con conocimiento de las condiciones del clima costero de la V Región.',
      commitment: 'Experiencia comprobada',
    },
    {
      icon: ShieldCheck,
      tag: 'Materiales',
      title: 'Perfiles y cristales de calidad',
      description: 'Trabajamos con perfiles de aluminio y PVC, cristales templados y termopaneles (DVH) que aportan aislación térmica y acústica, hermeticidad y seguridad.',
      commitment: 'Calidad en cada componente',
    },
    {
      icon: Building2,
      tag: 'Producción',
      title: 'Fabricación en taller propio',
      description: 'Cortamos y ensamblamos en nuestro taller, lo que nos permite controlar la calidad y cumplir los plazos acordados.',
      commitment: 'Fabricación directa',
    },
    {
      icon: MapPin,
      tag: 'Servicio técnico',
      title: 'Visita técnica y medición en terreno',
      description: 'Un especialista visita tu proyecto, toma las medidas y evalúa la solución más adecuada en Viña del Mar, Reñaca, Concón y el resto de la región.',
      commitment: 'Evaluación gratuita',
    },
  ];

  return (
    <section id="nosotros" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Fondo Fotográfico 1a.jpg sin ningún filtro */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/features-bg.jpg"
          alt="Fachada arquitectónica en cristal Vidriería Orellana"
          fill
          className="object-cover object-center"
          quality={95}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-md border border-blue-100 text-[#0052CC] text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#0052CC]" />
            30 Años de Trayectoria & Excelencia
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            ¿Por qué Elegir Vidriería Orellana?
          </h2>
          <p className="text-sm sm:text-base text-white font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Liderazgo técnico y respaldo profesional en la Región de Valparaíso, combinando manufactura de precisión, materiales de alta gama y atención directa en cada proyecto.
          </p>
        </div>

        {/* Grilla de 4 Beneficios de Alto Nivel con Tarjetas Blancas de Alto Contraste */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="bg-white/95 backdrop-blur-md hover:bg-white rounded-3xl p-6 sm:p-7 border border-white/40 shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 group-hover:bg-[#0F172A] text-[#0052CC] group-hover:text-white border border-blue-100 group-hover:border-[#0F172A] flex items-center justify-center transition-all duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-mono">
                      {f.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0052CC] transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2.5 font-normal">
                      {f.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center gap-1.5 text-xs text-[#0052CC] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0052CC]" />
                  <span>{f.commitment}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
