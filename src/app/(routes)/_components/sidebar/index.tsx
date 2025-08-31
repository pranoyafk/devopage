import { SidebarNav } from './sidebar-nav';
import { SidebarHeader } from './sidebar-header';
import { SidebarFooter } from './sidebar-footer';

export function Sidebar() {
  return (
    <aside className="bg-background flex h-screen w-full flex-col overflow-y-hidden border-r">
      <SidebarHeader />
      <SidebarNav />
      <div className="border-t p-2">
        <SidebarFooter />
      </div>
    </aside>
  );
}
