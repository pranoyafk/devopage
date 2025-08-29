import type { LucideIcon } from "lucide-react";

export interface SidebarNavItemType {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}
