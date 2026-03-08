import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import {eq} from 'drizzle-orm';
import {verifyRefreshToken} from '@/lib/auth/jwt';
import {db} from '@/lib/db';
import {users} from '@/lib/db/schema';

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get('refreshToken')?.value;

  if (token) {
    try {
      const payload = verifyRefreshToken(token);
      await db
        .update(users)
        .set({refresh_token: null})
        .where(eq(users.id, payload.sub))
        .catch(() => null);
    } catch {
      // ignore invalid token on logout
    }
  }

  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');

  return NextResponse.json({success: true});
}
