import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { reviews } from "@/lib/constants";
import Image from "next/image";

function ReviewsCarousel() {
  const t = useTranslations("reviews");
  const locale = useLocale();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      containScroll: "keepSnaps",
      loop: true,
      align: "center",
      direction: locale === "ar" ? "rtl" : "ltr",
      slidesToScroll: 1,
    },
    [
      Autoplay({
        delay: 6000,
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

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
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
    <div className="relative">
      {/* Left/Right arrows */}
      <button
        aria-label="Previous review"
        onClick={scrollPrev}
        className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center z-50"
      >
        <Image
          src="/assets/icons/reviews/arrow-left.png"
          alt="left-arrow"
          width={40}
          height={40}
        />
      </button>
      <button
        aria-label="Next review"
        onClick={scrollNext}
        className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center z-50"
      >
        <Image
          src="/assets/icons/reviews/arrow-right.png"
          alt="right-arrow"
          width={40}
          height={40}
        />
      </button>

      <div className=" overflow-hidden " ref={emblaRef}>
        <div className="embla__container flex items-center min-h-[500px]">
          {reviews.map((_, index) => (
            <div
              key={index}
              className="embla__slide flex-[0_0_100%] px-2 sm:px-4"
            >
              <div className="flex flex-col items-center text-center gap-6">
                {/* Avatars row */}
                <div className="flex items-center gap-6">
                  {/* left neighbor */}
                  <AvatarDot
                    index={(index - 1 + reviews.length) % reviews.length}
                    small
                    onClick={() =>
                      scrollTo((index - 1 + reviews.length) % reviews.length)
                    }
                  />
                  {/* current */}
                  <AvatarDot
                    index={index}
                    highlight
                    onClick={() => scrollTo(index)}
                  />
                  {/* right neighbor */}
                  <AvatarDot
                    index={(index + 1) % reviews.length}
                    small
                    onClick={() => scrollTo((index + 1) % reviews.length)}
                  />
                </div>

                {/* Name + role + stars */}
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-secondary">
                    {t(reviews[index].nameKey)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {t(reviews[index].roleKey)}
                  </p>
                  <div className="mt-2 flex justify-center gap-1 text-primary">
                    {Array.from({ length: reviews[index].rating }).map(
                      (_, i) => (
                        <svg
                          key={i}
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          className="fill-current"
                        >
                          <path d="M12 .587l3.668 7.431L24 9.748l-6 5.846 1.417 8.263L12 19.771 4.583 23.857 6 15.594 0 9.748l8.332-1.73z" />
                        </svg>
                      )
                    )}
                  </div>
                </div>

                {/* Message bubble */}
                {
                  reviews[index].messageKey ? (
                    <div className="max-w-xl w-full">
                      <div className="mx-auto w-full bg-[#1D1F20] text-white rounded-2xl p-6 shadow-lg">
                        <p className="leading-7">{t(reviews[index].messageKey)}</p>
                        {reviews[index].timeKey && (
                      <div className="text-right text-xs text-gray-400 mt-2">
                        {t(reviews[index].timeKey)}
                      </div>
                    )}
                  </div>
                </div>
                ) : (
                  <div className="flex-center w-full">
                  <Image
                    src={reviews[index].reviewImage}
                    alt={t(reviews[index].nameKey)}
                    width={400}
                    height={400}
                    className="object-cover "
                  />
                </div>
                )}
                
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-8 gap-2">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 rounded-full transition-all ${
              index === selectedIndex ? "bg-primary w-12" : "bg-gray-300 w-2"
            }`}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default ReviewsCarousel;

function AvatarDot({
  index,
  highlight,
  small,
  onClick,
}: {
  index: number;
  highlight?: boolean;
  small?: boolean;
  onClick?: () => void;
}) {
  const t = useTranslations("reviews");
  const item = reviews[index];
  const size = highlight ? 96 : small ? 48 : 72;
  const ring = highlight ? "ring-4 ring-primary" : "ring-2 ring-gray-200";
  const opacity = small ? "opacity-80" : "opacity-100";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={t(item.nameKey)}
      className={`relative rounded-full overflow-hidden ${ring} ${opacity} focus:outline-none focus:ring-2 focus:ring-primary/60`}
      style={{ width: size, height: size }}
    >
      {item.avatar ? (
        <Image
          src={item.avatar}
          alt={t(item.nameKey)}
          fill
          className="object-cover"
        />
      ) : (
        <span className="w-full h-full flex items-center justify-center bg-gray-100 text-secondary font-semibold">
          {t(item.nameKey).charAt(0)}
        </span>
      )}
    </button>
  );
}
