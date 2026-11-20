# MundoBarrista ⚽

Plataforma web informativa, estadística y en tiempo real del fútbol colombiano.  
Enfocada inicialmente en la **Liga BetPlay Dimayor**.

## Stack Tecnológico

- **Framework:** Next.js 14 (App Router) + React 18 + TypeScript
- **Estilos:** Tailwind CSS + lucide-react
- **Base de datos:** PostgreSQL 16 + Prisma ORM
- **Caché:** Redis 7
- **Contenedores:** Docker + Docker Compose
- **Paquetes:** pnpm

## Inicio Rápido

### Requisitos
- Node.js 20+
- pnpm 9+
- Docker y Docker Compose

### Instalación

```bash
# 1. Clonar e instalar dependencias
pnpm install

# 2. Copiar variables de entorno
cp .env.example .env

# 3. Levantar PostgreSQL y Redis con Docker
pnpm docker:up

# 4. Generar cliente Prisma y ejecutar migraciones
pnpm db:generate
pnpm db:migrate

# 5. Cargar datos iniciales (20 equipos FPC)
pnpm db:seed

# 6. Iniciar servidor de desarrollo
pnpm dev
```

### Docker Compose completo

```bash
# Construir y levantar los 3 servicios (app + postgres + redis)
docker compose up -d --build
```

## Estructura del Proyecto

```
mundobarrista/
├── docker-compose.yml
├── Dockerfile
├── .env.example
├── prisma/
│   ├── schema.prisma     # Modelos de datos
│   └── seed.ts           # 20 equipos reales del FPC
└── src/
    ├── app/              # Next.js App Router
    ├── components/       # Componentes React
    ├── lib/              # Prisma, Redis, utilidades
    ├── mocks/            # Datos mock para desarrollo
    └── types/            # Tipos TypeScript
```

## Licencia

Proyecto privado — MundoBarrista © 2026
