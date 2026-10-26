'use client';

import Image from 'next/image';
import { 
  Shield, 
  Award, 
  Ruler, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  Sparkles, 
  VolumeX, 
  ThermometerSnowflake, 
  Layers
} from 'lucide-react';
import { trackEvent } from '@/lib/tracker';

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden bg-slate-900 border-b border-slate-200">
      
      {/* Fondo Limpio: Fotografía Arquitectónica Real sin filtros de cuadros */}
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

        {/* Gradiente sutil y limpio solo para garantizar legibilidad del texto sin teñir de azul */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-transparent lg:w-3/5" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Tarjeta de Contenido Principal Limpia */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge Oficial */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-bold text-white shadow-lg">
              <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse"></span>
              <span className="text-white">Calidad y Tradición</span>
              <span className="text-white/40">•</span>
              <span className="text-slate-300 font-medium">Taller en Achupallas, Viña del Mar</span>
            </div>

            {/* Titular Principal */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.12] drop-shadow-md">
              Fabricación de Ventanas en <span className="text-brand-blue">Aluminio & PVC</span> a tu Medida
            </h1>

            {/* Bajada Comercial */}
            <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed drop-shadow">
              En <strong className="text-white font-bold">Orellana - Vidrios & Aluminios</strong> llevamos más de dos décadas equipando hogares y empresas en la V Región. Especialistas en <span className="text-white font-semibold underline decoration-brand-blue decoration-2 underline-offset-4">ventanas con termopanel aislante (DVH)</span>, cierres de balcón, shower doors y estructuras herméticas.
            </p>

            {/* Checklist Técnico de 4 Pilares con Iconos Limpios */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-white">
              <div className="flex items-center gap-2.5 bg-slate-900/75 backdrop-blur-md p-3 rounded-2xl border border-white/15">
                <ThermometerSnowflake className="w-5 h-5 text-brand-blue flex-shrink-0" />
                <span className="font-semibold">Termopanel Aislante Térmico</span>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-900/75 backdrop-blur-md p-3 rounded-2xl border border-white/15">
                <VolumeX className="w-5 h-5 text-brand-blue flex-shrink-0" />
                <span className="font-semibold">Reducción Acústica Certificada</span>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-900/75 backdrop-blur-md p-3 rounded-2xl border border-white/15">
                <Shield className="w-5 h-5 text-brand-blue flex-shrink-0" />
                <span className="font-semibold">Cristal Templado 8-10mm</span>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-900/75 backdrop-blur-md p-3 rounded-2xl border border-white/15">
                <Layers className="w-5 h-5 text-brand-blue flex-shrink-0" />
                <span className="font-semibold">Línea Europea & PVC Soldado</span>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#cotizar"
                data-track="Cotizar Hero CTA"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold text-sm sm:text-base shadow-xl shadow-brand-blue/30 transition-all duration-300 flex items-center justify-center gap-2.5 group transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Solicitar Presupuesto Gratuito</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://wa.me/56992409397?text=Hola%20Vidrier%C3%ADa%20Orellana,%20necesito%20cotizar%20un%20proyecto."
                target="_blank"
                rel="noopener noreferrer"
                data-track="WhatsApp Hero Direct"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5"
              >
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Hablar por WhatsApp</span>
              </a>
            </div>

            {/* Badges Inferiores de Confianza */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 font-medium drop-shadow">
                <Award className="w-4 h-4 text-brand-blue" />
                Más de 20 Años de Oficio
              </span>
              <span className="flex items-center gap-1.5 font-medium drop-shadow">
                <Ruler className="w-4 h-4 text-brand-blue" />
                Medición Precisa en Terreno
              </span>
              <span className="flex items-center gap-1.5 font-medium drop-shadow">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Garantía Orellana
              </span>
            </div>

          </div>

          {/* Columna Derecha: Tarjeta Fotográfica de Ficha Técnica */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="bg-slate-950/80 backdrop-blur-xl rounded-3xl p-5 border border-white/20 shadow-2xl text-white space-y-4">
              <div className="relative h-60 w-full rounded-2xl overflow-hidden shadow-inner">
                <Image
                  src="/images/ventanas-pvc.jpg"
                  alt="Ventanal Termopanel PVC"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[11px] font-bold bg-brand-blue px-2.5 py-1 rounded-lg">
                    Termopanel DVH 4-12-4
                  </span>
                  <span className="text-xs font-semibold text-slate-200">
                    Aislación Acústica -32dB
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Fabricación propia en Taller
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
