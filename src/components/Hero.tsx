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
  Layers,
  Check
} from 'lucide-react';
import { trackEvent } from '@/lib/tracker';

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-brand-navy to-slate-950 text-white pt-10 pb-16 lg:pt-20 lg:pb-28 border-b border-white/10">
      
      {/* Imagen de fondo fotorrealista con overlay arquitectónico */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/hero-mobile.jpg" />
          <Image
            src="/images/hero-web.jpg"
            alt="Arquitectura en Vidrio y Aluminio Orellana"
            fill
            className="object-cover object-center opacity-30 lg:opacity-25"
            priority
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-brand-navy/80" />
        <div className="absolute inset-0 bg-blueprint-dark opacity-35" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Columna Izquierda: Mensaje y Propuesta de Valor */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge Oficial de Tradición */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm text-xs sm:text-[13px] font-bold text-white">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-cyan"></span>
              </span>
              <span className="text-brand-cyan">Calidad y Tradición</span>
              <span className="text-white/30">•</span>
              <span className="text-slate-200 font-medium">Taller Propio en Achupallas, Viña del Mar</span>
            </div>

            {/* Titular Principal Arquitectónico */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.12]">
              Fabricación de Ventanas en <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-blue-400 to-brand-blue">Aluminio & PVC</span> a tu Medida
            </h1>

            {/* Bajada Comercial de Oficio */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              En <strong className="text-white font-bold">Orellana - Vidrios & Aluminios</strong> llevamos más de dos décadas vistiendo hogares y proyectos comerciales en la V Región. Especialistas en <span className="text-brand-ice font-semibold">ventanas de termopanel (DVH)</span>, cierres de balcón, shower doors de cristal templado y estructuras herméticas diseñadas para resistir la humedad y el viento costero.
            </p>

            {/* Checklist Técnico de 4 Pilares con Iconos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10 hover:border-brand-cyan/40 transition-colors">
                <ThermometerSnowflake className="w-5 h-5 text-brand-cyan flex-shrink-0" />
                <span className="font-semibold">Termopanel Aislante Térmico DVH</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10 hover:border-brand-cyan/40 transition-colors">
                <VolumeX className="w-5 h-5 text-brand-cyan flex-shrink-0" />
                <span className="font-semibold">Reducción Acústica Certificada</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10 hover:border-brand-cyan/40 transition-colors">
                <Shield className="w-5 h-5 text-brand-cyan flex-shrink-0" />
                <span className="font-semibold">Cristal Templado de Seguridad 8-10mm</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10 hover:border-brand-cyan/40 transition-colors">
                <Layers className="w-5 h-5 text-brand-cyan flex-shrink-0" />
                <span className="font-semibold">Línea Europea & PVC Termofusionado</span>
              </div>
            </div>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#cotizar"
                data-track="Cotizar Hero CTA"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-cyan text-white font-bold text-sm sm:text-base shadow-xl shadow-brand-blue/30 hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2.5 group transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-brand-ice" />
                <span>Solicitar Presupuesto Gratuito</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://wa.me/56992409397?text=Hola%20Vidrier%C3%ADa%20Orellana,%20necesito%20cotizar%20un%20proyecto."
                target="_blank"
                rel="noopener noreferrer"
                data-track="WhatsApp Hero Direct"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 backdrop-blur-md flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <MessageCircle className="w-5 h-5 text-emerald-400 fill-emerald-400" />
                <span>Hablar por WhatsApp</span>
              </a>
            </div>

            {/* Badges Inferiores de Credibilidad */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300 border-t border-white/10">
              <span className="flex items-center gap-1.5 font-medium">
                <Award className="w-4 h-4 text-brand-cyan" />
                Más de 20 Años de Oficio
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Ruler className="w-4 h-4 text-brand-cyan" />
                Medición Precisa en Terreno
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Garantía Escrita Orellana
              </span>
            </div>

          </div>

          {/* Columna Derecha: Tarjeta Fotográfica de Obra Real */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Tarjeta Visual de Precisión con Imagen Real */}
              <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-5 border border-white/20 shadow-2xl relative overflow-hidden glass-reflection">
                
                {/* Contenedor Fotográfico */}
                <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden shadow-inner border border-white/20">
                  <Image
                    src="/images/ventanas-pvc.jpg"
                    alt="Ventana Termopanel PVC fabricada por Vidriería Orellana"
                    fill
                    className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {/* Badge Flotante Sobre Imagen */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-cyan bg-slate-950/80 px-2 py-0.5 rounded-md border border-white/10">
                        Termopanel PVC
                      </span>
                      <h4 className="text-sm font-bold text-white mt-0.5">Ventanal Corredero Hermético</h4>
                    </div>
                    <span className="text-[11px] font-bold bg-brand-blue px-2.5 py-1 rounded-lg shadow-sm">
                      DVH 4-12-4
                    </span>
                  </div>
                </div>

                {/* Grilla visual inferior de especificaciones */}
                <div className="pt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Aislación Acústica</span>
                    <span className="font-bold text-brand-cyan text-sm">-32 Decibeles</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Instalación</span>
                    <span className="font-bold text-white text-sm">En 24/48 Horas</span>
                  </div>
                </div>

                {/* Banner de Taller Propio */}
                <div className="mt-4 bg-gradient-to-r from-brand-blue/30 to-brand-cyan/20 rounded-2xl p-3.5 border border-white/15 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-brand-cyan font-bold uppercase tracking-wider">Taller Propio</div>
                    <div className="text-xs font-semibold text-white">Achupallas, Viña del Mar</div>
                  </div>
                  <a
                    href="https://wa.me/56992409397"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors shadow-md flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>Consultar</span>
                  </a>
                </div>

              </div>

              {/* Mini Badge Flotante Superior */}
              <div className="absolute -top-3 -right-3 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 px-4 py-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-brand-navy">Cotización en Menos de 24h</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
