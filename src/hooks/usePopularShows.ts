import { useQuery } from "@tanstack/react-query";
import { fetchMostPopular } from "../api/episodate";

export function usePopularShows(page = 1) {
    return useQuery({
    queryKey: ["popular", page],
    queryFn: () => fetchMostPopular(page),
    staleTime: 1000 * 60, // 1 min
    });
}
