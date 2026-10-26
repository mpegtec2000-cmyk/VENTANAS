'use client';

import { ShieldCheck, Clock, Hammer, MapPin, Award, CheckCircle2, Sparkles } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Clock,
      tag: 'Tradición',
      title: 'Más de 20 Años de Oficio',
      description: 'Décadas de experiencia comprobada en corte, armado e instalación en Viña del Mar y la V Región. Conocemos a fondo el comportamiento de los materiales ante el clima costero.',
    },
    {
      icon: ShieldCheck,
      tag: 'Seguridad',
      title: 'Materiales 100% Certificados',
      description: 'Trabajamos exclusivamente con perfiles de aluminio y PVC de alta gama y cristales templados con norma de impacto, garantizando máxima durabilidad y hermeticidad.',
    },
    {
      icon: Hammer,
      tag: 'Fabricación',
      title: 'Taller Propio en Achupallas',
      description: 'Sin intermediarios ni demoras externas. Fabricamos y ensamblamos cada ventana y estructura en nuestro propio taller, asegurando tolerancias milimétricas y precios justos.',
    },
    {
      icon: MapPin,
      tag: 'Cercanía',
      title: 'Atención Directa en Terreno',
      description: 'Asesoría cercana y personalizada. Acudimos a rectificar medidas y evaluar tu espacio en Viña del Mar, Reñaca, Concón, Quilpué y alrededores.',
    },
  ];

  return (
    <section id="nosotros" className="py-16 sm:py-24 bg-white border-y border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-brand-blue text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            El Sello Orellana
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            ¿Por qué Elegir Vidriería Orellana?
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Nuestro prestigio se fundamenta en la palabra empeñada, la puntualidad en los plazos y la calidad irreprochable de cada entrega.
          </p>
        </div>

        {/* Grilla de 4 Beneficios de Alto Nivel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="bg-card-gradient hover:bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 hover:border-brand-blue/30 shadow-card hover:shadow-glass-card-hover transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 group-hover:bg-brand-blue text-brand-blue group-hover:text-white border border-blue-100 group-hover:border-brand-blue flex items-center justify-center transition-all duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {f.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2 font-normal">
                      {f.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-brand-blue font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue" />
                  <span>Compromiso de Calidad</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
