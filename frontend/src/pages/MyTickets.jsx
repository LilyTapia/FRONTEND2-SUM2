import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { getEventImage } from '../utils/eventMedia';

function formatDate(date) {
  return new Date(date).toISOString().slice(0, 10);
}

export default function MyTickets() {
  const { savedEvents, toggleSaved } = useEvents();

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Tus entradas</p>
          <h2 className="text-3xl font-black text-slate-950">Reservas guardadas</h2>
          <p className="text-sm text-slate-600">LocalStorage mantiene tu carpeta en esta demo.</p>
        </div>
        <Link
          to="/agenda"
          className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand-800/30 transition hover:-translate-y-0.5"
        >
          Buscar más eventos
        </Link>
      </div>

      {savedEvents.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-lg shadow-slate-900/5">
          Aún no tienes entradas guardadas. Reserva desde el detalle de cada evento.
        </div>
      ) : (
        <div className="space-y-4">
          {savedEvents.map((event) => {
            const image = getEventImage(event);
            return (
              <article
                key={event.id}
              className="flex flex-col gap-4 rounded-3xl bg-white p-4 shadow-lg shadow-slate-900/5 ring-1 ring-slate-200 sm:flex-row sm:items-center"
            >
                <div className="flex items-center gap-3">
                  <div className="h-20 w-20 overflow-hidden rounded-xl bg-slate-200">
                    <img src={image} alt={event.title} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-brand-600">{formatDate(event.date)}</p>
                    <h3 className="text-xl font-bold text-slate-950">{event.title}</h3>
                    <p className="text-sm text-slate-600">{event.location}</p>
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-3">
                  <Link
                    to={`/evento/${event.id}`}
                    className="rounded-full bg-gradient-to-r from-brand-500 via-brand-400 to-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand-900/20 transition hover:-translate-y-0.5"
                  >
                    Ver detalle
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleSaved(event)}
                    className="rounded-full bg-coral px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand-900/20 transition hover:-translate-y-0.5"
                  >
                    Cancelar reserva
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
