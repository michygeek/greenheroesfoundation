/**
 * Sanity schema — Blog Post document type.
 *
 * This defines every field an editor sees in the Sanity Studio.
 * Fields are mapped 1-to-1 with the BlogPost interface used across the site.
 */

import { defineField, defineType } from 'sanity';

export const postType = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',

  // Ordering in studio sidebar
  orderings: [
    {
      title: 'Published Date (newest first)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],

  fields: [
    // ── Core ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(120),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier (auto-generated from title).',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '')
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary shown on post cards and in search results (max 200 chars).',
      validation: (Rule) => Rule.required().max(200),
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Displayed as the hero image on the post page and as the card thumbnail.',
      options: {
        hotspot: true,  // enables focal point selection in the studio
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for screen readers and SEO.',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // ── Rich text body ────────────────────────────────────────────────────────
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        // Standard block content (headings, paragraphs, lists, quotes)
        {
          type: 'block',
          styles: [
            { title: 'Normal',     value: 'normal'     },
            { title: 'Heading 2',  value: 'h2'         },
            { title: 'Heading 3',  value: 'h3'         },
            { title: 'Heading 4',  value: 'h4'         },
            { title: 'Quote',      value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet',   value: 'bullet'   },
            { title: 'Numbered', value: 'number'   },
          ],
          marks: {
            decorators: [
              { title: 'Bold',          value: 'strong' },
              { title: 'Italic',        value: 'em'     },
              { title: 'Underline',     value: 'underline' },
              { title: 'Strike',        value: 'strike-through' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
                  },
                  {
                    name: 'openInNewTab',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
        // Inline images within the body
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
        // Horizontal divider
        { type: 'separator' },
      ],
    }),
  ],

  // ── Studio preview ────────────────────────────────────────────────────────
  preview: {
    select: {
      title: 'title',
      date: 'publishedAt',
      media: 'coverImage',
    },
    prepare({ title, date, media }) {
      const dateStr = date
        ? new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : 'No date';
      return {
        title,
        subtitle: dateStr,
        media,
      };
    },
  },
});
