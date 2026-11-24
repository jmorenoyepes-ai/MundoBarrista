'use client';

// ============================================
// MundoBarrista — Navbar Principal
// Estética: Dark Stadium & Cafetero
// ============================================

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Radio, Calendar, Trophy, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    {
      name: 'Partidos',
      href: '/',
      icon: Calendar,
      active: pathname === '/' || pathname.startsWith('/partido'),
    },
    {
      name: 'Tablas',
      href: '/tablas',
      icon: BarChart2,
      active: pathname.startsWith('/tablas'),
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-card-border bg-main/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-pitch to-emerald-700 shadow-lg shadow-emerald-950/40 transition-transform group-hover:scale-105">
              <span className="text-xl">⚽</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                Mundo<span className="text-accent-pitch">Barrista</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-accent-gold">
                Liga BetPlay Dimayor
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-card/60 p-1 rounded-xl border border-card-border/60">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
                  link.active
                    ? 'bg-accent-pitch text-slate-950 shadow-md font-bold'
                    : 'text-gray-300 hover:text-white hover:bg-card-border/40'
                )}
              >
                <Icon className={cn('h-4 w-4', link.active ? 'text-slate-950' : 'text-gray-400')} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Live Indicator Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1.5 shadow-inner">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-pitch opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-pitch"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-accent-pitch">
              FPC en Vivo
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-card-border bg-main/95 backdrop-blur-lg px-6 py-2">
        <div className="flex items-center justify-around">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  'flex flex-col items-center gap-1 py-1 px-4 rounded-lg text-xs font-semibold transition-colors',
                  link.active
                    ? 'text-accent-pitch'
                    : 'text-gray-400 hover:text-gray-200'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
