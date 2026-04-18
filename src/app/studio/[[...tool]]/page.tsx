/**
 * Embedded Sanity Studio — accessible at /studio.
 *
 * This file is a Server Component so it can export `metadata` and `viewport`.
 * The actual Studio rendering is delegated to StudioClient (Client Component)
 * which uses `ssr: false` to avoid server-rendering styled-components.
 */

import StudioClient from './StudioClient';

// Required <meta> tags for the Sanity Studio UI
export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  return <StudioClient />;
}
