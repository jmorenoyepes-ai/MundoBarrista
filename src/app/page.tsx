export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-4xl font-bold text-accent-pitch">
        ⚽ MundoBarrista
      </h1>
      <p className="text-lg text-gray-400">
        Plataforma de Fútbol Colombiano — En construcción
      </p>
      <div className="mt-4 rounded-lg border border-card-border bg-card px-6 py-4">
        <p className="text-sm text-gray-300">
          Sprint 1 completado · Infraestructura base lista
        </p>
      </div>
    </main>
  );
}
