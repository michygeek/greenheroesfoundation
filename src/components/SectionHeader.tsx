/**
 * SectionHeader — reusable heading block with gold underline accent.
 * Used on Home, Blog, About, and Contact pages.
 */

interface SectionHeaderProps {
  eyebrow?: string;   // small uppercase label above the heading
  heading: string;
  subheading?: string;
  centered?: boolean;
  light?: boolean;    // white heading vs gold heading
}

export default function SectionHeader({
  eyebrow,
  heading,
  subheading,
  centered = false,
  light = true,
}: SectionHeaderProps) {
  return (
    <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
      {eyebrow && (
        <p className="font-heading text-xs uppercase tracking-[0.25em] text-gold-500 mb-2">
          {eyebrow}
        </p>
      )}
      <h2
        className={`section-heading ${light ? 'text-white' : 'text-gold-500'}`}
      >
        {heading}
      </h2>
      {/* Gold accent bar */}
      <span
        className={`gold-divider mt-3 ${centered ? 'mx-auto' : ''}`}
        aria-hidden="true"
      />
      {subheading && (
        <p className="mt-4 text-gray-400 text-base leading-relaxed max-w-2xl
                      ${centered ? 'mx-auto' : ''}">
          {subheading}
        </p>
      )}
    </div>
  );
}
