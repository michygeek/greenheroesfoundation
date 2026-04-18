/**
 * queries.ts — all GROQ queries used to fetch content from Sanity.
 *
 * Centralising queries here makes it easy to update projections in one place.
 * All queries project only the fields the UI actually needs.
 */

import { groq } from 'next-sanity';

// ─── Shared projection fragments ─────────────────────────────────────────────

/** Fields included in every post card / list view (no body). */
const POST_CARD_FIELDS = groq`
  _id,
  title,
  "slug": slug.current,
  "date": publishedAt,
  excerpt,
  "coverImage": coverImage {
    asset,
    hotspot,
    crop,
    alt
  },
`;

// ─── Queries ──────────────────────────────────────────────────────────────────

/**
 * Total number of published posts.
 * Used to compute pagination metadata without fetching full documents.
 */
export const POST_COUNT_QUERY = groq`
  count(*[_type == "post" && defined(slug.current) && defined(publishedAt)])
`;

/**
 * A single page of posts, sorted newest first.
 *
 * @param $start  - 0-based start index (inclusive)
 * @param $end    - 0-based end index (exclusive)
 */
export const PAGINATED_POSTS_QUERY = groq`
  *[_type == "post" && defined(slug.current) && defined(publishedAt)]
  | order(publishedAt desc)
  [$start...$end] {
    ${POST_CARD_FIELDS}
  }
`;

/**
 * The N most recent posts (used on the Home page latest-posts section).
 *
 * @param $count - number of posts to return
 */
export const LATEST_POSTS_QUERY = groq`
  *[_type == "post" && defined(slug.current) && defined(publishedAt)]
  | order(publishedAt desc)
  [0...$count] {
    ${POST_CARD_FIELDS}
  }
`;

/**
 * Full post by slug — includes body (Portable Text blocks).
 *
 * @param $slug - the post slug string
 */
export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "date": publishedAt,
    excerpt,
    "coverImage": coverImage {
      asset,
      hotspot,
      crop,
      alt
    },
    body[] {
      ...,
      _type == "image" => {
        ...,
        asset->,
      },
    },
  }
`;

/**
 * All published slugs — used by generateStaticParams() in [slug]/page.tsx.
 */
export const ALL_SLUGS_QUERY = groq`
  *[_type == "post" && defined(slug.current) && defined(publishedAt)].slug.current
`;
