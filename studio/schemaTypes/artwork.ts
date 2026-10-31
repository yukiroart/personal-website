import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'artwork',
  title: 'Artworks',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Numeric sort order (e.g. 0, 1, 4.1, 15). Lower numbers appear first.',
      initialValue: 0,
    }),
    defineField({
      name: 'title',
      title: 'Artwork Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Primary Artwork Image',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text (for accessibility & SEO)',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'collection',
      title: 'Illustration Framing Type',
      type: 'string',
      options: {
        list: [
          { title: 'Illustration', value: 'illustration' },
          { title: 'Animation', value: 'animation' },
          { title: 'Bust', value: 'bust' },
          { title: 'Half Body', value: 'half-body' },
          { title: 'Full Body', value: 'full-body' },
          { title: 'Chibi', value: 'chibi' },
          { title: 'Comic', value: 'comic' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Artwork Tags',
      description: 'Select one or more style/category tags for filtering and modal display',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Original', value: 'Original' },
          { title: 'Fan Art', value: 'Fan Art' },
          { title: 'Commission', value: 'Commission' },
          { title: 'Reference Sheet', value: 'Reference Sheet' },
        ],
      },
    }),
    defineField({
      name: 'videoUrl',
      title: 'Preview Video URL / Path',
      type: 'string',
      description: 'Optional path or URL to looping MP4 for autoplaying bento card preview',
      placeholder: '/artworks/fansa-animation.mp4',
    }),
    defineField({
      name: 'youtubeEmbedUrl',
      title: 'YouTube Embed URL',
      type: 'url',
      description: 'Embed URL for lightbox modal player (e.g., https://www.youtube.com/embed/...)',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube Watch Link',
      type: 'url',
      description: 'External link to watch full video on YouTube (e.g., https://www.youtube.com/watch?v=...)',
    }),
    defineField({
      name: 'year',
      title: 'Year Created',
      type: 'number',
      initialValue: new Date().getFullYear(),
    }),
    defineField({
      name: 'description',
      title: 'Artist Notes / Story',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'collection',
      media: 'mainImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `Type: ${subtitle.toUpperCase()}` : '',
        media,
      };
    },
  },
});
