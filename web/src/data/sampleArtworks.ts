export interface Artwork {
  _id: string;
  title: string;
  slug: { current: string };
  imageUrl: string;
  alt: string;
  medium: string;
  dimensions: string;
  year: number;
  collection: 'new-works' | 'landscapes' | 'abstracts' | 'portraits';
  description?: string;
  bentoSpan: 'hero' | 'tall' | 'wide' | 'square';
}

export const sampleArtworks: Artwork[] = [
  {
    _id: 'art-1',
    title: 'Elysian Morning in Ochre',
    slug: { current: 'elysian-morning-ochre' },
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85',
    alt: 'Bold contemporary oil painting with warm ochre and terracotta brushstrokes',
    medium: 'Oil on Belgian linen',
    dimensions: '36 × 48 in (91 × 122 cm)',
    year: 2026,
    collection: 'new-works',
    description: 'An exploration of early Mediterranean dawn filtering through stone architecture.',
    bentoSpan: 'hero',
  },
  {
    _id: 'art-2',
    title: 'Botanical Reverie No. 4',
    slug: { current: 'botanical-reverie-4' },
    imageUrl: '/artworks/botanical-reverie.jpg',
    alt: 'Detailed organic botanical illustration with rich crimson poppies and foliage',
    medium: 'Gouache & dry pigment on cotton rag',
    dimensions: '18 × 24 in (46 × 61 cm)',
    year: 2025,
    collection: 'landscapes',
    description: 'Layered botanical forms observed in the sub-alpine forest understory.',
    bentoSpan: 'tall',
  },
  {
    _id: 'art-3',
    title: 'Study in Cadmium & Stillness',
    slug: { current: 'study-cadmium-stillness' },
    imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=85',
    alt: 'Square format abstract composition featuring textured red and cream pigments',
    medium: 'Mixed media & marble dust',
    dimensions: '20 × 20 in (51 × 51 cm)',
    year: 2026,
    collection: 'abstracts',
    description: 'Dense impasto texture balancing vibrant cadmium red with serene negative space.',
    bentoSpan: 'square',
  },
  {
    _id: 'art-4',
    title: 'The Reader at Dusk',
    slug: { current: 'reader-at-dusk' },
    imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f09367456?auto=format&fit=crop&w=1000&q=85',
    alt: 'Horizontal figurative composition of a contemplative figure bathed in lamplight',
    medium: 'Oil & tempera on panel',
    dimensions: '24 × 36 in (61 × 91 cm)',
    year: 2025,
    collection: 'portraits',
    description: 'Intimate portrait capturing the quiet intimacy of late-evening reading.',
    bentoSpan: 'wide',
  },
  {
    _id: 'art-5',
    title: 'Terra Incognita',
    slug: { current: 'terra-incognita' },
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=85',
    alt: 'Abstract landscape evoking geological strata and mineral textures',
    medium: 'Encaustic & raw earth pigments',
    dimensions: '24 × 30 in (61 × 76 cm)',
    year: 2026,
    collection: 'abstracts',
    description: 'Hot beeswax and earth pigments fused to evoke ancient weathered sandstone.',
    bentoSpan: 'square',
  },
  {
    _id: 'art-6',
    title: 'Nocturne with Wild Anemones',
    slug: { current: 'nocturne-wild-anemones' },
    imageUrl: '/artworks/nocturne-anemones.jpg',
    alt: 'Atmospheric nocturnal oil painting of night-blooming white flowers',
    medium: 'Oil on hand-stretched canvas',
    dimensions: '30 × 40 in (76 × 102 cm)',
    year: 2025,
    collection: 'landscapes',
    description: 'Night flora captured under sharp side illumination.',
    bentoSpan: 'tall',
  },
];
