/**
 * Root layout — wraps every page with global fonts, metadata, Navbar and Footer.
 * Uses next/font for zero-layout-shift font loading.
 */

import type { Metadata } from 'next';
import { Oswald, Open_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// ─── Fonts ───────────────────────────────────────────────────────────────────

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-opensans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

// ─── Site-wide metadata ───────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL('https://greenheroesfoundation.org'),
  title: {
    default: 'Green Heroes Foundation | Military NGO',
    template: '%s | Green Heroes Foundation',
  },
  description:
    'Green Heroes Foundation is a non-profit organization dedicated to supporting veterans, active-duty personnel, and their families through programs, advocacy, and community building.',
  keywords: [
    'military NGO',
    'veteran support',
    'military charity',
    'Green Heroes Foundation',
    'veterans affairs',
    'active duty support',
    'GHF',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Green Heroes Foundation',
    title: 'Green Heroes Foundation | Military NGO',
    description:
      'Supporting veterans, active-duty personnel, and their families through programs, advocacy, and community.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Green Heroes Foundation | Military NGO',
    description:
      'Supporting veterans, active-duty personnel, and their families.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${openSans.variable}`}>
      <body className="min-h-screen flex flex-col bg-mil-black">
        {/* Skip-to-content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4
                     focus:z-50 focus:bg-gold-500 focus:text-mil-black focus:px-4 focus:py-2
                     focus:rounded font-heading font-semibold"
        >
          Skip to content
        </a>

        <Navbar />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
