/**
 * blog.ts — data-access layer for blog content.
 *
 * All content is now fetched from Sanity via GROQ queries.
 * The public interface (BlogPost, BlogPostFull, formatDate, etc.) is
 * unchanged so every page and component continues to work without edits.
 */

import type { PortableTextBlock } from '@portabletext/react';
import { client, isSanityConfigured } from '@/sanity/client';
import { urlFor } from '@/sanity/lib/image';
import {
  POST_COUNT_QUERY,
  PAGINATED_POSTS_QUERY,
  LATEST_POSTS_QUERY,
  POST_BY_SLUG_QUERY,
  ALL_SLUGS_QUERY,
} from '@/sanity/queries';

// ─── Types ───────────────────────────────────────────────────────────────────

/** The shape of the coverImage object returned by Sanity GROQ projections. */
interface SanityImageRef {
  asset: { _ref: string; _type: 'reference' } | { _id: string; url?: string };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
}

/** Raw post document returned from Sanity (pre-transformation). */
interface SanityPost {
  _id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  coverImage: SanityImageRef | null;
}

interface SanityPostFull extends SanityPost {
  body: PortableTextBlock[];
}

/** Normalised blog post used throughout the UI (card views, listing). */
export interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  date: string;        // ISO string: "2024-06-01T..."
  excerpt: string;
  coverImage: string;  // resolved URL string ready for <Image src={...}>
  coverImageAlt: string;
}

/** Full blog post including the Portable Text body (detail page). */
export interface BlogPostFull extends BlogPost {
  body: PortableTextBlock[];
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1579091337671-a6529e7b60e8?w=1200&q=80';

/**
 * Converts a Sanity image reference object into a plain URL string.
 * Falls back to a placeholder if the asset is missing.
 */
function resolveCoverImageUrl(img: SanityImageRef | null): string {
  if (!img?.asset) return FALLBACK_IMAGE;
  try {
    return urlFor(img).width(1200).height(630).fit('crop').auto('format').url();
  } catch {
    return FALLBACK_IMAGE;
  }
}

/** Maps a raw Sanity post to the clean BlogPost interface used by the UI. */
function mapPost(raw: SanityPost): BlogPost {
  return {
    _id:           raw._id,
    slug:          raw.slug,
    title:         raw.title,
    date:          raw.date ?? '',
    excerpt:       raw.excerpt ?? '',
    coverImage:    resolveCoverImageUrl(raw.coverImage),
    coverImageAlt: raw.coverImage?.alt ?? raw.title,
  };
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Returns a paginated slice of blog posts plus pagination metadata.
 *
 * @param page        1-based page number (defaults to 1)
 * @param postsPerPage  posts per page (defaults to 5)
 */
export async function getPaginatedPosts(
  page: number = 1,
  postsPerPage: number = 5
): Promise<{
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
}> {
  // Return empty state when Sanity isn't configured yet (e.g. during build CI)
  if (!isSanityConfigured) {
    return { posts: [], currentPage: 1, totalPages: 1, totalPosts: 0 };
  }

  const [totalPosts, rawPosts] = await Promise.all([
    client.fetch<number>(POST_COUNT_QUERY, {}, { next: { revalidate: 60 } }),
    client.fetch<SanityPost[]>(
      PAGINATED_POSTS_QUERY,
      {
        start: (Math.max(1, page) - 1) * postsPerPage,
        end:   Math.max(1, page) * postsPerPage,
      },
      { next: { revalidate: 60 } }
    ),
  ]);

  const totalPages  = Math.max(1, Math.ceil(totalPosts / postsPerPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);

  return {
    posts: rawPosts.map(mapPost),
    currentPage,
    totalPages,
    totalPosts,
  };
}

/**
 * Returns the N most recent posts — used on the Home page.
 *
 * @param count  number of posts to return (default 3)
 */
export async function getLatestPosts(count: number = 3): Promise<BlogPost[]> {
  if (!isSanityConfigured) return [];

  const rawPosts = await client.fetch<SanityPost[]>(
    LATEST_POSTS_QUERY,
    { count },
    { next: { revalidate: 60 } }
  );
  return rawPosts.map(mapPost);
}

/**
 * Returns a single full post (with Portable Text body) by slug.
 * Returns null when the slug is not found in Sanity.
 *
 * @param slug  the post slug string
 */
export async function getPostBySlug(slug: string): Promise<BlogPostFull | null> {
  if (!isSanityConfigured) return null;

  const raw = await client.fetch<SanityPostFull | null>(
    POST_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: 3600 } }
  );

  if (!raw) return null;

  return {
    ...mapPost(raw),
    body: raw.body ?? [],
  };
}

/**
 * Returns all published slugs — consumed by generateStaticParams().
 */
export async function getAllSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return [];

  return client.fetch<string[]>(
    ALL_SLUGS_QUERY,
    {},
    { next: { revalidate: 3600 } }
  );
}

/**
 * Formats an ISO date string into a human-readable label.
 * e.g. "2024-06-01T00:00:00Z" → "June 1, 2024"
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
  });
}
