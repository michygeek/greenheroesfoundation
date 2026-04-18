/**
 * BlogCard — displays a single blog post summary.
 * Used on both the Home page (latest 3) and Blog listing page.
 *
 * @param featured - renders a slightly larger card (used on homepage)
 */

import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/lib/blog';
import { formatDate } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  /** Animation delay class (e.g. 'stagger-1') */
  delayClass?: string;
}

export default function BlogCard({
  post,
  featured = false,
  delayClass = '',
}: BlogCardProps) {
  const { slug, title, date, excerpt, coverImage } = post;
  const href = `/blog/${slug}`;

  return (
    <article
      className={`card group flex flex-col ${delayClass ? `animate-on-scroll ${delayClass}` : ''}`}
      aria-label={`Blog post: ${title}`}
    >
      {/* ── Cover image ── */}
      <Link
        href={href}
        className="block overflow-hidden relative"
        style={{ height: featured ? '240px' : '200px' }}
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={coverImage}
          alt={`Cover image for ${title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={false}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-mil-black/60 via-transparent to-transparent" />
      </Link>

      {/* ── Card body ── */}
      <div className="flex flex-col flex-1 p-5 lg:p-6">
        {/* Date */}
        <time
          dateTime={date}
          className="text-xs font-heading tracking-widest text-mil-green-400 uppercase mb-2 block"
        >
          {formatDate(date)}
        </time>

        {/* Title */}
        <h2
          className={`font-heading font-bold text-white uppercase tracking-wide leading-tight mb-3
                      group-hover:text-gold-400 transition-colors duration-200
                      ${featured ? 'text-xl' : 'text-lg'}`}
        >
          <Link href={href}>{title}</Link>
        </h2>

        {/* Excerpt */}
        <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-5 line-clamp-3">
          {excerpt}
        </p>

        {/* Gold divider */}
        <span className="block w-10 h-0.5 bg-mil-green-700 group-hover:bg-gold-500
                         transition-colors duration-300 mb-4" aria-hidden="true" />

        {/* Read more link */}
        <Link
          href={href}
          className="btn-ghost text-xs"
          aria-label={`Read more about ${title}`}
        >
          Read More
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
            fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
