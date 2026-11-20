import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MundoBarrista — Fútbol Colombiano en Vivo',
  description:
    'Marcadores en vivo, estadísticas, alineaciones y tablas de posiciones de la Liga BetPlay Dimayor.',
  keywords: [
    'Liga BetPlay',
    'fútbol colombiano',
    'marcadores en vivo',
    'tabla de posiciones',
    'MundoBarrista',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
