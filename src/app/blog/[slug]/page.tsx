/**
 * Blog Detail Page — /blog/[slug]
 *
 * Server Component.
 * - Fetches a single post by slug from Sanity
 * - Renders the body as Portable Text via <PostBody>
 * - Generates static paths from all Sanity slugs at build time
 * - Returns 404 if the slug is not found
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllSlugs, formatDate } from '@/lib/blog';
import PostBody from '@/components/PostBody';

// Allow on-demand rendering for slugs published after the last build
export const dynamicParams = true;

// ─── Static path generation (SSG) ────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ─── Dynamic metadata per post ───────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="pt-16">
      {/* ── Hero cover image ── */}
      <div className="relative h-64 sm:h-80 lg:h-[28rem] overflow-hidden bg-mil-black-800">
        <Image
          src={post.coverImage}
          alt={post.coverImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-mil-black/40 via-transparent to-mil-black" />
      </div>

      {/* ── Article ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 -mt-6 relative z-10">

        {/* Back button */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-400
                       font-heading font-semibold uppercase tracking-widest text-xs
                       transition-colors duration-200 group"
          >
            <svg
              className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-200"
              fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </div>

        {/* ── Post header ── */}
        <header className="mb-10">
          <time
            dateTime={post.date}
            className="font-heading text-xs uppercase tracking-[0.25em] text-mil-green-400 block mb-4"
          >
            {formatDate(post.date)}
          </time>

          <h1
            className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white
                       uppercase tracking-wide leading-tight mb-5"
          >
            {post.title}
          </h1>

          <span className="gold-divider block mb-5" aria-hidden="true" />

          {post.excerpt && (
            <p className="text-gray-300 text-lg leading-relaxed border-l-4 border-mil-green-700 pl-5">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* ── Post body — Portable Text rendered by PostBody ── */}
        <article aria-label="Blog post content">
          <PostBody body={post.body} />
        </article>

        {/* ── Footer actions ── */}
        <div
          className="mt-16 pt-8 border-t border-mil-green-800/40
                     flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-400
                       font-heading font-semibold uppercase tracking-widest text-xs
                       transition-colors duration-200 group"
          >
            <svg
              className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-200"
              fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          <Link href="/contact" className="btn-primary text-xs">
            Get Involved
          </Link>
        </div>
      </div>
    </div>
  );
}
