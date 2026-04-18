/**
 * GalleryLightbox — photo grid that opens a full-screen lightbox on click.
 *
 * Features:
 *  - Responsive 2-col / 3-col grid
 *  - Click any image to open it full-screen
 *  - Prev / Next navigation (buttons + left/right arrow keys)
 *  - Escape key closes the lightbox
 *  - Background click closes the lightbox
 *  - Body scroll is locked while the lightbox is open
 *  - Image counter ("3 / 9")
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

export interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryLightboxProps {
  images: GalleryImage[];
}

export default function GalleryLightbox({ images }: GalleryLightboxProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const close = useCallback(() => setSelected(null), []);

  const prev = useCallback(() => {
    setSelected((s) => (s !== null ? (s - 1 + images.length) % images.length : s));
  }, [images.length]);

  const next = useCallback(() => {
    setSelected((s) => (s !== null ? (s + 1) % images.length : s));
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     close();
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, close, prev, next]);

  // Lock body scroll while lightbox is open
  useEffect(() => {
    document.body.style.overflow = selected !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  return (
    <>
      {/* ── Photo grid ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setSelected(i)}
            className="relative block overflow-hidden rounded-lg bg-mil-black-700
                       border border-mil-green-800/20 group
                       hover:border-gold-500/40 hover:shadow-xl hover:shadow-black/40
                       transition-all duration-300 focus:outline-none
                       focus-visible:ring-2 focus-visible:ring-gold-500"
            style={{ aspectRatio: '4/3' }}
            aria-label={`Open photo: ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Hover overlay with zoom hint */}
            <div className="absolute inset-0 bg-mil-black/0 group-hover:bg-mil-black/30
                            transition-colors duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300
                               bg-mil-black/70 border border-gold-500/50 rounded-full p-2.5">
                <svg className="w-5 h-5 text-gold-400" fill="none" stroke="currentColor"
                     strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
                </svg>
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* ── Lightbox overlay ─────────────────────────────────────────────────── */}
      {selected !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
          className="fixed inset-0 z-50 flex items-center justify-center
                     bg-black/92 backdrop-blur-sm animate-fade-in"
          onClick={close}
        >
          {/* ── Close button ── */}
          <button
            onClick={close}
            aria-label="Close lightbox"
            className="absolute top-4 right-4 z-10 p-2.5 rounded-full
                       bg-mil-black/70 border border-mil-green-700/40 text-gray-300
                       hover:text-white hover:border-gold-500/60 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor"
                 strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          {/* ── Counter ── */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10
                          font-heading text-xs uppercase tracking-widest
                          text-gold-500 bg-mil-black/70 border border-mil-green-700/30
                          rounded-full px-4 py-1.5">
            {selected + 1} / {images.length}
          </div>

          {/* ── Image container (stops click-through to backdrop) ── */}
          <div
            className="relative flex items-center justify-center w-full h-full px-16 py-16"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative w-full h-full max-w-5xl"
              style={{ maxHeight: 'calc(100vh - 8rem)' }}
            >
              <Image
                key={images[selected].src}
                src={images[selected].src}
                alt={images[selected].alt}
                fill
                sizes="90vw"
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* ── Prev button ── */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full
                       bg-mil-black/70 border border-mil-green-700/40 text-gray-300
                       hover:text-gold-400 hover:border-gold-500/60 transition-all duration-200
                       disabled:opacity-30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor"
                 strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* ── Next button ── */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full
                       bg-mil-black/70 border border-mil-green-700/40 text-gray-300
                       hover:text-gold-400 hover:border-gold-500/60 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor"
                 strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* ── Dot indicators ── */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setSelected(i); }}
                aria-label={`Go to photo ${i + 1}`}
                className={`rounded-full transition-all duration-200
                  ${i === selected
                    ? 'w-4 h-2 bg-gold-500'
                    : 'w-2 h-2 bg-gray-600 hover:bg-gray-400'
                  }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
