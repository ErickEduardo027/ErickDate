import { useQuery } from "@tanstack/react-query";
import { searchShows } from "../api/episodate";

export function useSearchShows(query: string, page = 1) {
    return useQuery({
    queryKey: ["search", query, page],
    queryFn: () => searchShows(query, page),
    enabled: !!query, // Solo ejecuta si hay texto
    });
}
