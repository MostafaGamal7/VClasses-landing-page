'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import useEmblaCarousel from 'embla-carousel-react';
import { plans } from '@/lib/constants';
import Image from 'next/image';
import PlanCard from '@/components/PlanCard';
import { useLocale } from 'next-intl';
const TWEEN_FACTOR_BASE = 0.03;

const numberWithinRange = (number: number, min: number, max: number) =>
  Math.min(Math.max(number, min), max);

export default function Plans() {
  const t = useTranslations();
  const locale = useLocale();
  const [isYearly, setIsYearly] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'center',
    skipSnaps: false,
    dragFree: false,
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
    direction: 'ltr',
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLDivElement[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setTweenNodes = useCallback((emblaApi: any) => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode: HTMLElement) => {
      return slideNode.querySelector('.embla__slide__content');
    });
  }, []);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setTweenFactor = useCallback((emblaApi: any) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tweenScale = useCallback((emblaApi: any, eventName?: string) => {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();
    const isScrollEvent = eventName === 'scroll';

    emblaApi.scrollSnapList().forEach((scrollSnap: number, snapIndex: number) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex: number) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
          engine.slideLooper.loopPoints.forEach((loopItem: any) => {
            const target = loopItem.target();
            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);
              if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
              if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
            }
          });
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
        const scale = numberWithinRange(tweenValue, 0, 1);
        const tweenNode = tweenNodes.current[slideIndex];
        if (tweenNode) {
          tweenNode.style.transform = `scale(${scale})`;
          tweenNode.style.opacity = scale.toString();
        }
      });
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);

    emblaApi
      .on('select', onSelect)
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenScale)
      .on('scroll', tweenScale);

    return () => {
      emblaApi
        .off('select', onSelect)
        .off('reInit', setTweenNodes)
        .off('reInit', setTweenFactor)
        .off('reInit', tweenScale)
        .off('scroll', tweenScale);
    };
  }, [emblaApi, onSelect, tweenScale, setTweenNodes, setTweenFactor]);

  return (
    <section className="relative pb-24 md:pb-48 pt-24 md:pt-48" id="plans">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10">
              <Image
                src="/assets/images/plans/plans-bg.png"
                alt="Plans Background"
                fill
                className={`${locale === 'ar' ? 'scale-x-[-1]' : ''}`}
                priority
              />
        </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('plans.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {t('plans.description')}
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center bg-gray-800 rounded-full p-1 mb-12">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                !isYearly
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {t('plans.monthly')}
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                isYearly
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {t('plans.yearly')}
            </button>
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex items-stretch">
            {plans.map((plan, index) => (
              <div 
                key={plan.id}
                className="embla__slide shrink-0 w-[40%] px-2 flex"
              >
                <div className="embla__slide__content w-full">
                  <PlanCard 
                    plan={plan} 
                    isYearly={isYearly} 
                    isActive={index === selectedIndex} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
          {plans.map((plan) => (
            <div key={plan.id} className="h-full">
              <PlanCard 
                plan={plan} 
                isYearly={isYearly} 
                isActive={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}