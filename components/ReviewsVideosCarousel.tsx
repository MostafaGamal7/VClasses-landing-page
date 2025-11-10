"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { reviewsVideos } from '@/lib/constants';

// Define a type for the translation keys
type VideoReviewKey = `reviews.videoReviews.review${number}.${'name' | 'timeAgo'}`;

const TWEEN_FACTOR_BASE = 0.03;

const numberWithinRange = (number: number, min: number, max: number) =>
  Math.min(Math.max(number, min), max);

interface VideoCardProps {
  video: {
    id: string;
    youtubeId: string;
    thumbnail: string;
    authorAvatar: string;
    rating: number;
    nameKey: string;
    timeAgoKey: string;
  };
  isActive: boolean;
  onPlay: (youtubeId: string) => void;
}

const VideoCard = ({ video, isActive, onPlay }: VideoCardProps) => {
  const t = useTranslations();
  
  return (
  <div 
    className="relative w-full h-[375px] md:h-[600px] rounded-4xl overflow-hidden transition-all duration-500 border-4 border-primary"
    style={{
      opacity: isActive ? 1 : 0.90,
      transform: isActive ? 'scale(1.02)' : 'scale(0.95)',
      zIndex: isActive ? 10 : 1,
    }}
  >
    <Image
      src={video.thumbnail}
      alt="review video"
      fill
      className="object-cover"
      sizes="(max-width: 768px) 75vw, (max-width: 1024px) 42vw, 28vw"
    />
    {/* gradient */}
    <div className="absolute inset-0 bg-linear-to-b from-transparent to-black" />
    <button
      onClick={() => onPlay(video.youtubeId)}
      className="absolute inset-0 w-full h-full"
      aria-label={`Play review`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-full flex items-center justify-center shadow-xl ring-1 ring-black/10 transition-transform duration-300 w-24 h-24 md:w-24 md:h-24">
          <Image
            src="/assets/images/reviews/videos-thumbnail/play-button.png"
            alt="play"
            width={100}
            height={100}
          />
        </div>
      </div>
    </button>
    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative rounded-full overflow-hidden ring-2 ring-white/80 w-16 h-16 md:w-20 md:h-20">
          <Image 
            src={video.authorAvatar} 
            alt={t(video.nameKey as VideoReviewKey)} 
            fill 
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-white font-semibold text-base md:text-lg">
            {t(video.nameKey as VideoReviewKey)}
          </span>
          <div className="flex items-center gap-1">
            {Array.from({ length: video.rating }).map((_, i) => (
              <Image
                key={i}
                src="/assets/icons/star.png"
                alt="star"
                width={14}
                height={14}
                className="transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </div>
      <span className="text-white/80 text-xs">
        {t(video.timeAgoKey as VideoReviewKey)}
      </span>
    </div>
  </div>
  );
};

export default function ReviewsVideosCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center', 
    skipSnaps: false,
    dragFree: false,
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
    direction: 'ltr',
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [activeYoutubeId, setActiveYoutubeId] = useState<string | null>(null);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLDivElement[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setTweenNodes = useCallback((emblaApi: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tweenNodes.current = emblaApi.slideNodes().map((slideNode: any) => {
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
        const scale = numberWithinRange(tweenValue, 0, 1).toString();
        const tweenNode = tweenNodes.current[slideIndex];
        if (tweenNode) {
          tweenNode.style.transform = `scale(${scale})`;
          tweenNode.style.opacity = scale;
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

  const openVideo = (youtubeId: string) => {
    setActiveYoutubeId(youtubeId);
    setIsOpen(true);
  };

  const closeVideo = () => {
    setIsOpen(false);
    setActiveYoutubeId(null);
  };

  return (
    <section className="relative mt-14 py-8">
      <div className="embla overflow-visible" ref={emblaRef} dir="ltr">
        <div className="embla__container flex items-center">
          {reviewsVideos.map((video, index) => (
            <div 
              key={video.id} 
              className="embla__slide shrink-0 w-[80%] sm:w-[45%] lg:w-[26%] px-2 md:px-3 flex justify-center"
            >
              <div className="embla__slide__content w-full">
                <VideoCard 
                  video={video} 
                  isActive={index === selectedIndex}
                  onPlay={openVideo}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {isOpen && activeYoutubeId && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-black rounded-4xl overflow-hidden shadow-xl">
            <button
              onClick={closeVideo}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-secondary flex items-center justify-center shadow"
              aria-label="Close video"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${activeYoutubeId}?autoplay=1&rel=0`}
                title="Student review"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
