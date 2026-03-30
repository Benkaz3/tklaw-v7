import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="relative bg-navy-900 grain min-h-[80vh] flex items-center justify-center">
      <div className="relative z-10 text-center px-5">
        {/* Large 404 */}
        <p className="font-display text-[10rem] sm:text-[14rem] font-bold leading-none text-navy-800 select-none">
          404
        </p>

        {/* Gold line */}
        <div className="gold-line-center mb-6 -mt-4" />

        {/* Heading */}
        <h1 className="font-display text-display-md text-white mb-4">
          Page Not Found
        </h1>

        {/* Subtitle */}
        <p className="text-warm-300/60 font-body text-lg max-w-md mx-auto mb-10">
          The page you are looking for does not exist or has been moved.
        </p>

        {/* CTA button */}
        <Link
          href="/vi"
          className="inline-block bg-gold text-navy-900 font-body font-semibold text-sm tracking-wide uppercase px-8 py-4 hover:bg-gold-light transition-colors"
        >
          Go Home
        </Link>
      </div>
    </section>
  );
}
