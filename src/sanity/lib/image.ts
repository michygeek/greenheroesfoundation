/**
 * image.ts
 * Builds optimised Sanity image URLs from asset references.
 *
 * Usage:
 *   urlFor(post.coverImage).width(1200).height(630).url()
 *   urlFor(post.coverImage).width(800).fit('crop').url()
 */

import { createImageUrlBuilder } from '@sanity/image-url';
import { client } from '../client';

const builder = createImageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}
