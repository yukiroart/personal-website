import { fetchFaqItems } from '#lib/data/sampleFaq';
import { fetchTerms } from '#lib/data/sampleTerms';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const [faqs, terms] = await Promise.all([
    fetchFaqItems('commissions'),
    fetchTerms(),
  ]);

  return {
    faqs,
    terms,
  };
};

