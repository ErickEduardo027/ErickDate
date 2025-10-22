import api from "./client";

type Paged<T> = {
    page: number;
    pages: number;
    tv_shows: T[];
};

export type TvShow = {
    id: number;
    name: string;
    image_thumbnail_path: string;
    network?: string;
    country?: string;
    status?: string;
    start_date?: string;
    permalink: string;
};

export type ShowDetails = {
    tvShow: TvShow & {
    description?: string;
    image_path?: string;
    episodes?: {
        season: number;
        episode: number;
        name: string;
        air_date: string;
    }[];
    genres?: string[];
    runtime?: string;
    };
};

// Most popular (paginado)
export async function fetchMostPopular(page = 1) {
    const { data } = await api.get<Paged<TvShow>>("/most-popular", {
    params: { page },
    });
    return data;
}

// Búsqueda
export async function searchShows(query: string, page = 1) {
    const { data } = await api.get<Paged<TvShow>>("/search", {
    params: { q: query, page },
    });
    return data;
}

// Detalle por show (usaremos 'q' con el id o permalink)
export async function fetchShowDetails(idOrPermalink: string) {
    const { data } = await api.get<ShowDetails>("/show-details", {
    params: { q: idOrPermalink },
    });
    return data;
}