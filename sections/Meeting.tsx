"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { textRevealAnimation, fadeInAnimation, slideInAnimation } from '@/utils/gsap-animations';

export default function Meeting() {
  const t = useTranslations("meeting");
  const locale = useLocale();

  // GSAP Animation refs
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const instructorTitleRef = useRef<HTMLHeadingElement>(null);
  const instructorSubtitleRef = useRef<HTMLParagraphElement>(null);
  const instructorRatingRef = useRef<HTMLDivElement>(null);
  const instructorDescRef = useRef<HTMLParagraphElement>(null);
  const instructorFeaturesRef = useRef<HTMLDivElement>(null);
  const instructorImageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useEffect(() => {
    // Animate main title with highlight effect
    if (titleRef.current) {
      textRevealAnimation(titleRef.current, {
        duration: 1,
        delay: 0.2,
        splitBy: 'words',
        trigger: '#meet'
      });
    }

    // Animate subtitle
    if (subtitleRef.current) {
      fadeInAnimation(subtitleRef.current, {
        duration: 0.8,
        delay: 0.5,
        y: 30,
        trigger: '#meet'
      });
    }

    // Animate instructor image
    if (instructorImageRef.current) {
      slideInAnimation(instructorImageRef.current, {
        duration: 0.8,
        delay: 0.3,
        direction: locale === 'ar' ? 'right' : 'left',
        distance: 50,
        trigger: '#meet'
      });
    }

    // Animate instructor info elements
    if (instructorTitleRef.current) {
      slideInAnimation(instructorTitleRef.current, {
        duration: 0.6,
        delay: 0.6,
        direction: 'bottom',
        distance: 30,
        trigger: '#meet'
      });
    }

    if (instructorSubtitleRef.current) {
      slideInAnimation(instructorSubtitleRef.current, {
        duration: 0.6,
        delay: 0.7,
        direction: 'bottom',
        distance: 30,
        trigger: '#meet'
      });
    }

    if (instructorRatingRef.current) {
      fadeInAnimation(instructorRatingRef.current, {
        duration: 0.6,
        delay: 0.8,
        y: 20,
        trigger: '#meet'
      });
    }

    if (instructorDescRef.current) {
      slideInAnimation(instructorDescRef.current, {
        duration: 0.6,
        delay: 0.9,
        direction: 'bottom',
        distance: 30,
        trigger: '#meet'
      });
    }

    // Animate instructor features with staggered effect
    if (instructorFeaturesRef.current) {
      const features = instructorFeaturesRef.current.querySelectorAll('.instructor-feature');
      features.forEach((feature, index) => {
        slideInAnimation(feature as HTMLElement, {
          duration: 0.5,
          delay: 1.0 + (index * 0.1),
          direction: 'bottom',
          distance: 20,
          trigger: '#meet'
        });
      });
    }
    if (lineRef.current) {
      fadeInAnimation(lineRef.current, {
        duration: 0.8,
        delay: 0.5,
        y: 10,
        trigger: '#meet'
      });
    }
  }, [locale]);

  return (
    <section ref={sectionRef} className="relative py-12 md:py-16 overflow-hidden" id="meet">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/images/meeting/meet-bg.png"
          alt="Meeting background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="relative w-fit mx-auto">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-secondary mb-6 relative w-fit mx-auto">
            {t('title')}
            
          </h2>
          <div ref={lineRef} className="absolute top-5 left-0 z-[-1] w-full h-full ">
              <Image src="/assets/icons/line.png" fill alt="About Title" className="object-contain" />
            </div>
          </div>
          
          <p ref={subtitleRef} className="text-lg text-secondary/80 ">
            {t('description')}
          </p>
          
        </div>
        {/* Instructor */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6 place-items-center">         
          <div ref={instructorImageRef} className="col-span-1 md:col-span-3 order-1 md:order-2">
            <Image
              src="/assets/images/meeting/meet-hero.png"
              alt="Instructor"
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </div>
          
          <div className="col-span-1 md:col-span-7 space-y-4 order-2 md:order-1 gap-2">
            <h2 ref={instructorTitleRef} className="text-xl md:text-3xl font-bold text-primary">
              {t('instructor')}
            </h2>
            <p ref={instructorSubtitleRef} className="text-lg text-secondary/80">{t('subtitle')}</p>
            <div ref={instructorRatingRef} className="flex gap-4">
                <p className="flex gap-2 items-center">
                <Image src="/assets/icons/meeting/rating.png" alt="Rating" width={20} height={20} />
              {t('trainerRating')}
            </p>
            <p className="flex gap-2 items-center">
            <Image src="/assets/icons/meeting/reviews.png" alt="Reviews" width={20} height={20} />
              {t('trainerReviews')}
            </p>
            </div>
            <p ref={instructorDescRef} className="text-lg text-secondary/80 ">
              {t('trainerDescription')}
            </p>
            <div ref={instructorFeaturesRef} className="space-y-2">
              <p className="instructor-feature text-lg text-secondary/80">{t('trainerFeatures.item1')}</p>
              <p className="instructor-feature text-lg text-secondary/80">{t('trainerFeatures.item2')}</p>
              <p className="instructor-feature text-lg text-secondary/80">{t('trainerFeatures.item3')}</p>
              <p className="instructor-feature text-lg text-secondary/80">{t('trainerFeatures.item4')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}