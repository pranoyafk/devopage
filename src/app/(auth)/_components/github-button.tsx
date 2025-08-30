import { Button } from "@/components/ui/button";
import { IconBrandGithub } from "@tabler/icons-react";

export function GithubButton() {
  return (
    <Button type="button" variant="outline">
      <IconBrandGithub />
      <span>Github</span>
    </Button>
  );
}
