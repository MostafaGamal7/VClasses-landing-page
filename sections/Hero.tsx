"use client";
import Button from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  fadeInAnimation,
  textRevealAnimation,
  slideInAnimation,
  scaleAnimation,
} from "@/utils/gsap-animations";

export default function Hero() {
  const t = useTranslations("hero");

  // Refs for animation elements
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const playButtonRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useEffect(() => {
    // Animate title with text reveal
    if (titleRef.current) {
      textRevealAnimation(titleRef.current, {
        duration: 1,
        delay: 0.2,
        splitBy: "words",
      });
    }

    // Animate description with slide in from left
    if (descriptionRef.current) {
      slideInAnimation(descriptionRef.current, {
        direction: "left",
        duration: 0.8,
        delay: 0.5,
        distance: 50,
      });
    }

    // Animate play button with scale
    if (playButtonRef.current) {
      scaleAnimation(playButtonRef.current, {
        duration: 0.6,
        delay: 0.8,
        scale: 0.8,
      });
    }

    // Animate CTA button with fade in
    if (ctaButtonRef.current) {
      fadeInAnimation(ctaButtonRef.current, {
        duration: 0.8,
        delay: 1,
        y: 20,
      });
    }

    // Animate hero image with slide in from right
    if (heroImageRef.current) {
      slideInAnimation(heroImageRef.current, {
        direction: "right",
        duration: 1,
        delay: 0.3,
        distance: 80,
      });
    }

    if (lineRef.current) {
      fadeInAnimation(lineRef.current, {
        duration: 0.8,
        delay: 0.5,
        y: 10,
        trigger: "#home",
      });
    }
  }, []);

  return (
    <section
      className="relative w-full flex items-center pt-24 lg:pt-0 min-h-[calc(100vh)]"
      id="home"
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/images/hero/hero-bg.png"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center lg:mt-24">
          {/* Content */}
          <div className="space-y-8 ">
            <h1
              className="text-xs md:text-lg font-bold text-primary leading-tight"
              ref={titleRef}
            >
              {t("title")}
            </h1>
            <p
              className="text-secondary font-extrabold leading-[2.2] relative"
              style={{ fontSize: "clamp(1.2rem, 4vw, 2.2rem)" }} // 1rem for mobile, 4vw for tablet, 2.2rem for desktop, 1rem == 16px
              ref={descriptionRef}
            >
              {t("description")}
              <span ref={lineRef} className="relative text-nowrap ">
                {t("suffix")}
                <span className="absolute top-5 left-0 z-[-1] w-full h-full">
                  <Image
                    src="/assets/icons/line.png"
                    alt="Line"
                    fill
                    className="w-full h-full"
                  />
                </span>
              </span>
            </p>
            <div className="flex flex-row items-center justify-center lg:justify-start gap-6 pt-4">
              <Link
                href="#video"
                className="flex items-center gap-3 text-secondary"
                ref={playButtonRef as React.Ref<HTMLAnchorElement>}
              >
                <div className="relative w-12 h-12 rounded-full flex items-center justify-center">
                  <Image
                    src="/assets/icons/hero/play.png"
                    alt="Play"
                    width={60}
                    height={60}
                    className="ml-1"
                  />
                </div>
                <span className="md:hidden">{t("video-intro.mobile")}</span>
                <span className="hidden md:inline">
                  {t("video-intro.desktop")}
                </span>
              </Link>
              <div ref={ctaButtonRef}>
                <Button
                  href="#work"
                  translationKey="hero.cta"
                  variant="primary"
                  size="lg"
                />
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div
            className="relative h-[400px] md:h-[600px] lg:h-[600px] "
            ref={heroImageRef}
          >
            <Image
              src="/assets/images/hero/hero-person.png"
              alt="Hero"
              fill
              className="object-contain lg:object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
