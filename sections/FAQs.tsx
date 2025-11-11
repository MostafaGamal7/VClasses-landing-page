'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { textRevealAnimation, fadeInAnimation, slideInAnimation } from '@/utils/gsap-animations';

type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQs() {
  const t = useTranslations('faqs');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // GSAP Animation refs
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const faqItemsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useEffect(() => {
    // Animate title with highlight effect
    if (titleRef.current) {
      textRevealAnimation(titleRef.current, {
        duration: 1,
        delay: 0.2,
        splitBy: 'words',
        trigger: '#faqs'
      });
    }

    // Animate subtitle
    if (subtitleRef.current) {
      fadeInAnimation(subtitleRef.current, {
        duration: 0.8,
        delay: 0.5,
        y: 30,
        trigger: '#faqs'
      });
    }

    // Animate FAQ items with staggered effect
    if (faqItemsRef.current) {
      const items = faqItemsRef.current.querySelectorAll('.faq-item');
      items.forEach((item, index) => {
        slideInAnimation(item as HTMLElement, {
          duration: 0.6,
          delay: 0.8 + (index * 0.1),
          direction: 'bottom',
          distance: 30,
          trigger: '#faqs'
        });
      });
    }
    if (lineRef.current) {
      fadeInAnimation(lineRef.current, {
        duration: 0.8,
        delay: 0.5,
        y: 10,
        trigger: '#faqs'
      });
    }
  }, []);

  const faqItems: FAQItem[] = t.raw('items');

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} id="faqs" className="py-16 md:py-24 bg-[#061C3D]">
      <div className="container mx-auto px-4">
        <div className=" mx-auto text-center mb-12">
          <div className="relative w-fit mx-auto z-50">
            <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('title')}
            
          </h2>
          <div ref={lineRef} className="absolute top-5 left-0 z-[-1] w-full h-full ">
            <Image src="/assets/icons/line.png" fill alt="About Title" className="object-contain" />
          </div>
          </div>
          <p ref={subtitleRef} className="text-lg text-[#BCBCBC]">
            {t('description')}
          </p>
        </div>

        <div ref={faqItemsRef} className="mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index}   
              className={`faq-item shadow-sm overflow-hidden transition-all duration-300 border border-gray-700 rounded-2xl ${activeIndex === index ? 'bg-[#ffd27a] text-[#061C3D]' : 'text-white'}`}
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