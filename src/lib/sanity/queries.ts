import { groq } from 'next-sanity'

export const ALL_RETREATS_QUERY = groq`
  *[_type == "retreat"] | order(dates asc) {
    _id,
    title,
    slug,
    subtitle,
    shortDescription,
    location,
    venue,
    dates,
    duration,
    groupSize,
    introText,
    programmeTitle,
    programmeSubtitle,
    founderStoryTitle,
    dailyScheduleSubtitle,
    pricing[] { type, price, perks, depositUrl, fullUrl },
    depositNote,
    itinerary[] { day, emoji, title, highlights },
    dailySchedule[] { time, title, description, emoji },
    inclusions[] { emoji, title, description },
    notIncluded,
    images {
      hero,
      intro,
      card,
      bento,
      slideshow[] { ..., alt }
    },
    founderStory,
    founderAttribution,
    bookingUrl,
    brochure { asset-> { url } },
    contactEmail
  }
`

export const RETREAT_BY_SLUG_QUERY = groq`
  *[_type == "retreat" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    subtitle,
    shortDescription,
    location,
    venue,
    dates,
    duration,
    groupSize,
    introText,
    programmeTitle,
    programmeSubtitle,
    founderStoryTitle,
    dailyScheduleSubtitle,
    pricing[] { type, price, perks, depositUrl, fullUrl },
    depositNote,
    itinerary[] { day, emoji, title, highlights },
    dailySchedule[] { time, title, description, emoji },
    inclusions[] { emoji, title, description },
    notIncluded,
    images {
      hero,
      intro,
      card,
      bento,
      slideshow[] { ..., alt }
    },
    founderStory,
    founderAttribution,
    bookingUrl,
    brochure { asset-> { url } },
    contactEmail
  }
`

export const RETREAT_SLUGS_QUERY = groq`
  *[_type == "retreat"] { "slug": slug.current }
`

// ── Blog posts ─────────────────────────────────────────

export const ALL_BLOGS_QUERY = groq`
  *[_type == "blogPost"] | order(date desc) {
    _id,
    title,
    slug,
    date,
    category,
    excerpt,
    image,
    content[] { heading, body }
  }
`

export const BLOG_BY_SLUG_QUERY = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    date,
    category,
    excerpt,
    image,
    content[] { heading, body }
  }
`

export const BLOG_SLUGS_QUERY = groq`
  *[_type == "blogPost"] { "slug": slug.current }
`
