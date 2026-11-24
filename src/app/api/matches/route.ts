// ============================================
// MundoBarrista — Route Handler: /api/matches
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { footballService } from '@/lib/football-service';
import { MatchPhase, MatchStatus } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const matchdayParam = searchParams.get('matchday');
    const statusParam = searchParams.get('status') as MatchStatus | null;
    const phaseParam = searchParams.get('phase') as MatchPhase | null;
    const seasonParam = searchParams.get('season');

    const matches = await footballService.getMatches({
      matchday: matchdayParam ? parseInt(matchdayParam, 10) : undefined,
      status: statusParam ?? undefined,
      phase: phaseParam ?? undefined,
      season: seasonParam ? parseInt(seasonParam, 10) : undefined,
    });

    return NextResponse.json({
      success: true,
      count: matches.length,
      data: matches,
    });
  } catch (error) {
    console.error('Error en GET /api/matches:', error);
    return NextResponse.json(
      { success: false, error: 'Error al consultar partidos' },
      { status: 500 }
    );
  }
}
