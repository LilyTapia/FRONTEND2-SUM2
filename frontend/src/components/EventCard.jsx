import { Link } from 'react-router-dom';
import { getEventImage } from '../utils/eventMedia';

function formatDate(date) {
  return new Date(date).toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function EventCard({ event, compact = false }) {
  const image = getEventImage(event);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-40 w-full overflow-hidden bg-slate-200">
        <img src={image} alt={event.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
        <span className="absolute right-3 top-3 rounded-full bg-brand-500 px-3 py-1 text-[11px] font-semibold uppercase text-white shadow-md">
          {event.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="text-xs font-semibold uppercase text-brand-600">
          {formatDate(event.date)} · {event.location}
        </div>
        <h3 className="text-base font-bold leading-snug text-slate-950 sm:text-lg">{event.title}</h3>

        {!compact && (
          <div className="mt-auto">
            <Link
              to={`/evento/${event.id}`}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-brand-500 via-brand-400 to-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-md shadow-brand-900/20 transition hover:-translate-y-0.5"
            >
              Ver detalles
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
