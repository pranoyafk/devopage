'use client';

import { DevopageLogo } from '@/components/shared/devopage-logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '@/components/ui/form';
import { FieldWithIcon } from '../_components/field-with-icon';
import { IconAt, IconLoader2, IconLock } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authClient } from '@/lib/auth/client';
import { toast } from 'sonner';
import { useState } from 'react';
import { SocialSignIn, type Provider } from '../_components/social-sign-in';
import { signInFormSchema, type SignInFormSchema } from '@/lib/validators/sign-in';

export default function SignInPage() {
  const form = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const router = useRouter();
  const [oauthMode, setOauthMode] = useState<Provider>();
  const searchParams = useSearchParams();
  const nextPage = searchParams.get('nextPage') || '/';

  const isDisabled = typeof oauthMode !== 'undefined' || form.formState.isSubmitting;

  async function onSubmit(values: SignInFormSchema) {
    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });

    if (error) {
      toast.error(error.message || 'Something went wrong!');
      return;
    }

    toast.success('Welcome back!');
    router.replace(nextPage);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-card m-auto mt-10 w-full max-w-sm rounded-lg border p-0.5 shadow-md"
      >
        <div className="p-8 pb-6">
          <div>
            <Link href="/" aria-label="go home">
              <DevopageLogo />
            </Link>
            <h1 className="mt-4 mb-1 text-xl font-semibold">Sign In to Devopage</h1>
            <p className="text-sm">Welcome back! Sign in to continue</p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <SocialSignIn
              provider="google"
              onStart={() => setOauthMode('google')}
              onEnd={() => setOauthMode(undefined)}
              disabled={oauthMode === 'github'}
            />
            <SocialSignIn
              provider="github"
              onStart={() => setOauthMode('github')}
              onEnd={() => setOauthMode(undefined)}
              disabled={oauthMode === 'google'}
            />
          </div>

          <hr className="my-4 border-dashed" />

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FieldWithIcon
                  label="Email"
                  placeholder="johndoe@example.com"
                  icon={IconAt}
                  field={field}
                  disabled={isDisabled}
                />
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FieldWithIcon
                  label="Password"
                  placeholder="********"
                  icon={IconLock}
                  field={field}
                  disabled={isDisabled}
                />
              )}
            />

            <Button disabled={isDisabled} className="w-full">
              {form.formState.isSubmitting && <IconLoader2 className="animate-spin" />}
              Sign In
            </Button>
          </div>
        </div>

        <div className="bg-muted rounded-lg border p-3">
          <p className="text-accent-foreground text-center text-sm">
            {"Don't have an account ?"}
            <Button disabled={isDisabled} asChild variant="link" className="px-2">
              <Link href={`/sign-up?nextPage=${nextPage}`}>Create account</Link>
            </Button>
          </p>
        </div>
      </form>
    </Form>
  );
}
