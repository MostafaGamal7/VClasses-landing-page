"use client";

import { useTranslations, useLocale } from "next-intl";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import AboutCard from "@/components/AboutCard";
import aboutCards from "@/lib/constants";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function About() {
  const t = useTranslations("about");
  const locale = useLocale();
  // Make the unselected cards have a smaller width

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      containScroll: "keepSnaps",
      loop: true,
      direction: locale === "ar" ? "rtl" : "ltr",
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

  return (
    <>
      <section className="py-16 md:py-24 bg-white" id="about">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              <span>{t("title.prefix")}</span>{" "}
              <span className="relative inline-block px-1">
                {t("title.highlight")}
                <svg
                  className="absolute -bottom-1 left-0 right-0 w-full h-3 text-primary"
                  viewBox="0 0 300 15"
                  preserveAspectRatio="none"
                  style={{ zIndex: -1 }}
                >
                  <path
                    d="M 0 8 Q 30 3, 60 8 T 120 8 T 180 8 T 240 8 T 300 8"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span>{t("title.suffix")}</span>
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mt-4">
              {t("subtitle")}
            </p>
          </div>

          <div className="embla overflow-hidden " ref={emblaRef}>
            <div className="embla__container flex items-end md:items-center pb-4 min-h-[550px]">
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
      <section className="relative pb-16 md:pb-24">
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
            <div className={`order-1 md:order-2 relative`}>
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
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4 relative">
                <span>{t("learn.title.prefix")}</span>{" "}
                <span className="relative inline-block px-1">
                  {t("learn.title.highlight")}
                  <svg
                    className="absolute -bottom-1 left-0 right-0 w-full h-3 text-primary"
                    viewBox="0 0 300 15"
                    preserveAspectRatio="none"
                    style={{ zIndex: -1 }}
                  >
                    <path
                      d="M 0 8 Q 30 3, 60 8 T 120 8 T 180 8 T 240 8 T 300 8"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                {t("learn.title.suffix") && (
                  <span> {t("learn.title.suffix")}</span>
                )}
              </h2>

              {/* Subtitle */}
              <p className="text-gray-600 text-lg md:text-xl mb-10 leading-relaxed">
                {t("learn.subtitle")}
              </p>

              {/* Feature Items */}
              <div className="space-y-6 mb-8">
                {/* Item 1: Campaign Setup & Strategy */}
                <div className="flex gap-4">
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
                <div className="flex gap-4">
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
                <div className="flex gap-4">
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
      </section>
    </>
  );
}
