import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import {eq} from 'drizzle-orm';
import {verifyAccessToken} from '@/lib/auth/jwt';
import {db} from '@/lib/db';
import {users} from '@/lib/db/schema';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  try {
    const payload = verifyAccessToken(token);
    const [user] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        roles: users.roles,
        profile_image: users.profile_image
      })
      .from(users)
      .where(eq(users.id, payload.sub));

    if (!user) {
      return NextResponse.json({error: 'User not found'}, {status: 404});
    }

    return NextResponse.json(user);
  } catch {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }
}
