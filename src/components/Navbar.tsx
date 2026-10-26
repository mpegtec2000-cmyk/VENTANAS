'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, MessageCircle, Menu, X, Shield, ChevronRight, Lock, Sparkles, MapPin } from 'lucide-react';
import { trackEvent } from '@/lib/tracker';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Catálogo & Galería', href: '#galeria' },
    { label: 'Por qué Orellana', href: '#nosotros' },
    { label: 'Proceso', href: '#proceso' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <>
      {/* Top Bar Corporativo de Alta Gama */}
      <div className="bg-brand-navy text-white text-xs py-2 px-4 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-white/90 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse"></span>
              <Shield className="w-3.5 h-3.5 text-brand-blue" />
              Fabricación a Medida en Aluminio y PVC · Calidad & Tradición
            </span>
            <span className="text-white/30">•</span>
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3 h-3 text-brand-blue" />
              Achupallas, Viña del Mar
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <a
              href="tel:+56992409397"
              className="flex items-center gap-1.5 text-slate-200 hover:text-brand-blue transition-colors font-semibold"
              onClick={() => trackEvent('cta_click', 'Llamada TopBar')}
            >
              <Phone className="w-3.5 h-3.5 text-brand-blue" />
              +56 9924 09397
            </a>
            <span className="text-white/20">|</span>
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-[11px] font-medium group"
              title="Acceso al Portal Administrativo SaaS"
            >
              <Lock className="w-3 h-3 text-brand-blue group-hover:text-white transition-colors" />
              <span>Portal SaaS</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Navbar Principal Flotante Glass */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-glass-card py-2.5 border-b border-slate-200/80'
            : 'bg-white/90 backdrop-blur-sm py-3.5 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Oficial Vidriería Orellana */}
            <Link href="#inicio" className="flex items-center gap-3 group">
              <div className="relative h-11 w-44 sm:h-12 sm:w-56 transition-transform duration-300 group-hover:scale-[1.02]">
                <Image
                  src="/logo.png"
                  alt="Vidriería Orellana - Vidrios y Aluminios"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation Links con Micro-indicadores */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[13.5px] font-semibold text-slate-700 hover:text-brand-blue transition-colors relative py-1 group"
                >
                  <span>{link.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue rounded-full group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </nav>

            {/* Acciones Rápidas Desktop */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="https://wa.me/56992409397?text=Hola%20Vidrier%C3%ADa%20Orellana,%20me%20gustar%C3%ADa%20solicitar%20una%20cotizaci%C3%B3n."
                target="_blank"
                rel="noopener noreferrer"
                data-track="WhatsApp Header"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-bold transition-all border border-emerald-200/80 hover:shadow-sm"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                <span>WhatsApp</span>
              </a>

              <a
                href="#cotizar"
                data-track="Cotizar Header"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-blue-dark hover:from-brand-blue-dark hover:to-brand-navy text-white text-xs sm:text-sm font-bold shadow-md shadow-brand-blue/20 hover:shadow-glow transition-all duration-300 group"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-ice" />
                <span>Cotizar Proyecto</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href="https://wa.me/56992409397"
                target="_blank"
                rel="noopener noreferrer"
                data-track="WhatsApp Mobile Icon"
                className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 sm:hidden shadow-sm"
                aria-label="Contactar por WhatsApp"
              >
                <MessageCircle className="w-5 h-5 fill-emerald-500 text-emerald-500" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
                aria-label="Abrir menú de navegación"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu Mejorado */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-5 pt-3 pb-6 space-y-4 animate-fadeIn shadow-xl">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:text-brand-blue transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <a
                href="#cotizar"
                onClick={() => setMobileMenuOpen(false)}
                data-track="Cotizar Mobile Menu"
                className="w-full text-center py-3 rounded-xl bg-brand-blue text-white font-bold shadow-md text-sm flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-brand-ice" />
                <span>Solicitar Cotización Gratuita</span>
              </a>

              <a
                href="https://wa.me/56992409397?text=Hola%20Vidrier%C3%ADa%20Orellana,%20me%20gustar%C3%ADa%20solicitar%20una%20cotizaci%C3%B3n."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                data-track="WhatsApp Mobile Menu"
                className="w-full text-center py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Hablar con un Maestro por WhatsApp</span>
              </a>

              <div className="pt-2 flex justify-between items-center text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-brand-blue" />
                  Achupallas · Viña del Mar
                </span>
                <Link href="/admin" className="text-brand-blue font-bold flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Portal SaaS
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
