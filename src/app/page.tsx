/**
 * Home Page — server component.
 *
 * Sections:
 *   1. Hero
 *   2. Mission stats
 *   3. Core programs
 *   4. Photo gallery
 *   5. Latest blog posts (latest 3)
 *   6. CTA banner
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getLatestPosts } from '@/lib/blog';
import BlogCard from '@/components/BlogCard';
import GalleryLightbox from '@/components/GalleryLightbox';

export const metadata: Metadata = {
  title: 'Home | Green Heroes Foundation',
  description:
    'Green Heroes Foundation — supporting veterans, active-duty personnel, and military families through programs, advocacy, and community outreach.',
};

// ─── Static data ─────────────────────────────────────────────────────────────

// ── Gallery images (from /public/images) ─────────────────────────────────────
const GALLERY_IMAGES = [
  { src: '/images/ghf_one.jpg',   alt: 'GHF community event',          tall: false },
  { src: '/images/ghf_two.jpg',   alt: 'GHF field operations',         tall: false },
  { src: '/images/ghf_three.jpg', alt: 'GHF outreach program',         tall: false },
  { src: '/images/ghf_four.jpg',  alt: 'GHF team in action',           tall: false },
  { src: '/images/ghf_five.jpg',  alt: 'GHF veterans support',         tall: false },
  { src: '/images/ghf_six.jpg',   alt: 'GHF community gathering',      tall: false },
  { src: '/images/ghf_seven.jpg', alt: 'GHF mission in progress',      tall: false },
  { src: '/images/ghf_eight.jpg', alt: 'GHF outreach activity',        tall: false },
  { src: '/images/ghf_nine.jpg',  alt: 'GHF service members together', tall: false },
];

// ─────────────────────────────────────────────────────────────────────────────

const STATS = [
  { value: '1,000+', label: 'Veterans Supported' },
  { value: '6',       label: 'Years of Service'   },
  { value: '100+',    label: 'Volunteers'          },
];

const PROGRAMS = [
  {
    icon: (
      /* Circular arrows — redirecting, finding a new path after service */
      <svg className="w-7 h-7" fill="none" stroke="currentColor"
           strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0
                 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1
                 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    title: 'REORIENTATION & REINTEGRATION',
    description:
      'It is on record that the Armed Forces of Nigeria have commenced steps to ameliorate the plights of war veterans amidst other contending issues.',
  },
  {
    icon: (
      /* Head silhouette + lightning bolt — trauma and shock of PTSD */
      <svg className="w-7 h-7" fill="none" stroke="currentColor"
           strokeWidth="1.5" viewBox="0 0 24 24">
        {/* Head/brain outline */}
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 3a6 6 0 0 1 6 6c0 2.22-1.21 4.16-3 5.19V15a1 1 0 0 1-1 1H10
                 a1 1 0 0 1-1-1v-.81A6.003 6.003 0 0 1 6 9a6 6 0 0 1 6-6Z" />
        {/* Lightning bolt — trauma / flashback */}
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M12.5 6.5 10 10h2.5L11 13.5" />
        {/* Base/neck connector */}
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M10 18h4" />
      </svg>
    ),
    title: 'POST TRAUMATIC STRESS DISORDER',
    description:
      'For centuries, there have been numerous casualties of war, soldiers with various physical injuries of war can be seen but we really know little of the emotional and the silent injuries of war on soldiers, their families.',
  },
  // {
  //   icon: (
  //     <svg className="w-7 h-7" fill="none" stroke="currentColor"
  //          strokeWidth="1.5" viewBox="0 0 24 24">
  //       <path strokeLinecap="round" strokeLinejoin="round"
  //             d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  //     </svg>
  //   ),
  //   title: 'VETERAN\'S FAMILY SUPPORT',
  //   description:
  //     'There is no such thing as an unwounded soldier. When a soldier goes to war, all family members are at war. the wives and children are left to cope with the absence of the deployed soldier.',
  // },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor"
           strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    title: 'VETERAN\'S FAMILY SUPPORT',
    description:
      'There is no such thing as an unwounded soldier. When a soldier goes to war, all family members are at war. the wives and children are left to cope with the absence of the deployed soldier.',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const latestPosts = await getLatestPosts(3);

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        aria-label="Hero section"
      >
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          {/* <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80"
            alt="Military personnel standing in formation"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          /> */}
          {/* Camo texture — repeating SVG woodland pattern */}
          <div className="absolute inset-0 camo-texture opacity-60" />
          {/* Dark gradient so text stays legible */}
          <div className="absolute inset-0 bg-gradient-to-b from-mil-black/75 via-mil-black/55 to-mil-black/95" />
        </div>

        {/* Decorative corner accents */}
        <div className="absolute top-24 left-8 w-16 h-16 border-t-2 border-l-2 border-gold-500/30 z-10" aria-hidden="true" />
        <div className="absolute top-24 right-8 w-16 h-16 border-t-2 border-r-2 border-gold-500/30 z-10" aria-hidden="true" />
        <div className="absolute bottom-16 left-8 w-16 h-16 border-b-2 border-l-2 border-gold-500/30 z-10" aria-hidden="true" />
        <div className="absolute bottom-16 right-8 w-16 h-16 border-b-2 border-r-2 border-gold-500/30 z-10" aria-hidden="true" />

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
          {/* Eyebrow */}
          <p className="inline-flex items-center gap-2 font-heading text-xs uppercase
                        tracking-[0.3em] text-gold-500 mb-6 animate-fade-in">
            <span className="w-8 h-px bg-gold-500" aria-hidden="true" />
            Non-Profit Military Organization
            <span className="w-8 h-px bg-gold-500" aria-hidden="true" />
          </p>

          {/* Heading */}
          <h1 className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl
                         text-white uppercase tracking-widest leading-none mb-6
                         animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            We Serve{' '}
            <span className="text-gold-500">Those</span>
            <br />
            Who Served
          </h1>

          {/* Subheading */}
          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10
                        animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
           We are dedicated to providing care and support to our war veterans and their families in times of need.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center
                          animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
            <Link href="/contact" className="btn-primary text-base px-8 py-4">
              Get Involved
              <svg className="w-5 h-5" fill="none" stroke="currentColor"
                   strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/about" className="btn-outline text-base px-8 py-4">
              Our Mission
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10
                        animate-bounce text-gray-500" aria-hidden="true">
          <svg className="w-6 h-6" fill="none" stroke="currentColor"
               strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          2. MISSION STATS
      ════════════════════════════════════════════════════════ */}
      <section
        className="bg-mil-green-800 border-y border-mil-green-700/50 py-12"
        aria-label="Organization statistics"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul
            className="grid grid-cols-2 lg:grid-cols-3 gap-8 text-center"
            role="list"
          >
            {STATS.map(({ value, label }) => (
              <li key={label} className="flex flex-col items-center gap-1">
                <span className="font-heading font-bold text-4xl lg:text-5xl text-gold-500">
                  {value}
                </span>
                <span className="font-heading uppercase tracking-widest text-xs text-gray-300">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. CORE PROGRAMS
      ════════════════════════════════════════════════════════ */}
      <section
        className="py-20 lg:py-28 bg-mil-black-800"
        aria-labelledby="programs-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-14 text-center">
            <p className="font-heading text-xs uppercase tracking-[0.25em] text-gold-500 mb-2">
              What We Do
            </p>
            <h2
              id="programs-heading"
              className="section-heading"
            >
              OUR CORE PROGRAMMMES
            </h2>
            <span className="gold-divider mx-auto mt-3" aria-hidden="true" />
            <p className="mt-5 text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Green Heroes Foundation is a Non-Governmental Organization that is wholly run by retired military personnel with specialist supports from some well-meaning individuals and organizations. The Foundation is designed to cater and support Nigerian Armed Forced war veterans as well as provide for their families in times of need.

            </p>
          </div>

          {/* Programs grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS.map(({ icon, title, description }, i) => (
              <div
                key={title}
                className="bg-mil-black-700 border border-mil-green-800/30 rounded-lg p-6
                           hover:border-gold-500/40 hover:-translate-y-1 hover:shadow-xl
                           hover:shadow-mil-green-900/20 transition-all duration-300
                           group animate-on-scroll"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-lg bg-mil-green-800/50 border border-mil-green-700/40
                                flex items-center justify-center text-mil-green-400
                                group-hover:bg-mil-green-800 group-hover:text-gold-500
                                transition-all duration-300 mb-5">
                  {icon}
                </div>
                <h3 className="font-heading font-bold text-white uppercase tracking-wide text-base mb-3">
                  {title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>

          {/* Learn more CTA */}
          <div className="text-center mt-12">
            <Link href="/about" className="btn-outline">
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          4. FEATURE CONTENT BLOCK  (text left · image right)
             ─ Edit the text and image src below freely ─
      ════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-mil-black" aria-labelledby="feature-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* ── LEFT: text content ── */}
            <div className="animate-slide-in-left">
              {/* Eyebrow label */}
              <p className="font-heading text-xs uppercase tracking-[0.25em] text-gold-500 mb-2">
                Who We Are
              </p>

              {/* Main heading */}
              <h2 id="feature-heading" className="section-heading mb-3">
                Standing With Those{' '}
                <span className="text-gold-500">Who Served</span>
              </h2>
              <span className="gold-divider mb-6 block" aria-hidden="true" />

              {/* Body — replace these paragraphs with your own text */}
              <p className="text-gray-300 leading-relaxed text-base mb-4">
               Green Heroes Foundation is a Non-Governmental Organization which is wholly run by retired military personnel with specialist supports from some well-meaning individuals and organizations. The Foundation is designed to cater and support Nigerian Armed Forced war veterans as well as provide for their families in times of need. 
               <br/><br/>
               Accordingly, we will ensure that veterans seamlessly transit from active service to civilian society. We are poised to provide both short and long term supports that are delibrately designed to help ex-combatants and their dependents adjust to new emotional social and economic realities and the "silent injuries of war"
              </p>

              {/* CTA button */}
              <Link href="/about" className="btn-primary">
                Learn More About Us
                <svg className="w-4 h-4" fill="none" stroke="currentColor"
                     strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* ── RIGHT: image ── */}
            {/* Replace src with whichever image you prefer */}
            <div className="relative h-80 lg:h-[520px] rounded-lg overflow-hidden
                            border border-mil-green-800/30 group">
              <Image
                src="/images/ghf_one.jpg"
                alt="Green Heroes Foundation in action"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-tr from-mil-black/50 to-transparent" />
              {/* Decorative gold corner accents */}
              <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2
                              border-gold-500/60" aria-hidden="true" />
              <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2
                              border-gold-500/60" aria-hidden="true" />
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          5. PHOTO GALLERY
      ════════════════════════════════════════════════════════ */}
      <section
        className="py-20 lg:py-28 bg-mil-black-800"
        aria-labelledby="gallery-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <p className="font-heading text-xs uppercase tracking-[0.25em] text-gold-500 mb-2">
              In the Field
            </p>
            <h2 id="gallery-heading" className="section-heading mb-0">
              Our Activities
            </h2>
            <span className="gold-divider mt-3 block" aria-hidden="true" />
          </div>

          {/* Clickable photo grid — opens lightbox on click */}
          <GalleryLightbox images={GALLERY_IMAGES} />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          5. LATEST BLOG POSTS (above footer, as required)
      ════════════════════════════════════════════════════════ */}
      <section
        className="py-20 lg:py-28 bg-mil-black"
        aria-labelledby="latest-posts-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="font-heading text-xs uppercase tracking-[0.25em] text-gold-500 mb-2">
                News & Updates
              </p>
              <h2
                id="latest-posts-heading"
                className="section-heading mb-0"
              >
                Latest Posts
              </h2>
              <span className="gold-divider mt-3" aria-hidden="true" />
            </div>
            <Link
              href="/blog"
              className="btn-ghost self-start sm:self-auto group"
            >
              All Posts
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                   fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                   aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Blog cards grid */}
          {latestPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {latestPosts.map((post, i) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  featured
                  delayClass={`stagger-${i + 1}`}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500">
              <p className="font-heading text-lg uppercase tracking-wide">
                No posts published yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          5. CTA BANNER
      ════════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 overflow-hidden bg-mil-green-800"
        aria-label="Call to action"
      >
        {/* Background texture */}
        <div className="absolute inset-0 opacity-10"
             style={{
               backgroundImage: `repeating-linear-gradient(
                 45deg,
                 transparent,
                 transparent 10px,
                 rgba(201,168,76,0.3) 10px,
                 rgba(201,168,76,0.3) 11px
               )`,
             }}
             aria-hidden="true"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-heading text-xs uppercase tracking-[0.25em] text-gold-400 mb-4">
            Join The Mission
          </p>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-white
                         uppercase tracking-widest leading-tight mb-6">
            Make a Difference{' '}
            <span className="text-gold-400">Today</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
           There is no greater honor than to serve our country. Every day, we salute our heroes that have served our country. We have a responsibility to honor veterans for the sacrifices they made serving our country.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-base px-8 py-4">
              Volunteer Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/30 text-white
                         hover:border-white hover:bg-white/10 font-heading font-semibold
                         uppercase tracking-wider text-base px-8 py-4 rounded
                         transition-all duration-200"
            >
              Donate
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
