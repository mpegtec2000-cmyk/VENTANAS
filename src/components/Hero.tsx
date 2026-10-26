'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  ArrowRight, 
  MessageCircle,
  MapPin
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
    <section id="inicio" className="relative min-h-[75vh] lg:min-h-[82vh] flex items-center overflow-hidden bg-black">
      
      {/* Carrusel de Fondos Limpios (Bucle infinito cada 2s) */}
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

        {/* Degradado oscuro para alto contraste y legibilidad impecable (más intenso a la izquierda, desvanecido a la derecha) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent lg:w-3/5 z-20 pointer-events-none" />
        <div className="absolute inset-0 bg-black/40 lg:bg-transparent z-20 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-24 relative z-30 w-full">
        {/* Columna Izquierda: Titular y Botones */}
        <div className="max-w-xl lg:max-w-[560px] xl:max-w-[640px] space-y-6 sm:space-y-7 text-center lg:text-left">
          {/* Titular Principal: Máximo 2 líneas en desktop, 3 en móvil, con "a medida" destacado en azul */}
          <h1 className="text-2xl sm:text-4xl lg:text-[42px] xl:text-5xl font-extrabold text-white tracking-tight leading-[1.18] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            Soluciones en vidrio, aluminio y PVC <span className="text-blue-400">a medida</span>
          </h1>

          {/* Subtítulo: Máximo 2 líneas, peso medium, buen interlineado */}
          <p className="text-base sm:text-lg text-slate-100 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
            Más de 30 años en fabricación e instalación para hogares, terrazas y proyectos comerciales.
          </p>

          {/* Botones de Acción (apilados en celular, alineados en desktop) */}
          <div className="space-y-3 pt-1">
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <a
                href="#cotizar"
                data-track="Cotizar Hero CTA"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2 group border border-blue-400/20"
              >
                <span>Solicitar cotización gratuita</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://wa.me/56992409397?text=Hola%20Vidrier%C3%ADa%20Orellana,%20necesito%20solicitar%20una%20cotizaci%C3%B3n."
                target="_blank"
                rel="noopener noreferrer"
                data-track="WhatsApp Hero Direct"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Cotizar por WhatsApp</span>
              </a>
            </div>

            {/* Línea pequeña y discreta debajo de los botones */}
            <div className="text-xs text-slate-300 font-medium flex items-center justify-center lg:justify-start gap-1.5 drop-shadow-sm pt-1">
              <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Cobertura en la V Región y otras regiones del país</span>
            </div>
          </div>
        </div>
      </div>

      {/* Logotipo Oficial Orellana Flotante al Borde Derecho de la Pantalla */}
      <div className="hidden lg:flex absolute right-4 sm:right-6 lg:right-10 xl:right-16 top-1/2 -translate-y-1/2 z-30 pointer-events-none items-center justify-end">
        <div className="relative w-80 lg:w-[420px] xl:w-[480px] h-28 lg:h-36 xl:h-40 transition-transform duration-500 hover:scale-105">
          <Image
            src="/images/logo-orellana-white-hd.png"
            alt="Vidriería Orellana - Vidrios & Aluminios"
            fill
            className="object-contain object-right drop-shadow-[0_6px_28px_rgba(0,0,0,0.95)]"
            priority
          />
        </div>
      </div>
    </section>
  );
}
