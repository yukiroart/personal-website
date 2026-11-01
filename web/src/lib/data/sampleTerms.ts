import { sanityClient } from '#lib/sanity';

export interface TermItem {
  _id: string;
  order: number;
  text: string;
  highlight?: string;
  redHighlight?: string;
}

export const DEFAULT_TERMS_BULLETS: TermItem[] = [
  {
    _id: 'term-payment',
    order: 1,
    text: 'FULL PAYMENT MUST BE DONE FIRST after the approval of the commission.',
    highlight: 'FULL PAYMENT MUST BE DONE FIRST',
  },
  {
    _id: 'term-refund',
    order: 2,
    text: 'If I fail to provide the commission requested because of circumstance, the client will be REFUNDED.',
    highlight: 'REFUNDED',
  },
  {
    _id: 'term-ai-nft',
    order: 3,
    text: 'DO NOT use my artwork to train AI or for NFTs.',
    highlight: 'DO NOT',
  },
  {
    _id: 'term-credit',
    order: 4,
    text: 'If you wish to share or post the commission, I am to be credited properly.',
  },
  {
    _id: 'term-ip',
    order: 5,
    text: 'The artwork I provide is MY intellectual property. For commercial, business, & project purposes, it is to be discussed thoroughly through DMs.',
    highlight: 'MY intellectual property',
    redHighlight:
      'For commercial, business, & project purposes, it is to be discussed thoroughly through DMs.',
  },
];

let cachedTerms: TermItem[] = [];

export function formatTermHtml(item: TermItem): string {
  let html = item.text || '';

  // 1. Wrap bold highlight phrase if present
  if (item.highlight && item.highlight.trim()) {
    const escaped = item.highlight.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'i');
    html = html.replace(regex, '<strong>$1</strong>');
  }

  // 2. Wrap red callout phrase if present
  if (item.redHighlight && item.redHighlight.trim()) {
    const escaped = item.redHighlight.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'i');
    html = html.replace(regex, '<span class="terms-highlight-red">$1</span>');
  }

  return html;
}

export async function fetchTerms(): Promise<TermItem[]> {
  // In browser, initialize from sessionStorage if in-memory cache is empty
  if (typeof window !== 'undefined' && cachedTerms.length === 0) {
    try {
      const stored = sessionStorage.getItem('yukiro_terms_cache');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          cachedTerms = parsed;
        }
      }
    } catch {}
  }

  try {
    const rawTerms = await sanityClient.fetch(`
      *[_type == "termItem"] | order(order asc) {
        _id,
        order,
        text,
        highlight,
        redHighlight
      }
    `);

    if (rawTerms && rawTerms.length > 0) {
      cachedTerms = rawTerms.map((item: any, index: number) => ({
        _id: item._id || `term-${index}`,
        order: item.order ?? index + 1,
        text: item.text || '',
        highlight: item.highlight,
        redHighlight: item.redHighlight,
      }));

      if (typeof window !== 'undefined') {
        try {
          sessionStorage.setItem('yukiro_terms_cache', JSON.stringify(cachedTerms));
        } catch {}
      }

      return cachedTerms;
    }
  } catch (err) {
    console.error('Error fetching Terms from Sanity, preserving cached data:', err);
  }

  return cachedTerms.length > 0 ? cachedTerms : DEFAULT_TERMS_BULLETS;
}
