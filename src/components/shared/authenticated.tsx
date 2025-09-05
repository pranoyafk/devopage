import { authClient, type User } from '@/lib/auth/client';
import type { ReactNode } from 'react';

interface AuthenticatedProps {
  children: (user: User) => ReactNode;
  fallback?: ReactNode;
  pending?: ReactNode;
}

export function Authenticated({
  children,
  fallback = null,
  pending = null,
}: AuthenticatedProps) {
  const { data, isPending } = authClient.useSession();
  if (isPending) return pending;
  if (!data) return fallback;

  return children(data.user);
}
