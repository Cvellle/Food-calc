'use client';

import {useState} from 'react';
import {AuthCard} from '@/components/AuthCard';
import {Input} from '@/components/Input';
import {Button} from '@/components/Button';
import Link from 'next/link';
import {endpoint} from '../../../../../config/endpoint';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      password: form.get('password')
    };

    await fetch(`${endpoint}/auth/register`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });

    setLoading(false);
  }

  return (
    <AuthCard title="Create account">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="name" placeholder="Full name" required />
        <Input name="email" type="email" placeholder="Email" required />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
        />

        <Button disabled={loading}>
          {loading ? 'Creating...' : 'Sign up'}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="text-emerald-600 font-medium">
          Login
        </Link>
      </p>
    </AuthCard>
  );
}
