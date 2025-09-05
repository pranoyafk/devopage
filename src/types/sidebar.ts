import type { Icon } from '@tabler/icons-react';

export interface SidebarNavItemType {
  label: string;
  href: __next_route_internal_types__.RouteImpl<string>;
  icon: Icon;
  badge?: number;
}
