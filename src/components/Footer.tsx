'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Phone, Mail, MapPin, Instagram, Facebook, Lock, ArrowUp, MessageCircle } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#090D16] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Columna 1: Marca y Concepto con Logo HD Oficial del Navbar */}
          <div className="lg:col-span-5 space-y-5">
            <div className="relative h-11 w-52 sm:h-12 sm:w-60">
              <Image
                src="/images/logo-orellana-white-hd.png"
                alt="Vidriería Orellana - Vidrios & Aluminios"
                fill
                className="object-contain object-left"
              />
            </div>

            <p className="text-sm text-white max-w-sm leading-relaxed font-medium">
              Fábrica especializada en ventanas de aluminio, PVC y cristales de alta gama en Viña del Mar y la V Región. Más de 30 años de experiencia técnica con taller propio en Achupallas.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Garantía de Calidad & Taller Propio</span>
            </div>
          </div>

          {/* Columna 2: Servicios Principales */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Servicios Principales
            </h4>
            <ul className="space-y-2.5 text-sm text-white font-medium">
              <li>
                <a href="#servicios" className="text-white hover:text-blue-300 hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-200">
                  <span className="text-blue-400 text-xs">›</span>
                  <span>Ventanas en Aluminio & PVC</span>
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-white hover:text-blue-300 hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-200">
                  <span className="text-blue-400 text-xs">›</span>
                  <span>Shower Doors Cristal Templado</span>
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-white hover:text-blue-300 hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-200">
                  <span className="text-blue-400 text-xs">›</span>
                  <span>Cierres de Balcón y Terrazas</span>
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-white hover:text-blue-300 hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-200">
                  <span className="text-blue-400 text-xs">›</span>
                  <span>Termopaneles DVH Aislantes</span>
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-white hover:text-blue-300 hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-200">
                  <span className="text-blue-400 text-xs">›</span>
                  <span>Barandas de Cristal & Acero Inox</span>
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-white hover:text-blue-300 hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-200">
                  <span className="text-blue-400 text-xs">›</span>
                  <span>Vitrinas Comerciales & Fachadas</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto Directo */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Contacto y Taller
            </h4>
            <div className="space-y-3.5 text-sm text-white font-medium">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-blue-400" />
                </div>
                <a
                  href="https://share.google/p1rW58oiJ0iUPcRm1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leading-snug text-white hover:text-blue-300 transition-colors"
                >
                  Av. Alessandri 1055, 2550737 Viña del Mar, Valparaíso
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-blue-400" />
                </div>
                <a href="tel:+56992409397" className="text-white hover:text-blue-300 transition-colors font-bold">
                  +56 9924 09397
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <a href="mailto:Contacto@Vidreria.Orellana.cl" className="text-white hover:text-blue-300 transition-colors font-medium">
                  Contacto@Vidreria.Orellana.cl
                </a>
              </div>
            </div>

            {/* Redes y Botón WhatsApp Profesional Oficial */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <a
                href="https://wa.me/56992409397?text=Hola%20Vidrier%C3%ADa%20Orellana,%20necesito%20contactarles."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-emerald-900/40 hover:scale-[1.02] transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4 fill-white text-white" />
                <span>Cotizar por WhatsApp</span>
              </a>
              <a
                href="https://www.instagram.com/vidrieriaorellanayventanas.cl/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white hover:text-pink-400 transition-all shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white hover:text-blue-300 transition-all shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar con Blanco Puro Nítido */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/90 font-medium">
          <div>
            © {new Date().getFullYear()} Vidriería Orellana — Fábrica de Ventanas en Aluminio & PVC. Todos los derechos reservados.
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-blue-400" />
              <span>Acceso Administrativo SaaS</span>
            </Link>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors font-semibold"
              aria-label="Volver arriba"
            >
              <span>Subir</span>
              <ArrowUp className="w-3.5 h-3.5 text-blue-400" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
