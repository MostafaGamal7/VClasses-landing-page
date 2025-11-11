"use client";

import { useTranslations, useLocale } from "next-intl";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState, useRef } from "react";
import AboutCard from "@/components/AboutCard";
import { aboutCards } from "@/lib/constants";
import Image from "next/image";
import Button from "@/components/ui/Button";
import {
  fadeInAnimation,
  textRevealAnimation,
  scaleAnimation,
  slideInAnimation,
} from "@/utils/gsap-animations";

export default function About() {
  const t = useTranslations("about");

  // Refs for animation elements
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const learnTitleRef = useRef<HTMLHeadingElement>(null);
  const learnSubtitleRef = useRef<HTMLParagraphElement>(null);
  const learnItemsRef = useRef<HTMLDivElement>(null);
  const learnImageRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // Make the unselected cards have a smaller width

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      containScroll: "keepSnaps",
      loop: true,
      slidesToScroll: 1,
      breakpoints: {
        // small screens one card
        "(max-width: 640px) and (min-width: 320px)": { slidesToScroll: 1 },
        // medium screens two cards
        "(max-width: 1024px) and (min-width: 641px)": { slidesToScroll: 2 },
        // large screens three cards
        "(max-width: 1280px) and (min-width: 1025px)": { slidesToScroll: 3 },
      },
    },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        stopOnLastSnap: false,
      }),
    ]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // GSAP Animations
  useEffect(() => {
    // Animate title with text reveal
    if (titleRef.current) {
      textRevealAnimation(titleRef.current, {
        duration: 1.2,
        delay: 0.2,
        splitBy: "words",
        trigger: "#about",
      });
    }

    // Animate subtitle with fade in
    if (subtitleRef.current) {
      fadeInAnimation(subtitleRef.current, {
        duration: 0.8,
        delay: 0.5,
        y: 20,
        trigger: "#about",
      });
    }

    // Animate cards container with fade in
    if (cardsRef.current) {
      fadeInAnimation(cardsRef.current, {
        duration: 1,
        delay: 0.8,
        y: 30,
        trigger: "#about",
      });
    }

    // Animate learn section title
    if (learnTitleRef.current) {
      textRevealAnimation(learnTitleRef.current, {
        duration: 1.2,
        delay: 0.2,
        splitBy: "words",
        trigger: ".learn-section",
      });
    }

    // Animate learn section subtitle
    if (learnSubtitleRef.current) {
      fadeInAnimation(learnSubtitleRef.current, {
        duration: 0.8,
        delay: 0.4,
        y: 20,
        trigger: ".learn-section",
      });
    }

    // Animate learn items with slide in from left
    if (learnItemsRef.current) {
      const items = Array.from(
        learnItemsRef.current.querySelectorAll(".learn-item")
      );
      slideInAnimation(items as HTMLElement[], {
        direction: "left",
        duration: 0.8,
        delay: 0.6,
        distance: 50,
        trigger: ".learn-section",
      });
    }

    // Animate learn image with scale
    if (learnImageRef.current) {
      scaleAnimation(learnImageRef.current, {
        duration: 1,
        delay: 0.8,
        scale: 0.8,
        trigger: ".learn-section",
      });
    }

    // Animate CTA button
    if (ctaButtonRef.current) {
      fadeInAnimation(ctaButtonRef.current, {
        duration: 0.8,
        delay: 1.2,
        y: 20,
        trigger: ".learn-section",
      });
    }
    if (lineRef.current) {
      fadeInAnimation(lineRef.current, {
        duration: 0.8,
        delay: 0.5,
        y: 10,
        trigger: "#about",
      });
    }
  }, []);

  return (
    <>
      <section
        className="py-16 md:py-24 dir:ltr"
        id="about"
        ref={sectionRef}
        dir="ltr"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="relative w-fit mx-auto">
              <h2
                className="text-3xl md:text-4xl font-bold text-secondary mb-4 "
                ref={titleRef}
              >
                <span>{t("title.prefix")}</span>{" "}
                <span className="relative inline-block px-1">
                  {t("title.highlight")}
                </span>
                <span>{t("title.suffix")}</span>
              </h2>
              <div
                ref={lineRef}
                className="absolute top-5 left-0 z-[-1] w-full h-full"
              >
                <Image
                  src="/assets/icons/line.png"
                  fill
                  alt="About Title"
                  className="object-contain"
                />
              </div>
            </div>
            <p
              className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mt-4"
              ref={subtitleRef}
            >
              {t("subtitle")}
            </p>
          </div>

          <div className="embla overflow-hidden " ref={emblaRef}>
            <div
              className="embla__container flex items-end md:items-center pb-4 min-h-[550px]"
              ref={cardsRef}
            >
              {aboutCards.map((card, index) => (
                <div
                  className="embla__slide flex-[0_0_80%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2 flex items-end md:items-center"
                  key={index}
                >
                  <AboutCard {...card} isActive={index === selectedIndex} />
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8 gap-2">
              {aboutCards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === selectedIndex
                      ? "bg-primary hover:bg-primary-hover w-20"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What you'll actually learn section */}
      <section className="relative pb-16 md:pb-24 learn-section">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/assets/images/about/about-bg.png"
            alt="About Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 pt-16 md:pt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Illustration side - appears first on mobile, switches based on locale on desktop */}
            <div className={`order-1 md:order-2 relative`} ref={learnImageRef}>
              <div className="relative w-full h-[350px] md:h-[450px] lg:h-[550px]">
                <Image
                  src="/assets/images/about/about-learn-bg.png"
                  alt="Learning Illustration"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Content side - appears second on mobile, switches based on locale on desktop */}
            <div className={`order-2 md:order-1`}>
              {/* Title */}
              <div className="relative w-fit">
                <h2
                  className="text-3xl md:text-4xl font-bold text-secondary mb-4 relative w-fit"
                  ref={learnTitleRef}
                >
                  <span>{t("learn.title.prefix")}</span>{" "}
                  <span className="relative inline-block px-1">
                    {t("learn.title.highlight")}
                  </span>
                  {t("learn.title.suffix") && (
                    <span> {t("learn.title.suffix")}</span>
                  )}
                </h2>
                <div
                  ref={lineRef}
                  className="absolute top-5 left-0 z-[-1] w-full h-full"
                >
                  <Image
                    src="/assets/icons/line.png"
                    fill
                    alt="About Title"
                    className="object-contain"
                  />
                </div>
              </div>
              <p
                className="text-gray-600 text-lg md:text-xl mb-10 leading-relaxed"
                ref={learnSubtitleRef}
              >
                {t("learn.subtitle")}
              </p>

              {/* Feature Items */}
              <div className="space-y-6 mb-8" ref={learnItemsRef}>
                {/* Item 1: Campaign Setup & Strategy */}
                <div className="flex gap-4 learn-item">
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md">
                      <Image
                        src="/assets/icons/about/campaign.png"
                        alt="Campaign Setup"
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-secondary mb-2">
                      {t("learn.items.item1.title")}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t("learn.items.item1.description")}
                    </p>
                  </div>
                </div>

                {/* Item 2: Winning Creatives & Ad Copy */}
                <div className="flex gap-4 learn-item">
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md">
                      <Image
                        src="/assets/icons/about/winning.png"
                        alt="Winning Creatives"
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-secondary mb-2">
                      {t("learn.items.item2.title")}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t("learn.items.item2.description")}
                    </p>
                  </div>
                </div>

                {/* Item 3: Optimize & Scale */}
                <div className="flex gap-4 learn-item">
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md">
                      <Image
                        src="/assets/icons/about/optimize.png"
                        alt="Optimize & Scale"
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-secondary mb-2">
                      {t("learn.items.item3.title")}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t("learn.items.item3.description")}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div ref={ctaButtonRef}>
                <Button
                  href="#enroll"
                  translationKey="about.learn.cta"
                  variant="primary"
                  size="lg"
                  className="w-64 m-auto md:m-0 min-h-12"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
