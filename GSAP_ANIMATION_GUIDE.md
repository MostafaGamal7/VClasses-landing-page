# GSAP Animation Guide for VClasses Landing Page

This guide explains how to use the GSAP animation system we've implemented for the landing page.

## Installation

GSAP and its React plugin have been installed:
```bash
npm install gsap @gsap/react
```

## Animation Utilities

We've created two main utilities for animations:

### 1. `gsap-animations.ts`
Located in `utils/gsap-animations.ts`, this file contains the core animation functions:

- `fadeInAnimation()` - Fade in elements with optional vertical/horizontal movement
- `textRevealAnimation()` - Animate text character by character, word by word, or line by line
- `scaleAnimation()` - Scale elements from smaller/larger to normal size
- `slideInAnimation()` - Slide elements in from any direction (left, right, top, bottom)
- `cleanupScrollTriggers()` - Clean up ScrollTrigger instances

### 2. `useGsapAnimation.ts`
Located in `utils/useGsapAnimation.ts`, this provides React hooks for easy animation integration:

- `useGsapAnimation()` - Hook for animating single elements
- `useGsapAnimationGroup()` - Hook for animating multiple elements

## Usage Examples

### Basic Fade In Animation
```typescript
import { useGsapAnimation } from '@/utils/useGsapAnimation';

function MyComponent() {
  const elementRef = useGsapAnimation({
    type: 'fadeIn',
    duration: 0.8,
    delay: 0.2,
    y: 30,
    trigger: '#my-section'
  });

  return (
    <div ref={elementRef}>
      This element will fade in when scrolled into view
    </div>
  );
}
```

### Text Reveal Animation
```typescript
import { useGsapAnimation } from '@/utils/useGsapAnimation';

function MyComponent() {
  const titleRef = useGsapAnimation({
    type: 'textReveal',
    duration: 1.2,
    delay: 0.3,
    splitBy: 'words' // 'chars', 'words', or 'lines'
  });

  return (
    <h1 ref={titleRef}>
      This text will animate word by word
    </h1>
  );
}
```

### Slide In Animation
```typescript
import { useGsapAnimation } from '@/utils/useGsapAnimation';

function MyComponent() {
  const cardRef = useGsapAnimation({
    type: 'slideIn',
    direction: 'left',
    duration: 0.8,
    delay: 0.5,
    distance: 50,
    trigger: '#cards-section'
  });

  return (
    <div ref={cardRef} className="card">
      Card content
    </div>
  );
}
```

### Multiple Elements Animation
```typescript
import { useGsapAnimationGroup } from '@/utils/useGsapAnimation';
import { useRef, useEffect } from 'react';

function MyComponent() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useGsapAnimationGroup({
    type: 'fadeIn',
    duration: 0.8,
    delay: 0.3,
    y: 30,
    elements: cardsRef.current ? Array.from(cardsRef.current.children) : []
  });

  return (
    <div ref={cardsRef}>
      <div>Card 1</div>
      <div>Card 2</div>
      <div>Card 3</div>
    </div>
  );
}
```

## Animation Types

### Fade In Animation
- **duration**: Animation duration in seconds (default: 0.8)
- **delay**: Delay before animation starts (default: 0)
- **y**: Vertical movement distance (default: 30)
- **x**: Horizontal movement distance (default: 0)
- **trigger**: CSS selector for scroll trigger (optional)
- **start**: Scroll trigger start position (default: 'top 80%')
- **end**: Scroll trigger end position (default: 'bottom 20%')
- **scrub**: Whether animation should scrub with scroll (default: false)
- **markers**: Show debug markers (default: false)

### Text Reveal Animation
- **duration**: Animation duration in seconds (default: 1)
- **delay**: Delay before animation starts (default: 0)
- **splitBy**: How to split text ('chars', 'words', or 'lines')

