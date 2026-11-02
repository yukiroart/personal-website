import { sanityClient } from '#lib/sanity';

export interface CommissionStatusConfig {
  status: 'open' | 'closed';
  note?: string;
}

export const DEFAULT_COMMISSION_STATUS: CommissionStatusConfig = {
  status: 'open',
  note: '',
};

let cachedStatus: CommissionStatusConfig | null = null;

export async function fetchCommissionStatus(): Promise<CommissionStatusConfig> {
  // In browser, initialize from sessionStorage if in-memory cache is empty
  if (typeof window !== 'undefined' && !cachedStatus) {
    try {
      const stored = sessionStorage.getItem('yukiro_commission_status_cache');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && (parsed.status === 'open' || parsed.status === 'closed')) {
          cachedStatus = parsed;
        }
      }
    } catch {}
  }

  try {
    const profile = await sanityClient.fetch(`
      *[_type == "artistProfile"][0] {
        commissionStatus,
        commissionStatusNote
      }
    `);

    if (profile && (profile.commissionStatus === 'open' || profile.commissionStatus === 'closed')) {
      cachedStatus = {
        status: profile.commissionStatus,
        note: profile.commissionStatusNote || '',
      };

      if (typeof window !== 'undefined') {
        try {
          sessionStorage.setItem('yukiro_commission_status_cache', JSON.stringify(cachedStatus));
        } catch {}
      }

      return cachedStatus;
    }
  } catch (err) {
    console.error('Error fetching Commission Status from Sanity, using fallback:', err);
  }

  return cachedStatus || DEFAULT_COMMISSION_STATUS;
}
