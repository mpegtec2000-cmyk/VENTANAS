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
    <html lang="es" className="scroll-smooth antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=Schibsted+Grotesk:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-white text-slate-900 min-h-screen flex flex-col">
        <Tracker />
        {children}
      </body>
    </html>
  );
}
