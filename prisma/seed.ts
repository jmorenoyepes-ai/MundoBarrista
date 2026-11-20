// ============================================
// MundoBarrista — Prisma Seed
// 20 equipos reales de la Liga BetPlay Dimayor
// + datos históricos de descenso (2024-2026)
// ============================================

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface TeamSeed {
  name: string;
  shortName: string;
  slug: string;
  city: string;
  stadium: string;
  stadiumCapacity: number;
  altitude: number;
  founded: number;
  primaryColor: string;
  secondaryColor: string;
}

interface RelegationSeed {
  slug: string;
  records: { year: number; points: number; played: number }[];
}

// ============================================
// Los 20 equipos del FPC — Liga BetPlay 2026
// ============================================
const teams: TeamSeed[] = [
  {
    name: 'Atlético Nacional',
    shortName: 'NAL',
    slug: 'atletico-nacional',
    city: 'Medellín',
    stadium: 'Estadio Atanasio Girardot',
    stadiumCapacity: 40943,
    altitude: 1495,
    founded: 1947,
    primaryColor: '#00843D',
    secondaryColor: '#FFFFFF',
  },
  {
    name: 'Millonarios FC',
    shortName: 'MIL',
    slug: 'millonarios',
    city: 'Bogotá',
    stadium: 'Estadio El Campín',
    stadiumCapacity: 36343,
    altitude: 2640,
    founded: 1946,
    primaryColor: '#003DA5',
    secondaryColor: '#FFFFFF',
  },
  {
    name: 'América de Cali',
    shortName: 'AME',
    slug: 'america-de-cali',
    city: 'Cali',
    stadium: 'Estadio Pascual Guerrero',
    stadiumCapacity: 35405,
    altitude: 1018,
    founded: 1927,
    primaryColor: '#C8102E',
    secondaryColor: '#FFFFFF',
  },
  {
    name: 'Deportivo Cali',
    shortName: 'CAL',
    slug: 'deportivo-cali',
    city: 'Cali',
    stadium: 'Estadio Deportivo Cali',
    stadiumCapacity: 52000,
    altitude: 965,
    founded: 1912,
    primaryColor: '#006633',
    secondaryColor: '#FFFFFF',
  },
  {
    name: 'Junior de Barranquilla',
    shortName: 'JUN',
    slug: 'junior',
    city: 'Barranquilla',
    stadium: 'Estadio Metropolitano Roberto Meléndez',
    stadiumCapacity: 49612,
    altitude: 18,
    founded: 1924,
    primaryColor: '#C8102E',
    secondaryColor: '#FFFFFF',
  },
  {
    name: 'Independiente Medellín',
    shortName: 'DIM',
    slug: 'independiente-medellin',
    city: 'Medellín',
    stadium: 'Estadio Atanasio Girardot',
    stadiumCapacity: 40943,
    altitude: 1495,
    founded: 1913,
    primaryColor: '#C8102E',
    secondaryColor: '#003DA5',
  },
  {
    name: 'Independiente Santa Fe',
    shortName: 'SFE',
    slug: 'independiente-santa-fe',
    city: 'Bogotá',
    stadium: 'Estadio El Campín',
    stadiumCapacity: 36343,
    altitude: 2640,
    founded: 1941,
    primaryColor: '#C8102E',
    secondaryColor: '#FFFFFF',
  },
  {
    name: 'Deportes Tolima',
    shortName: 'TOL',
    slug: 'deportes-tolima',
    city: 'Ibagué',
    stadium: 'Estadio Manuel Murillo Toro',
    stadiumCapacity: 32165,
    altitude: 1285,
    founded: 1954,
    primaryColor: '#8B1A1A',
    secondaryColor: '#FFD700',
  },
  {
    name: 'Once Caldas',
    shortName: 'ONC',
    slug: 'once-caldas',
    city: 'Manizales',
    stadium: 'Estadio Palogrande',
    stadiumCapacity: 28800,
    altitude: 2160,
    founded: 1961,
    primaryColor: '#FFFFFF',
    secondaryColor: '#000000',
  },
  {
    name: 'Deportivo Pasto',
    shortName: 'PAS',
    slug: 'deportivo-pasto',
    city: 'Pasto',
    stadium: 'Estadio Departamental Libertad',
    stadiumCapacity: 28800,
    altitude: 2559,
    founded: 1949,
    primaryColor: '#003DA5',
    secondaryColor: '#C8102E',
  },
  {
    name: 'La Equidad',
    shortName: 'EQU',
    slug: 'la-equidad',
    city: 'Bogotá',
    stadium: 'Estadio Metropolitano de Techo',
    stadiumCapacity: 10000,
    altitude: 2640,
    founded: 1982,
    primaryColor: '#006633',
    secondaryColor: '#FFFFFF',
  },
  {
    name: 'Envigado FC',
    shortName: 'ENV',
    slug: 'envigado',
    city: 'Envigado',
    stadium: 'Estadio Polideportivo Sur',
    stadiumCapacity: 14000,
    altitude: 1575,
    founded: 1989,
    primaryColor: '#FF6600',
    secondaryColor: '#000000',
  },
  {
    name: 'Águilas Doradas',
    shortName: 'AGU',
    slug: 'aguilas-doradas',
    city: 'Rionegro',
    stadium: 'Estadio Alberto Grisales',
    stadiumCapacity: 14000,
    altitude: 2125,
    founded: 2004,
    primaryColor: '#FFD700',
    secondaryColor: '#000000',
  },
  {
    name: 'Atlético Bucaramanga',
    shortName: 'BUC',
    slug: 'atletico-bucaramanga',
    city: 'Bucaramanga',
    stadium: 'Estadio Alfonso López',
    stadiumCapacity: 25000,
    altitude: 959,
    founded: 1949,
    primaryColor: '#FFD700',
    secondaryColor: '#006633',
  },
  {
    name: 'Boyacá Chicó',
    shortName: 'CHI',
    slug: 'boyaca-chico',
    city: 'Tunja',
    stadium: 'Estadio La Independencia',
    stadiumCapacity: 20000,
    altitude: 2782,
    founded: 2002,
    primaryColor: '#006633',
    secondaryColor: '#C8102E',
  },
  {
    name: 'Jaguares de Córdoba',
    shortName: 'JAG',
    slug: 'jaguares-de-cordoba',
    city: 'Montería',
    stadium: 'Estadio Jaraguay',
    stadiumCapacity: 20000,
    altitude: 18,
    founded: 2012,
    primaryColor: '#006633',
    secondaryColor: '#000000',
  },
  {
    name: 'Alianza FC',
    shortName: 'ALI',
    slug: 'alianza-fc',
    city: 'Valledupar',
    stadium: 'Estadio Armando Maestre Pavajeau',
    stadiumCapacity: 15000,
    altitude: 168,
    founded: 2004,
    primaryColor: '#000000',
    secondaryColor: '#FFD700',
  },
  {
    name: 'Deportivo Pereira',
    shortName: 'PEI',
    slug: 'deportivo-pereira',
    city: 'Pereira',
    stadium: 'Estadio Hernán Ramírez Villegas',
    stadiumCapacity: 30297,
    altitude: 1411,
    founded: 1944,
    primaryColor: '#C8102E',
    secondaryColor: '#FFD700',
  },
  {
    name: 'Patriotas Boyacá',
    shortName: 'PAT',
    slug: 'patriotas-boyaca',
    city: 'Tunja',
    stadium: 'Estadio La Independencia',
    stadiumCapacity: 20000,
    altitude: 2782,
    founded: 2003,
    primaryColor: '#C8102E',
    secondaryColor: '#003DA5',
  },
  {
    name: 'Fortaleza CEIF',
    shortName: 'FOR',
    slug: 'fortaleza-ceif',
    city: 'Bogotá',
    stadium: 'Estadio Metropolitano de Techo',
    stadiumCapacity: 10000,
    altitude: 2640,
    founded: 2008,
    primaryColor: '#8B0000',
    secondaryColor: '#FFD700',
  },
];

