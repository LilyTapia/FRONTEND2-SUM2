import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchEventDetailGraphQL, fetchEventDetailREST } from '../api/events';
import { useEvents } from '../context/EventContext';
import { getEventImage } from '../utils/eventMedia';

function formatLongDate(date) {
  return new Date(date).toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function EventDetail() {
  const { id } = useParams();
  const { events, isSaved, toggleSaved } = useEvents();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const baseInfo = useMemo(() => events.find((item) => String(item.id) === String(id)), [events, id]);

  useEffect(() => {
    let active = true;

    const loadDetail = async () => {
      setLoading(true);
      setError('');
      try {
        const detail = await fetchEventDetailGraphQL(id);
        if (active) setEvent(detail);
      } catch (graphError) {
        console.error('Error GraphQL, intentando REST', graphError);
        try {
          const detail = await fetchEventDetailREST(id);
          if (active) setEvent(detail);
        } catch (restError) {
          console.error('Error REST', restError);
          if (active) setError('No pudimos cargar el detalle de este evento.');
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadDetail();
    return () => {
      active = false;
    };
  }, [id]);

  const detail = event || baseInfo;

  if (loading) {
    return (
      <div className="rounded-xl border border-sand-200 bg-white/90 p-5 text-sm text-slate-700 shadow-soft">
        Cargando detalle...
      </div>
    );
  }

  if (error || !detail) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm shadow-soft">
        <p className="font-semibold text-red-700">{error || 'No encontramos este evento.'}</p>
        <Link className="mt-3 inline-flex items-center text-brand-700 hover:underline" to="/agenda">
          Volver a la agenda
        </Link>
      </div>
    );
  }

  const saved = isSaved(detail.id);
  const occupancy =
    detail?.capacity && detail?.confirmed
      ? Math.min(100, Math.round((detail.confirmed / detail.capacity) * 100))
      : null;
  const spotsLeft = detail?.capacity && detail?.confirmed ? Math.max(detail.capacity - detail.confirmed, 0) : null;
  const heroImage = getEventImage(detail);

  return (
    <section className="rounded-3xl bg-white shadow-xl shadow-slate-900/10 ring-1 ring-slate-200">
      <div className="relative h-64 w-full overflow-hidden rounded-t-3xl bg-slate-200 sm:h-96">
        <img src={heroImage} alt={detail.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" aria-hidden />
        <Link
          className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-slate-800 shadow"
          to="/agenda"
        >
          ← Volver atrás
        </Link>
        <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase text-brand-800 shadow">
          {detail.category}
        </span>
      </div>

      <div className="space-y-5 px-6 pb-8 pt-6 sm:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-brand-600">{formatLongDate(detail.date)} · {detail.location}</p>
            <h1 className="text-3xl font-black text-slate-950">{detail.title}</h1>
          </div>
          <button
            type="button"
            onClick={() => toggleSaved(detail)}
            className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
              saved
                ? 'bg-coral text-white shadow-md shadow-brand-800/30'
                : 'bg-gradient-to-r from-brand-500 via-brand-400 to-brand-600 text-white shadow-md shadow-brand-800/30'
            }`}
          >
            {saved ? 'Cancelar reserva' : 'Reservar mi entrada'}
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <span className="text-xs font-semibold uppercase text-slate-500">Organizador</span>
            <p className="mt-1 text-lg font-semibold text-slate-950">{detail.organizer || 'Equipo del venue'}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <span className="text-xs font-semibold uppercase text-slate-500">Asistentes</span>
            <p className="mt-1 text-lg font-semibold text-slate-950">{detail.confirmed || '—'}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <span className="text-xs font-semibold uppercase text-slate-500">Estado</span>
            <p className="mt-1 text-sm font-semibold text-green-700">Entradas disponibles</p>
          </div>
        </div>

        <p className="text-base leading-relaxed text-slate-700">
          {detail.description || 'Este evento utiliza la API para cargar la descripción completa.'}
        </p>

        {occupancy !== null && (
          <div className="mt-2 rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
              <span>Ocupación</span>
              <span className="text-slate-500">
                {occupancy}% {spotsLeft !== null && `(quedan ${spotsLeft} cupos)`}
              </span>
            </div>
            <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-200">
              <span
                className="block h-full rounded-full bg-gradient-to-r from-brand-500 via-coral to-brand-800 transition-all"
                style={{ width: `${occupancy}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
