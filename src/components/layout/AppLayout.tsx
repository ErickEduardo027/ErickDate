import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function AppLayout() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // 👈 para detectar el cambio de ruta

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-background text-neutral-100 flex flex-col transition-colors duration-300">
      {/* 🌙 Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10 shadow-[0_1px_20px_rgba(59,130,246,0.1)] transition-all duration-300">
  <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
    {/* Logo */}
    <Link to="/" className="font-bold text-2xl text-primary tracking-tight hover:text-blue-400 transition-colors">
      ErickDate
    </Link>

    {/* Nav links */}
    <nav className="flex items-center gap-6 text-sm">
      {[
        { to: "/", label: "Populares" },
        { to: "/search", label: "Buscar" },
      ].map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `relative ${
              isActive
                ? "text-white after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-primary after:rounded-full"
                : "text-neutral-400 hover:text-white"
            } transition-all`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>

    {/* Buscador */}
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Buscar series..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-neutral-900/70 border border-white/10 rounded-lg px-3 py-2 text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
      />
      <button className="bg-primary hover:bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-[0_0_10px_rgba(59,130,246,0.2)] hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all">
        Buscar
      </button>
    </form>
  </div>
</header>

      {/* 🌆 Contenido principal con animación de rutas */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ⚙️ Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-sm text-neutral-500 bg-black/40 backdrop-blur-md mt-8">
  <p className="tracking-wide">
    Datos de <span className="text-primary font-medium">episodate.com</span> • Hecho con{" "}
    <span className="text-white">React</span>,{" "}
    <span className="text-white">TailwindCSS</span> y{" "}
    <span className="text-white">React Query</span>
  </p>
</footer>

    </div>
  );
}
