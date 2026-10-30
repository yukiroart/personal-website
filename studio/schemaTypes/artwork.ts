import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'artwork',
  title: 'Artworks',
  type: 'document',
  fields: [
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
      options: {
        hotspot: true, // Yukiro can click the visual focal point!
      },
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
      name: 'galleryImages',
      title: 'Detail & In-Situ Views',
      description: 'Close-up texture shots, framing angles, or wall-hanging mockups',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'year',
      title: 'Year Created',
      type: 'number',
      initialValue: new Date().getFullYear(),
    }),
    defineField({
      name: 'medium',
      title: 'Medium / Materials',
      type: 'string',
      placeholder: 'e.g., Oil on Canvas, Gouache on Arches Paper, Mixed Media',
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
      placeholder: 'e.g., 24 x 36 in (61 x 91 cm)',
    }),
    defineField({
      name: 'collection',
      title: 'Series / Collection',
      type: 'string',
      options: {
        list: [
          { title: 'New Works', value: 'new-works' },
          { title: 'Landscapes & Botanicals', value: 'landscapes' },
          { title: 'Abstract Studies', value: 'abstracts' },
          { title: 'Portraiture', value: 'portraits' },
        ],
      },
    }),
    defineField({
      name: 'status',
      title: 'Availability Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available for Purchase', value: 'available' },
          { title: 'Sold / Private Collection', value: 'sold' },
          { title: 'On Exhibition', value: 'exhibition' },
          { title: 'Archived / Study', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'available',
    }),
    defineField({
      name: 'price',
      title: 'Price (Optional)',
      description: 'Leave empty for "Inquire for Pricing"',
      type: 'string',
      placeholder: 'e.g., $1,200 USD',
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
      subtitle: 'medium',
      media: 'mainImage',
    },
  },
});
