/**
 * Blog Listing Page — /blog
 *
 * Server Component. Reads ?page= query param, fetches paginated posts,
 * and renders BlogCard grid + Pagination (client component).
 *
 * Posts per page: 5
 * Query param: ?page=N (defaults to 1)
 */

import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getPaginatedPosts } from '@/lib/blog';
import BlogCard from '@/components/BlogCard';
import Pagination from '@/components/Pagination';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'News, updates, mission reports, and stories from Green Heroes Foundation — supporting veterans and military families.',
};

// ─── Inner content (reads searchParams) ──────────────────────────────────────

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

async function BlogPageContent({ searchParams }: BlogPageProps) {
  // Await searchParams (required in Next.js 15+)
  const resolvedParams = await searchParams;
  // Parse and validate page number
  const rawPage = parseInt(resolvedParams?.page ?? '1', 10);
  const page = Number.isNaN(rawPage) ? 1 : rawPage;

  const { posts, currentPage, totalPages, totalPosts } = await getPaginatedPosts(page, 5);

  return (
    <>
      {/* ── No posts state ── */}
      {totalPosts === 0 && (
        <div className="text-center py-24">
          <svg className="w-16 h-16 text-mil-green-700 mx-auto mb-4"
               fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
          <h2 className="font-heading text-2xl uppercase tracking-widest text-white mb-2">
            No Posts Yet
          </h2>
          <p className="text-gray-400 text-sm">
            Check back soon — new content is on the way.
          </p>
        </div>
      )}

      {/* ── Posts grid ── */}
      {posts.length > 0 && (
        <>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            aria-label={`Blog posts — page ${currentPage} of ${totalPages}`}
          >
            {posts.map((post, i) => (
              <BlogCard
                key={post.slug}
                post={post}
                delayClass={`stagger-${Math.min(i + 1, 5)}`}
              />
            ))}
          </div>

          {/* ── Pagination ── */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalPosts={totalPosts}
          />
        </>
      )}
    </>
  );
}

// ─── Loading fallback ─────────────────────────────────────────────────────────

function BlogGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="bg-mil-black-700 border border-mil-green-800/20 rounded-lg overflow-hidden"
          aria-hidden="true"
        >
          <div className="h-48 bg-mil-green-900/30 animate-pulse" />
          <div className="p-5 space-y-3">
            <div className="h-3 w-24 bg-mil-green-900/40 rounded animate-pulse" />
            <div className="h-5 w-3/4 bg-mil-green-900/40 rounded animate-pulse" />
            <div className="h-3 w-full bg-mil-green-900/30 rounded animate-pulse" />
            <div className="h-3 w-5/6 bg-mil-green-900/30 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Page export ──────────────────────────────────────────────────────────────

export default function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  return (
    <div className="pt-16">
      {/* ── Page header ── */}
      <div className="bg-mil-black-800 border-b border-mil-green-800/30 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-heading text-xs uppercase tracking-[0.25em] text-gold-500 mb-2">
            News & Updates
          </p>
          <h1 className="section-heading mb-0">The Field Report</h1>
          <span className="gold-divider mt-3 block" aria-hidden="true" />
          <p className="mt-5 text-gray-400 max-w-2xl leading-relaxed">
            Mission updates, veteran stories, community outreach reports, and the latest from
            Green Heroes Foundation — straight from the front lines of our work.
          </p>
        </div>
      </div>

      {/* ── Posts ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <Suspense fallback={<BlogGridSkeleton />}>
          <BlogPageContent searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
