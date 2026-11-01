import { sanityClient } from '#lib/sanity';

export type QueueStage = 'approved' | 'payment' | 'in-progress' | 'done';

export interface QueueColumn {
  id: QueueStage;
  title: string;
  badge: string;
  color: string;
  description: string;
}

export interface CommissionItem {
  id: string;
  client: string;
  description: string;
  stage: QueueStage;
  slotNumber?: string;
  projectType?: string;
  medium?: string;
  size?: string;
  progressPercent?: number;
  startDate?: string;
  targetDate?: string;
  notes?: string;
}

export const QUEUE_COLUMNS: QueueColumn[] = [
  {
    id: 'approved',
    title: 'Approved',
    badge: '01',
    color: 'var(--color-yellow)',
    description: 'Scope confirmed & commission approved',
  },
  {
    id: 'payment',
    title: 'Payment',
    badge: '02',
    color: 'var(--color-pink)',
    description: 'Deposit invoice sent & awaiting settlement',
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    badge: '03',
    color: 'var(--color-green)',
    description: 'Active production & rendering in studio',
  },
  {
    id: 'done',
    title: 'Done',
    badge: '04',
    color: '#3A86FF',
    description: 'Final artwork completed & dispatched',
  },
];

export const SAMPLE_QUEUE_ITEMS: CommissionItem[] = [];

let cachedQueue: CommissionItem[] = [];

export async function fetchQueueItems(): Promise<CommissionItem[]> {
  // In browser, initialize from sessionStorage if in-memory cache is empty
  if (typeof window !== 'undefined' && cachedQueue.length === 0) {
    try {
      const stored = sessionStorage.getItem('yukiro_queue_cache');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          cachedQueue = parsed;
        }
      }
    } catch {}
  }

  try {
    const rawSlots = await sanityClient.fetch(`
      *[_type == "commissionSlot"] | order(_createdAt asc) {
        _id,
        client,
        description,
        stage
      }
    `);

    if (rawSlots && Array.isArray(rawSlots)) {
      cachedQueue = rawSlots.map((doc: any, index: number) => ({
        id: doc._id || `queue-${index}`,
        client: doc.client || 'Anonymous Client',
        description: doc.description || '',
        stage: (doc.stage as QueueStage) || 'approved',
      }));

      if (typeof window !== 'undefined') {
        try {
          sessionStorage.setItem('yukiro_queue_cache', JSON.stringify(cachedQueue));
        } catch {}
      }

      return cachedQueue;
    }
  } catch (err) {
    console.error('Error fetching Commission Slots from Sanity, preserving cached data:', err);
  }

  return cachedQueue.length > 0 ? cachedQueue : SAMPLE_QUEUE_ITEMS;
}
