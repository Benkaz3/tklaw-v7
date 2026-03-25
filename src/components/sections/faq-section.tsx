'use client';

import { useState } from 'react';
import type { Dictionary } from '@/lib/dictionary';

interface FaqSectionProps {
  dict: Dictionary;
}

export default function FaqSection({ dict }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = dict.faqs_section.faqs;

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-warm-50 section-padding">
      <div className="section-narrow">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.2em] uppercase text-gold font-body mb-2">
            FAQ
          </p>
          <h2 className="font-display text-display-md text-navy-900">
            {dict.faqs_section.title}
          </h2>
          <div className="gold-line-center mt-4" />
        </div>

        {/* Accordion */}
        <div className="divide-y divide-navy-900/10">
          {faqs.map((faq: { question: string; answer: string }, index: number) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="py-5">
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center text-left"
                >
                  <span className="font-display text-lg text-navy-900 pr-8">
                    {faq.question}
                  </span>
                  <span
                    className={`text-gold transition-transform duration-300 text-2xl leading-none shrink-0 ${
                      isOpen ? 'rotate-45' : 'rotate-0'
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: isOpen ? '500px' : '0px',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p className="mt-3 text-navy-600 leading-relaxed font-body text-sm">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
