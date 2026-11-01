import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      description: 'The FAQ question text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer Paragraphs',
      description: 'Answer body paragraphs. Multiple lines will be rendered as separate paragraphs.',
      type: 'array',
      of: [{ type: 'text' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Numeric order for sorting (e.g. 1, 2, 3...)',
      validation: (Rule) => Rule.required().integer(),
    }),
    defineField({
      name: 'category',
      title: 'Category / Section',
      type: 'string',
      description: 'Which page or section this FAQ belongs to',
      options: {
        list: [
          { title: 'Commissions', value: 'commissions' },
          { title: 'Queue & Availability', value: 'queue' },
          { title: 'General', value: 'general' },
        ],
        layout: 'radio',
      },
      initialValue: 'commissions',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'highlight',
      title: 'Optional Accent Highlight Phrase',
      description: 'A keyword or phrase in the question to emphasize with bold brand accent color (e.g. "RATES", "expected date")',
      type: 'string',
    }),
    defineField({
      name: 'accentCallout',
      title: 'Optional Prominent Callout',
      description: 'Optional highlighted bold callout text rendered above the answer (e.g. "If the artwork is needed immediately, rates may increase.")',
      type: 'string',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category',
      order: 'order',
    },
    prepare(selection) {
      const { title, subtitle, order } = selection;
      return {
        title: `#${order ?? 0} — ${title}`,
        subtitle: `Category: ${subtitle ?? 'commissions'}`,
      };
    },
  },
});
