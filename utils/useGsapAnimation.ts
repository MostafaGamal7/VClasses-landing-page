import { useEffect, useRef } from "react";
import {
  fadeInAnimation,
  textRevealAnimation,
  scaleAnimation,
  slideInAnimation,
} from "./gsap-animations";

type AnimationType = "fadeIn" | "textReveal" | "scale" | "slideIn";

interface UseGsapAnimationOptions {
  type: AnimationType;
  duration?: number;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  distance?: number;
  direction?: "left" | "right" | "top" | "bottom";
  splitBy?: "chars" | "words" | "lines";
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean;
  markers?: boolean;
}

export const useGsapAnimation = (options: UseGsapAnimationOptions) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    switch (options.type) {
      case "fadeIn":
        fadeInAnimation(element, {
          duration: options.duration,
          delay: options.delay,
          y: options.y,
          x: options.x,
          trigger: options.trigger,
          start: options.start,
          end: options.end,
          scrub: options.scrub,
          markers: options.markers,
        });
        break;

      case "textReveal":
        textRevealAnimation(element, {
          duration: options.duration,
          delay: options.delay,
          splitBy: options.splitBy,
        });
        break;

      case "scale":
        scaleAnimation(element, {
          duration: options.duration,
          delay: options.delay,
          scale: options.scale,
          trigger: options.trigger,
        });
        break;

      case "slideIn":
        slideInAnimation(element, {
          direction: options.direction,
          duration: options.duration,
          delay: options.delay,
          distance: options.distance,
          trigger: options.trigger,
        });
        break;

      default:
        console.warn("Unknown animation type:", options.type);
    }
  }, [options]);

  return elementRef;
};

// Hook for animating multiple elements
export const useGsapAnimationGroup = (
  options: UseGsapAnimationOptions & { elements: HTMLElement[] }
) => {
  const { elements, ...animationOptions } = options;

  useEffect(() => {
    if (!elements || elements.length === 0) return;

    switch (animationOptions.type) {
      case "fadeIn":
        fadeInAnimation(elements, {
          duration: animationOptions.duration,
          delay: animationOptions.delay,
          y: animationOptions.y,
          x: animationOptions.x,
          trigger: animationOptions.trigger,
          start: animationOptions.start,
          end: animationOptions.end,
          scrub: animationOptions.scrub,
          markers: animationOptions.markers,
        });
        break;

      case "scale":
        scaleAnimation(elements, {
          duration: animationOptions.duration,
          delay: animationOptions.delay,
          scale: animationOptions.scale,
          trigger: animationOptions.trigger,
        });
        break;

      case "slideIn":
        slideInAnimation(elements, {
          direction: animationOptions.direction,
          duration: animationOptions.duration,
          delay: animationOptions.delay,
          distance: animationOptions.distance,
          trigger: animationOptions.trigger,
        });
        break;

      default:
        console.warn(
          "Animation type not supported for groups:",
          animationOptions.type
        );
    }
  }, [elements, animationOptions]);
};

export default useGsapAnimation;
