import React from "react";
import { SiteDataSchema } from "@/types/content";

interface JsonLdProps {
  data: SiteDataSchema;
}

export function JsonLd({ data }: JsonLdProps) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: data.brand.name,
    description: data.seo.description,
    url: data.seo.siteUrl,
    logo: `${data.seo.siteUrl}/designs/Homepage.jpg`,
    email: data.brand.contactEmail,
    telephone: data.brand.phone,
    address: data.footer.locations.map((loc) => ({
      "@type": "PostalAddress",
      addressLocality: loc.city,
      addressCountry: loc.country,
      streetAddress: loc.address,
    })),
    sameAs: [
      data.brand.socials.instagram,
      data.brand.socials.linkedin,
      data.brand.socials.twitter,
    ].filter(Boolean),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Design & Strategy Services",
      itemListElement: data.services.items.map((svc, idx) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: svc.title,
          description: svc.description,
        },
        position: idx + 1,
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
