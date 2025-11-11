"use client";

import { useTranslations } from "next-intl";
import { useRef, useEffect } from 'react';
import ReviewsCarousel from "@/components/ReviewsCarousel";
import AnimatedCarousel from "@/components/ReviewsVideosCarousel";
import { textRevealAnimation, fadeInAnimation, slideInAnimation } from '@/utils/gsap-animations';
import Image from "next/image";

export default function Reviews() {
  const t = useTranslations("reviews");

  // GSAP Animation refs
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoCarouselRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useEffect(() => {
    // Animate title with highlight effect
    if (titleRef.current) {
      textRevealAnimation(titleRef.current, {
        duration: 1,
        delay: 0.2,
        splitBy: 'words',
        trigger: '#reviews'
      });
    }

    // Animate subtitle
    if (subtitleRef.current) {
      fadeInAnimation(subtitleRef.current, {
        duration: 0.8,
        delay: 0.5,
        y: 30,
        trigger: '#reviews'
      });
    }

    // Animate text reviews carousel
    if (carouselRef.current) {
      slideInAnimation(carouselRef.current, {
        duration: 0.8,
        delay: 0.8,
        direction: 'bottom',
        distance: 50,
        trigger: '#reviews'
      });
    }

    // Animate video reviews carousel
    if (videoCarouselRef.current) {
      slideInAnimation(videoCarouselRef.current, {
        duration: 0.8,
        delay: 1.2,
        direction: 'bottom',
        distance: 50,
        trigger: '#reviews'
      });
    }

    if (lineRef.current) {
      fadeInAnimation(lineRef.current, {
        duration: 0.8,
        delay: 0.5,
        y: 10,
        trigger: '#reviews'
      });
    }
  }, []);

  return (
    <section id="reviews" className="py-16 md:py-24 overflow-x-hidden" ref={sectionRef}>
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-10 md:mb-14">
          <div className="relative w-fit mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary relative w-fit mx-auto" ref={titleRef}>
            <span>{t("title.prefix")}</span>{" "}
            <span className="relative inline-block px-1">
              {t("title.highlight")}
            </span>{" "}
            <span>{t("title.suffix")}</span>
            
          </h2>
          <div ref={lineRef} className="absolute top-5 left-0 z-[-1] w-full h-full translate-x-1/4">
            <Image src="/assets/icons/line.png" fill alt="About Title" className="object-contain" />
          </div>
          </div>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mt-4" ref={subtitleRef}>
            {t("subtitle")}
          </p>
        </div>

        {/* Text Reviews Carousel */}
        <div ref={carouselRef}>
          <ReviewsCarousel />
        </div>
      </div>
      {/* Video Reviews Carousel */}
      <div ref={videoCarouselRef}>
        <AnimatedCarousel />
      </div>
    </section>
  );
}
