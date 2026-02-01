import { routing } from "@/i18n/routing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rentalcar.example.com";
const SITE_NAME = "Premium Rental Car";

export const defaultMetadata = {
  title: {
    default: `${SITE_NAME} | Luxury Car Rental - Book Online`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Rent premium luxury cars at the best prices. 50+ vehicles, 24/7 support, free cancellation. Book your dream car in under 2 minutes.",
  keywords: [
    "car rental",
    "luxury car rental",
    "premium car hire",
    "rent a car",
    "SUV rental",
    "electric car rental",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Luxury Car Rental`,
    description: "Rent premium luxury cars at the best prices. Book online in 2 minutes.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Luxury Car Rental`,
    description: "Rent premium luxury cars at the best prices. Book online in 2 minutes.",
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const pages = [
  { path: "/", priority: 1, changeFrequency: "daily" as const },
  { path: "/cars", priority: 0.9, changeFrequency: "daily" as const },
  { path: "/booking", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/services", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/locations", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
];

export function getLocalizedUrl(path: string, locale: string): string {
  const base = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${SITE_URL}${base}${path}`;
}
