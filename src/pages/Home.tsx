import { useState } from "react";
import { usePopularShows } from "../hooks/usePopularShows";
import Spinner from "../components/common/Spinner";
import ErrorState from "../components/common/ErrorState";
import Pagination from "../components/common/Pagination";
import { Link } from "react-router-dom";

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
    <Link
      key={show.id}
      to={`/show/${show.permalink}`}
      className="group relative bg-card rounded-xl overflow-hidden shadow-lg border border-white/5 hover:border-primary/40 transition-all duration-300 hover:scale-[1.03]"
    >
      <img
        src={show.image_thumbnail_path}
        alt={show.name}
        className="w-full h-72 object-cover group-hover:opacity-70 transition-opacity duration-300"
      />
      {/* Overlay con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Texto */}
      <div className="absolute bottom-0 left-0 p-3">
        <h2 className="font-semibold text-lg text-white drop-shadow-md">
          {show.name}
        </h2>
        <p className="text-xs text-neutral-300">{show.network}</p>
      </div>
    </Link>
  ))}
</div>


        <Pagination page={data.page} pages={data.pages} onPage={setPage} />
    </div>
    );
}

