import { useQuery } from "@tanstack/react-query";
import { fetchShowDetails } from "../api/episodate";

export function useShowDetails(permalink: string) {
    return useQuery({
    queryKey: ["show", permalink],
    queryFn: () => fetchShowDetails(permalink),
    enabled: !!permalink,
    });
}
