'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { IconDots } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserMenu } from '../user-menu';
import { UserAvatar } from '@/components/user-avatar';
import { Authenticated } from '@/components/shared/authenticated';

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
  const pathName = usePathname();

  return (
    <Authenticated
      pending={<SidebarFooterSkeleton />}
      fallback={
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
      }
    >
      {(user) => (
        <UserMenu>
          <Button
            variant="ghost"
            className="hover:bg-accent h-auto w-full justify-start gap-3 px-3 py-2"
          >
            <UserAvatar user={user} />
            <div className="flex flex-1 flex-col items-start text-left">
              <span className="text-sm font-medium">{user.name}</span>
              <span className="text-muted-foreground text-xs">
                {user.email}
              </span>
            </div>
            <IconDots className="text-muted-foreground h-4 w-4" />
          </Button>
        </UserMenu>
      )}
    </Authenticated>
  );
}
