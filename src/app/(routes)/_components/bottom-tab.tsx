'use client';

import { LucidePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { bottomTabItems } from '@/lib/constants/bottom-tab';
import type { BottomTabItemType } from '@/types/bottom-tab';
import { PostCreationDialog } from './post-creation-dialog';
import { Authenticated } from '@/components/shared/authenticated';
import { AuthDialog } from '@/components/auth/dialog';
import { useEffect, useRef, useState } from 'react';

export function BottomTab() {
  const [isVisible, setVisible] = useState<boolean>(true);
  const lastScrollYRef = useRef<number>(0);

  useEffect(() => {
    function handleScroll(e: Event) {
      let currentScrollY: number = 0;
      if (e.target === window || e.target === document) {
        currentScrollY =
          window.scrollY ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
      } else {
        currentScrollY = (e.target as HTMLElement).scrollTop;
      }

      if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    }

    const mainContainer = document.querySelector(
      'main[class*="overflow-y-auto"], main[class*="overflow"], [class*="bg-background"][class*="flex-1"][class*="overflow-y-auto"]'
    );

    if (mainContainer) {
      mainContainer.addEventListener('scroll', handleScroll, { passive: true });
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () =>
      mainContainer
        ? mainContainer.removeEventListener('scroll', handleScroll)
        : window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={cn(
        'bg-secondary/90 supports-[backdrop-filter]:bg-secondary/70 fixed bottom-4 left-1/2 z-50 h-[74px] w-full max-w-md -translate-x-1/2 rounded-full border backdrop-blur transition-transform duration-300 ease-in-out md:hidden',
        isVisible ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <div className="mx-auto grid h-full max-w-md grid-cols-5">
        {bottomTabItems.map((item, index) => (
          <BottomTabItem
            key={item.label}
            item={item}
            isFirst={index === 0}
            isLast={index + 1 === bottomTabItems.length}
          />
        ))}
      </div>
    </div>
  );
}

function BottomTabItem({
  item,
  isFirst,
  isLast,
}: {
  item: BottomTabItemType;
  isFirst: boolean;
  isLast: boolean;
}) {
  const pathName = usePathname();

  if (item.type === 'create') {
    return (
      <Authenticated
        pending={
          <Button size="icon" disabled className="m-auto rounded-full">
            <LucidePlus />
          </Button>
        }
        fallback={
          <AuthDialog>
            <Button size="icon" className="m-auto rounded-full">
              <LucidePlus />
            </Button>
          </AuthDialog>
        }
      >
        {(user) => {
          return (
            <PostCreationDialog user={user}>
              <Button size="icon" className="m-auto rounded-full">
                <LucidePlus />
              </Button>
            </PostCreationDialog>
          );
        }}
      </Authenticated>
    );
  }
  const isActive =
    pathName === item.href ||
    (item.href !== '/' && pathName.startsWith(item.href + '/'));
  return (
    <Link
      key={item.href}
      href={item.href}
      className={cn(
        'group hover:bg-accent relative inline-flex flex-col items-center justify-center px-5',
        {
          'rounded-s-full': isFirst,
          'rounded-e-full': isLast,
        }
      )}
    >
      <item.icon
        className={cn(
          'text-muted-foreground',
          isActive ? 'text-primary' : 'group-hover:text-primary'
        )}
      />
      <span className="sr-only">Home</span>
      {item.badge > 0 && (
        <div className="bg-primary absolute bottom-2 h-1 w-1 rounded-full" />
      )}
    </Link>
  );
}
