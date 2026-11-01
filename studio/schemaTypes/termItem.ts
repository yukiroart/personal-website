import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'termItem',
  title: 'Terms of Service Item',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Determines the order this term appears in the list (e.g. 1, 2, 3).',
      validation: (rule) => rule.required().positive().integer(),
    }),
    defineField({
      name: 'text',
      title: 'Term Text',
      type: 'text',
      rows: 3,
      description: 'The full text of the policy or guideline clause.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'highlight',
      title: 'Bold Highlight Phrase (Optional)',
      type: 'string',
      description:
        'A specific phrase in the text to emphasize in bold (e.g. FULL PAYMENT MUST BE DONE FIRST, REFUNDED, DO NOT).',
    }),
    defineField({
      name: 'redHighlight',
      title: 'Red Highlight Phrase (Optional)',
      type: 'string',
      description:
        'A specific phrase in the text to highlight in warning red (e.g. commercial discussion notice).',
    }),
  ],
  orderings: [
    {
      title: 'Display Order (Ascending)',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'text',
      subtitle: 'order',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled Term',
        subtitle: subtitle !== undefined ? `Order: ${subtitle}` : '',
      };
    },
  },
});
