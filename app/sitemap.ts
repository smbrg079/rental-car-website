import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { pages } from "@/lib/seo";
import { getCars } from "@/lib/cars";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rentalcar.example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cars = await getCars();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;

    for (const page of pages) {
      entries.push({
        url: `${SITE_URL}${prefix}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }

    for (const car of cars) {
      entries.push({
        url: `${SITE_URL}${prefix}/cars/${car.id}`,
        lastModified: car.updatedAt,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
