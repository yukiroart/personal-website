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
          { title: '02 Sketching', value: 'sketching' },
          { title: '03 Lineart', value: 'lineart' },
          { title: '04 Coloring', value: 'coloring' },
          { title: '05 Completed', value: 'completed' },
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
