import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import {verifyRefreshToken, signAccessToken} from '@/lib/auth/jwt';
import {prisma} from '@/lib/prisma';

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get('refreshToken')?.value;

  if (!token) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  try {
    const payload = verifyRefreshToken(token);

    // Verify it matches what's stored in the users table
    const user = await prisma.users.findFirst({
      where: {id: payload.sub, refresh_token: token}
    });

    if (!user) {
      return NextResponse.json({error: 'Token invalid or expired'}, {status: 401});
    }

    const accessToken = signAccessToken({sub: payload.sub, email: payload.email});

    cookieStore.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 15 * 60
    });

    return NextResponse.json({accessToken});
  } catch {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }
}
