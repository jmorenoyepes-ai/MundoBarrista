// ============================================
// MundoBarrista — Route Handler: /api/matches/[id]
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { footballService } from '@/lib/football-service';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const matchId = parseInt(params.id, 10);

    if (isNaN(matchId)) {
      return NextResponse.json(
        { success: false, error: 'ID de partido inválido' },
        { status: 400 }
      );
    }

    const detail = await footballService.getMatchById(matchId);

    if (!detail) {
      return NextResponse.json(
        { success: false, error: 'Partido no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: detail,
    });
  } catch (error) {
    console.error(`Error en GET /api/matches/${params.id}:`, error);
    return NextResponse.json(
      { success: false, error: 'Error al consultar el detalle del partido' },
      { status: 500 }
    );
  }
}
