"use client";

import { useTransition, type ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import {
  IconLoader2,
  IconLogout,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";

export function UserMenu({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isSignOutPending, startSignOutTransition] = useTransition();

  const handleSignOutSelect = (event: Event) => {
    event.preventDefault();
    startSignOutTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.refresh();
          },
        },
      });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[230px]">
        <DropdownMenuItem className="gap-2">
          <IconUser />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <IconSettings />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={handleSignOutSelect}
          disabled={isSignOutPending}
          className="gap-2 text-destructive focus:text-destructive"
        >
          {isSignOutPending ? (
            <IconLoader2 className="animate-spin" />
          ) : (
            <IconLogout />
          )}
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
