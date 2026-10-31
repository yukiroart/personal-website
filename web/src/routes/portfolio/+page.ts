import { fetchArtworks } from '#lib/data/sampleArtworks';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const artworks = await fetchArtworks();
  return {
    artworks,
  };
};

