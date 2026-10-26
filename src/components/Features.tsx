'use client';

import { ShieldCheck, Clock, Hammer, MapPin, CheckCircle2, Sparkles } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Clock,
      tag: 'Tradición',
      title: 'Más de 30 Años de Oficio',
      description: 'Tres décadas de maestría artesanal y rigor técnico en corte, armado e instalación en Viña del Mar y la V Región. Conocemos a fondo el comportamiento de los materiales ante el clima costero.',
    },
    {
      icon: ShieldCheck,
      tag: 'Seguridad',
      title: 'Materiales 100% Certificados',
      description: 'Trabajamos exclusivamente con perfiles de aluminio y PVC de alta gama y cristales templados con norma de impacto, garantizando máxima durabilidad, aislación y hermeticidad.',
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
      description: 'Asesoría técnica cercana y personalizada. Acudimos a rectificar medidas y evaluar tu espacio en Viña del Mar, Reñaca, Concón, Quilpué y alrededores sin costo.',
    },
  ];

  return (
    <section id="nosotros" className="py-16 sm:py-24 bg-white border-y border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0052CC] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            30 Años de Calidad & Oficio
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            ¿Por qué Elegir Vidriería Orellana?
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Nuestro prestigio en la V Región se fundamenta en tres décadas de palabra empeñada, excelencia en el servicio y la máxima calidad en cada terminación.
          </p>
        </div>

        {/* Grilla de 4 Beneficios de Alto Nivel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="bg-slate-50/50 hover:bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-[#0052CC]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 group-hover:bg-[#0052CC] text-[#0052CC] group-hover:text-white border border-blue-100 group-hover:border-[#0052CC] flex items-center justify-center transition-all duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 font-mono">
                      {f.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-brand-navy group-hover:text-[#0052CC] transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2.5 font-normal">
                      {f.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center gap-1.5 text-xs text-[#0052CC] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0052CC]" />
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
