import { fetchQueueItems } from '#lib/data/sampleQueue';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const items = await fetchQueueItems();
  return {
    items,
  };
};
