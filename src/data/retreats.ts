// ── Interfaces ──────────────────────────────────────────────

export interface ItineraryDay {
  day: number
  emoji: string
  title: string
  highlights: string[]
}

export interface ScheduleEntry {
  time: string
  title: string
  description: string
  emoji?: string
}

export interface Inclusion {
  emoji: string
  title: string
  description: string
}

export interface RoomOption {
  type: string
  price: string
  perks: string[]
  /** Stripe payment links; a missing one hides its button. */
  depositUrl?: string
  fullUrl?: string
}

export interface Retreat {
  id: string
  slug: string
  title: string
  subtitle: string
  shortDescription: string
  location: string
  venue: string
  dates: string
  duration: string
  groupSize: string
  pricing: RoomOption[]
  depositNote: string
  itinerary: ItineraryDay[]
  dailySchedule: ScheduleEntry[]
  inclusions: Inclusion[]
  notIncluded: string[]
  images: {
    hero: string
    intro: string
    card: string
    bento: string[]
    slideshow: { src: string; alt: string }[]
  }
  founderStory: string
  founderAttribution: string
  bookingUrl: string
  brochurePath: string
  contactEmail: string
  // CMS-editable per-retreat copy
  introText?: string
  programmeTitle?: string
  programmeSubtitle?: string
  founderStoryTitle?: string
  dailyScheduleSubtitle?: string
}

// ── Solstice retreat data ───────────────────────────────────

