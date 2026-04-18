/**
 * StudioClient — renders the Sanity Studio with SSR disabled.
 * Must be a Client Component so that `ssr: false` is allowed.
 */

'use client';

import dynamic from 'next/dynamic';
import config from '../../../../sanity.config';

const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  { ssr: false }
);

export default function StudioClient() {
  return <NextStudio config={config} />;
}
