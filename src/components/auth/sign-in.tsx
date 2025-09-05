'use client';

import { authClient } from '@/lib/auth/client';
import {
  signInFormSchema,
  type SignInFormSchema,
} from '@/lib/validators/sign-in';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Form, FormField } from '../ui/form';
import Link from 'next/link';
import { DevopageLogo } from '../shared/devopage-logo';
import { SocialSignIn, type Provider } from './social-sign-in';
import { useState } from 'react';
import { FieldWithIcon } from './field-with-icon';
import { IconAt, IconLoader2, IconLock } from '@tabler/icons-react';
import { Button } from '../ui/button';
import type { AuthPage } from './dialog';
import { DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { useRouter } from 'next/navigation';

export function SignInForm({
  switchPage,
}: {
  switchPage: (page: AuthPage) => void;
}) {
  const form = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [oauthMode, setOauthMode] = useState<Provider>();
  const router = useRouter();

  const isDisabled =
    typeof oauthMode !== 'undefined' || form.formState.isSubmitting;

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
    router.refresh();
  }

  return (
    <div className="bg-card w-full rounded-lg border shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          {/* Header */}
          <div className="p-6 pb-4">
            <DialogHeader>
              <Link href="/" aria-label="go home">
                <DevopageLogo />
              </Link>
              <DialogTitle className="text-xl font-semibold">
                Sign In to Devopage
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm">
                Welcome back! Sign in to continue
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Form Content */}
          <div className="px-6 pb-6">
            {/* Social Sign In */}
            <div className="mb-4 grid grid-cols-2 gap-3">
              <SocialSignIn
                provider="google"
                onStart={() => setOauthMode('google')}
                onEnd={() => setOauthMode(undefined)}
                disabled={oauthMode === 'github' || form.formState.isSubmitting}
              />
              <SocialSignIn
                provider="github"
                onStart={() => setOauthMode('github')}
                onEnd={() => setOauthMode(undefined)}
                disabled={oauthMode === 'google' || form.formState.isSubmitting}
              />
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dashed" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card text-muted-foreground px-2">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
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
                    type="email"
                  />
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FieldWithIcon
                    label="Password"
                    placeholder="Enter your password"
                    icon={IconLock}
                    field={field}
                    disabled={isDisabled}
                    type="password"
                  />
                )}
              />

              <Button disabled={isDisabled} className="mt-6 w-full">
                {form.formState.isSubmitting && (
                  <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-muted rounded-b-lg border-t px-6 py-4">
            <p className="text-muted-foreground text-center text-sm">
              {"Don't have an account?"}
              <Button
                disabled={isDisabled}
                onClick={() => switchPage('sign-up')}
                variant="link"
                className="text-primary h-auto p-0 font-medium"
              >
                Create Account
              </Button>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
