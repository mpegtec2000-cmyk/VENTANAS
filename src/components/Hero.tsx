'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  ShieldCheck, 
  ArrowRight, 
  MessageCircle, 
  VolumeX, 
  ThermometerSnowflake, 
  Ruler,
  Sparkles
} from 'lucide-react';
import { trackEvent } from '@/lib/tracker';

export interface HeroSlide {
  id: number;
  desktop: string;
  mobile: string;
  title: string;
  tag: string;
  feature: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    desktop: '/images/user-1.jpg',
    mobile: '/images/hero-mobile-1.jpg',
    title: 'Fachadas & Ventanales Arquitectónicos',
    tag: 'Vidrios de Alta Gama',
    feature: 'Cristales Reflectantes & Muro Cortina',
  },
  {
    id: 2,
    desktop: '/images/user-6.jpg',
    mobile: '/images/hero-mobile-6.jpg',
    title: 'Cierres de Balcones & Terrazas',
    tag: 'Línea Departamentos',
    feature: 'Aluminio Reforzado & Vista Despejada',
  },
  {
    id: 3,
    desktop: '/images/user-2.jpg',
    mobile: '/images/hero-mobile-2.jpg',
    title: 'Ventanas en PVC Termopanel DVH',
    tag: 'Aislación Acústica & Térmica',
    feature: 'Hermeticidad Europea Oscilobatiente',
  },
  {
    id: 4,
    desktop: '/images/user-3.jpg',
    mobile: '/images/hero-mobile-3.jpg',
    title: 'Shower Doors en Cristal Templado',
    tag: 'Baños Modernos a Medida',
    feature: 'Cristal 8mm / 10mm & Acero Inox',
  },
  {
    id: 5,
    desktop: '/images/user-5.jpg',
    mobile: '/images/hero-mobile-5.jpg',
    title: 'Barandas de Cristal & Acero Inoxidable',
    tag: 'Seguridad & Vanguardia',
    feature: 'Cristal Laminado de Seguridad',
  },
  {
    id: 6,
    desktop: '/images/user-4.jpg',
    mobile: '/images/hero-mobile-4.jpg',
    title: 'Divisiones de Oficina Corporativas',
    tag: 'Espacios Corporativos',
    feature: 'Muros Vidriados Panorámicos',
  },
  {
    id: 7,
    desktop: '/images/user-7.jpg',
    mobile: '/images/hero-mobile-7.jpg',
    title: 'Vitrinas Comerciales & Locales',
    tag: 'Comercial & Retail',
    feature: 'Perfilería de Aluminio Reforzado',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Bucle infinito automático cada 2 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const activeSlideData = HERO_SLIDES[currentSlide];

  return (
    <section id="inicio" className="relative min-h-[78vh] lg:min-h-[85vh] flex items-center overflow-hidden bg-slate-950 border-b border-slate-200">
      
      {/* Carrusel Automático de Fondos (Cross-fade cada 2s en Bucle Infinito) */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950 pointer-events-none select-none">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out will-change-opacity ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <picture>
                <source media="(max-width: 768px)" srcSet={slide.mobile} />
                <Image
                  src={slide.desktop}
                  alt={slide.title}
                  fill
                  priority={index <= 1}
                  className="object-cover object-center lg:object-[65%_center]"
                  sizes="100vw"
                  quality={90}
                />
              </picture>
            </div>
          );
        })}

        {/* Gradiente de contraste arquitectónico para legibilidad perfecta */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-transparent lg:w-3/5 z-20 pointer-events-none" />
        <div className="absolute inset-0 bg-slate-950/35 lg:bg-transparent z-20 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 relative z-30 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Columna Izquierda: Redacción Corporativa de Alto Impacto */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            {/* Pill Badge Oficial */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-white/20 text-xs font-semibold text-slate-200 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#0052CC]" />
              <span className="font-bold text-white tracking-wide">Calidad & Tradición</span>
              <span className="text-white/30">•</span>
              <span>Viña del Mar & V Región</span>
            </div>

            {/* Titular Principal: Gancho Potente y Comercial */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.14]">
              Confort, Silencio & Elegancia.<br />
              <span className="text-[#3880FF]">Ventanas de Alta Gama</span> en Aluminio & PVC.
            </h1>

            {/* Bajada Comercial Persuasiva */}
            <p className="text-base sm:text-lg text-slate-200 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Aísla el frío, bloquea el ruido exterior y aumenta la plusvalía de tus espacios. Fabricación a medida con la garantía y tradición de nuestro taller en Viña del Mar.
            </p>

            {/* 3 Beneficios Concretos */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1 text-xs text-white font-medium">
              <div className="flex items-center gap-2 bg-slate-900/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 shadow-sm">
                <ThermometerSnowflake className="w-4 h-4 text-[#3880FF]" />
                <span className="font-semibold">Aislación Térmica Total</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 shadow-sm">
                <VolumeX className="w-4 h-4 text-[#3880FF]" />
                <span className="font-semibold">Bloqueo Acústico -32dB</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 shadow-sm">
                <Ruler className="w-4 h-4 text-[#3880FF]" />
                <span className="font-semibold">Medición y Asesoría Gratis</span>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="#cotizar"
                data-track="Cotizar Hero CTA"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#0052CC] hover:bg-[#0040A8] text-white font-bold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                <span>Cotizar Presupuesto sin Costo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://wa.me/56992409397?text=Hola%20Vidrier%C3%ADa%20Orellana,%20necesito%20cotizar%20un%20proyecto."
                target="_blank"
                rel="noopener noreferrer"
                data-track="WhatsApp Hero Direct"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Hablar con un Maestro</span>
              </a>
            </div>

            {/* Garantía y Paginación Dinámica del Carrusel de 2s */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
              <div className="text-xs text-slate-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Garantía de hermeticidad y fabricación directa en taller</span>
              </div>

              {/* Indicadores de diapositiva (7 fotos) */}
              <div className="flex items-center gap-1.5">
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Ver foto ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentSlide ? 'w-6 bg-[#3880FF]' : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Columna Derecha: Tarjeta Fotográfica Sincronizada con el Carrusel */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="bg-slate-950/85 backdrop-blur-xl rounded-3xl p-4 border border-white/20 shadow-2xl text-white space-y-3">
              <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-inner">
                <Image
                  src={activeSlideData.desktop}
                  alt={activeSlideData.title}
                  fill
                  className="object-cover object-center transition-all duration-700"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[11px] font-bold bg-[#0052CC] px-2.5 py-1 rounded-lg shadow-sm">
                    {activeSlideData.tag}
                  </span>
                  <span className="text-xs font-semibold text-slate-200 drop-shadow">
                    {activeSlideData.feature}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300 px-1 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold text-white">{activeSlideData.title}</span>
                </span>
                <span className="font-bold text-slate-400">Achupallas, Viña</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
