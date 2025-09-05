'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth/client';
import {
  IconBrandGithub,
  IconBrandGoogleFilled,
  IconLoader2,
} from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

export type Provider = 'github' | 'google';

interface SocialSignInProps {
  provider: Provider;
  onStart: () => void;
  onEnd: () => void;
  disabled: boolean;
}

function getLogo(provider: Provider) {
  return provider === 'github' ? (
    <IconBrandGithub className="h-4 w-4" />
  ) : (
    <IconBrandGoogleFilled className="h-4 w-4" />
  );
}

export function SocialSignIn({
  provider,
  onStart,
  onEnd,
  disabled,
}: SocialSignInProps) {
  const [isPending, startTransition] = useTransition();
  const pathName = usePathname();
  return (
    <Button
      onClick={() =>
        startTransition(async () => {
          await authClient.signIn.social({
            provider,
            callbackURL: pathName,
            fetchOptions: {
              onRequest: onStart,
              onResponse: onEnd,
              onError: ({ error }) => {
                toast.error(error.message || 'Internal Server Error');
              },
            },
          });
        })
      }
      variant="outline"
      type="button"
      disabled={isPending || disabled}
      className="flex items-center justify-center gap-2"
    >
      {isPending ? (
        <IconLoader2 className="h-4 w-4 animate-spin" />
      ) : (
        getLogo(provider)
      )}
      <span className="text-sm capitalize">{provider}</span>
    </Button>
  );
}
