# Centro de Eventos · REST + GraphQL

Pequeña app React que consume un backend mock. La lista de eventos se obtiene por REST y el detalle por GraphQL.

## Cómo correrlo

1. Backend (puerto 4000):
   ```bash
   cd backend
   npm install
   npm start
   ```
   - REST: http://localhost:4000/api/events y `/api/events/:id`
   - GraphQL (playground): http://localhost:4000/graphql

2. Frontend (puerto 5173):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Puedes definir `VITE_API_URL` si el backend corre en otra URL.

## Query de ejemplo (GraphQL)
```graphql
query Evento($id: ID!) {
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
  }
}
```

## Estructura
- `backend/`: servidor Express con endpoints REST y esquema GraphQL usando Apollo Server.
  - `index.js`: datos mock + rutas REST `/api/events` y `/api/events/:id` + endpoint `/graphql`.
- `frontend/`: app React con React Router; listado via REST y detalle via GraphQL.
  - `src/services/api.js`: cliente REST/GraphQL.
  - `src/pages/EventList.jsx`: lista y filtros (REST).
  - `src/pages/EventDetail.jsx`: detalle con barra de ocupación (GraphQL).
  - `src/components/EventCard.jsx`: tarjeta reutilizable para eventos.
  - `src/App.jsx`, `src/main.jsx`: layout general y enrutamiento.
  - Estilos con Tailwind CSS (`tailwind.config.js`, `postcss.config.js`) y tipografías Space Grotesk/Manrope.
