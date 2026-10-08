import { MetadataRoute } from "next";
import { siteData } from "@/content/site-data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${siteData.seo.siteUrl}/sitemap.xml`,
  };
}
