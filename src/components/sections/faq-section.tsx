'use client';

import { useState } from 'react';
import type { Dictionary } from '@/lib/dictionary';

interface FaqSectionProps {
  dict: Dictionary;
}

export default function FaqSection({ dict }: FaqSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const faqs = dict.faqs_section.faqs;

  const toggle = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-16 px-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">
        {dict.faqs_section.title}
      </h2>

      <div>
        {faqs.map((faq: { question: string; answer: string }, index: number) => (
          <div key={index} className="border-b py-4">
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center text-left"
            >
              <span className="text-lg font-medium">{faq.question}</span>
              <span className="text-2xl ml-4 shrink-0">
                {expandedIndex === index ? '−' : '+'}
              </span>
            </button>
            {expandedIndex === index && (
              <p className="mt-3 text-gray-600 leading-relaxed">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
