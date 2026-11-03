import { fetchArtistProfile } from '#lib/data/sampleProfile';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const profile = await fetchArtistProfile();
  return {
    profile,
  };
};