export const solstice: Retreat = {
  id: 'solstice',
  slug: 'solstice',
  title: 'Solstice',
  subtitle: 'A Journey Back to Your Heart',
  shortDescription:
    'Seven days in the Costa Rican jungle with a small circle of like-minded women. Yoga, sailing, waterfall hikes, bioluminescence kayaking, and deep connection.',
  location: 'Santa Teresa, Costa Rica',
  venue: 'House of Shakti',
  dates: 'March 22–29, 2026',
  duration: '7 nights',
  groupSize: '10 women',
  depositNote: '50% deposit to reserve · Monthly payments available',

  pricing: [
    {
      type: 'Shared Room',
      price: '$2,250',
      perks: [
        'Your own single bed in a shared room',
        'All organic breakfasts & dinners',
        'Daily yoga, meditation & breathwork',
        'All workshops & ceremonies',
        'Sailing, waterfall hike & kayaking',
        'Sauna & ice bath access',
        'SOLSTICE goodie bag',
        'Monthly payment plan available',
      ],
    },
    {
      type: 'Private Room',
      price: '$3,000',
      perks: [
        'Your own private room',
        'All organic breakfasts & dinners',
        'Daily yoga, meditation & breathwork',
        'All workshops & ceremonies',
        'Sailing, waterfall hike & kayaking',
        'Sauna & ice bath access',
        'SOLSTICE goodie bag',
        'Monthly payment plan available',
      ],
    },
  ],

  itinerary: [
    {
      day: 1,
      emoji: '🌅',
      title: 'Arrival & Opening Circle',
      highlights: [
        'Settle into House of Shakti',
        'Explore your jungle home & meet your circle',
        'Opening ceremony to set intentions',
        'Create our sacred container together',
      ],
    },
    {
      day: 2,
      emoji: '🧘',
      title: 'Ground & Release',
      highlights: [
        'Morning movement to ground into your body',
        'Afternoon session to release what you carry',
        'Breath, sound & somatic practice',
        'Sauna & ice bath for deep integration',
      ],
    },
    {
      day: 3,
      emoji: '🌿',
      title: 'Root in Nature',
      highlights: [
        'Workshop in the wisdom of plants',
        'Hike to Montezuma waterfall',
        'Swim in the pool at its base',
        'Connect with the natural world',
      ],
    },
    {
      day: 4,
      emoji: '🔥',
      title: 'Reclaim Your Power',
      highlights: [
        'Remember who you are beneath every role',
        'Drop the labels — reclaim your truth',
        'One of the most powerful afternoons',
        'Arrive open',
      ],
    },
    {
      day: 5,
      emoji: '⛵',
      title: 'Sail to Tortuga Island',
      highlights: [
        'Full day sailing trip to Tortuga Island',
        'Snorkelling in crystal-clear water',
        'White sand beaches & open blue horizon',
        'Be wild and alive',
      ],
    },
    {
      day: 6,
      emoji: '💫',
      title: 'Be Witnessed',
      highlights: [
        'Workshop on the power of being truly heard',
        'Evening fire show on the beach',
        'Dancing, fire & laughter',
        'A core memory you carry forever',
      ],
    },
    {
      day: 7,
      emoji: '🌌',
      title: 'Glow & Carry It Home',
      highlights: [
        'Bioluminescence kayaking at nightfall',
        'Paddle through glowing water in the dark',
        'Closing circle — share what you take home',
        'A final communal meal together',
      ],
    },
  ],

  dailySchedule: [
    {
      time: '5:30 AM',
      emoji: '🌿',
      title: 'The jungle wakes you',
      description:
        'Howler monkeys roll through the canopy like thunder. Birds fill the air with sound that can only be described as music. You lie there — not reaching for your phone — just listening. Completely at peace.',
    },
    {
      time: '7:30 AM',
      emoji: '🧘',
      title: 'Sacred morning begins',
      description:
        'Barefoot to the shala as the sun rises. Guided meditation, breathwork or EFT, then 75 minutes of yoga or pilates. You leave feeling wrung out and radiant all at once.',
    },
    {
      time: '10:00 AM',
      emoji: '🍽️',
      title: 'Breakfast together',
      description:
        'Organic, nourishing food. Tropical fruit, local produce. Slow eating. Real conversations.',
    },
    {
      time: '11 AM – 4 PM',
      emoji: '🌊',
      title: 'The afternoon is yours',
      description:
        'Waterfalls. Hammocks. Sauna. Ice bath. Rest or adventure — you choose.',
    },
    {
      time: '4:00 PM',
      emoji: '✨',
      title: 'Workshops & excursions',
      description:
        'Ceremonies, sailing, or bioluminescent kayaking. Experiences you carry home forever.',
    },
    {
      time: '7:00 PM',
      emoji: '🕯️',
      title: 'Dinner',
      description:
        'Candlelight. Slow meals. Deep connection. By day three, strangers feel like sisters.',
    },
    {
      time: 'Evening',
      emoji: '🌌',
      title: 'The stars',
      description:
        'Fire dancers, ocean, silence, gratitude. Moments you never forget.',
    },
  ],

  inclusions: [
    {
      emoji: '🏡',
      title: '7 Nights at House of Shakti',
      description: 'Your jungle home in Santa Teresa — open-air living surrounded by nature.',
    },
    {
      emoji: '🍽️',
      title: 'Organic Breakfasts & Dinners',
      description: 'Healthy, nourishing meals with tropical fruit and local produce daily.',
    },
    {
      emoji: '🧘',
      title: 'Daily Yoga, Meditation & Breathwork',
      description: 'Morning movement and mindfulness practices to ground and centre you.',
    },
    {
      emoji: '✨',
      title: 'Curated Workshops & Ceremonies',
      description: 'Transformative sessions designed for deep connection and self-discovery.',
    },
    {
      emoji: '⛵',
      title: 'Sailing Trip to Tortuga Island',
      description: 'A full day of snorkelling, white sand beaches, and open blue horizon.',
    },
    {
      emoji: '🌊',
      title: 'Montezuma Waterfall Hike',
      description: 'Hike through the jungle to swim in the pool at the base of the waterfall.',
    },
    {
      emoji: '🌌',
      title: 'Bioluminescence Kayaking',
      description: 'Paddle through glowing water in the dark ocean — pure magic.',
    },
    {
      emoji: '🔥',
      title: 'Fire Show at Rancho Itauna',
      description: 'Dancing, fire, laughter, and an unforgettable evening on the beach.',
    },
    {
      emoji: '🧊',
      title: 'Sauna & Ice Bath Access',
      description: 'Deep integration and recovery after workshops and movement.',
    },
    {
      emoji: '🎁',
      title: 'SOLSTICE Welcome Goodie Bag',
      description: 'A curated welcome gift to start your retreat journey.',
    },
    {
      emoji: '📋',
      title: 'Pre-Retreat Guide & Welcome Call',
      description: 'Everything you need to prepare, plus a personal welcome before you arrive.',
    },
  ],

  notIncluded: [
    'Flights to Costa Rica',
    'Airport transfers (taxi contact provided)',
    'Lunches — explore Santa Teresa locally',
    'Optional surf lessons (~$50)',
    'Personal spending & souvenirs',
  ],

  images: {
    hero: '/brand/RETREATS/solstice-sunset-group.webp',
    intro: '/brand/RETREATS/solstice-beach-group.webp',
    card: '/brand/RETREATS/solstice-sunset-group.webp',
    bento: [
      '/brand/RETREATS/solstice-waterfall.webp',
      '/brand/RETREATS/solstice-surfing.webp',
      '/brand/RETREATS/solstice-beach-reading.webp',
      '/brand/RETREATS/solstice-night-group.webp',
    ],
    slideshow: [
      { src: '/brand/RETREATS/slideshow/sunset-beach.webp', alt: 'Golden sunset on the Costa Rican beach' },
      { src: '/brand/RETREATS/slideshow/group-dining.webp', alt: 'Communal dinner with friends' },
      { src: '/brand/RETREATS/slideshow/waterfall-hike.webp', alt: 'Montezuma waterfall hike' },
      { src: '/brand/RETREATS/slideshow/surfing-ocean.webp', alt: 'Surfing in the Pacific Ocean' },
      { src: '/brand/RETREATS/slideshow/group-beach-night.webp', alt: 'Evening on the beach with the group' },
      { src: '/brand/RETREATS/slideshow/reading-beach.webp', alt: 'Reading on the beach at golden hour' },
      { src: '/brand/RETREATS/slideshow/villa-view.webp', alt: 'House of Shakti with ocean view' },
      { src: '/brand/RETREATS/slideshow/waves-fun.webp', alt: 'Playing in the waves' },
      { src: '/brand/RETREATS/slideshow/sunset-landscape.webp', alt: 'Pacific sunset from Santa Teresa' },
      { src: '/brand/RETREATS/slideshow/group-sunset.webp', alt: 'Group watching the sunset together' },
      { src: '/brand/RETREATS/slideshow/beach-dusk.webp', alt: 'Beach at dusk in Costa Rica' },
    ],
  },

  founderStory:
    'I remember the exact moment. Sitting on a rock beside a waterfall deep in the jungle — barefoot, sun on my face, a dog I\'d never met curled beside me like we\'d known each other for years.\n\nI had been running for a long time. Between cities, between versions of myself, between who I thought I was supposed to be and who I could feel pulling at me from somewhere deeper. Costa Rica didn\'t care about any of that. The jungle has a way of stripping things back.\n\nHere, I found something I hadn\'t realised I was missing: stillness inside movement. I would wake before sunrise, walk barefoot to the beach while it was still dark, and simply breathe — watching the sky turn from black to pink to gold. And in that silence, I began to hear myself again.\n\nThe women I met changed me too. We cooked together, laughed until our sides ached, cried without explanation, held space for each other\'s truths without judgment. I understood then that transformation is not a solo journey — it happens in community, in the sacred circle of women willing to go there with you.\n\nCosta Rica gave me my heart back. And now I want to bring you here — to the place, the energy, and the medicine that changed everything for me. Because you deserve to feel what I felt on that rock beside that waterfall.',

  founderAttribution: 'Rebecca, Founder of Lync Events Madrid',

  bookingUrl: 'https://lyncevents.as.me/schedule/62219b14/appointment/91617255/calendar/11387680',
  brochurePath: '/solstice-brochure.pdf',
  contactEmail: 'lynccommunity@gmail.com',
}

// ── All retreats ──────────────────────────────────────────

export const retreats: Retreat[] = [solstice]

export function getRetreat(slug: string): Retreat | undefined {
  return retreats.find((r) => r.slug === slug)
}
