/**
 * Custom 404 page — shown for any unmatched route.
 */

import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="pt-16 min-h-screen flex items-center justify-center bg-mil-black">
      <div className="max-w-lg mx-auto px-4 sm:px-6 text-center py-20">
        {/* Round logo */}
        <div className="w-24 h-24 rounded-full border border-mil-green-700/30
                        flex items-center justify-center mx-auto mb-8 overflow-hidden">
          <Image
            src="/images/heroes (round).png"
            alt="Green Heroes Foundation"
            width={96}
            height={96}
            className="object-cover w-full h-full"
          />
        </div>

        <p className="font-heading text-7xl font-bold text-gold-500 mb-2">404</p>
        <h1 className="font-heading font-bold text-2xl text-white uppercase tracking-widest mb-3">
          Page Not Found
        </h1>
        <span className="gold-divider mx-auto block mb-6" aria-hidden="true" />
        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          The page you are looking for may have been moved, renamed, or does not exist.
          Let&apos;s get you back on mission.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            Return to Home
          </Link>
          <Link href="/blog" className="btn-outline">
            Visit the Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
