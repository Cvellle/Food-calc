'use client';

import {useState} from 'react';
import {useDispatch} from 'react-redux';

import {AuthCard} from '@/components/AuthCard';
import {Input} from '@/components/Input';
import {Button} from '@/components/Button';
import Link from 'next/link';
import {endpoint} from '../../../../../config/endpoint';
import {fetchCurrentUser} from '@/lib/features/auth/authSlice';

import {AppDispatch} from '@/lib/store';

export default function LoginPage() {
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = new FormData(e.currentTarget);

    const payload = {
      email: form.get('email') as string,
      password: form.get('password') as string
    };

    try {
      const res = await fetch(`${endpoint}/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        // to send the cookie
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Login failed');

      dispatch(fetchCurrentUser());
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Welcome back">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="email" type="email" placeholder="Email" required />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
        />

        <Button disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>

      {error && (
        <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
      )}

      <p className="mt-4 text-center text-sm text-gray-600">
        No account?{' '}
        <Link href="/register" className="text-red-600 font-medium">
          Sign up
        </Link>
      </p>
    </AuthCard>
  );
}
