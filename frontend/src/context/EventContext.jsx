import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchEventsREST } from '../api/events';

const EventContext = createContext();

export function useEvents() {
  return useContext(EventContext);
}

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [savedEvents, setSavedEvents] = useState(() => {
    // Se persisten las guardadas para mantenerlas tras recargas
    const stored = localStorage.getItem('savedEvents');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    fetchEventsREST()
      .then((data) => setEvents(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const isSaved = (id) => savedEvents.some((item) => String(item.id) === String(id));

  const toggleSaved = (event) => {
    if (!event) return;
    setSavedEvents((prev) => {
      if (prev.some((item) => String(item.id) === String(event.id))) {
        return prev.filter((item) => String(item.id) !== String(event.id));
      }
      return [...prev, event];
    });
  };

  const stats = useMemo(() => {
    const byCategory = events.reduce((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    }, {});
    return { total: events.length, byCategory };
  }, [events]);

  const value = {
    events,
    loading,
    error,
    savedEvents,
    isSaved,
    toggleSaved,
    stats,
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
}
