'use client';

import Image from 'next/image';
import { 
  ShieldCheck, 
  ArrowRight, 
  MessageCircle, 
  VolumeX, 
  ThermometerSnowflake, 
  Ruler
} from 'lucide-react';
import { trackEvent } from '@/lib/tracker';

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-[75vh] lg:min-h-[82vh] flex items-center overflow-hidden bg-slate-900 border-b border-slate-200">
      
      {/* Fondo Fotográfico Real y Limpio */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/hero-mobile.jpg" />
          <Image
            src="/images/hero-web.jpg"
            alt="Arquitectura en Vidrio y Aluminio Orellana en Viña del Mar"
            fill
            className="object-cover object-center sm:object-right-top"
            priority
            quality={95}
          />
        </picture>

        {/* Sombra de contraste arquitectónica limpia */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/75 to-transparent lg:w-3/5" />
        <div className="absolute inset-0 bg-black/15" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Columna Izquierda: Tipografía Corporativa y Limpia */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            {/* Pill Badge Oficial */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-xs font-semibold text-slate-200 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#0052CC]" />
              <span className="font-bold text-white">Calidad & Tradición</span>
              <span className="text-white/30">•</span>
              <span>Achupallas, Viña del Mar</span>
            </div>

            {/* Titular Principal: Tipografía Sobria y Profesional (No IA) */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.18]">
              Fabricación de Ventanas en <span className="text-[#3880FF] font-extrabold">Aluminio & PVC</span> a tu Medida
            </h1>

            {/* Redacción Clara y Concisa */}
            <p className="text-sm sm:text-base text-slate-200 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Aislación térmica, reducción de ruidos y estructuras herméticas de precisión para tu hogar o empresa. Especialistas en termopaneles, shower doors y cierres de balcón en Viña del Mar.
            </p>

            {/* Beneficios en Línea con Tipografía Limpia */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1 text-xs text-slate-200 font-medium">
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15">
                <ThermometerSnowflake className="w-4 h-4 text-[#3880FF]" />
                <span>Termopanel Aislante</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15">
                <VolumeX className="w-4 h-4 text-[#3880FF]" />
                <span>Control de Ruido</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15">
                <Ruler className="w-4 h-4 text-[#3880FF]" />
                <span>Medición en Terreno</span>
              </div>
            </div>

            {/* Botones de Acción Principales */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-3">
              <a
                href="#cotizar"
                data-track="Cotizar Hero CTA"
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#0052CC] hover:bg-[#0040A8] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                <span>Cotizar Presupuesto</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://wa.me/56992409397?text=Hola%20Vidrier%C3%ADa%20Orellana,%20necesito%20cotizar%20un%20proyecto."
                target="_blank"
                rel="noopener noreferrer"
                data-track="WhatsApp Hero Direct"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Hablar por WhatsApp</span>
              </a>
            </div>

            {/* Garantía al pie */}
            <div className="pt-2 text-xs text-slate-300 flex items-center justify-center lg:justify-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Garantía de instalación y fabricación directa en taller</span>
            </div>

          </div>

          {/* Columna Derecha: Tarjeta Fotográfica de Ficha Técnica */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="bg-slate-950/85 backdrop-blur-xl rounded-3xl p-4 border border-white/20 shadow-2xl text-white space-y-3">
              <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-inner">
                <Image
                  src="/images/ventanas-pvc.jpg"
                  alt="Ventanal Termopanel PVC"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[11px] font-bold bg-[#0052CC] px-2.5 py-1 rounded-lg">
                    Termopanel DVH 4-12-4
                  </span>
                  <span className="text-xs font-semibold text-slate-200">
                    Aislación Acústica & Térmica
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300 px-1 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Fabricación propia
                </span>
                <span className="font-bold text-white">Achupallas, Viña del Mar</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
