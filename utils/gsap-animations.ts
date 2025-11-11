import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Fade in animation for cards and elements
export const fadeInAnimation = (
  element: HTMLElement | HTMLElement[],
  options: {
    duration?: number;
    delay?: number;
    y?: number;
    x?: number;
    trigger?: string;
    start?: string;
    end?: string;
    scrub?: boolean;
    stagger?: number;
    markers?: boolean;
  } = {}
) => {
  const {
    duration = 0.8,
    delay = 0,
    y = 30,
    x = 0,
    trigger,
    start = "top 60%",
    end = "bottom 20%",
    scrub = false,
    markers = false,
  } = options;

  const elements = Array.isArray(element) ? element : [element];

  elements.forEach((el, index) => {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: y,
        x: x,
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration: duration,
        delay: delay + index * 0.1, // Stagger effect for multiple elements
        ease: "power2.out",
        scrollTrigger: trigger
          ? {
              trigger: trigger,
              start: start,
              end: end,
              scrub: scrub,
              markers: markers,
              toggleActions: "play none none none",
            }
          : undefined,
      }
    );
  });
};

// Text reveal animation for headings
export const textRevealAnimation = (
  element: HTMLElement,
  options: {
    duration?: number;
    delay?: number;
    splitBy?: "chars" | "words" | "lines";
    trigger?: string;
    start?: string;
    end?: string;
    scrub?: boolean;
    markers?: boolean;
  } = {}
) => {
  const { duration = 1, delay = 0, splitBy = "words" } = options;

  // Split text into characters, words, or lines
  const splitText = (text: string, type: string) => {
    if (type === "chars")
      return text
        .split("")
        .map(
          (char) =>
            `<span class="inline-block">${
              char === " " ? "&nbsp;" : char
            }</span>`
        )
        .join("");
    if (type === "words")
      return text
        .split(" ")
        .map((word) => `<span class="inline-block">${word}</span>`)
        .join(" ");
    if (type === "lines")
      return text
        .split("\n")
        .map((line) => `<span class="inline-block">${line}</span>`)
        .join("<br>");
    return text;
  };

  const originalText = element.textContent || "";
  element.innerHTML = splitText(originalText, splitBy);

  const spans = element.querySelectorAll("span");

  gsap.fromTo(
    spans,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: duration / spans.length,
      delay: delay,
      stagger: 0.05,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    }
  );
};

// Scale animation for icons and images
export const scaleAnimation = (
  element: HTMLElement | HTMLElement[],
  options: {
    duration?: number;
    delay?: number;
    scale?: number;
    scaleFrom?: number;
    trigger?: string;
  } = {}
) => {
  const { duration = 0.6, delay = 0, scale = 0.8, trigger } = options;
  const elements = Array.isArray(element) ? element : [element];

  elements.forEach((el, index) => {
    gsap.fromTo(
      el,
      {
        scale: scale,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: duration,
        delay: delay + index * 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: trigger,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  });
};

// Slide in animation from different directions
export const slideInAnimation = (
  element: HTMLElement | HTMLElement[],
  options: {
    direction?: "left" | "right" | "top" | "bottom";
    duration?: number;
    delay?: number;
    distance?: number;
    trigger?: string;
  } = {}
) => {
  const {
    direction = "left",
    duration = 0.8,
    delay = 0,
    distance = 50,
    trigger,
  } = options;

  const elements = Array.isArray(element) ? element : [element];

  const getFromValues = () => {
    switch (direction) {
      case "left":
        return { x: -distance, opacity: 0 };
      case "right":
        return { x: distance, opacity: 0 };
      case "top":
        return { y: -distance, opacity: 0 };
      case "bottom":
        return { y: distance, opacity: 0 };
      default:
        return { x: -distance, opacity: 0 };
    }
  };

  const getToValues = () => {
    switch (direction) {
      case "left":
      case "right":
        return { x: 0, opacity: 1 };
      case "top":
      case "bottom":
        return { y: 0, opacity: 1 };
      default:
        return { x: 0, opacity: 1 };
    }
  };

  elements.forEach((el, index) => {
    gsap.fromTo(el, getFromValues(), {
      ...getToValues(),
      duration: duration,
      delay: delay + index * 0.1,
      ease: "power2.out",
      scrollTrigger: trigger
        ? {
            trigger: trigger,
            start: "top 60%",
            toggleActions: "play none none none",
          }
        : undefined,
    });
  });
};

// Cleanup function for ScrollTrigger
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

export default {
  fadeInAnimation,
  textRevealAnimation,
  scaleAnimation,
  slideInAnimation,
  cleanupScrollTriggers,
};
