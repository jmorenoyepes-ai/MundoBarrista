// ============================================
// MundoBarrista — Utilidades de clases CSS
// clsx + tailwind-merge para manejo limpio
// ============================================

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina clases CSS con soporte de condicionales (clsx)
 * y resolución de conflictos de Tailwind (twMerge).
 *
 * @example
 * cn('px-4 py-2', isActive && 'bg-accent-pitch', 'px-6')
 * // → 'px-6 py-2 bg-accent-pitch' (px-6 sobreescribe px-4)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
