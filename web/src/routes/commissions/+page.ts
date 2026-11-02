import { fetchFaqItems } from '#lib/data/sampleFaq';
import { fetchTerms } from '#lib/data/sampleTerms';
import { fetchCommissionStatus } from '#lib/data/sampleProfile';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const [faqs, terms, commissionStatus] = await Promise.all([
    fetchFaqItems('commissions'),
    fetchTerms(),
    fetchCommissionStatus(),
  ]);

  return {
    faqs,
    terms,
    commissionStatus,
  };
};
