import type { Metadata } from 'next';
import './globals.css';
import Tracker from '@/components/Tracker';

export const metadata: Metadata = {
  title: 'Vidriería Orellana · Vidrios & Aluminios | Calidad y Tradición',
  description:
    'Fabricación a medida de ventanas en aluminio y PVC, termopanel, shower doors, cierres de balcón, espejos y vitrinas en Achupallas, Viña del Mar y la V Región. Calidad y tradición garantizada.',
  keywords: [
    'vidrieria viña del mar',
    'ventanas aluminio viña del mar',
    'ventanas pvc termopanel',
    'shower door cristal templado',
    'cierre de balcones viña del mar',
    'espejos a medida achupallas',
    'vidrieria orellana',
  ],
  authors: [{ name: 'Orellana - Vidrios & Aluminios' }],
  openGraph: {
    title: 'Vidriería Orellana · Vidrios & Aluminios | Calidad y Tradición',
    description:
      'Fabricación e instalación de ventanas en aluminio y PVC, shower door, cierres de terraza y espejos en Viña del Mar.',
    type: 'website',
    locale: 'es_CL',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="antialiased bg-white text-brand-navy min-h-screen flex flex-col">
        <Tracker />
        {children}
      </body>
    </html>
  );
}
