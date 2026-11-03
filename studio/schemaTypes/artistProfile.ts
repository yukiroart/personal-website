import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'artistProfile',
  title: 'Artist Profile & Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'commissionStatus',
      title: 'Commission Availability Status',
      type: 'string',
      description: 'Controls the live Status banner on the Commissions page.',
      options: {
        list: [
          { title: '🟢 Open (Accepting Commissions)', value: 'open' },
          { title: '🔴 Closed (Commissions Paused)', value: 'closed' },
        ],
        layout: 'radio',
      },
      initialValue: 'open',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'commissionStatusNote',
      title: 'Commission Status Note (Optional)',
      type: 'string',
      description:
        'Optional short note displayed under the status (e.g. "Taking 2 slots" or "Reopening late November").',
    }),
    defineField({
      name: 'artistName',
      title: 'Artist Name',
      type: 'string',
      initialValue: 'Yukiro',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'portraitImage',
      title: 'Artist Portrait (Instax Mini)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'object',
      fields: [
        {
          name: 'school',
          title: 'School / Institution',
          type: 'string',
          initialValue: 'De La Salle Benilde',
        },
        {
          name: 'program',
          title: 'Degree / Program',
          type: 'string',
          initialValue: 'Art & Animation',
        },
      ],
    }),
    defineField({
      name: 'bio',
      title: 'Bio Narrative',
      type: 'array',
      description: 'Formatted narrative bio for the About page with text styling and links.',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 3', value: 'h3' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    type: 'boolean',
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'contactChannels',
      title: 'Contact Channels',
      type: 'object',
      fields: [
        {
          name: 'discord',
          title: 'Discord Username',
          type: 'string',
          initialValue: 'yuk1r0',
        },
        {
          name: 'email',
          title: 'Inquiry Email',
          type: 'string',
          initialValue: 'yukiroart19@gmail.com',
        },
        {
          name: 'twitter',
          title: 'Twitter / X URL',
          type: 'url',
          initialValue: 'https://x.com/yukir0_art',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'artistName',
      status: 'commissionStatus',
      media: 'portraitImage',
    },
    prepare({ title, status, media }) {
      const statusLabel = status === 'closed' ? '🔴 CLOSED' : '🟢 OPEN';
      return {
        title: `${title || 'Artist Profile'} [${statusLabel}]`,
        media,
      };
    },
  },
});
