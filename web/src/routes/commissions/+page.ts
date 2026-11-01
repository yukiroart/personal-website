import { fetchFaqItems } from '#lib/data/sampleFaq';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const faqs = await fetchFaqItems('commissions');
  return {
    faqs,
  };
};
