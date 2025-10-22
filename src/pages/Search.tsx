import { useSearchParams } from "react-router-dom";
import { useSearchShows } from "../hooks/useSearchShows";
import Spinner from "../components/common/Spinner";
import ErrorState from "../components/common/ErrorState";
import Pagination from "../components/common/Pagination";
import { useState } from "react";

export default function Search() {
    const [params, setParams] = useSearchParams();
    const query = params.get("q") || "";
    const [page, setPage] = useState(1);
    const { data, isLoading, isError } = useSearchShows(query, page);

    if (!query) {
    return (
        <div className="text-center text-neutral-400 mt-10">
        Escribe un título en la barra superior para buscar series.
        </div>
    );
    }

    if (isLoading) return <Spinner />;
    if (isError)
    return <ErrorState message="Ocurrió un error al buscar las series." />;

    if (!data.tv_shows?.length) {
    return (
        <div className="text-center text-neutral-400 mt-10">
        No se encontraron resultados para “{query}”.
        </div>
    );
    }

    return (
    <div>
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-400">
        Resultados para: <span className="text-white">{query}</span>
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.tv_shows.map((show: any) => (
            <div
            key={show.id}
            className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:scale-105 transition-transform"
            >
            <img
                src={show.image_thumbnail_path}
                alt={show.name}
                className="w-full h-64 object-cover"
            />
            <div className="p-3">
                <h2 className="font-semibold text-lg">{show.name}</h2>
                <p className="text-sm text-neutral-400">{show.network}</p>
            </div>
            </div>
        ))}
        </div>

        <Pagination page={data.page} pages={data.pages} onPage={setPage} />
    </div>
    );
}

