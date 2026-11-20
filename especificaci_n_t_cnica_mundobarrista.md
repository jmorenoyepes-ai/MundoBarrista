# PROJECT_SPEC.md — MundoBarrista (Plataforma de Fútbol Colombiano)

## 1. Visión General del Proyecto
**Nombre:** MundoBarrista  
**Dominio / Concepto:** Plataforma web informativa, estadística y en tiempo real enfocada inicialmente en la **Liga BetPlay Dimayor** (Primera División de Colombia), diseñada con arquitectura escalable para expandir en el futuro a Torneo BetPlay, Copa Colombia, selecciones y comunidad.
- **Modelo de Acceso (Fase 1):** 100% público y abierto sin registro obligatorio. Cualquier visitante puede ver marcadores en vivo, alineaciones, estadísticas e historial de inmediato. *(El sistema de autenticación, equipo favorito y pollas/quinielas queda preparado a nivel de base de datos para Fase 2).*
- **Objetivo Técnico y Comercial:** Desarrollar una aplicación ultrarrápida, optimizada para SEO (Server-Side Rendering) y lista para monetizar a futuro mediante tráfico orgánico.

---

## 2. Stack Tecnológico (100% Open Source y Escalable)
Todas las herramientas seleccionadas son gratuitas, estándar en la industria y fáciles de contenerizar:

- **Framework Full-Stack:** Next.js 14+ (App Router) con React 18 y TypeScript estricto.
- **Gestor de Paquetes:** `pnpm` (rápido y eficiente en disco dentro de contenedores Docker).
- **Estilos e Interfaz:** Tailwind CSS + `lucide-react` (iconografía) + `clsx` / `tailwind-merge`.
- **Base de Datos Relacional:** PostgreSQL 16.
- **ORM:** Prisma ORM (tipado seguro end-to-end y migraciones limpias).
- **Sistema de Caché:** Redis 7 (vital para proteger la cuota gratuita de APIs externas y servir respuestas en milisegundos).
- **Infraestructura y Contenedores:** Docker + Docker Compose (orquestando `app`, `postgres` y `redis`).

---

## 3. Identidad Visual y Diseño UI/UX ("Dark Stadium & Cafetero")
El diseño debe sentirse moderno, futbolero y representativo de Colombia, evitando el verde saturado tradicional y apostando por una estética de estadio nocturno de alto contraste:

- **Paleta de Colores (Tailwind Tokens):**
  - **Fondo Principal (`bg-main`):** `#0B1120` (Azul noche / Carbón profundo).
  - **Superficies / Tarjetas (`bg-card`):** `#151F32` con bordes sutiles `#1E293B`.
  - **Acento Principal — Césped & En Vivo (`accent-pitch`):** `#10B981` (Esmeralda vibrante) para indicadores `EN VIVO`, goles y clasificación.
  - **Acento Secundario — Gloria & Tricolor (`accent-gold`):** `#FACC15` (Amarillo oro) para líderes, estrellas del partido y récords históricos.
  - **Alerta / Descenso (`accent-danger`):** `#EF4444` (Rojo intenso) para tarjetas rojas y zona de descenso.
- **Elementos Distintivos de MundoBarrista:**
  - **Contexto Geográfico Colombiano:** En la cabecera de cada partido mostrar Estadio, Ciudad y **Altitud (msnm)** (ej. *Estadio Atanasio Girardot • Medellín • 1.495 msnm*), además del canal oficial de transmisión en Colombia (*Win Sports / Win+ Fútbol*).
  - **Mobile-First:** Diseño pensado primero para pantallas de celular (barra de navegación inferior o pestañas táctiles rápidas) manteniendo una vista panorámica rica en escritorio.

---

## 4. Arquitectura de Datos y Modo Híbrido (Anti-Errores)
Para desarrollar sin límites y evitar agotar las 100 peticiones diarias gratuitas de **API-Football (League ID: `239`)**, el backend implementará el **Patrón Adaptador (`FootballDataService`)**:

1. **Interruptor por Entorno (`USE_MOCK_DATA`):**
   - `USE_MOCK_DATA=true` (Por defecto en desarrollo): Sirve datos locales estructurados y realistas de la Liga BetPlay (equipos colombianos reales, jornadas, eventos minuto a minuto, alineaciones y estadísticas) sin consumir internet ni cuotas.
   - `USE_MOCK_DATA=false`: Consulta API-Football pasando obligatoriamente por una capa de **Caché en Redis**:
     - Partidos `LIVE`: Caché TTL de **120 segundos**.
     - Tablas de posiciones y calendario: Caché TTL de **6 horas (21600s)**.
