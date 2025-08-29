"use client";
import { LucidePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { bottomTabItems } from "@/lib/constants/bottom-tab";
import type { BottomTabItemType } from "@/types/bottom-tab";

export function BottomTab() {
  return (
    <div className="-translate-x-1/2 fixed bottom-4 left-1/2 z-50 h-[74px] w-full max-w-md rounded-full border bg-secondary/90 backdrop-blur supports-[backdrop-filter]:bg-secondary/70 md:hidden">
      <div className="mx-auto grid h-full max-w-md grid-cols-5">
        {bottomTabItems.map((item, index) => (
          <BottomTabItem
            key={item.href}
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
  const isActive = pathName.startsWith(item.href);

  if (item.href === "/create") {
    return (
      <Button
        size="icon"
        variant={isActive ? "outline" : "default"}
        className="m-auto rounded-full"
      >
        <LucidePlus />
      </Button>
    );
  }

  return (
    <Link
      key={item.href}
      href={item.href}
      className={cn(
        "group relative inline-flex flex-col items-center justify-center px-5 hover:bg-accent",
        {
          "rounded-s-full": isFirst,
          "rounded-e-full": isLast,
        },
      )}
    >
      <item.icon
        className={cn(
          "text-muted-foreground",
          isActive ? "text-primary" : "group-hover:text-primary",
        )}
      />
      <span className="sr-only">Home</span>
      {item.badge > 0 && (
        <div className="absolute bottom-2 h-1 w-1 rounded-full bg-primary" />
      )}
    </Link>
  );
}
