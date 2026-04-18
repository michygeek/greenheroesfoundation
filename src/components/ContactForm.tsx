/**
 * ContactForm — client component handling form state and submission.
 * Extracted from the Contact page so that page.tsx can remain a server
 * component and export metadata.
 */

'use client';

import React, { useState } from 'react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit: React.JSX.IntrinsicElements['form']['onSubmit'] = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    if (!formId || formId === 'your_form_id_here') {
      console.error('Formspree ID not configured in .env.local');
      setStatus('error');
      return;
    }

    try {
      // Collect all named fields as a plain object and send as JSON
      const payload = Object.fromEntries(new FormData(e.currentTarget as HTMLFormElement));
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div
        className="flex flex-col items-center justify-center text-center py-16 px-8
                   bg-mil-black-700 border border-mil-green-800/30 rounded-lg"
        role="alert"
        aria-live="polite"
      >
        <div className="w-16 h-16 rounded-full bg-mil-green-800/50 border border-gold-500/40
                        flex items-center justify-center mb-5">
          <svg className="w-8 h-8 text-gold-500" fill="none" stroke="currentColor"
               strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="font-heading font-bold text-white uppercase tracking-widest text-xl mb-2">
          Message Received
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
          Thank you for reaching out. A member of our team will get back to you within
          2 business days.
        </p>
        <button onClick={() => setStatus('idle')} className="btn-outline text-xs">
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      aria-label="Contact form"
      noValidate
    >
      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName"
                 className="block text-xs font-heading uppercase tracking-widest text-gray-400 mb-1.5">
            First Name <span className="text-gold-500" aria-hidden="true">*</span>
          </label>
          <input
            id="firstName" name="firstName" type="text" required autoComplete="given-name"
            placeholder="John"
            className="w-full bg-mil-black-800 border border-mil-green-800/40 rounded
                       px-4 py-3 text-sm text-white placeholder-gray-600
                       focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/30
                       transition-colors duration-200"
          />
        </div>
        <div>
          <label htmlFor="lastName"
                 className="block text-xs font-heading uppercase tracking-widest text-gray-400 mb-1.5">
            Last Name <span className="text-gold-500" aria-hidden="true">*</span>
          </label>
          <input
            id="lastName" name="lastName" type="text" required autoComplete="family-name"
            placeholder="Doe"
            className="w-full bg-mil-black-800 border border-mil-green-800/40 rounded
                       px-4 py-3 text-sm text-white placeholder-gray-600
                       focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/30
                       transition-colors duration-200"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email"
               className="block text-xs font-heading uppercase tracking-widest text-gray-400 mb-1.5">
          Email <span className="text-gold-500" aria-hidden="true">*</span>
        </label>
        <input
          id="email" name="email" type="email" required autoComplete="email"
          placeholder="john@example.com"
          className="w-full bg-mil-black-800 border border-mil-green-800/40 rounded
                     px-4 py-3 text-sm text-white placeholder-gray-600
                     focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/30
                     transition-colors duration-200"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone"
               className="block text-xs font-heading uppercase tracking-widest text-gray-400 mb-1.5">
          Phone{' '}
          <span className="text-gray-600 font-body normal-case tracking-normal">(optional)</span>
        </label>
        <input
          id="phone" name="phone" type="tel" autoComplete="tel"
          placeholder="+1 (555) 000-0000"
          className="w-full bg-mil-black-800 border border-mil-green-800/40 rounded
                     px-4 py-3 text-sm text-white placeholder-gray-600
                     focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/30
                     transition-colors duration-200"
        />
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject"
               className="block text-xs font-heading uppercase tracking-widest text-gray-400 mb-1.5">
          Subject <span className="text-gold-500" aria-hidden="true">*</span>
        </label>
        <select
          id="subject" name="subject" required
          defaultValue=""
          className="w-full bg-mil-black-800 border border-mil-green-800/40 rounded
                     px-4 py-3 text-sm text-white
                     focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/30
                     transition-colors duration-200 appearance-none cursor-pointer"
        >
          <option value="" disabled>Select a subject…</option>
          <option value="volunteer">Volunteer Inquiry</option>
          <option value="donate">Donation / Fundraising</option>
          <option value="veteran-support">Request Veteran Support</option>
          <option value="partnership">Partnership Opportunity</option>
          <option value="media">Media &amp; Press</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message"
               className="block text-xs font-heading uppercase tracking-widest text-gray-400 mb-1.5">
          Message <span className="text-gold-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message" name="message" required rows={6}
          placeholder="Tell us how we can help…"
          className="w-full bg-mil-black-800 border border-mil-green-800/40 rounded
                     px-4 py-3 text-sm text-white placeholder-gray-600 resize-none
                     focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/30
                     transition-colors duration-200"
        />
      </div>

      {/* Error */}
      {status === 'error' && (
        <p className="text-red-400 text-xs font-heading uppercase tracking-wider" role="alert">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className={`btn-primary w-full justify-center text-sm
                    ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {status === 'submitting' ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10"
                      stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending…
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}
