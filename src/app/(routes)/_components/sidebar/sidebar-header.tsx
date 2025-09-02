import { LucideCode2 } from 'lucide-react';
import { PostCreationDialog } from '../post-creation-dialog';
import { getAuthSession } from '@/lib/auth/utils';
import { Button } from '@/components/ui/button';
import { IconPlus } from '@tabler/icons-react';

export async function SidebarHeader() {
  const { user } = await getAuthSession();

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center gap-2 px-2">
        <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
          <LucideCode2 className="text-primary-foreground h-4 w-4" />
        </div>
        <span className="text-lg font-semibold">Devopage</span>
      </div>

      {user && (
        <PostCreationDialog user={user}>
          <Button size="lg" className="w-full">
            <IconPlus className="mr-2 h-4 w-4" />
            Create Post
          </Button>
        </PostCreationDialog>
      )}
    </div>
  );
}
