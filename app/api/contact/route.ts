import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const endpoint = process.env.GOOGLE_APPS_SCRIPT_URL;

  if (!endpoint) {
    return NextResponse.json(
      { ok: false, message: 'Falta configurar el endpoint de contacto.' },
      { status: 500 },
    );
  }

  try {
    const payload = await request.json();
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow',
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, message: 'Google Sheets no aceptó la consulta.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, message: 'No se pudo guardar la consulta.' },
      { status: 502 },
    );
  }
}
