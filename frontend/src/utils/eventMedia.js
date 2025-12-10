const categoryImages = {
  Concierto:
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80&sat=-10',
  Conferencia:
    'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80&sat=-15',
  Festival:
    'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80&sat=-10',
  Expo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80&sat=-10',
  Taller: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80&sat=-10',
  Deporte:
    'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80&sat=-10',
};

export function getEventImage(event) {
  if (event?.image) return event.image;
  if (event?.categoria) return categoryImages[event.categoria] || categoryImages.Conferencia;
  return categoryImages[event?.category] || categoryImages.Conferencia;
}
