export const aboutCards = [
  {
    title: "card1.title",
    description: "card1.description",
    icon: "target",
    bgColor: "bg-[#F0926C]",
    circleColor: "bg-[#F4BCA2]",
    shadowColor: "shadow-[#F0926C82]",
  },
  {
    title: "card2.title",
    description: "card2.description",
    icon: "presentation",
    bgColor: "bg-[#6629DE]",
    circleColor: "bg-[#B08EF3]",
    shadowColor: "shadow-[#6629DE82]",
  },
  {
    title: "card3.title",
    description: "card3.description",
    icon: "chat",
    bgColor: "bg-[#2D7A73]",
    circleColor: "bg-[#3C9C8C]",
    shadowColor: "shadow-[#2D7A7382]",
  },
];

// Reviews/Testimonial cards data
// Text content comes from translations. Keys reference the namespace "reviews".
// Avatars are optional; when omitted, the UI renders a fallback with initials.
export const reviews = [
  {
    nameKey: "review1.name",
    roleKey: "review1.role",
    messageKey: "",
    reviewImage: "/assets/images/reviews/review-1.png",
    rating: 5,
    avatar: "/assets/images/reviews/person-1.jpg", // optional local image path (e.g., "/assets/images/reviews/user1.png")
    timeKey: "review1.time",
  },
  {
    nameKey: "review2.name",
    roleKey: "review2.role",
    messageKey: "review2.message",
    reviewImage: "",
    rating: 5,
    avatar: "/assets/images/reviews/person-2.jpg",
    timeKey: "review2.time",
  },
  {
    nameKey: "review3.name",
    roleKey: "review3.role",
    messageKey: "review3.message",
    reviewImage: "",
    rating: 5,
    avatar: "/assets/images/reviews/person-3.jpg",
    timeKey: "review3.time",
  },
];

// Videos carousel data
export const reviewsVideos = [
  {
    id: "vid1",
    youtubeId: "zJSY8tbf_ys",
    thumbnail: "/assets/images/reviews/videos-thumbnail/thumbnail-1.jpg",
    authorAvatar: "/assets/images/reviews/person-1.jpg",
    rating: 5,
    nameKey: "reviews.videoReviews.review1.name",
    timeAgoKey: "reviews.videoReviews.review1.timeAgo"
  },
  {
    id: "vid2",
    youtubeId: "Kl3nOXQjVnQ",
    thumbnail: "/assets/images/reviews/videos-thumbnail/thumbnail-2.jpg",
    authorAvatar: "/assets/images/reviews/person-2.jpg",
    rating: 5,
    nameKey: "reviews.videoReviews.review2.name",
    timeAgoKey: "reviews.videoReviews.review2.timeAgo"
  },
  {
    id: "vid3",
    youtubeId: "nAsBMaaWs38",
    thumbnail: "/assets/images/reviews/videos-thumbnail/thumbnail-3.jpg",
    authorAvatar: "/assets/images/reviews/person-3.jpg",
    rating: 5,
    nameKey: "reviews.videoReviews.review3.name",
    timeAgoKey: "reviews.videoReviews.review3.timeAgo"
  },
  {
    id: "vid4",
    youtubeId: "zJSY8tbf_ys",
    thumbnail: "/assets/images/reviews/videos-thumbnail/thumbnail-4.jpg",
    authorAvatar: "/assets/images/reviews/person-1.jpg",
    rating: 5,
    nameKey: "reviews.videoReviews.review4.name",
    timeAgoKey: "reviews.videoReviews.review4.timeAgo"
  },
  {
    id: "vid5",
    youtubeId: "Kl3nOXQjVnQ",
    thumbnail: "/assets/images/reviews/videos-thumbnail/thumbnail-5.jpg",
    authorAvatar: "/assets/images/reviews/person-2.jpg",
    rating: 5,
    nameKey: "reviews.videoReviews.review5.name",
    timeAgoKey: "reviews.videoReviews.review5.timeAgo"
  }
];

export interface PlanFeature {
  id: string;
  textKey: string;
  available: boolean;
}

export interface PlanPricing {
  monthly: number;
  yearly: number;
  currency: string;
  periodKey: string;
  saveKey: string;
}

export interface PlanData {
  id: string;
  nameKey: string;
  popular: boolean;
  features: PlanFeature[];
  pricing: PlanPricing;
  buttonTextKey: string;
  buttonVariant: 'primary' | 'secondary' | 'outline';
}

