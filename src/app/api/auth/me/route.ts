import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import {verifyAccessToken} from '@/lib/auth/jwt';
import {prisma} from '@/lib/prisma';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  try {
    const payload = verifyAccessToken(token);
    const user = await prisma.users.findUnique({
      where: {id: payload.sub},
      select: {id: true, name: true, email: true, roles: true, profile_image: true}
    });

    if (!user) {
      return NextResponse.json({error: 'User not found'}, {status: 404});
    }

    return NextResponse.json(user);
  } catch {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }
}
