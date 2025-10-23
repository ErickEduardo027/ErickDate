import { useQuery } from "@tanstack/react-query";
import { fetchShowDetails } from "../api/episodate";

export function useShowDetails(permalink: string) {
  return useQuery({
    queryKey: ["show-details", permalink],
    queryFn: () => fetchShowDetails(permalink),
    enabled: !!permalink,
    refetchOnMount: "always",   // 👈 asegura refetch al navegar
    staleTime: 0,
  });
}
