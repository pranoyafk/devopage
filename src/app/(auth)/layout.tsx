import { auth } from '@/lib/auth/server';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const getSessionData = await auth.api.getSession({
    headers: await headers(),
  });

  if (getSessionData) notFound();
  return <section className="flex max-h-screen items-center justify-center">{children}</section>;
}
