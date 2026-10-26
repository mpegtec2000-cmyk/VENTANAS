'use client';

import { MessageSquareText, Compass, Cog, CheckCheck } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      number: '01',
      icon: MessageSquareText,
      title: 'Contacto y Asesoría',
      description: 'Envías tus medidas o requerimiento vía web o WhatsApp. Te orientamos sobre el mejor tipo de vidrio, aluminio o PVC.',
    },
    {
      number: '02',
      icon: Compass,
      title: 'Rectificación de Medidas',
      description: 'Si tu proyecto lo requiere, coordinamos una visita técnica para tomar medidas exactas y definir detalles de anclaje.',
    },
    {
      number: '03',
      icon: Cog,
      title: 'Fabricación a Medida',
      description: 'En nuestro taller procesamos los perfiles y cristales con maquinaria especializada, asegurando cortes limpios y cierres herméticos.',
    },
    {
      number: '04',
      icon: CheckCheck,
      title: 'Instalación y Garantía',
      description: 'Nuestros maestros realizan la instalación en tu domicilio, aplicando sellos de alta durabilidad y dejando todo limpio y operativo.',
    },
  ];

  return (
    <section id="proceso" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">
            Metodología Transparente
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Cómo Trabajamos tu Proyecto
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Un proceso claro y sin sorpresas desde el primer contacto hasta la entrega final de tu trabajo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-navy text-white flex items-center justify-center font-bold text-lg shadow-md">
                    {step.number}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-brand-navy">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