export const plans: PlanData[] = [
  {
    id: 'starter',
    nameKey: 'plans.starter.name',
    popular: false,
    features: [
      { id: 'f1', textKey: 'plans.features.lessons', available: true },
      { id: 'f2', textKey: 'plans.features.quizzes', available: true },
      { id: 'f3', textKey: 'plans.features.certificate', available: false },
      { id: 'f4', textKey: 'plans.features.support', available: false },
    ],
    pricing: {
      monthly: 9.99,
      yearly: 99.99,
      currency: 'EGP ',
      periodKey: 'plans.period.monthly',
      saveKey: 'plans.save.percent',
    },
    buttonTextKey: 'plans.button.getStarted',
    buttonVariant: 'outline',
  },
  {
    id: 'pro',
    nameKey: 'plans.pro.name',
    popular: true,
    features: [
      { id: 'f1', textKey: 'plans.features.lessons', available: true },
      { id: 'f2', textKey: 'plans.features.quizzes', available: true },
      { id: 'f3', textKey: 'plans.features.certificate', available: true },
      { id: 'f4', textKey: 'plans.features.support', available: false },
    ],
    pricing: {
      monthly: 19.99,
      yearly: 199.99,
      currency: '$',
      periodKey: 'plans.period.monthly',
      saveKey: 'plans.save.percent',
    },
    buttonTextKey: 'plans.button.getStarted',
    buttonVariant: 'primary',
  },
  {
    id: 'enterprise',
    nameKey: 'plans.enterprise.name',
    popular: false,
    features: [
      { id: 'f1', textKey: 'plans.features.lessons', available: true },
      { id: 'f2', textKey: 'plans.features.quizzes', available: true },
      { id: 'f3', textKey: 'plans.features.certificate', available: true },
      { id: 'f4', textKey: 'plans.features.support', available: true },
    ],
    pricing: {
      monthly: 29.99,
      yearly: 299.99,
      currency: '$',
      periodKey: 'plans.period.monthly',
      saveKey: 'plans.save.percent',
    },
    buttonTextKey: 'plans.button.contactUs',
    buttonVariant: 'secondary',
  },
];

export const footerSocialLinks = [
  {
    href: 'https://www.facebook.com/vclasses.net',
    icon: '/assets/icons/footer/facebook.png',
    iconName: 'facebook', 
  },
  {
    href: 'https://x.com/VClasses1',
    icon: '/assets/icons/footer/twitter.png',
    iconName: 'twitter',
  },
  {
    href: 'https://www.instagram.com/vclasses_lms/',
    icon: '/assets/icons/footer/instagram.png',
    iconName: 'instagram',
  },
  {
    href: 'https://www.linkedin.com/company/vclasses-lms/',
    icon: '/assets/icons/footer/linked-in.png',
    iconName: 'linked-in',
  },
  {
    href: 'https://www.youtube.com/@vclasses1',
    icon: '/assets/icons/footer/dribbble.png',
    iconName: 'dribbble',
  }
];

export const footerLinks = [
  {
    title: 'footer.quickLinks',
    links: [
      { text: 'quickLinks.home', href: '/' },
      { text: 'quickLinks.about', href: '#about' },
      { text: 'quickLinks.plans', href: '#plans' },
      { text: 'quickLinks.contact', href: '#contact' },
      { text: 'quickLinks.reviews', href: '#reviews' },
      { text: 'quickLinks.instructors', href: '#meet' },
    ]
  }
];

export const footerContactInfo = [
  {
    text: 'contact.email',
    icon: '/assets/icons/footer/mail.png',
    iconName: 'mail',
    href: 'mailto:vckasess@gmail.com'
  },
  {
    text: 'contact.phone',
    icon: '/assets/icons/footer/phone.png',
    iconName: 'phone',
    href: 'tel:+20123456789'
  },
  {
    text: 'contact.address',
    icon: '/assets/icons/footer/location.png',
    iconName: 'location',
    href: 'https://maps.google.com/?q=Cairo,+Egypthttps://www.google.com/maps/place/VClasses/@29.973182,31.2880079,17z/data=!3m1!4b1!4m6!3m5!1s0x14583e76bce45b37:0x5ebd05ecd60cbcf3!8m2!3d29.973182!4d31.2880079!16s%2Fg%2F11k3g1mntz!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MTEwNS4wIKXMDSoASAFQAw%3D%3D'
  }
]