import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MundoBarrista — Fútbol Colombiano en Vivo | Liga BetPlay Dimayor',
  description:
    'Marcadores en vivo, alineaciones, estadísticas minuto a minuto, tabla de posiciones, reclasificación y promedio de descenso de la Liga BetPlay Dimayor.',
  keywords: [
    'Liga BetPlay',
    'fútbol colombiano',
    'marcadores en vivo',
    'tabla de posiciones',
    'descenso',
    'MundoBarrista',
    'FPC',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} min-h-screen bg-main text-gray-100 flex flex-col`}>
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
