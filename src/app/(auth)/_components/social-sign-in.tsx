'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth/client';
import { IconBrandGithub, IconBrandGoogleFilled, IconLoader2 } from '@tabler/icons-react';
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
  return provider === 'github' ? <IconBrandGithub /> : <IconBrandGoogleFilled />;
}

export function SocialSignIn({ provider, onStart, onEnd, disabled }: SocialSignInProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      onClick={() =>
        startTransition(async () => {
          await authClient.signIn.social({
            provider,
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
    >
      {isPending ? <IconLoader2 className="animate-spin" /> : getLogo(provider)}
      <span className="capitalize">{provider}</span>
    </Button>
  );
}
