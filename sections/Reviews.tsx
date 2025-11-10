"use client";

import { useTranslations } from "next-intl";

import ReviewsCarousel from "@/components/ReviewsCarousel";
import AnimatedCarousel from "@/components/ReviewsVideosCarousel";

export default function Reviews() {
  const t = useTranslations("reviews");

  return (
    <section id="reviews" className="py-16 md:py-24 bg-white overflow-x-hidden">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary">
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
            </span>{" "}
            <span>{t("title.suffix")}</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mt-4">
            {t("subtitle")}
          </p>
        </div>

        {/* Text Reviews Carousel */}
        <ReviewsCarousel />
      </div>
      {/* Video Reviews Carousel */}
      <AnimatedCarousel />
    </section>
  );
}
