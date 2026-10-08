export interface BrandConfig {
  name: string;
  tagline: string;
  contactEmail: string;
  phone?: string;
  socials: {
    instagram: string;
    linkedin: string;
    twitter?: string;
  };
}

export interface SeoConfig {
  title: string;
  description: string;
  siteUrl: string;
  canonical: string;
  openGraph: {
    title: string;
    description: string;
    image: string;
  };
}

export interface FloatingCallout {
  id: string;
  text: string;
  highlightStyle?: "circle" | "underline" | "pill" | "none";
  position: "left-top" | "left-bottom" | "right-top" | "right-bottom";
}

export interface HeroSectionContent {
  eyebrow?: string;
  headlineTop: string;
  headlineAccent: string;
  headlineBottom: string;
  callouts: FloatingCallout[];
  ctaText: string;
  ctaLink: string;
  modelPath: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  logoSvg?: string;
  textFallback: string;
}

export interface TrustBannerContent {
  metricCount: string;
  metricLabel: string;
  clients: ClientLogo[];
}

export interface ServiceItem {
  id: string;
  categoryNumber: string;
  title: string;
  description: string;
  bullets: string[];
  footnote?: string;
  mockupImage: string;
  ctaText: string;
  ctaLink: string;
  modelHighlightIndex: number;
}

export interface ServicesSectionContent {
  badgeText: string;
  eyebrow: string;
  items: ServiceItem[];
  modelPath: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FormFieldConfig {
  name: string;
  label: string;
  type: "text" | "email" | "textarea" | "select";
  placeholder: string;
  required: boolean;
  options?: string[];
}

export interface ContactSectionContent {
  tagline: string;
  heading: string;
  description: string;
  fields: FormFieldConfig[];
  submitButtonText: string;
  successTitle: string;
  successMessage: string;
  gtmEvent: string;
}

export interface OfficeLocation {
  city: string;
  country: string;
  address?: string;
}

export interface FooterContent {
  brandBanner: string;
  locations: OfficeLocation[];
  contactEmail: string;
  copyrightText: string;
}

export interface SiteDataSchema {
  brand: BrandConfig;
  seo: SeoConfig;
  hero: HeroSectionContent;
  trustBanner: TrustBannerContent;
  services: ServicesSectionContent;
  testimonials: TestimonialItem[];
  faqs: FaqItem[];
  contact: ContactSectionContent;
  footer: FooterContent;
}
