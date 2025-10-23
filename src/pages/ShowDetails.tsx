import { useParams, useNavigate } from "react-router-dom";
import { useShowDetails } from "../hooks/useShowDetails";
import Spinner from "../components/common/Spinner";
import ErrorState from "../components/common/ErrorState";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Episode {
  season: number;
  episode: number;
  name: string;
  air_date: string;
}

export default function ShowDetails() {
  const { id } = useParams<{ id: string }>(); // permalink
  const navigate = useNavigate();
  const permalink = id ? decodeURIComponent(id) : ""; // 👈 decode permalink
  const { data, isLoading, isError } = useShowDetails(permalink);
  const [selectedSeason, setSelectedSeason] = useState<number | "">("");

  if (isLoading) return <Spinner />;
  if (isError || !data?.tvShow)
    return <ErrorState message="Error al cargar detalles del show." />;

  const show = data.tvShow;
  const episodes: Episode[] = Array.isArray(show.episodes)
    ? show.episodes
    : [];

  const seasons: number[] = Array.from(
    new Set<number>(episodes.map((ep) => ep.season))
  ).sort((a, b) => a - b);

  const filteredEpisodes =
    selectedSeason !== ""
      ? episodes.filter((ep) => ep.season === selectedSeason)
      : [];

  return (
    <motion.div
      key={id} // 👈 fuerza remount al cambiar de serie
      className="max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Botón volver */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition"
      >
        ← Volver
      </button>

      {/* Contenido principal */}
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={show.image_path || show.image_thumbnail_path}
          alt={show.name}
          className="w-full md:w-1/3 rounded-lg shadow-lg object-cover max-h-[550px]"
        />

        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-blue-400 mb-2">
            {show.name}
          </h1>
          <p className="text-neutral-400 mb-4">
            {show.network} • {show.status} • {show.start_date}
          </p>

          {/* Géneros */}
          {Array.isArray(show.genres) && show.genres.length > 0 && (
            <div className="mb-4">
              <span className="text-neutral-400 text-sm">Géneros: </span>
              {show.genres.map((g: string) => (
                <span
                  key={g}
                  className="inline-block bg-blue-600/30 text-blue-300 px-2 py-1 rounded-lg mr-2 text-xs"
                >
                  {g}
                </span>
              ))}
            </div>
          )}

          {/* Descripción */}
          <p
            className="text-neutral-200 leading-relaxed mb-6"
            dangerouslySetInnerHTML={{
              __html: show.description || "Sin descripción disponible.",
            }}
          />

          {/* Dropdown de temporadas */}
          {seasons.length > 0 && (
            <div className="mb-4">
              <label
                htmlFor="season-select"
                className="text-sm text-neutral-400 mr-2"
              >
                Temporada:
              </label>
              <select
                id="season-select"
                className="bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                value={selectedSeason}
                onChange={(e) =>
                  setSelectedSeason(
                    e.target.value ? Number(e.target.value) : ""
                  )
                }
              >
                <option value="">Selecciona una temporada</option>
                {seasons.map((season) => (
                  <option key={season} value={season}>
                    Temporada {season}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Lista animada de episodios */}
          <AnimatePresence mode="wait">
            {selectedSeason && filteredEpisodes.length > 0 && (
              <motion.div
                key={selectedSeason}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <h2 className="text-xl font-semibold mb-2 text-blue-300">
                  Episodios de la temporada {selectedSeason}
                </h2>
                <div className="border border-neutral-800 rounded-lg overflow-hidden">
                  <ul className="divide-y divide-neutral-800 text-sm">
                    {filteredEpisodes.map((ep) => (
                      <li
                        key={`${ep.season}-${ep.episode}`}
                        className="py-2 px-3 hover:bg-white/5"
                      >
                        <strong>
                          T{ep.season}E{ep.episode}
                        </strong>{" "}
                        — {ep.name}{" "}
                        <span className="text-neutral-500">
                          ({ep.air_date})
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Sección del elenco */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3 text-blue-300">
          Elenco principal
        </h2>
        <div className="text-neutral-400 text-sm leading-relaxed">
          {show.description?.includes("starring") ? (
            <p>
              {show.description
                .split("starring")[1]
                .split(".")[0]
                .replace(/<\/?[^>]+(>|$)/g, "")
                .trim()}
            </p>
          ) : (
            <p>
              Información del elenco no disponible en la API. Consulta{" "}
              <a
                href={`https://www.episodate.com/tv-show/${show.permalink}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline"
              >
                episodate.com
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
