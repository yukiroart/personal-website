import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'artistProfile',
  title: 'Artist Profile & About',
  type: 'document',
  fields: [
    defineField({
      name: 'artistName',
      title: 'Artist Name',
      type: 'string',
      initialValue: 'Lindsay',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline / Short Bio',
      type: 'string',
      placeholder: 'Contemporary visual artist exploring light, texture, and organic form.',
    }),
    defineField({
      name: 'portraitImage',
      title: 'Artist Portrait',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'statement',
      title: 'Artist Statement',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'biography',
      title: 'Full Biography',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'exhibitions',
      title: 'Selected Exhibitions & Shows',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'year', title: 'Year', type: 'number' },
            { name: 'title', title: 'Exhibition Title', type: 'string' },
            { name: 'gallery', title: 'Gallery / Venue', type: 'string' },
            { name: 'location', title: 'City, Country', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram Handle',
      type: 'string',
      placeholder: '@lindsay.art',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Inquiry Email',
      type: 'string',
    }),
  ],
});
