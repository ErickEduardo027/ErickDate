import api from "./client";

export type TvShow = {
    id: number;
    name: string;
    image_thumbnail_path: string;
    network?: string;
    start_date?: string;
    status?: string;
    permalink: string;
};

export type ShowDetails = {
    tvShow: TvShow & {
    description?: string;
    image_path?: string;
    genres?: string[];
    episodes?: {
        season: number;
        episode: number;
        name: string;
        air_date: string;
    }[];
    };
};

// Lista paginada de populares
export async function fetchMostPopular(page = 1) {
    const { data } = await api.get(`/most-popular`, { params: { page } });
    return data;
}

// Búsqueda
export async function searchShows(query: string, page = 1) {
    const { data } = await api.get(`/search`, { params: { q: query, page } });
    return data;
}

// Detalle de serie
export async function fetchShowDetails(permalink: string) {
    const { data } = await api.get(`/show-details`, { params: { q: permalink } });
    return data;
}
