/**
 * About Page — /about
 *
 * Sections: Mission, History, Core Values, Leadership, Partners
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Green Heroes Foundation — our mission, history, values, and the leadership team driving change for veterans and military families.',
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const CORE_VALUES = [
  {
    label: 'VISION STATEMENT',
    description: 'Our vision is to see war veterans get a seamless reintegration into the civil society and provide adequate care and shelter for the homeless.',
    icon: '⚔️',
  },
  {
    label: 'MISSION STATEMENT',
    description: 'Green Heroes Foundation is dedicated to leveraging the nation’s full spectrum of resources to ensure all members of our military, war veterans and their families receive the support they need and have earned.',
    icon: '🎖️',
  },
  {
    label: 'OUR GOAL',
    description: 'Our goal is to create awareness on the travails of the men (male/female) in uniform who are constantly exposed to threats and dangers during and after active service.',
    icon: '🤝',
  },
  // {
  //   label: 'Resilience',
  //   description: 'We build programs that foster long-term strength, not just short-term relief.',
  //   icon: '🛡️',
  // },
];

const LEADERSHIP = [
  {
    name: 'Gen Ibrahim Babangida (RTD)',
    role: 'Patron',
    bio: '',
    image: '/images/Patron.jpg',
  },
  {
    name: 'AVM Audu Bida (RTD)',
    role: 'Chairman',
    bio: '',
    image: '/images/Bida.jpg',
  },
  {
    name: 'Air Cdre A.A Balogun (RTD)',
    role: 'Founder',
    bio: '',
    image: '/images/Balogun.jpg',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* ── Page header ── */}
      <div className="bg-mil-black-800 border-b border-mil-green-800/30 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-heading text-xs uppercase tracking-[0.25em] text-gold-500 mb-2">
            Who We Are
          </p>
          <h1 className="section-heading mb-0">About Us</h1>
          <span className="gold-divider mt-3 block" aria-hidden="true" />
        </div>
      </div>

      {/* ── Mission statement ── */}
      <section className="py-20 bg-mil-black" aria-labelledby="mission-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text */}
            <div>
              <p className="font-heading text-xs uppercase tracking-[0.25em] text-gold-500 mb-2">
                Our Purpose
              </p>
              <h2
                id="mission-heading"
                className="section-heading mb-3"
              >
                HELPING VETERANS, COMMUNITIES, AND THOSE SERVING IN HARM'S WAY.
              </h2>
              <span className="gold-divider mb-6 block" aria-hidden="true" />
              <p className="text-gray-300 leading-relaxed text-base mb-4">
               Green Heroes Foundation initiative which is composed mainly of retired military officers is designed to support and care for war veterans and their dependents. Our goal is to create awereness on the travails of the men (male/female) in uniform who are constantly exposed to threats and dangers during and after active service. Due to the enormity of this problem, leaving it to the Armed Forces of Nigeria to treat acute and chronic medical needs, provide rehabilitation service and finally help them gain and maintain useful employment will never be sufficient. That is why we believe that these efforts must be complimented by well-meaning Nigerians and Corporate Organizations. <br/><br/>
               Green Heroes Foundation intends to show the way by providing some of the much needed support outside the scope and resources of the Armed Forces of Nigeria. Consequently, we commenced full operations in February 2018 with few of the war veterans that we could cater for due to financial contraints. They are currently being catered for at our temporary hostel located inside Jazz and Blues Garden at Abidjan Street, Wuse Zone 3, in Abuja. There are several of them within our cities and villages living on the fringes of the society they once served to protect and defend. We believe that it is our obligation to cater for those who might have borne the battles and there families who suffered from the pains which became their gains while protecting us all.
              </p>
             
              <Link href="/contact" className="btn-primary">
                Join Our Mission
              </Link>
            </div>

            {/* Image */}
            <div className="relative h-80 lg:h-[420px] rounded-lg overflow-hidden border border-mil-green-800/30">
              <Image
                src="/images/ghh.jpg"
                alt="Veterans gathered for community event"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-mil-black/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Two-column text block ── */}
      <section className="py-20 bg-mil-black-800" aria-labelledby="twocol-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">

            {/* Left — heading + label */}
            <div className="lg:sticky lg:top-28">
              <p className="font-heading text-xs uppercase tracking-[0.25em] text-gold-500 mb-2">
                Our Approach
              </p>
              <h2
                id="twocol-heading"
                className="section-heading mb-3"
              >
                OBJECTIVES
              </h2>
              <span className="gold-divider block mb-6" aria-hidden="true" />
              <p className="text-gray-400 text-sm leading-relaxed">
                To promote research studies on post war conditions and understanding to both serving and retired veterans.
              <br/>
              To provide medical counseling and assessment of war veterans
              <br/>
              To promote the understanding of veteran welfare and integration.
              <br/>
              Rehabilitation skill acquisition and empowerment needs
              <br/>
              To carry out advocacy, public enlightment and the effects; as a way of promoting peaceful coexistence in Nigerian.
              </p>
            </div>

            {/* Right — body text columns */}
            {/* Replace or extend these paragraphs with your own content */}
            <div className="space-y-5 text-sm text-gray-400 leading-relaxed">
              <p>Employment opportunities for war veterans as the foundation's activities would be manned and coordinated by veterans across the country.
                <br/><br/>
                Skill acquisation and empowerment programs to ensure full rehabilitation and self-sufficiency of the veterans.
              </p>
              <p>
               Provision of improved health care services through the establishments of dedicated Hospitals and Clinics for veterans and their dependents.
              </p>
              <p>
               Improved welfare package for veterans through targeted advocacy to secure reasonable discounts and rebates in both public and private enterprises.
                <br/> <br/>
                Total entrance of vets into the society with the desired appreciation.
              </p>
              <p>
               Enhancement of peace and the security of Nigeria through the proper retooling, reorientation and rehabilitation of war veterans.
                <br/><br/>
                After proper rehabilitation the Vets could be engaged by relevant Government Agencies for disaster management duties amongst others.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Core values ── */}
      <section className="py-20 bg-mil-black-800" aria-labelledby="values-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-heading text-xs uppercase tracking-[0.25em] text-gold-500 mb-2">
              What Drives Us
            </p>
            <h2 id="values-heading" className="section-heading mb-0">Core Values</h2>
            <span className="gold-divider mt-3 mx-auto block" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_VALUES.map(({ label, description }) => (
              <div
                key={label}
                className="bg-mil-black-700 border border-mil-green-800/30 rounded-lg p-6
                           hover:border-gold-500/30 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Accent bar */}
                <span className="block w-10 h-1 bg-gold-500 rounded-full mb-4" aria-hidden="true" />
                <h3 className="font-heading font-bold text-white uppercase tracking-widest text-base mb-3">
                  {label}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="py-20 bg-mil-black" aria-labelledby="leadership-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-heading text-xs uppercase tracking-[0.25em] text-gold-500 mb-2">
              The Team
            </p>
            <h2 id="leadership-heading" className="section-heading mb-0">Leadership</h2>
            <span className="gold-divider mt-3 mx-auto block" aria-hidden="true" />
            <p className="mt-5 text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
              Our leadership team brings decades of combined military service and non-profit experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {LEADERSHIP.map(({ name, role, bio, image }) => (
              <div
                key={name}
                className="bg-mil-black-700 border border-mil-green-800/30 rounded-lg overflow-hidden
                           hover:border-gold-500/30 hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Photo */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={image}
                    alt={`Portrait of ${name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mil-black via-transparent to-transparent" />
                </div>
                {/* Info */}
                <div className="p-6">
                  {role && (
                    <span className="block text-xs font-heading uppercase tracking-widest text-gold-500 mb-1">
                      {role}
                    </span>
                  )}
                  <h3 className="font-heading font-bold text-white text-lg mb-3">{name}</h3>
                  {bio && (
                    <p className="text-gray-400 text-sm leading-relaxed">{bio}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-mil-green-800" aria-label="Call to action">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl text-white uppercase tracking-widest mb-4">
            Want to Partner With Us?
          </h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            We welcome partnerships with businesses, government agencies, and other non-profits
            who share our commitment to veterans and military families.
          </p>
          <Link href="/contact" className="btn-primary">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
