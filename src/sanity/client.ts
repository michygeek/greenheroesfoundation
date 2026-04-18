/**
 * Sanity client — used in server components and lib functions to fetch content.
 *
 * projectId and dataset are read from environment variables so that the same
 * codebase can connect to different Sanity projects (dev / staging / prod).
 */

import { createClient } from 'next-sanity';

/**
 * Returns true when both required env vars are present and non-empty.
 * Used to skip Sanity fetches at build time when the project isn't wired up yet.
 */
export const isSanityConfigured =
  !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'placeholder';

export const client = createClient({
  // Fall back to 'placeholder' so createClient doesn't throw during `next build`
  // before env vars are configured. Actual API calls are guarded in lib/blog.ts.
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
  stega: { enabled: false },
});
