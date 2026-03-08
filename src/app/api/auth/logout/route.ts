import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import {verifyRefreshToken} from '@/lib/auth/jwt';
import {prisma} from '@/lib/prisma';

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get('refreshToken')?.value;

  if (token) {
    try {
      const payload = verifyRefreshToken(token);
      await prisma.users.update({
        where: {id: payload.sub},
        data: {refresh_token: null}
      }).catch(() => null);
    } catch {
      // ignore invalid token on logout
    }
  }

  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');

  return NextResponse.json({success: true});
}
