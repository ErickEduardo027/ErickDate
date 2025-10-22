import { useState } from "react";
import { usePopularShows } from "../hooks/usePopularShows";
import Spinner from "../components/common/Spinner";
import ErrorState from "../components/common/ErrorState";
import Pagination from "../components/common/Pagination";

export default function Home() {
    const [page, setPage] = useState(1);
    const { data, isLoading, isError } = usePopularShows(page);

    if (isLoading) return <Spinner />;
    if (isError) return <ErrorState message="No se pudieron cargar las series." />;

    return (
    <div>
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-400">
        Series más populares
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

