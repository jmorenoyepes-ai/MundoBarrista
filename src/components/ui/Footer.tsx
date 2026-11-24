// ============================================
// MundoBarrista — Footer
// ============================================

export function Footer() {
  return (
    <footer className="border-t border-card-border/60 bg-main text-gray-400 text-xs py-8 pb-20 md:pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">⚽</span>
          <span className="font-bold text-gray-200">MundoBarrista</span>
          <span className="text-gray-600">|</span>
          <span>Fútbol Profesional Colombiano en Tiempo Real</span>
        </div>
        <div className="flex items-center gap-4 text-gray-500">
          <span>Liga BetPlay Dimayor</span>
          <span>•</span>
          <span>Transmisiones oficiales por Win Sports</span>
        </div>
        <div>
          <span>© {new Date().getFullYear()} MundoBarrista — Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
