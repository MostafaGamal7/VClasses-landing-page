"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { reviewsVideos } from "@/lib/constants";

export default function ReviewsVideosCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    dragFree: false,
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [activeYoutubeId, setActiveYoutubeId] = useState<string | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    // Set up event listener for changes
    emblaApi.on("select", onSelect);
    
    // Use requestAnimationFrame to defer the state update
    // This prevents the setState warning in development
    const raf = requestAnimationFrame(() => {
      if (emblaApi.selectedScrollSnap() !== selectedIndex) {
        onSelect();
      }
    });
    
    // Cleanup function
    return () => {
      cancelAnimationFrame(raf);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect, selectedIndex]);

  const openVideo = (youtubeId: string) => {
    setActiveYoutubeId(youtubeId);
    setIsOpen(true);
  };

  const closeVideo = () => {
    setIsOpen(false);
    setActiveYoutubeId(null);
  };

  return (
    <div className="relative mt-14 py-8">
      <div className="embla overflow-visible" ref={emblaRef}>
        <div className="embla__container flex items-center">
          {reviewsVideos.map((video, index) => {
            const isActive = index === selectedIndex;
            return (
              <div
                key={video.id}
                className="embla__slide flex-[0_0_75%] sm:flex-[0_0_42%] lg:flex-[0_0_28%] px-2 md:px-3 flex justify-center"
              >
                <div
                  className={`transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`}
                  style={{
                    transform: isActive
                      ? "scale(1.08) translateY(-16px)"
                      : "scale(0.92) translateY(0)",
                    opacity: isActive ? 1 : 0.75,
                  }}
                >
                  <VideoCard
                    video={video}
                    onPlay={() => openVideo(video.youtubeId)}
                    isActive={isActive}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {isOpen && activeYoutubeId && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-3xl bg-black rounded-4xl overflow-hidden shadow-xl">
            <button
              aria-label="Close video"
              onClick={closeVideo}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-secondary flex items-center justify-center shadow"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
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
    </div>
  );
}

function VideoCard({
  video,
  onPlay,
  isActive,
}: {
  video: {
    thumbnail: string;
    authorName: string;
    authorAvatar: string;
    rating: number;
    timeAgo: string;
  };
  onPlay: () => void;
  isActive: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className="group relative w-full overflow-hidden rounded-4xl border border-primary/80 shadow-[0_0_0_2px_rgba(255,102,0,0.15)] hover:shadow-[0_0_0_3px_rgba(255,102,0,0.25)] transition-shadow duration-500 ease-out"
      style={{
        height: "500px", // fixed height for all slides (Embla stable)
      }}
    >
      <div className="relative w-full h-full">
        <Image
          src={video.thumbnail}
          alt="review video"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 75vw, (max-width: 1024px) 45vw, 28vw"
        />
        <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-colors" />

        {/* play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`rounded-full bg-white/95 flex items-center justify-center shadow-xl ring-1 ring-black/10 transition-transform duration-300 ${
              isActive ? "scale-110 w-20 h-20 md:w-24 md:h-24" : "scale-100 w-16 h-16 md:w-18 md:h-18"
            }`}
          >
            <Image
              src="/assets/images/reviews/videos-thumbnail/play-button.png"
              alt="play"
              width={isActive ? 56 : 48}
              height={isActive ? 56 : 48}
            />
          </div>
        </div>

        {/* footer */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`relative rounded-full overflow-hidden ring-2 ring-white/80 transition-all duration-500 ${
                isActive ? "w-20 h-20 md:w-24 md:h-24" : "w-16 h-16 md:w-18 md:h-18"
              }`}
            >
              <Image src={video.authorAvatar} alt={video.authorName} fill className="object-cover" />
            </div>
            <div className="flex flex-col gap-1">
              <span
                className={`text-white font-semibold transition-all duration-300 ${
                  isActive ? "text-xl md:text-2xl" : "text-base md:text-lg"
                }`}
              >
                {video.authorName}
              </span>
              <div className="flex items-center gap-1">
                {Array.from({ length: video.rating }).map((_, i) => (
                  <Image
                    key={i}
                    src="/assets/icons/star.png"
                    alt="star"
                    width={isActive ? 16 : 14}
                    height={isActive ? 16 : 14}
                    className="transition-all duration-300"
                  />
                ))}
              </div>
            </div>
          </div>
          <span
            className={`text-white/80 transition-all duration-500 ${
              isActive ? "text-xs md:text-sm" : "text-xs"
            }`}
          >
            {video.timeAgo}
          </span>
        </div>
      </div>
    </button>
  );
}
