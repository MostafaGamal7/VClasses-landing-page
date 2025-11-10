'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQs() {
  const t = useTranslations('faqs');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = t.raw('items');

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-[#061C3D]">
      <div className="container mx-auto px-4">
        <div className=" mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-[#BCBCBC]">
            {t('description')}
          </p>
        </div>

        <div className="mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index}   
              className={`shadow-sm overflow-hidden transition-all duration-300 border border-gray-700 rounded-2xl ${activeIndex === index ? 'bg-[#ffd27a] text-[#061C3D]' : 'text-white'}`}
            >
              <button
                className={`w-full p-6 text-left flex justify-between items-center`}
                onClick={() => toggleAccordion(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-${index}`}
              >
                <span className={`font-medium`}>
                  {item.question}
                </span>
                {activeIndex === index ? (
                  <Image src="/assets/icons/faqs/minus.png" alt="" width={24} height={24} />
                ) : (
                  <Image src="/assets/icons/faqs/plus.png" alt="" width={24} height={24} />
                )}
              </button>
              <div
                id={`faq-${index}`}
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? 'max-h-96 pb-4' : 'max-h-0'
                }`}
                aria-hidden={activeIndex !== index}
              >
                <div className={`pb-4 ${activeIndex === index ? 'text-[#061C3D]' : ''}`}>
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}