### Scale Animation
- **duration**: Animation duration in seconds (default: 0.6)
- **delay**: Delay before animation starts (default: 0)
- **scale**: Initial scale value (default: 0.8)
- **trigger**: CSS selector for scroll trigger (optional)

### Slide In Animation
- **direction**: Direction to slide from ('left', 'right', 'top', 'bottom')
- **duration**: Animation duration in seconds (default: 0.8)
- **delay**: Delay before animation starts (default: 0)
- **distance**: Distance to slide (default: 50)
- **trigger**: CSS selector for scroll trigger (optional)

## Scroll Trigger Options

All animations support scroll triggers using the `trigger` parameter. When set, the animation will only play when the trigger element enters the viewport.

```typescript
fadeInAnimation(element, {
  duration: 1,
  delay: 0.5,
  trigger: '#my-section', // Animation triggers when #my-section enters viewport
  start: 'top 80%',        // When top of element is 80% from top of viewport
  end: 'bottom 20%',     // When bottom of element is 20% from top of viewport
  scrub: false,            // Animation plays once, doesn't scrub
  markers: false           // No debug markers
});
```

## Best Practices

1. **Performance**: Use `transform` and `opacity` properties for smooth animations
2. **Timing**: Keep animations between 0.3-1.2 seconds for good UX
3. **Delays**: Use small delays (0.1-0.3s) between staggered animations
4. **Scroll Triggers**: Use appropriate start/end positions for good visibility
5. **Mobile**: Test animations on mobile devices, consider reducing complexity
6. **Accessibility**: Respect user preferences for reduced motion

## Implementation Examples

The following sections have been updated with animations:

### Hero Section (`sections/Hero.tsx`)
- Title: Text reveal animation
- Description: Slide in from left
- Play button: Scale animation
- CTA button: Fade in animation
- Hero image: Slide in from right

### About Section (`sections/About.tsx`)
- Section title: Text reveal animation
- Subtitle: Fade in animation
- Cards: Fade in with scroll trigger
- Learn section: Various animations with scroll triggers

## Adding Animations to New Sections

1. Import the animation utilities:
```typescript
import { useGsapAnimation } from '@/utils/useGsapAnimation';
import { useRef, useEffect } from 'react';
```

2. Create refs for elements you want to animate:
```typescript
const titleRef = useRef<HTMLHeadingElement>(null);
const cardsRef = useRef<HTMLDivElement>(null);
```

3. Add animation effects in useEffect:
```typescript
useEffect(() => {
  // Animate title
  if (titleRef.current) {
    textRevealAnimation(titleRef.current, {
      duration: 1,
      delay: 0.2,
      splitBy: 'words'
    });
  }

  // Animate cards with scroll trigger
  if (cardsRef.current) {
    const cardElements = Array.from(cardsRef.current.children);
    fadeInAnimation(cardElements, {
      duration: 0.8,
      delay: 0.5,
      y: 30,
      trigger: '#my-section'
    });
  }
}, []);
```

4. Add refs to your JSX elements:
```typescript
return (
  <section id="my-section">
    <h1 ref={titleRef}>Animated Title</h1>
    <div ref={cardsRef}>
      <div>Card 1</div>
      <div>Card 2</div>
      <div>Card 3</div>
    </div>
  </section>
);
```

## Debugging

To debug animations, you can:

1. Set `markers: true` in scroll trigger options to see debug markers
2. Use browser dev tools to inspect element styles during animation
3. Add console.log statements in your useEffect hooks
4. Use GSAP's built-in debugging tools

## Performance Tips

1. Use `transform` and `opacity` for smooth animations
2. Avoid animating layout properties (width, height, margin, etc.)
3. Use `will-change` CSS property sparingly
4. Consider using `transform3d` for hardware acceleration
5. Test on lower-end devices
6. Use `requestAnimationFrame` for custom animations

## Browser Support

GSAP works in all modern browsers and IE11+. For older browsers, consider using polyfills or fallback animations.