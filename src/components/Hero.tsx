'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  ArrowRight, 
  MessageCircle
} from 'lucide-react';

export interface HeroSlide {
  id: number;
  desktop: string;
  mobile: string;
  title: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    desktop: '/images/user-1.jpg',
    mobile: '/images/hero-mobile-1.jpg',
    title: 'Fachadas & Ventanales Arquitectónicos',
  },
  {
    id: 2,
    desktop: '/images/user-6.jpg',
    mobile: '/images/hero-mobile-6.jpg',
    title: 'Cierres de Balcones & Terrazas',
  },
  {
    id: 3,
    desktop: '/images/user-2.jpg',
    mobile: '/images/hero-mobile-2.jpg',
    title: 'Ventanas en PVC Termopanel DVH',
  },
  {
    id: 4,
    desktop: '/images/user-3.jpg',
    mobile: '/images/hero-mobile-3.jpg',
    title: 'Shower Doors en Cristal Templado',
  },
  {
    id: 5,
    desktop: '/images/user-5.jpg',
    mobile: '/images/hero-mobile-5.jpg',
    title: 'Barandas de Cristal & Acero Inoxidable',
  },
  {
    id: 6,
    desktop: '/images/user-4.jpg',
    mobile: '/images/hero-mobile-4.jpg',
    title: 'Divisiones de Oficina Corporativas',
  },
  {
    id: 7,
    desktop: '/images/user-7.jpg',
    mobile: '/images/hero-mobile-7.jpg',
    title: 'Vitrinas Comerciales & Locales',
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

  return (
    <section id="inicio" className="relative min-h-[75vh] lg:min-h-[82vh] flex items-center overflow-hidden bg-black border-b border-slate-200">
      
      {/* Carrusel de Fondos Limpios (Bucle infinito cada 2s sin filtros azules) */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
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
                  quality={95}
                />
              </picture>
            </div>
          );
        })}

        {/* Sombra neutra suave solo para legibilidad del texto - Cero tinte azul */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent lg:w-7/12 z-20 pointer-events-none" />
        <div className="absolute inset-0 bg-black/15 lg:bg-transparent z-20 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-30 w-full">
        <div className="max-w-3xl space-y-6 text-center lg:text-left">
            
          {/* Pill Badge Oficial */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold text-white shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#0052CC]" />
            <span className="font-bold text-white tracking-wide">Más de 30 Años de Calidad & Tradición</span>
            <span className="text-white/40">•</span>
            <span>Viña del Mar & V Región</span>
          </div>

          {/* Titular Principal: Vidriería Orellana */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
            Vidriería Orellana<br />
            <span className="text-blue-400">Ventanas de Alta Gama</span> en Aluminio & PVC.
          </h1>

          {/* Bajada Comercial con 30 años de calidad y tradición */}
          <p className="text-base sm:text-lg text-slate-100 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]">
            Más de 30 años de calidad, experiencia y tradición en Viña del Mar y la V Región. Fabricamos e instalamos ventanas de alta gama en aluminio y PVC, termopaneles y cierres a medida con garantía directa de nuestro taller.
          </p>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
            <a
              href="#cotizar"
              data-track="Cotizar Hero CTA"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2 group border border-blue-400/20"
            >
              <span>Cotizar Presupuesto sin Costo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="https://wa.me/56992409397?text=Hola%20Vidrier%C3%ADa%20Orellana,%20necesito%20cotizar%20un%20proyecto."
              target="_blank"
              rel="noopener noreferrer"
              data-track="WhatsApp Hero Direct"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Hablar con un Maestro</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
