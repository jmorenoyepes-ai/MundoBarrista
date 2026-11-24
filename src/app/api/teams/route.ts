// ============================================
// MundoBarrista — Route Handler: /api/teams
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { footballService } from '@/lib/football-service';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');

    if (id) {
      const team = await footballService.getTeamById(parseInt(id, 10));
      if (!team) {
        return NextResponse.json(
          { success: false, error: 'Equipo no encontrado' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: team });
    }

    if (slug) {
      const team = await footballService.getTeamBySlug(slug);
      if (!team) {
        return NextResponse.json(
          { success: false, error: 'Equipo no encontrado' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: team });
    }

    const teams = await footballService.getTeams();
    return NextResponse.json({
      success: true,
      count: teams.length,
      data: teams,
    });
  } catch (error) {
    console.error('Error en GET /api/teams:', error);
    return NextResponse.json(
      { success: false, error: 'Error al consultar equipos' },
      { status: 500 }
    );
  }
}
