import { sanityClient } from '#lib/sanity';

export interface FaqItem {
  _id: string;
  question: string;
  answer: string[];
  order: number;
  category: 'commissions' | 'queue' | 'general';
  highlight?: string;
  accentCallout?: string;
}

export const DEFAULT_COMMISSIONS_FAQS: FaqItem[] = [
  {
    _id: 'faq-commissions-rates',
    order: 1,
    category: 'commissions',
    question: 'What are your RATES for commissions?',
    highlight: 'RATES',
    answer: [
      "Depends on the complexity of the piece. Please don't hesitate to DM me for more details.",
    ],
  },
  {
    _id: 'faq-commissions-delivery',
    order: 2,
    category: 'commissions',
    question: 'Once I purchase a commission, when is the expected date?',
    highlight: 'expected date',
    accentCallout:
      'If the artwork is needed to be completed at an immediate date, rates may increase.',
    answer: [
      'I will be sending weekly updates of the progress to the client VIA DMs of their preferred message platform.',
    ],
  },
];

let cachedFaqs: FaqItem[] = [];

export async function fetchFaqItems(
  category?: 'commissions' | 'queue' | 'general',
): Promise<FaqItem[]> {
  // In browser, initialize from sessionStorage if in-memory cache is empty
  if (typeof window !== 'undefined' && cachedFaqs.length === 0) {
    try {
      const stored = sessionStorage.getItem('yukiro_faqs_cache');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          cachedFaqs = parsed;
        }
      }
    } catch {}
  }

  try {
    const filter = category
      ? `*[_type == "faqItem" && category == "${category}"] | order(order asc)`
      : `*[_type == "faqItem"] | order(order asc)`;

    const rawFaqs = await sanityClient.fetch(`
      ${filter} {
        _id,
        question,
        answer,
        order,
        category,
        highlight,
        accentCallout
      }
    `);

    if (rawFaqs && rawFaqs.length > 0) {
      cachedFaqs = rawFaqs.map((item: any, index: number) => ({
        _id: item._id || `faq-${index}`,
        question: item.question || '',
        answer: Array.isArray(item.answer)
          ? item.answer
          : typeof item.answer === 'string'
            ? [item.answer]
            : [],
        order: item.order ?? index + 1,
        category: item.category || 'commissions',
        highlight: item.highlight,
        accentCallout: item.accentCallout,
      }));

      if (typeof window !== 'undefined') {
        try {
          sessionStorage.setItem('yukiro_faqs_cache', JSON.stringify(cachedFaqs));
        } catch {}
      }

      return cachedFaqs;
    }
  } catch (err) {
    console.error('Error fetching FAQs from Sanity, preserving cached data:', err);
  }

  return cachedFaqs.length > 0 ? cachedFaqs : DEFAULT_COMMISSIONS_FAQS;
}
