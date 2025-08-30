"use client";
import { LucideMoreHorizontal } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { UserMenu } from "../user-menu";
import Link from "next/link";
import { authClient } from "@/lib/auth/client";
import { usePathname } from "next/navigation";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function SidebarFooter() {
  const { data: getSessionData } = authClient.useSession();
  const pathName = usePathname();

  if (!getSessionData?.user) {
    return (
      <div className="px-2 py-3">
        <Link
          href={`/sign-in?nextPage=${pathName}`}
          className={buttonVariants({
            className: "w-full",
          })}
        >
          Sign In
        </Link>
      </div>
    );
  }
  const { user } = getSessionData;
  return (
    <UserMenu>
      <Button
        variant="ghost"
        className="h-auto w-full justify-start gap-3 px-3 py-2 hover:bg-accent"
      >
        <Avatar className="h-8 w-8">
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col items-start text-left">
          <span className="font-medium text-sm">{user.name}</span>
          <span className="text-muted-foreground text-xs">{user.email}</span>
        </div>
        <LucideMoreHorizontal className="h-4 w-4 text-muted-foreground" />
      </Button>
    </UserMenu>
  );
}
