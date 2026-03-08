'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {AuthCard} from '@/components/AuthCard';
import {Input} from '@/components/Input';
import {Button} from '@/components/Button';
import Link from 'next/link';
import {registerAction} from '@/lib/actions/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const form = new FormData(e.currentTarget);
      const result = await registerAction(
        form.get('name') as string,
        form.get('email') as string,
        form.get('password') as string
      );

      if (!result.success) {
        setError(result.error ?? 'Registration failed');
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push('/login'), 2000);
    } catch {
      setError('Unexpected error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Create account">
      {!success ? (
        <>
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

          {error && (
            <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
          )}

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-emerald-600 font-medium">
              Login
            </Link>
          </p>
        </>
      ) : (
        <div className="py-8 text-center animate-in fade-in zoom-in duration-300">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-stone-800">Account created!</h3>
          <p className="text-stone-500 text-sm">
            You are being redirected to login page...
          </p>
        </div>
      )}
    </AuthCard>
  );
}
