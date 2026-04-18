/**
 * Root loading UI — shown during route transitions.
 * Displays the Green Heroes Foundation round logo with a pulse ring.
 */

import Image from 'next/image';

export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-mil-black"
      aria-label="Loading"
      aria-live="polite"
    >
      <div className="relative w-20 h-20 mb-5">
        {/* Pulsing ring behind the logo */}
        <div className="absolute inset-0 rounded-full border-2 border-gold-500/30 animate-ping" />
        <div className="absolute inset-0 rounded-full border border-mil-green-700/20 animate-pulse" />
        {/* Round logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/images/heroes (round).png"
            alt="Green Heroes Foundation"
            width={72}
            height={72}
            className="rounded-full object-cover"
            priority
          />
        </div>
      </div>
      <p className="font-heading text-xs uppercase tracking-[0.3em] text-gray-500">
        Loading…
      </p>
    </div>
  );
}