// ============================================
// Datos históricos de descenso (2024-2026)
// Puntos y partidos jugados por año
// Datos aproximados reales de las temporadas
// ============================================
const relegationData: RelegationSeed[] = [
  { slug: 'atletico-nacional',       records: [{ year: 2024, points: 109, played: 52 }, { year: 2025, points: 102, played: 50 }, { year: 2026, points: 48, played: 24 }] },
  { slug: 'millonarios',             records: [{ year: 2024, points: 100, played: 52 }, { year: 2025, points: 95,  played: 50 }, { year: 2026, points: 44, played: 24 }] },
  { slug: 'america-de-cali',         records: [{ year: 2024, points: 88,  played: 52 }, { year: 2025, points: 90,  played: 50 }, { year: 2026, points: 42, played: 24 }] },
  { slug: 'deportivo-cali',          records: [{ year: 2024, points: 70,  played: 52 }, { year: 2025, points: 78,  played: 50 }, { year: 2026, points: 36, played: 24 }] },
  { slug: 'junior',                  records: [{ year: 2024, points: 95,  played: 52 }, { year: 2025, points: 88,  played: 50 }, { year: 2026, points: 40, played: 24 }] },
  { slug: 'independiente-medellin',  records: [{ year: 2024, points: 85,  played: 52 }, { year: 2025, points: 92,  played: 50 }, { year: 2026, points: 41, played: 24 }] },
  { slug: 'independiente-santa-fe',  records: [{ year: 2024, points: 82,  played: 52 }, { year: 2025, points: 86,  played: 50 }, { year: 2026, points: 38, played: 24 }] },
  { slug: 'deportes-tolima',         records: [{ year: 2024, points: 90,  played: 52 }, { year: 2025, points: 85,  played: 50 }, { year: 2026, points: 39, played: 24 }] },
  { slug: 'once-caldas',             records: [{ year: 2024, points: 75,  played: 52 }, { year: 2025, points: 80,  played: 50 }, { year: 2026, points: 35, played: 24 }] },
  { slug: 'deportivo-pasto',         records: [{ year: 2024, points: 72,  played: 52 }, { year: 2025, points: 70,  played: 50 }, { year: 2026, points: 32, played: 24 }] },
  { slug: 'la-equidad',              records: [{ year: 2024, points: 78,  played: 52 }, { year: 2025, points: 74,  played: 50 }, { year: 2026, points: 33, played: 24 }] },
  { slug: 'envigado',                records: [{ year: 2024, points: 68,  played: 52 }, { year: 2025, points: 65,  played: 50 }, { year: 2026, points: 28, played: 24 }] },
  { slug: 'aguilas-doradas',         records: [{ year: 2024, points: 65,  played: 52 }, { year: 2025, points: 68,  played: 50 }, { year: 2026, points: 30, played: 24 }] },
  { slug: 'atletico-bucaramanga',    records: [{ year: 2024, points: 92,  played: 52 }, { year: 2025, points: 82,  played: 50 }, { year: 2026, points: 37, played: 24 }] },
  { slug: 'boyaca-chico',            records: [{ year: 2024, points: 60,  played: 52 }, { year: 2025, points: 62,  played: 50 }, { year: 2026, points: 26, played: 24 }] },
  { slug: 'jaguares-de-cordoba',     records: [{ year: 2024, points: 62,  played: 52 }, { year: 2025, points: 58,  played: 50 }, { year: 2026, points: 25, played: 24 }] },
  { slug: 'alianza-fc',              records: [{ year: 2024, points: 55,  played: 52 }, { year: 2025, points: 60,  played: 50 }, { year: 2026, points: 24, played: 24 }] },
  { slug: 'deportivo-pereira',       records: [{ year: 2024, points: 73,  played: 52 }, { year: 2025, points: 72,  played: 50 }, { year: 2026, points: 31, played: 24 }] },
  { slug: 'patriotas-boyaca',        records: [{ year: 2024, points: 58,  played: 52 }, { year: 2025, points: 55,  played: 50 }, { year: 2026, points: 22, played: 24 }] },
  { slug: 'fortaleza-ceif',          records: [{ year: 2024, points: 52,  played: 52 }, { year: 2025, points: 54,  played: 50 }, { year: 2026, points: 20, played: 24 }] },
];

