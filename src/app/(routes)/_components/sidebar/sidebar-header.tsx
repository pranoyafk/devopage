import { LucideCode2, LucidePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SidebarHeader() {
  const isAuthenticated = 1 > 0; // TODO: add auth later

  return (
    <div className="p-4">
      <div className="mb-6 flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <LucideCode2 className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-semibold text-lg">Devopage</span>
      </div>

      <Button size="lg" disabled={isAuthenticated === false} className="w-full">
        <LucidePlus className="mr-2 h-4 w-4" />
        Create Post
      </Button>
    </div>
  );
}
