"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { navItems } from "@/lib/constants/sidebar";
import type { SidebarNavItemType } from "@/types/sidebar";

export function SidebarNav() {
  return (
    <nav className="flex-1 px-2">
      <ul className="space-y-0.5">
        {navItems.map((item) => {
          return <SidebarNavItem item={item} key={item.href} />;
        })}
      </ul>
    </nav>
  );
}

function SidebarNavItem({ item }: { item: SidebarNavItemType }) {
  const pathName = usePathname();
  const isActive = pathName.startsWith(item.href);

  return (
    <li>
      <Link
        href={item.href}
        className={cn(
          "relative flex items-center gap-3 rounded-md px-3 py-2 font-medium text-sm transition-colors",
          isActive
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
        )}
      >
        <item.icon className="h-4 w-4" />
        <span className="flex-1">{item.label}</span>
        {item.badge && (
          <span
            className={cn(
              "flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 font-medium text-foreground text-xs",
              isActive ? "bg-background" : "bg-destructive",
            )}
          >
            {item.badge}
          </span>
        )}
      </Link>
    </li>
  );
}
