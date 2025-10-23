import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AppLayout() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query)}`);
    };

    return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      {/* Navbar */}
        <header className="sticky top-0 bg-neutral-900/90 backdrop-blur border-b border-neutral-800">
        <div className="max-w-6xl mx-auto flex items-center gap-6 px-4 py-3">
            <Link to="/" className="font-bold text-xl text-blue-400">
            ErickDate
            </Link>

            <nav className="flex items-center gap-4 text-sm">
            <NavLink
                to="/"
                className={({ isActive }) =>
                isActive ? "text-white" : "text-neutral-400 hover:text-white"
                }
            >
                Populares
            </NavLink>
            <NavLink
                to="/search"
                className={({ isActive }) =>
                isActive ? "text-white" : "text-neutral-400 hover:text-white"
                }
            >
                Buscar
            </NavLink>
            </nav>

            <form onSubmit={onSubmit} className="ml-auto flex gap-2">
            <input
                type="text"
                placeholder="Buscar series..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg">
                Buscar
            </button>
            </form>
        </div>
        </header>

      {/* Contenido principal */}
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <Outlet />
        </main>

      {/* Footer */}
        <footer className="border-t border-neutral-800 py-4 text-center text-xs text-neutral-500">
        Datos de episodate.com • Hecho con React, React Router y TailwindCSS
        </footer>
    </div>
    );
}

