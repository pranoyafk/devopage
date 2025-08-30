"use client";

import { DevopageLogo } from "@/components/shared/devopage-logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  signUpFormSchema,
  type SignUpFormSchema,
} from "@/lib/validators/sign-up";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import { GoogleButton } from "../_components/google-button";
import { GithubButton } from "../_components/github-button";
import { IconField } from "../_components/icon-field";
import { IconAt, IconLock, IconUser } from "@tabler/icons-react";
import { authClient } from "@/lib/auth/client";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignUpPage() {
  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const searchParams = useSearchParams();
  const nextPage = searchParams.get("nextPage") || "/";
  const router = useRouter();

  async function onSubmit(values: SignUpFormSchema) {
    const { error } = await authClient.signUp.email({
      email: values.email,
      name: values.name,
      password: values.password,
    });

    if (error) {
      toast.error(error.message || "Something went wrong!");
      return;
    }

    toast.success("Account created successfully!");
    router.replace(nextPage);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-card m-auto w-full max-w-sm rounded-lg border p-0.5 mt-10 shadow-md"
      >
        <div className="p-8 pb-6">
          <div>
            <Link href="/" aria-label="go home">
              <DevopageLogo />
            </Link>
            <h1 className="mb-1 mt-4 text-xl font-semibold">
              Create a Devopage Account
            </h1>
            <p className="text-sm">Welcome! Create an account to get started</p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <GoogleButton />
            <GithubButton />
          </div>

          <hr className="my-4 border-dashed" />

          <div className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <IconField
                  label="Name"
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
                <IconField
                  label="Email"
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
                <IconField
                  label="Password"
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
                <IconField
                  label="Confirm Password"
                  placeholder="********"
                  icon={IconLock}
                  field={field}
                />
              )}
            />

            <Button loading={form.formState.isSubmitting} className="w-full">
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
