'use client';

import { useState } from 'react';
import { SocialSignIn, type Provider } from './social-sign-in';
import { useForm } from 'react-hook-form';
import {
  signUpFormSchema,
  type SignUpFormSchema,
} from '@/lib/validators/sign-up';
import { zodResolver } from '@hookform/resolvers/zod';
import { authClient } from '@/lib/auth/client';
import { toast } from 'sonner';
import { DevopageLogo } from '../shared/devopage-logo';
import Link from 'next/link';
import { Form, FormField } from '../ui/form';
import { FieldWithIcon } from './field-with-icon';
import { IconAt, IconLoader2, IconLock, IconUser } from '@tabler/icons-react';
import { Button } from '../ui/button';
import type { AuthPage } from './dialog';
import { DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { useRouter } from 'next/navigation';

export function SignUpForm({
  switchPage,
}: {
  switchPage: (page: AuthPage) => void;
}) {
  const [oauthMode, setOauthMode] = useState<Provider>();
  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const router = useRouter();
  const isDisabled =
    typeof oauthMode !== 'undefined' || form.formState.isSubmitting;

  async function onSubmit(values: SignUpFormSchema) {
    const { error } = await authClient.signUp.email({
      email: values.email,
      name: values.name,
      password: values.password,
    });

    if (error) {
      toast.error(error.message || 'Something went wrong!');
      return;
    }

    toast.success('Account created successfully!');
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
                name="name"
                render={({ field }) => (
                  <FieldWithIcon
                    label="Name"
                    disabled={isDisabled}
                    icon={IconUser}
                    placeholder="John Doe"
                    field={field}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FieldWithIcon
                    label="Email"
                    disabled={isDisabled}
                    placeholder="johndoe@example.com"
                    icon={IconAt}
                    field={field}
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
                    disabled={isDisabled}
                    placeholder="Create a password"
                    icon={IconLock}
                    field={field}
                    type="password"
                  />
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FieldWithIcon
                    label="Confirm Password"
                    disabled={isDisabled}
                    placeholder="Confirm your password"
                    icon={IconLock}
                    field={field}
                    type="password"
                  />
                )}
              />

              <Button disabled={isDisabled} className="mt-6 w-full">
                {form.formState.isSubmitting && (
                  <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create Account
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-muted rounded-b-lg border-t px-6 py-4">
            <p className="text-muted-foreground text-center text-sm">
              Have an account?
              <Button
                onClick={() => switchPage('sign-in')}
                variant="link"
                className="text-primary h-auto p-0 font-medium"
                disabled={isDisabled}
              >
                Sign In
              </Button>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
