'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Menu, X, ChevronRight, Lock, MapPin } from 'lucide-react';
import { trackEvent } from '@/lib/tracker';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Obras & Proyectos', href: '#galeria' },
    { label: 'Taller & Tradición', href: '#nosotros' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <>
      {/* Top Bar Corporativo de Alta Gama */}
      <div className="bg-[#090D16] text-white text-[12px] py-2 px-4 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-slate-200 font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Fábrica de Ventanas en Aluminio y PVC · Calidad & Tradición</span>
            </span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1.5 text-slate-300 font-normal">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Achupallas, Viña del Mar</span>
            </span>
          </div>
          
          <div className="flex items-center gap-5">
            <a
              href="tel:+56992409397"
              className="flex items-center gap-1.5 text-white hover:text-blue-300 transition-colors font-semibold"
              onClick={() => trackEvent('cta_click', 'Llamada TopBar')}
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>+56 9924 09397</span>
            </a>
            <span className="text-white/20">|</span>
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-[11px] font-medium group"
              title="Acceso al Portal Administrativo SaaS"
            >
              <Lock className="w-3 h-3 text-blue-400 group-hover:text-white transition-colors" />
              <span>Acceso Administrativo</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Navbar Principal en Azul Corporativo #0F172A */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 bg-[#0F172A] border-b border-white/10 shadow-lg ${
          isScrolled ? 'py-2.5 bg-[#0F172A]/98 backdrop-blur-md' : 'py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo Oficial Orellana */}
            <Link href="#inicio" className="flex items-center gap-3 group">
              <div className="relative h-11 w-48 sm:h-12 sm:w-56 transition-transform duration-200 group-hover:scale-[1.01]">
                <Image
                  src="/logo.png"
                  alt="Vidriería Orellana - Vidrios y Aluminios"
                  fill
                  className="brightness-0 invert object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Enlaces de Navegación con Redacción Profesional */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[13.5px] font-bold text-slate-200 hover:text-white transition-colors relative py-1 group"
                >
                  <span>{link.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 rounded-full group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>

            {/* Botón de Acción Principal */}
            <div className="hidden sm:flex items-center gap-4">
              <a
                href="#cotizar"
                data-track="Cotizar Header"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[13.5px] font-bold shadow-md shadow-blue-900/40 hover:shadow-lg transition-all duration-200 group border border-blue-400/20"
              >
                <span>Cotizar en Línea</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href="#cotizar"
                className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold sm:hidden shadow-sm"
              >
                Cotizar
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-white bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Abrir menú de navegación"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0F172A] border-b border-white/10 px-5 pt-3 pb-6 space-y-4 animate-fadeIn shadow-2xl">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-200 hover:bg-white/10 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <a
                href="#cotizar"
                onClick={() => setMobileMenuOpen(false)}
                data-track="Cotizar Mobile Menu"
                className="w-full text-center py-3 rounded-xl bg-blue-600 text-white font-bold shadow-md text-sm flex items-center justify-center gap-2"
              >
                <span>Solicitar Cotización Gratuita</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <div className="pt-2 flex justify-between items-center text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-blue-400" />
                  Achupallas · Viña del Mar
                </span>
                <Link href="/admin" className="text-blue-400 font-bold flex items-center gap-1 hover:text-white">
                  <Lock className="w-3 h-3" /> Panel Admin
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
