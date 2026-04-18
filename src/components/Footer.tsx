/**
 * Footer — site-wide footer with NGO info, quick links, and social media.
 * Server Component (no interactivity needed).
 */

import Link from 'next/link';

import Image from 'next/image';

const QUICK_LINKS = [
  { href: '/',        label: 'Home'    },
  { href: '/blog',    label: 'Blog'    },
  { href: '/about',   label: 'About'   },
  { href: '/contact', label: 'Contact' },
];

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M4 4l16 16M4 20L20 4" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" fill="none" />
        <path d="M2 4h7l13 16H15L2 4z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
           className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#080c08" />
      </svg>
    ),
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-mil-black-800 border-t border-mil-green-800/40"
      role="contentinfo"
    >
      {/* ── Main footer content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ── Brand column ── */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4 group w-fit">
            <Image
              src="/images/heroes (round).png"
              alt="Green Heroes Foundation"
              width={44}
              height={44}
              className="rounded-full object-cover"
            />
              
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed max-w-md mb-6">
             We are dedicated to providing care and support to our war veterans and their families in times of need.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-gray-500 hover:text-gold-500 transition-colors duration-200
                             p-2 rounded hover:bg-mil-green-900/30"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick links ── */}
          <div>
            <h3 className="font-heading font-semibold uppercase tracking-widest text-sm
                           text-gold-500 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2" role="list">
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-white text-sm transition-colors
                               duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-mil-green-600
                                     group-hover:bg-gold-500 transition-colors duration-200"
                          aria-hidden="true" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact info ── */}
          <div>
            <h3 className="font-heading font-semibold uppercase tracking-widest text-sm
                           text-gold-500 mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-gray-400" role="list">
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-mil-green-500 mt-0.5 flex-shrink-0"
                     fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Suite 27, Brigade of Guards Shopping Complex,<br />Aguiyi Ironsi Barracks, Asokoro, Abuja.</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-mil-green-500 flex-shrink-0"
                     fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@greenheroesfoundation.org"
                   className="hover:text-gold-500 transition-colors duration-200">
                  info@greenheroesfoundation.ng
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-mil-green-500 flex-shrink-0"
                     fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+12025550147"
                   className="hover:text-gold-500 transition-colors duration-200">
                  0803 384 9024
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-mil-green-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4
                        flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {currentYear} Green Heroes Foundation. All rights reserved.</p>
          <p>
            501(c)(3) Non-Profit Organization &nbsp;·&nbsp;
            <Link href="/contact" className="hover:text-gold-500 transition-colors duration-200">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
