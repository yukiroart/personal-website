import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'commissionSlot',
  title: 'Commission Queue Slot',
  type: 'document',
  fields: [
    defineField({
      name: 'client',
      title: 'Client Name / Handle',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Commission Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stage',
      title: 'Current Kanban Stage',
      type: 'string',
      options: {
        list: [
          { title: '01 Approved', value: 'approved' },
          { title: '02 Payment', value: 'payment' },
          { title: '03 In Progress', value: 'in-progress' },
          { title: '04 Done', value: 'done' },
        ],
        layout: 'radio',
      },
      initialValue: 'approved',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'client',
      subtitle: 'description',
      stage: 'stage',
    },
    prepare({ title, subtitle, stage }) {
      return {
        title: `${title} [${stage?.toUpperCase() || 'QUEUE'}]`,
        subtitle,
      };
    },
  },
});
