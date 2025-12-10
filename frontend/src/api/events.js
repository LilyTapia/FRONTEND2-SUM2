const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function fetchEventsREST() {
  const response = await fetch(`${API_URL}/api/events`);
  if (!response.ok) {
    throw new Error('No se pudieron cargar los eventos');
  }
  return response.json();
}

export async function fetchEventDetailREST(id) {
  const response = await fetch(`${API_URL}/api/events/${id}`);
  if (!response.ok) {
    throw new Error('Evento no encontrado');
  }
  return response.json();
}

export async function fetchEventDetailGraphQL(id) {
  const query = `
    query Event($id: ID!) {
      event(id: $id) {
        id
        title
        date
        location
        category
        organizer
        confirmed
        capacity
        description
        image
      }
    }
  `;

  // Se consulta GraphQL; REST queda como respaldo desde el componente
  const response = await fetch(`${API_URL}/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { id } }),
  });

  const result = await response.json();
  if (!response.ok || result.errors) {
    throw new Error(result.errors?.[0]?.message || 'No se pudo cargar el detalle');
  }

  return result.data.event;
}
