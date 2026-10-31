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
    description: 'Scope confirmed & commission approved'
  },
  {
    id: 'payment',
    title: 'Payment',
    badge: '02',
    color: 'var(--color-pink)',
    description: 'Deposit invoice sent & awaiting settlement'
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    badge: '03',
    color: 'var(--color-green)',
    description: 'Active production & rendering in studio'
  },
  {
    id: 'done',
    title: 'Done',
    badge: '04',
    color: '#3A86FF',
    description: 'Final artwork completed & dispatched'
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
    stage: 'payment',
  },
  {
    id: 'comm-03',
    client: 'Marcus & Clara T.',
    description: '24 × 36 in architectural polyptych on wood panel using India ink and acrylic wash.',
    stage: 'in-progress',
  },
  {
    id: 'comm-04',
    client: 'Atelier S. Gallery',
    description: '48 × 60 in layered oil on heavy linen with luminous translucent color glazes.',
    stage: 'in-progress',
  },
  {
    id: 'comm-05',
    client: 'Dr. Evelyn Hayes',
    description: '20 × 24 in private portraiture study in oil on cradled birch panel.',
    stage: 'done',
  }
];
