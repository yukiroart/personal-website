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

export const SAMPLE_QUEUE_ITEMS: CommissionItem[] = [];
