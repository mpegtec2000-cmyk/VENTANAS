'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Phone, Mail, MapPin, Instagram, Facebook, Lock, ArrowUp } from 'lucide-react';
import { trackEvent } from '@/lib/tracker';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-navy text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Columna 1: Marca y Concepto */}
          <div className="lg:col-span-5 space-y-5">
            <div className="relative h-12 w-52 bg-white rounded-lg p-1.5 inline-block">
              <Image
                src="/logo.png"
                alt="Vidriería Orellana Logo"
                fill
                className="object-contain p-1"
              />
            </div>

            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              <strong>Orellana - Vidrios & Aluminios</strong>. Tradición, precisión y compromiso en cada obra. Especialistas en fabricación e instalación de ventanas en aluminio y PVC, cierres de balcón, shower doors y proyectos arquitectónicos a medida en Viña del Mar.
            </p>

            <div className="flex items-center gap-2 text-xs text-brand-blue font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Calidad y Tradición en Cada Proyecto</span>
            </div>
          </div>

          {/* Columna 2: Servicios Rápidos */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Servicios Principales</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li><a href="#servicios" className="hover:text-brand-blue transition-colors">Ventanas en Aluminio & PVC</a></li>
              <li><a href="#servicios" className="hover:text-brand-blue transition-colors">Shower Door Cristal Templado</a></li>
              <li><a href="#servicios" className="hover:text-brand-blue transition-colors">Cierre de Balcón y Terrazas</a></li>
              <li><a href="#servicios" className="hover:text-brand-blue transition-colors">Espejos Biselados y LED</a></li>
              <li><a href="#servicios" className="hover:text-brand-blue transition-colors">Bow Window & Vitrinas</a></li>
              <li><a href="#servicios" className="hover:text-brand-blue transition-colors">Reparaciones en General</a></li>
            </ul>
          </div>

          {/* Columna 3: Contacto Directo */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Contacto y Taller</h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                <span>Guillermo García Huidobro Esq. Alessandri Local 1, Achupallas - Viña del Mar</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-blue flex-shrink-0" />
                <a href="tel:+56992409397" className="hover:text-brand-blue transition-colors font-medium">
                  +56 9924 09397
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-blue flex-shrink-0" />
                <a href="mailto:Contacto@Vidreria.Orellana.cl" className="hover:text-brand-blue transition-colors">
                  Contacto@Vidreria.Orellana.cl
                </a>
              </div>
            </div>

            {/* Redes */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com/aluminios_orellana"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-brand-blue flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-brand-blue flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Orellana - Vidrios & Aluminios. Todos los derechos reservados.
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-brand-blue" />
              <span>Acceso Administrativo SaaS</span>
            </Link>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
              aria-label="Volver arriba"
            >
              <span>Subir</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
