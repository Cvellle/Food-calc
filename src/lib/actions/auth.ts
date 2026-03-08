'use server';

import {cookies} from 'next/headers';
import bcrypt from 'bcryptjs';
import {prisma} from '@/lib/prisma';
import {signAccessToken, signRefreshToken} from '@/lib/auth/jwt';

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: {id: number; name: string; email: string; roles: unknown};
}

export async function loginAction(
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    const user = await prisma.users.findUnique({where: {email}});

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return {success: false, error: 'Invalid credentials'};
    }

    const payload = {sub: user.id, email: user.email};
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    await prisma.users.update({
      where: {id: user.id},
      data: {refresh_token: refreshToken}
    });

    const cookieStore = await cookies();
    const isProduction = process.env.NODE_ENV === 'production';

    cookieStore.set('accessToken', accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 15 * 60
    });
    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60
    });

    return {
      success: true,
      user: {id: user.id, name: user.name, email: user.email, roles: user.roles}
    };
  } catch (err) {
    console.error('[loginAction]', err);
    return {success: false, error: 'Something went wrong. Please try again.'};
  }
}

export async function registerAction(
  name: string,
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    const existing = await prisma.users.findUnique({where: {email}});
    if (existing) {
      return {success: false, error: 'Email already registered'};
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.users.create({
      data: {name, email, password: hashed}
    });

    return {
      success: true,
      user: {id: user.id, name: user.name, email: user.email, roles: user.roles}
    };
  } catch (err) {
    console.error('[registerAction]', err);
    return {success: false, error: 'Something went wrong. Please try again.'};
  }
}
