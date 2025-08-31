'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { authClient } from '@/lib/auth/client';
import { IconDots } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserMenu } from '../user-menu';

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

function SidebarFooterSkeleton() {
  return (
    <div className="h-auto w-full justify-start gap-3 px-3 py-2">
      <div className="flex w-full items-center gap-3">
        <Skeleton className="h-8 w-8 rounded-full" />

        <div className="flex flex-1 flex-col items-start gap-1">
          <Skeleton className="h-4 w-24" />

          <Skeleton className="h-3 w-32" />
        </div>

        <Skeleton className="h-4 w-4 rounded-sm" />
      </div>
    </div>
  );
}

export function SidebarFooter() {
  const { data: getSessionData, isPending } = authClient.useSession();
  const pathName = usePathname();

  if (isPending) return <SidebarFooterSkeleton />;
  if (!getSessionData?.user) {
    return (
      <div className="px-2 py-3">
        <Link
          href={`/sign-in?nextPage=${pathName}`}
          className={buttonVariants({
            className: 'w-full',
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
      <Button variant="ghost" className="hover:bg-accent h-auto w-full justify-start gap-3 px-3 py-2">
        <Avatar className="h-8 w-8">
          {user.image ? <AvatarImage src={user.image} /> : <AvatarFallback>{getInitials(user.name)}</AvatarFallback>}
        </Avatar>
        <div className="flex flex-1 flex-col items-start text-left">
          <span className="text-sm font-medium">{user.name}</span>
          <span className="text-muted-foreground text-xs">{user.email}</span>
        </div>
        <IconDots className="text-muted-foreground h-4 w-4" />
      </Button>
    </UserMenu>
  );
}
