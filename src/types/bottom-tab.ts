import type { Icon } from '@tabler/icons-react';

type BaseBottomTabItem = {
  label: string;
  icon: Icon;
};

type BottomTabLink = {
  type: 'link';
  href: __next_route_internal_types__.RouteImpl<string>;
  badge: number;
} & BaseBottomTabItem;

type BottomTabCreateBtn = {
  type: 'create';
} & BaseBottomTabItem;

export type BottomTabItemType = BottomTabLink | BottomTabCreateBtn;
