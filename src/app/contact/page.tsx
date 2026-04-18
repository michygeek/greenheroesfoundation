/**
 * Contact Page — /contact  (Server Component)
 *
 * Renders contact info + the ContactForm client component.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Green Heroes Foundation — volunteer, donate, request veteran support, or explore partnership opportunities.',
};

// ─── Contact info items ───────────────────────────────────────────────────────

const CONTACT_ITEMS = [
  {
    label: 'Address',
    value: 'Suite 27, Brigade of Guards Shopping Complex,Aguiyi Ironsi Barracks, Asokoro, Abuja.',
    href: undefined,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor"
           strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'info@greenheroesfoundation.ng',
    href: 'mailto:info@greenheroesfoundation.org',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor"
           strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '0803 384 9024',
    href: 'tel:+0803 384 9024',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor"
           strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
    ),
  },
  {
    label: 'Office Hours',
    value: 'Mon–Fri  9:00 AM – 5:00 PM EST',
    href: undefined,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor"
           strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <div className="pt-16">
      {/* ── Page header ── */}
      <div className="bg-mil-black-800 border-b border-mil-green-800/30 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-heading text-xs uppercase tracking-[0.25em] text-gold-500 mb-2">
            Reach Out
          </p>
          <h1 className="section-heading mb-0">Contact Us</h1>
          <span className="gold-divider mt-3 block" aria-hidden="true" />
          <p className="mt-5 text-gray-400 max-w-2xl leading-relaxed">
            Whether you want to volunteer, donate, request support, or simply learn more —
            we want to hear from you.
          </p>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

          {/* ── Left: contact info ── */}
          <aside className="lg:col-span-2 space-y-8" aria-label="Contact information">
            <div>
              <h2 className="font-heading font-bold text-white uppercase tracking-widest text-xl mb-4">
                Get in Touch
              </h2>
              <span className="gold-divider block mb-6" aria-hidden="true" />
              <p className="text-gray-400 text-sm leading-relaxed">
                Our team responds to all inquiries within 2 business days.
                For urgent veteran assistance, please call our hotline directly.
              </p>
            </div>

            <ul className="space-y-5" role="list" aria-label="Contact details">
              {CONTACT_ITEMS.map(({ label, value, href, icon }) => (
                <li key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-mil-green-800/40 border border-mil-green-700/30
                                  flex items-center justify-center text-gold-500 flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="font-heading text-xs uppercase tracking-widest text-gray-500 mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a href={href}
                         className="text-sm text-gray-300 hover:text-gold-500 transition-colors duration-200">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-gray-300">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Volunteer CTA card */}
            <div className="bg-mil-green-800/30 border border-mil-green-700/30 rounded-lg p-5">
              <h3 className="font-heading font-bold text-gold-500 uppercase tracking-wider text-sm mb-2">
                Become a Volunteer
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-4">
                Join over 300 volunteers nationwide making a real difference in veterans&apos; lives.
                No prior military experience required.
              </p>
              <Link href="#contact-form" className="btn-primary text-xs">
                Apply Now
              </Link>
            </div>
          </aside>

          {/* ── Right: form (client component) ── */}
          <div
            id="contact-form"
            className="lg:col-span-3 bg-mil-black-700 border border-mil-green-800/30
                       rounded-lg p-6 lg:p-8"
          >
            <h2 className="font-heading font-bold text-white uppercase tracking-widest text-lg mb-1">
              Send a Message
            </h2>
            <span className="gold-divider block mb-6" aria-hidden="true" />
            <ContactForm />
          </div>

        </div>
      </div>
    </div>
  );
}
