"use client";

import { DevopageLogo } from "@/components/shared/devopage-logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GoogleButton } from "../_components/google-button";
import { GithubButton } from "../_components/github-button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type SignInSchema } from "@/lib/validators/sign-in";
import { Form, FormField } from "@/components/ui/form";
import { IconField } from "../_components/icon-field";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth/client";
import { toast } from "sonner";

export default function SignInPage() {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const searchParams = useSearchParams();
  const nextPage = searchParams.get("nextPage") || "/";
  const router = useRouter();

  async function onSubmit(values: SignInSchema) {
    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });

    if (error) {
      toast.error(error.message || "Something went wrong!");
      return;
    }

    toast.success("Welcome back!");
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
              Sign In to Devopage
            </h1>
            <p className="text-sm">Welcome back! Sign in to continue</p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <GoogleButton />
            <GithubButton />
          </div>

          <hr className="my-4 border-dashed" />

          <div className="space-y-6">
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

            <Button loading={form.formState.isSubmitting} className="w-full">
              Sign In
            </Button>
          </div>
        </div>

        <div className="bg-muted rounded-lg border p-3">
          <p className="text-accent-foreground text-center text-sm">
            {"Don't have an account ?"}
            <Button asChild variant="link" className="px-2">
              <Link href={`/sign-up?nextPage=${nextPage}`}>Create account</Link>
            </Button>
          </p>
        </div>
      </form>
    </Form>
  );
}
