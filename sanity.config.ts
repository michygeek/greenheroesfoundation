/**
 * sanity.config.ts — Sanity Studio configuration.
 *
 * The Studio is embedded at /studio (via src/app/studio/[[...tool]]/page.tsx).
 * It uses the same projectId/dataset as the Next.js front end.
 */

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool }    from '@sanity/vision';
import { schemaTypes }   from './src/sanity/schemas';

export default defineConfig({
  // ── Project identity ──────────────────────────────────────────────────────
  name:    'green-heroes-foundation',
  title:   'Green Heroes Foundation CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',

  // ── Studio URL (must match the route in Next.js) ──────────────────────────
  basePath: '/studio',

  // ── Plugins ───────────────────────────────────────────────────────────────
  plugins: [
    structureTool({
      // Custom sidebar structure — group posts under "Blog"
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Blog Posts')
              .icon(() => '✍️')
              .child(
                S.documentTypeList('post')
                  .title('All Posts')
                  .defaultOrdering([
                    { field: 'publishedAt', direction: 'desc' },
                  ])
              ),
          ]),
    }),

    // Vision — GROQ query playground (dev-only utility)
    visionTool({
      defaultApiVersion: '2024-01-01',
    }),
  ],

  // ── Schema ────────────────────────────────────────────────────────────────
  schema: {
    types: schemaTypes,
  },
});