2. **Base de Datos y Seed Inicial (`prisma/seed.ts`):**
   - PostgreSQL almacenará el catálogo maestro de los 20 clubes del FPC (nombre, siglas, colores, estadio, ciudad, altitud, escudo) y el acumulado histórico de los últimos 3 años para calcular automáticamente la **Tabla del Descenso (Promedio)** sin depender de endpoints externos propensos a fallos.

---

## 5. Estructura de Carpetas Sugerida
```text
mundobarrista/
├── docker-compose.yml
├── Dockerfile
├── .env.example
├── PROJECT_SPEC.md
├── prisma/
│   ├── schema.prisma          # Modelos: Team, Match, Standing, RelegationRecord, User (Fase 2)
│   └── seed.ts                # Precarga de los 20 equipos FPC, estadios e historial descenso
└── src/
    ├── app/
    │   ├── layout.tsx         # Navbar MundoBarrista + Tema Dark Stadium
    │   ├── page.tsx           # Centro de Partidos (Matchday / Jornada actual)
    │   ├── partido/[id]/      # Match Center (Resumen, Alineaciones, Estadísticas, H2H)
    │   ├── tablas/            # Posiciones, Reclasificación y Descenso
    │   └── api/               # Route Handlers (endpoints internos protegidos con Redis)
    ├── components/
    │   ├── ui/                # Componentes base reutilizables
    │   ├── matches/           # Tarjetas de partido, marcador en vivo, cancha táctica
    │   └── tables/            # Tablas interactivas con zonas de clasificación/descenso
    ├── lib/
    │   ├── prisma.ts          # Cliente singleton de Prisma
    │   ├── redis.ts           # Cliente singleton de Redis
    │   └── football-service/  # Adaptador híbrido (mock-provider.ts vs api-football-provider.ts)
    └── mocks/
        └── betplay-data.ts    # Datos realistas de la Liga BetPlay para desarrollo visual
```

---

## 6. Módulos Funcionales del MVP (Fase 1)

### Módulo 1: Centro de Partidos (`/` - Matchday)
- Filtro rápido por jornada (Fecha 1 a Fecha 19, Cuadrangulares, Final).
- Tarjetas con estado claro: `PROGRAMADO` (hora local Colombia), `EN VIVO` (pulso verde + minuto exacto), `FINALIZADO`.
- Indicador de canal de TV (*Win+*, *Win Sports*) y estadio/ciudad.

### Módulo 2: Match Center (`/partido/[id]`)
Vista detallada con 4 pestañas interactivas:
1. **Resumen:** Línea de tiempo vertical con goles, asistencias, tarjetas amarillas/rojas y sustituciones.
2. **Alineaciones:** Representación gráfica de cancha de fútbol con la formación táctica (ej. `4-2-3-1`), titulares, suplentes y Director Técnico.
3. **Estadísticas:** Barras comparativas de posesión (%), tiros totales, tiros al arco, tiros de esquina, faltas y fueras de lugar.
4. **Historial (H2H):** Últimos 5 enfrentamientos directos entre ambos clubes, historial en ese estadio y racha de los últimos 5 partidos de cada equipo.

### Módulo 3: Centro de Tablas FPC (`/tablas`)
Navegación por pestañas entre las 3 tablas vitales del fútbol colombiano:
1. **Todos contra Todos:** Posición, PJ, PG, PE, PP, GF, GC, DG, PTS y racha (últimos 5). Franja verde para puestos `1 al 8` (Cuadrangulares).
2. **Tabla de Reclasificación:** Acumulado anual mostrando los cupos a **Copa Libertadores** (azul/dorado) y **Copa Sudamericana** (verde).
3. **Tabla del Descenso:** Ordenada por **Promedio** (`Puntos últimos 3 años / Partidos jugados`), resaltando en rojo los últimos 2 puestos de descenso directo.

---

## 7. Hoja de Ruta de Desarrollo (Sprints)
- **Sprint 1:** Inicialización de Next.js + TypeScript + Tailwind, configuración de `Dockerfile` y `docker-compose.yml` (Next.js + Postgres + Redis) y esquema de Prisma + `seed.ts`.
- **Sprint 2:** Creación de `mocks/betplay-data.ts` y del servicio híbrido `football-service` con conexión a Redis.
- **Sprint 3:** Construcción de la UI de **MundoBarrista**: Layout principal, página de Partidos (Matchday) y vista detallada (`/partido/[id]`).
- **Sprint 4:** Construcción del Centro de Tablas (`/tablas`) con Posiciones, Reclasificación y Descenso.
- **Sprint 5:** Conexión con API-Football real (`USE_MOCK_DATA=false`) y pruebas de caché en vivo.