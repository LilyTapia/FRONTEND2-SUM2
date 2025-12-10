import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { useEvents } from '../context/EventContext';

export default function AllEvents() {
  const { events, loading, error } = useEvents();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todos');

  const categories = useMemo(() => {
    const list = new Set(events.map((event) => event.category));
    return ['Todos', ...list];
  }, [events]);

  const filtered = useMemo(() => {
    return events.filter((event) => {
      const matchesCategory = category === 'Todos' || event.category === category;
      const matchesSearch = `${event.title} ${event.location}`.toLowerCase().includes(search.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [events, category, search]);

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-3xl bg-white p-6 text-center shadow-lg shadow-slate-900/5">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-600">Próximos eventos</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950">Descubre las mejores experiencias</h1>
        <p className="mt-2 text-sm text-slate-600">Cartelera consumida desde la API REST del backend mock.</p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((item) => (
              <button
                key={item}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  item === category
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-800/30'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-brand-200'
                }`}
                onClick={() => setCategory(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
          <div className="w-full sm:max-w-xs">
            <input
              type="search"
              placeholder="Buscar por nombre o ubicación"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <Link
          to="/mis-pases"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 via-brand-400 to-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand-900/20 transition hover:-translate-y-0.5"
        >
          Ver mis entradas guardadas →
        </Link>
      </div>

      {loading && <p className="text-sm text-slate-600">Cargando eventos desde la API...</p>}
      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">{error}</p>
      )}

      {!loading && !error && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full rounded-xl border border-sand-200 bg-white px-4 py-3 text-sm text-slate-600">
              No hay eventos que coincidan con tus filtros.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
