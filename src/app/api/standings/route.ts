// ============================================
// MundoBarrista — Route Handler: /api/standings
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { footballService } from '@/lib/football-service';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all'; // regular | reclassification | relegation | all

    if (type === 'regular') {
      const standings = await footballService.getStandings();
      return NextResponse.json({ success: true, data: standings });
    }

    if (type === 'reclassification') {
      const reclassification = await footballService.getReclassification();
      return NextResponse.json({ success: true, data: reclassification });
    }

    if (type === 'relegation') {
      const relegation = await footballService.getRelegation();
      return NextResponse.json({ success: true, data: relegation });
    }

    // Por defecto 'all': devuelve las 3 tablas simultáneamente
    const [regular, reclassification, relegation] = await Promise.all([
      footballService.getStandings(),
      footballService.getReclassification(),
      footballService.getRelegation(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        regular,
        reclassification,
        relegation,
      },
    });
  } catch (error) {
    console.error('Error en GET /api/standings:', error);
    return NextResponse.json(
      { success: false, error: 'Error al consultar las tablas' },
      { status: 500 }
    );
  }
}
