import type { ReactNode } from 'react';
import { Sidebar } from './_components/sidebar';
import { BottomTab } from './_components/bottom-tab';

export default function MainLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden md:flex md:w-64 lg:w-72">
        <Sidebar />
      </div>

      <main className="bg-background flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>

      <BottomTab />
    </div>
  );
}
