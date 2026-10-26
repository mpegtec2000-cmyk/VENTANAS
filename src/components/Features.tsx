'use client';

import { Shield, Sparkles, Clock, Hammer, CheckCircle, MapPin } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Clock,
      title: 'Tradición y Oficio Comprobado',
      description: 'Más de dos décadas perfeccionando el arte del vidrio y el aluminio en la V Región. Conocemos al detalle las necesidades del clima costero.',
    },
    {
      icon: Shield,
      title: 'Materiales Certificados y Duraderos',
      description: 'Trabajamos únicamente con perfiles de aluminio y PVC de alta gama, y cristales templados con norma de seguridad que resisten el paso de los años.',
    },
    {
      icon: Hammer,
      title: 'Fabricación Propia en Taller',
      description: 'Cortamos, ensamblamos y revisamos cada ventana y estructura en nuestro propio taller en Achupallas, garantizando tolerancias milimétricas.',
    },
    {
      icon: MapPin,
      title: 'Presencia Local en Viña del Mar',
      description: 'Atención cercana y respuesta rápida. Estamos ubicados estratégicamente para acudir a mediciones e instalaciones en toda la zona costera.',
    },
  ];

  return (
    <section id="nosotros" className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">
            El Sello Orellana
          </span>
          <h2 className="text-3xl font-extrabold text-brand-navy tracking-tight">
            ¿Por qué Confiar en Vidriería Orellana?
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Nuestra reputación se basa en la seriedad en los plazos, la calidad de nuestros materiales y la dedicación a cada cliente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center font-bold">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-navy">
                    {f.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {f.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-brand-blue font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" />
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
