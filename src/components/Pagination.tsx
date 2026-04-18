/**
 * Pagination — client component that renders Next / Previous buttons
 * and page number indicators using URL query params (?page=N).
 *
 * Uses next/navigation's useRouter and useSearchParams for navigation.
 */

'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalPosts,
}: PaginationProps) {
  const router      = useRouter();
  const pathname    = usePathname();
  const searchParams = useSearchParams();

  /** Build a new URL string with the given page number */
  const buildPageUrl = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(page));
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams]
  );

  const navigate = (page: number) => {
    router.push(buildPageUrl(page), { scroll: true });
  };

  // Nothing to paginate
  if (totalPages <= 1) return null;

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  // Build page number array with ellipsis logic
  const getPageNumbers = (): (number | '…')[] => {
    const pages: (number | '…')[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);
    if (currentPage > 3) pages.push('…');

    const start = Math.max(2, currentPage - 1);
    const end   = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push('…');
    pages.push(totalPages);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      aria-label="Blog pagination"
      className="flex flex-col items-center gap-4 mt-10"
    >
      {/* Post count summary */}
      <p className="text-sm text-gray-500 font-body">
        Page{' '}
        <span className="text-gold-500 font-semibold">{currentPage}</span>
        {' '}of{' '}
        <span className="text-white font-semibold">{totalPages}</span>
        {' '}·{' '}
        <span className="text-gray-400">{totalPosts} total posts</span>
      </p>

      {/* Button row */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {/* Previous */}
        <button
          onClick={() => navigate(currentPage - 1)}
          disabled={!hasPrev}
          aria-label="Go to previous page"
          className={`flex items-center gap-1.5 px-4 py-2 rounded font-heading font-semibold
                      uppercase tracking-wider text-sm transition-all duration-200
                      ${
                        hasPrev
                          ? 'border border-mil-green-700 text-gray-300 hover:border-gold-500 hover:text-gold-500'
                          : 'border border-mil-green-900/30 text-gray-600 cursor-not-allowed'
                      }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor"
               strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Prev
        </button>

        {/* Page numbers */}
        {pageNumbers.map((p, idx) =>
          p === '…' ? (
            <span
              key={`ellipsis-${idx}`}
              className="px-2 text-gray-600 font-heading select-none"
              aria-hidden="true"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => navigate(p as number)}
              aria-label={`Go to page ${p}`}
              aria-current={p === currentPage ? 'page' : undefined}
              className={`w-9 h-9 rounded font-heading font-semibold text-sm
                          transition-all duration-200
                          ${
                            p === currentPage
                              ? 'bg-gold-500 text-mil-black shadow-md shadow-gold-500/20'
                              : 'border border-mil-green-700 text-gray-300 hover:border-gold-500 hover:text-gold-500'
                          }`}
            >
              {p}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => navigate(currentPage + 1)}
          disabled={!hasNext}
          aria-label="Go to next page"
          className={`flex items-center gap-1.5 px-4 py-2 rounded font-heading font-semibold
                      uppercase tracking-wider text-sm transition-all duration-200
                      ${
                        hasNext
                          ? 'border border-mil-green-700 text-gray-300 hover:border-gold-500 hover:text-gold-500'
                          : 'border border-mil-green-900/30 text-gray-600 cursor-not-allowed'
                      }`}
        >
          Next
          <svg className="w-4 h-4" fill="none" stroke="currentColor"
               strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
