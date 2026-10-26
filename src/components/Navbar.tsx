'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, MessageCircle, Menu, X, ShieldCheck, ChevronRight, Lock } from 'lucide-react';
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
    { label: 'Por qué Orellana', href: '#nosotros' },
    { label: 'Proceso', href: '#proceso' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <>
      {/* Top Banner de Contacto Rápido */}
      <div className="bg-brand-navy text-white text-xs py-2 px-4 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-white/90">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-blue" />
              Fabricación en Aluminio y PVC · Calidad & Tradición
            </span>
            <span className="text-white/60">|</span>
            <span className="text-white/80">
              Achupallas, Viña del Mar
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="tel:+56992409397"
              className="flex items-center gap-1.5 text-white/90 hover:text-brand-blue transition-colors"
              onClick={() => trackEvent('cta_click', 'Llamada TopBar')}
            >
              <Phone className="w-3.5 h-3.5 text-brand-blue" />
              +56 9924 09397
            </a>
            <Link
              href="/admin"
              className="flex items-center gap-1 text-white/60 hover:text-white transition-colors text-[11px]"
              title="Acceso Administración"
            >
              <Lock className="w-3 h-3" />
              Portal SaaS
            </Link>
          </div>
        </div>
      </div>

      {/* Navbar Principal */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5'
            : 'bg-white/90 backdrop-blur-sm py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="#inicio" className="flex items-center gap-3 group">
              <div className="relative h-11 w-44 sm:h-12 sm:w-52">
                <Image
                  src="/logo.png"
                  alt="Vidriería Orellana - Vidrios y Aluminios"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-700 hover:text-brand-blue transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-blue hover:after:w-full after:transition-all"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Actions Desktop */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="https://wa.me/56992409397?text=Hola%20Vidrier%C3%ADa%20Orellana,%20me%20gustar%C3%ADa%20solicitar%20una%20cotizaci%C3%B3n."
                target="_blank"
                rel="noopener noreferrer"
                data-track="WhatsApp Header"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-sm font-semibold transition-all border border-emerald-200"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                <span>WhatsApp</span>
              </a>

              <a
                href="#cotizar"
                data-track="Cotizar Header"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-blue hover:bg-brand-blue-dark text-white text-sm font-semibold shadow-sm hover:shadow-glow transition-all"
              >
                <span>Cotizar Proyecto</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href="https://wa.me/56992409397"
                target="_blank"
                rel="noopener noreferrer"
                data-track="WhatsApp Mobile Icon"
                className="p-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 sm:hidden"
                aria-label="Contactar por WhatsApp"
              >
                <MessageCircle className="w-5 h-5 fill-emerald-500 text-emerald-500" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Abrir menú de navegación"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-slate-50 hover:text-brand-blue transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <a
                href="#cotizar"
                onClick={() => setMobileMenuOpen(false)}
                data-track="Cotizar Mobile Menu"
                className="w-full text-center py-3 rounded-lg bg-brand-blue text-white font-semibold shadow-sm text-sm"
              >
                Solicitar Cotización Gratis
              </a>
              <a
                href="https://wa.me/56992409397?text=Hola%20Vidrier%C3%ADa%20Orellana,%20me%20gustar%C3%ADa%20solicitar%20una%20cotizaci%C3%B3n."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                data-track="WhatsApp Mobile Menu"
                className="w-full text-center py-2.5 rounded-lg bg-emerald-600 text-white font-medium text-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                Hablar con un Maestro por WhatsApp
              </a>
              <div className="pt-2 flex justify-between items-center text-xs text-slate-500">
                <span>Achupallas - Viña del Mar</span>
                <Link href="/admin" className="text-brand-blue font-medium flex items-center gap-1">
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
