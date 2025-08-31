'use client';

import { DevopageLogo } from '@/components/shared/devopage-logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { signUpFormSchema, type SignUpFormSchema } from '@/lib/validators/sign-up';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormField } from '@/components/ui/form';
import { FieldWithIcon } from '../_components/field-with-icon';
import { IconAt, IconLoader2, IconLock, IconUser } from '@tabler/icons-react';
import { authClient } from '@/lib/auth/client';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SocialSignIn, type Provider } from '../_components/social-sign-in';

export default function SignUpPage() {
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
  const searchParams = useSearchParams();
  const nextPage = searchParams.get('nextPage') || '/';
  const router = useRouter();

  const isDisabled = typeof oauthMode !== 'undefined' || form.formState.isSubmitting;

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
            <h1 className="mt-4 mb-1 text-xl font-semibold">Create a Devopage Account</h1>
            <p className="text-sm">Welcome! Create an account to get started</p>
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

          <div className="space-y-5">
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
                  placeholder="********"
                  icon={IconLock}
                  field={field}
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
                  placeholder="********"
                  icon={IconLock}
                  field={field}
                />
              )}
            />

            <Button disabled={isDisabled} className="w-full">
              {form.formState.isSubmitting && <IconLoader2 className="animate-spin" />}
              Continue
            </Button>
          </div>
        </div>

        <div className="bg-muted rounded-lg border p-3">
          <p className="text-accent-foreground text-center text-sm">
            Have an account ?
            <Button asChild variant="link" className="px-2">
              <Link href={`/sign-in?nextPage=${nextPage}`}>Sign In</Link>
            </Button>
          </p>
        </div>
      </form>
    </Form>
  );
}
