import { siteData } from "@/content/site-data";
import { SiteDataSchema, ServiceItem, FaqItem } from "@/types/content";

/**
 * Server-side getter for site data.
 * Can easily be backed by a Headless CMS (Sanity, Strapi, Contentful) or database.
 */
export async function getSiteData(): Promise<SiteDataSchema> {
  return siteData;
}

export async function getServices(): Promise<ServiceItem[]> {
  return siteData.services.items;
}

export async function getFaqs(): Promise<FaqItem[]> {
  return siteData.faqs;
}
