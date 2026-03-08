'use client';

import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {authKeys} from './auth-keys';
import {
  getCurrentUser,
  loginAction,
  registerAction,
  logoutAction
} from './auth-actions';
import type {CurrentUser} from './auth-actions';
import {STALE_TIMES, GC_TIMES} from '@/lib/query-config';

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: () => getCurrentUser(),
    staleTime: STALE_TIMES.fresh,
    gcTime: GC_TIMES.fresh
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({email, password}: {email: string; password: string}) =>
      loginAction(email, password),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({queryKey: authKeys.currentUser()});
      }
    }
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: ({
      name,
      email,
      password
    }: {
      name: string;
      email: string;
      password: string;
    }) => registerAction(name, email, password)
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logoutAction(),
    onSuccess: () => {
      queryClient.setQueryData<CurrentUser | null>(authKeys.currentUser(), null);
    }
  });
}
