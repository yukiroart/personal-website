export type QueueStage = 'approved' | 'sketching' | 'lineart' | 'coloring' | 'completed';

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
    description: 'Contract confirmed & palette agreed'
  },
  {
    id: 'sketching',
    title: 'Sketching',
    badge: '02',
    color: 'var(--color-pink)',
    description: 'Composition thumbnails & charcoal studies'
  },
  {
    id: 'lineart',
    title: 'Lineart',
    badge: '03',
    color: 'var(--color-green)',
    description: 'Structural ink contours & geometry'
  },
  {
    id: 'coloring',
    title: 'Coloring',
    badge: '04',
    color: '#8338EC',
    description: 'Pigment layering, glazes & textures'
  },
  {
    id: 'completed',
    title: 'Completed',
    badge: '05',
    color: '#3A86FF',
    description: 'Varnished, dried & prepared for shipment'
  }
];

export const SAMPLE_QUEUE_ITEMS: CommissionItem[] = [
  {
    id: 'comm-01',
    client: 'Eleanor Vance',
    description: '30 × 40 in oil and mineral pigments on raw linen. Botanical flora landscape with muted ochre undertones.',
    stage: 'approved',
  },
  {
    id: 'comm-02',
    client: 'Horizon Press & Media',
    description: 'Editorial cover art in mixed gouache and digital ink with atmospheric twilight palette.',
    stage: 'sketching',
  },
  {
    id: 'comm-03',
    client: 'Marcus & Clara T.',
    description: '24 × 36 in architectural polyptych on wood panel using India ink and acrylic wash.',
    stage: 'lineart',
  },
  {
    id: 'comm-04',
    client: 'Atelier S. Gallery',
    description: '48 × 60 in layered oil on heavy linen with luminous translucent color glazes.',
    stage: 'coloring',
  },
  {
    id: 'comm-05',
    client: 'Dr. Evelyn Hayes',
    description: '20 × 24 in private portraiture study in oil on cradled birch panel.',
    stage: 'completed',
  }
];
