'use client';

import type { Dictionary } from '@/lib/dictionary';
import { useState, useEffect, useCallback } from 'react';

interface TestimonialsSectionProps {
  dict: Dictionary;
}

export default function TestimonialsSection({ dict }: TestimonialsSectionProps) {
  const section = dict.homepage.testimonials_section;
  const items = section.items as Array<{
    id: number;
    quote: string;
    name: string;
    caseDetail: string;
  }>;

  const [activeIndex, setActiveIndex] = useState(0);

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    const interval = setInterval(advance, 6000);
    return () => clearInterval(interval);
  }, [advance]);

  const current = items[activeIndex];

  return (
    <section className="bg-warm-100 section-padding">
      <div className="section-wide">
        {/* Label */}
        <p className="text-xs tracking-[0.2em] uppercase text-gold font-body mb-2">
          Client Testimonials
        </p>

        {/* Title */}
        <h2 className="font-display text-display-md text-navy-900 mb-12">
          {section.title}
        </h2>

        {/* Gold line */}
        <div className="gold-line mb-12" />

        {/* Testimonial */}
        <div className="relative">
          {/* Decorative quote mark */}
          <span
            className="font-display text-8xl text-gold/20 leading-none select-none"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          {/* Quote text */}
          <blockquote className="font-serif text-xl md:text-2xl italic text-navy-800 leading-relaxed max-w-3xl -mt-6">
            {current.quote}
          </blockquote>

          {/* Attribution */}
          <div className="mt-8 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-gold" aria-hidden="true" />
            <span className="font-body font-semibold text-navy-900">
              {current.name}
            </span>
            <span className="text-muted text-sm">
              {current.caseDetail}
            </span>
          </div>
        </div>

        {/* Dot navigation */}
        <div className="mt-10 flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
                i === activeIndex ? 'bg-gold' : 'bg-navy-200'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
