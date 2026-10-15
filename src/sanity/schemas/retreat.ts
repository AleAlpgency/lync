import { defineField, defineType } from 'sanity'

export const retreat = defineType({
  name: 'retreat',
  title: 'Retreat',
  type: 'document',
  fields: [
    // ── Core info ──────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'string',
    }),
    defineField({
      name: 'dates',
      title: 'Dates',
      type: 'string',
      description: 'Display format, e.g. "March 22–29, 2026"',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g. "7 nights"',
    }),
    defineField({
      name: 'groupSize',
      title: 'Group Size',
      type: 'string',
      description: 'e.g. "10 women"',
    }),

    // ── Per-retreat customizable copy ──────────────────
    defineField({
      name: 'introText',
      title: 'Intro Text',
      type: 'text',
      rows: 6,
      description: 'Per-retreat intro paragraphs. Separate paragraphs with blank lines.',
    }),
    defineField({
      name: 'programmeTitle',
      title: 'Programme Title',
      type: 'string',
      description: 'e.g. "Seven Days of Becoming"',
    }),
    defineField({
      name: 'programmeSubtitle',
      title: 'Programme Subtitle',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'founderStoryTitle',
      title: 'Founder Story Title',
      type: 'string',
      description: 'e.g. "How Costa Rica Changed My Life"',
    }),
    defineField({
      name: 'dailyScheduleSubtitle',
      title: 'Daily Schedule Subtitle',
      type: 'string',
    }),

    // ── Pricing ────────────────────────────────────────
    defineField({
      name: 'pricing',
      title: 'Pricing',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'type', title: 'Room Type', type: 'string' }),
            defineField({ name: 'price', title: 'Price', type: 'string', description: 'e.g. "$2,250"' }),
            defineField({
              name: 'perks',
              title: 'Perks',
              type: 'array',
              of: [{ type: 'string' }],
            }),
            defineField({
              name: 'depositUrl',
              title: 'Deposit payment link',
              type: 'url',
              description: 'Stripe payment link for the deposit. Leave empty to hide the button.',
            }),
            defineField({
              name: 'fullUrl',
              title: 'Pay in full link',
              type: 'url',
              description: 'Stripe payment link for the full price. Leave empty to hide the button.',
            }),
          ],
          preview: {
            select: { title: 'type', subtitle: 'price' },
          },
        },
      ],
    }),
    defineField({
      name: 'depositNote',
      title: 'Deposit Note',
      type: 'string',
    }),

    // ── Itinerary ──────────────────────────────────────
    defineField({
      name: 'itinerary',
      title: 'Itinerary',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'day', title: 'Day Number', type: 'number' }),
            defineField({ name: 'emoji', title: 'Emoji', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({
              name: 'highlights',
              title: 'Highlights',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
          preview: {
            select: { title: 'title', day: 'day', emoji: 'emoji' },
            prepare({ title, day, emoji }) {
              return { title: `Day ${day}: ${title}`, media: undefined, subtitle: emoji }
            },
          },
        },
      ],
    }),

    // ── Daily Schedule ─────────────────────────────────
    defineField({
      name: 'dailySchedule',
      title: 'Daily Schedule',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'time', title: 'Time', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'string' }),
            defineField({ name: 'emoji', title: 'Emoji', type: 'string' }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'time' },
          },
        },
      ],
    }),

    // ── Inclusions ─────────────────────────────────────
    defineField({
      name: 'inclusions',
      title: "What's Included",
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'emoji', title: 'Emoji', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'string' }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'emoji' },
          },
        },
      ],
    }),
    defineField({
      name: 'notIncluded',
      title: 'Not Included',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    // ── Images ─────────────────────────────────────────
    defineField({
      name: 'images',
      title: 'Images',
      type: 'object',
      fields: [
        defineField({
          name: 'hero',
          title: 'Hero Image',
          type: 'image',
          options: { hotspot: true },
          validation: (r) => r.required(),
        }),
        defineField({
          name: 'intro',
          title: 'Intro Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'card',
          title: 'Card Image',
          type: 'image',
          options: { hotspot: true },
          description: 'Falls back to hero if not set',
        }),
        defineField({
          name: 'bento',
          title: 'Bento Grid Images',
          type: 'array',
          of: [{ type: 'image', options: { hotspot: true } }],
        }),
        defineField({
          name: 'slideshow',
          title: 'Slideshow Images',
          type: 'array',
          of: [
            {
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // ── Text fields ────────────────────────────────────
    defineField({
      name: 'founderStory',
      title: 'Founder Story',
      type: 'text',
      rows: 10,
      description: 'Plain text. Separate paragraphs with blank lines.',
    }),
    defineField({
      name: 'founderAttribution',
      title: 'Founder Attribution',
      type: 'string',
    }),

    // ── Links ──────────────────────────────────────────
    defineField({
      name: 'bookingUrl',
      title: 'Booking URL',
      type: 'url',
    }),
    defineField({
      name: 'brochure',
      title: 'Brochure PDF',
      type: 'file',
      options: { accept: '.pdf' },
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
  ],

  preview: {
    select: { title: 'title', subtitle: 'location', media: 'images.hero' },
  },
})
