/**
 * Navbar — responsive navigation bar with mobile hamburger menu.
 * Marked as a Client Component because it uses state for the mobile menu
 * and adds a scroll listener for the sticky-shadow effect.
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';


const NAV_LINKS = [
  { href: '/',        label: 'Home'    },
  { href: '/blog',    label: 'Blog'    },
  { href: '/about',   label: 'About'   },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const pathname = usePathname();
  const navRef   = useRef<HTMLElement>(null);

  // Add subtle shadow when page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        bg-mil-black-700/95 backdrop-blur-sm border-b border-mil-green-800/40
        ${scrolled ? 'shadow-lg shadow-black/50' : ''}`}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16">
          {/* ── Logo / Brand ── */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Green Heroes Foundation — Home"
          >
            <Image
              src="/images/heroes (round).png"
              alt="Green Heroes Foundation"
              width={44}
              height={44}
              className="rounded-full object-cover"
            />

            
          </Link>

          {/* ── Desktop links ── */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive =
                href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(href);

              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`relative px-4 py-2 font-heading font-medium uppercase tracking-widest
                                text-sm transition-colors duration-200 rounded
                                ${
                                  isActive
                                    ? 'text-gold-500'
                                    : 'text-gray-300 hover:text-white'
                                }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {label}
                    {/* Active underline indicator */}
                    {isActive && (
                      <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gold-500 rounded-full" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── Desktop CTA ── */}
          <div className="hidden md:block">
            <Link href="/contact" className="btn-primary text-xs">
              Get Involved
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded text-gray-300 hover:text-white
                       hover:bg-mil-green-800/40 transition-colors duration-200"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            {/* Hamburger / X icon */}
            <svg
              className="w-6 h-6" fill="none" stroke="currentColor"
              viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* ── Mobile menu ── */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <ul
            className="flex flex-col py-4 border-t border-mil-green-800/40 space-y-1"
            role="list"
          >
            {NAV_LINKS.map(({ href, label }) => {
              const isActive =
                href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block px-4 py-3 font-heading font-medium uppercase tracking-widest
                                text-sm rounded transition-colors duration-200
                                ${
                                  isActive
                                    ? 'text-gold-500 bg-mil-green-900/30'
                                    : 'text-gray-300 hover:text-white hover:bg-mil-green-900/20'
                                }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2 px-4">
              <Link href="/contact" className="btn-primary w-full justify-center text-xs">
                Get Involved
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
