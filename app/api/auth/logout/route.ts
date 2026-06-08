import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ message: 'Logged out' });

  response.cookies.set({
    name: 'auth_token',
    value: '',
    httpOnly: true,
    maxAge: 0,
  });

  return response;
}
