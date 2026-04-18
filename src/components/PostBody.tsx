/**
 * PostBody — renders Sanity Portable Text as styled React elements.
 *
 * Custom components map each Portable Text block type / mark to the
 * matching blog-content CSS class styles defined in globals.css.
 *
 * Marked 'use client' because @portabletext/react uses React context internally.
 */

'use client';

import Image from 'next/image';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/image';

// ─── Custom component map ─────────────────────────────────────────────────────

const components: PortableTextComponents = {
  // ── Block styles ────────────────────────────────────────────────────────────
  block: {
    normal: ({ children }) => (
      <p className="text-gray-300 leading-relaxed mb-5">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-heading font-bold text-2xl text-white uppercase tracking-wide mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-heading font-bold text-xl text-white uppercase tracking-wide mt-8 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-heading font-bold text-lg text-white uppercase tracking-wide mt-6 mb-3">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gold-500 pl-6 py-2 my-6 bg-mil-black-800 text-gray-400 italic">
        {children}
      </blockquote>
    ),
  },

  // ── Inline marks ────────────────────────────────────────────────────────────
  marks: {
    strong: ({ children }) => (
      <strong className="text-white font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    'strike-through': ({ children }) => (
      <span className="line-through text-gray-500">{children}</span>
    ),
    // External link annotation
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.openInNewTab ? '_blank' : undefined}
        rel={value?.openInNewTab ? 'noopener noreferrer' : undefined}
        className="text-gold-500 hover:text-gold-400 underline transition-colors duration-200"
      >
        {children}
      </a>
    ),
  },

  // ── Lists ────────────────────────────────────────────────────────────────────
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-5 space-y-1 text-gray-300">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-5 space-y-1 text-gray-300">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="text-gray-300">{children}</li>,
    number: ({ children }) => <li className="text-gray-300">{children}</li>,
  },

  // ── Custom block types ───────────────────────────────────────────────────────
  types: {
    // Inline image block inside the body
    image: ({ value }) => {
      if (!value?.asset) return null;
      const src = urlFor(value).width(1200).auto('format').url();
      return (
        <figure className="my-8">
          <div className="relative w-full overflow-hidden rounded-lg"
               style={{ aspectRatio: '16/9' }}>
            <Image
              src={src}
              alt={value.alt ?? ''}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-xs text-gray-500 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },

    // Horizontal separator
    separator: () => (
      <hr className="border-mil-green-800/40 my-8" />
    ),
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

interface PostBodyProps {
  body: PortableTextBlock[];
}

export default function PostBody({ body }: PostBodyProps) {
  if (!body?.length) {
    return (
      <p className="text-gray-500 italic text-sm">No content yet.</p>
    );
  }

  return (
    <div className="blog-content">
      <PortableText value={body} components={components} />
    </div>
  );
}
