import { sanityClient, urlFor } from '#lib/sanity';

export interface Artwork {
  _id: string;
  title: string;
  slug: { current: string };
  imageUrl: string;
  alt: string;
  year: number;
  collection: ArtworkType;
  tags: ArtworkTag[];
  description?: string;
  bentoSpan: 'hero' | 'tall' | 'wide' | 'square';
  videoUrl?: string;
  youtubeEmbedUrl?: string;
  youtubeUrl?: string;
  order?: number;
  aspectRatio?: number;
}

export type ArtworkType =
  | 'illustration'
  | 'animation'
  | 'bust'
  | 'half-body'
  | 'full-body'
  | 'chibi'
  | 'comic';

export type ArtworkTag =
  | 'Original'
  | 'Fan Art'
  | 'Commission'
  | 'Reference Sheet';

export const ARTWORK_TYPES: { id: string; label: string }[] = [
  { id: 'all', label: 'EVERYTHING' },
  { id: 'illustration', label: 'Illustration' },
  { id: 'animation', label: 'Animation' },
  { id: 'bust', label: 'Bust' },
  { id: 'half-body', label: 'Half Body' },
  { id: 'full-body', label: 'Full Body' },
  { id: 'chibi', label: 'Chibi' },
  { id: 'comic', label: 'Comic' },
];

export const ARTWORK_TAGS: ArtworkTag[] = [
  'Original',
  'Fan Art',
  'Commission',
  'Reference Sheet',
];

let cachedArtworks: Artwork[] = [];

export async function fetchArtworks(): Promise<Artwork[]> {
  // In browser, initialize from sessionStorage if in-memory cache is empty
  if (typeof window !== 'undefined' && cachedArtworks.length === 0) {
    try {
      const stored = sessionStorage.getItem('yukiro_artworks_cache');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          cachedArtworks = parsed;
        }
      }
    } catch {}
  }

  try {
    const rawArtworks = await sanityClient.fetch(`
      *[_type == "artwork"] | order(order asc) {
        _id,
        title,
        slug,
        order,
        collection,
        tags,
        year,
        bentoSpan,
        videoUrl,
        youtubeEmbedUrl,
        youtubeUrl,
        description,
        mainImage {
          alt,
          asset->{
            _id,
            metadata {
              dimensions {
                aspectRatio,
                width,
                height
              }
            }
          }
        }
      }
    `);

    if (rawArtworks && rawArtworks.length > 0) {
      cachedArtworks = rawArtworks.map((item: any, index: number) => {
        // Construct optimized CDN URL via @sanity/image-url
        const cdnUrl = item.mainImage?.asset
          ? urlFor(item.mainImage).width(1600).auto('format').quality(85).url()
          : '/artworks/yukiro-portrait.jpg';

        const dimensions = item.mainImage?.asset?.metadata?.dimensions;
        const aspectRatio = dimensions?.aspectRatio || (item.videoUrl ? 16 / 9 : 1);

        return {
          _id: item._id,
          title: item.title || `Artwork #${item.order ?? index}`,
          slug: item.slug || { current: `artwork-${item.order ?? index}` },
          imageUrl: cdnUrl,
          alt: item.mainImage?.alt || item.title || 'Digital illustration by Yukiro',
          year: item.year || 2026,
          collection: (item.collection as ArtworkType) || 'illustration',
          tags: (item.tags as ArtworkTag[]) || [],
          description: item.description || '',
          videoUrl: item.videoUrl,
          youtubeEmbedUrl: item.youtubeEmbedUrl,
          youtubeUrl: item.youtubeUrl,
          order: item.order ?? index,
          aspectRatio,
        };
      });

      if (typeof window !== 'undefined') {
        try {
          sessionStorage.setItem('yukiro_artworks_cache', JSON.stringify(cachedArtworks));
        } catch {}
      }

      return cachedArtworks;
    }
  } catch (err) {
    console.error('Error fetching artworks from Sanity, falling back:', err);
  }

  return cachedArtworks;
}
