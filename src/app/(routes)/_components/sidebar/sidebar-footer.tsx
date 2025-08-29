import { LucideMoreHorizontal } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { UserMenu } from "../user-menu";
import Link from "next/link";

export function SidebarFooter() {
  const isAuthenticated = true;
  if (!isAuthenticated) {
    return (
      <div className="px-2 py-3">
        <Link
          href="/sign-in"
          className={buttonVariants({
            className: "w-full",
          })}
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <UserMenu>
      <Button
        variant="ghost"
        className="h-auto w-full justify-start gap-3 px-3 py-2 hover:bg-accent"
      >
        <Avatar className="h-8 w-8">
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col items-start text-left">
          <span className="font-medium text-sm">Pranoy Majumdar</span>
          <span className="text-muted-foreground text-xs">
            works.pranoy@gmail.com
          </span>
        </div>
        <LucideMoreHorizontal className="h-4 w-4 text-muted-foreground" />
      </Button>
    </UserMenu>
  );
}