async function main() {
  console.log('🌱 Iniciando seed de MundoBarrista...\n');

  // --- 1. Crear los 20 equipos ---
  console.log('⚽ Creando equipos de la Liga BetPlay...');
  for (const teamData of teams) {
    await prisma.team.upsert({
      where: { slug: teamData.slug },
      update: teamData,
      create: teamData,
    });
  }
  console.log(`   ✅ ${teams.length} equipos creados/actualizados\n`);

  // --- 2. Cargar datos históricos de descenso ---
  console.log('📊 Cargando datos históricos de descenso (2024-2026)...');
  for (const entry of relegationData) {
    const team = await prisma.team.findUnique({
      where: { slug: entry.slug },
    });

    if (!team) {
      console.warn(`   ⚠️  Equipo no encontrado: ${entry.slug}`);
      continue;
    }

    for (const record of entry.records) {
      await prisma.relegationRecord.upsert({
        where: {
          teamId_year: {
            teamId: team.id,
            year: record.year,
          },
        },
        update: {
          points: record.points,
          played: record.played,
        },
        create: {
          teamId: team.id,
          year: record.year,
          points: record.points,
          played: record.played,
        },
      });
    }
  }
  console.log(`   ✅ Datos de descenso cargados (${relegationData.length} equipos × 3 años)\n`);

  // --- 3. Resumen de promedios ---
  console.log('📋 Tabla del Descenso (Promedio):');
  console.log('   ─────────────────────────────────────────────');

  const allTeams = await prisma.team.findMany({
    include: { relegationRecords: true },
    orderBy: { name: 'asc' },
  });

  const promedios = allTeams
    .map((team) => {
      const totalPoints = team.relegationRecords.reduce((sum, r) => sum + r.points, 0);
      const totalPlayed = team.relegationRecords.reduce((sum, r) => sum + r.played, 0);
      const promedio = totalPlayed > 0 ? totalPoints / totalPlayed : 0;
      return { name: team.shortName, totalPoints, totalPlayed, promedio };
    })
    .sort((a, b) => b.promedio - a.promedio);

  for (const p of promedios) {
    const icon = promedios.indexOf(p) >= promedios.length - 2 ? '🔴' : '  ';
    console.log(
      `   ${icon} ${p.name.padEnd(4)} | PTS: ${String(p.totalPoints).padStart(3)} | PJ: ${String(p.totalPlayed).padStart(3)} | Promedio: ${p.promedio.toFixed(3)}`
    );
  }

  console.log('\n🏁 Seed completado exitosamente.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error en seed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
