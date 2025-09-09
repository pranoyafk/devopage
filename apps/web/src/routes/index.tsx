import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useTRPC } from "@/lib/trpc";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const trpc = useTRPC();
  const { data: greeting } = useQuery(trpc.greeting.queryOptions());
  return <div>{greeting}</div>;
}
